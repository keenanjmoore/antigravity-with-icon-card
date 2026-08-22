import { LitElement, html, unsafeCSS, PropertyValues, nothing, TemplateResult } from 'lit';
import { customElement, property, state, eventOptions } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { handleAction, forwardHaptic } from 'custom-card-helpers';
import type { AntigravityCardConfig } from './types';
import { DEFAULT_CARD_CONFIG } from './types';
import { StyleBuilder } from './style-builder';
import { memoryTracker } from './memory-tracker';
import { powerHelper } from './power-helper';
import { cleanupWebGL } from './gpu-utils';
import { runAntigravityCI } from './ci-workflow';
import { antigravityCardStyles } from './styles/card-styles';
import { SubButtonController } from './controllers/sub-button-controller';
import { InfoFormatter } from './controllers/info-formatter';
import {
  kelvinToRgb,
  rgbToHex,
  rgbToHue,
  hsToRgb,
  parseColorToRgb,
  lerpRgb,
  COLOR_SWATCHES,
  COLOR_TEMP_PRESETS
} from './color-converter';
import './editor';

// Augment HomeAssistant type for newer HA APIs not yet in custom-card-helpers
declare module 'custom-card-helpers' {
  interface HomeAssistant {
    formatEntityState?: (stateObj: any) => string;
  }
}

declare global {
  interface Window {
    customCards?: any[];
    runAntigravityCI?: () => Promise<any>;
    antigravityMemoryReport?: () => void;
    antigravityPowerStatus?: () => boolean;
  }
}

if (typeof window !== 'undefined') {
  window.runAntigravityCI = runAntigravityCI;
  window.antigravityMemoryReport = () => memoryTracker.logStatus();
  window.antigravityPowerStatus = () => powerHelper.isPowerSaveActive();
}

export const CARD_VERSION = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (WITH-ICON) %c v${CARD_VERSION} `,
  'color: white; background: #6200ea; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #6200ea; background: #ede7f6; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;'
);

// ---- CSS Houdini Custom Property Registration (Zero-Reflow GPU Transitions) ----
if (typeof CSS !== 'undefined' && 'registerProperty' in CSS) {
  try {
    (CSS as any).registerProperty({
      name: '--slider-pct',
      syntax: '<percentage>',
      inherits: true,
      initialValue: '0%'
    });
    (CSS as any).registerProperty({
      name: '--decay-pct',
      syntax: '<percentage>',
      inherits: true,
      initialValue: '100%'
    });
    (CSS as any).registerProperty({
      name: '--glow-intensity',
      syntax: '<number>',
      inherits: true,
      initialValue: '1'
    });
  } catch {
    // Already registered or unsupported
  }
}

// ---- Card Registration ----
window.customCards = window.customCards || [];
window.customCards.push({
  type: "antigravity-with-icon-card",
  name: "Antigravity Card (With Icon)",
  preview: true,
  description: "A custom card merging Bubble Card styling with Mushroom Card controls, full icon customizations, and multi-stage fade transitions."
});

// ---- Global Resume & Gesture Debounce State ----
let LAST_APP_RESUME_TIME = Date.now();
if (typeof window !== 'undefined' && !(window as any).__AG_RESUME_LISTENER_ATTACHED__) {
  (window as any).__AG_RESUME_LISTENER_ATTACHED__ = true;
  window.addEventListener('focus', () => { LAST_APP_RESUME_TIME = Date.now(); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      LAST_APP_RESUME_TIME = Date.now();
    }
  }, { passive: true });
}

// ---- Constants & State Sets (Module-Level to avoid GC thrashing) ----
const ACTIVE_STATES = new Set([
  'on', 'open', 'opening', 'active', 'cleaning', 'play', 'playing', 'cool',
  'heat', 'fan_only', 'auto', 'dry', 'home', 'occupied', 'motion', 'detected',
  'running', 'idle', 'true', '1', 'closing', 'unlocked', 'locking', 'unlocking',
  'armed_home', 'armed_away', 'armed_night', 'armed_vacation', 'armed_custom_bypass',
  'triggered', 'pending', 'arming', 'returning', 'above_horizon', 'electric', 'gas', 'heat_pump',
  'present'
]);

const HA_NAMED_COLORS = new Set([
  'primary', 'accent', 'red', 'pink', 'purple', 'deep-purple', 'indigo',
  'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime',
  'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey',
  'black', 'white', 'disabled'
]);

const COLOR_MODES_SET = new Set(['hs', 'xy', 'rgb', 'rgbw', 'rgbww']);
const NON_TOGGLEABLE_DOMAINS = new Set([
  'binary_sensor', 'sensor', 'camera', 'weather', 'sun', 'zone', 
  'person', 'device_tracker', 'update', 'image', 'calendar', 'event', 'counter'
]);

// ---- Regex Constants (Module-Level for Performance) ----
const RGB_TRIPLET_REGEX = /^\d+\s*,\s*\d+\s*,\s*\d+$/;
const RGBA_QUADRUPLET_REGEX = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;

// ---- Color Utilities ----


function formatRgb(rgb: [number, number, number]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export interface FadeCalculationResult {
  enabled: boolean;
  activeFade: boolean;
  currentColor: string;
  progressPct: number;
  remainingSeconds: number;
  currentStage: number;
  stageLabel: string;
}

const DISABLED_FADE_RESULT: FadeCalculationResult = Object.freeze({
  enabled: false,
  activeFade: false,
  currentColor: '',
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ''
});

// ---- Safe Haptic Dispatcher ----
function safeForwardHaptic(type: any, enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    forwardHaptic(type);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('haptic', { detail: type, bubbles: true, composed: true }));
    }
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
      let pattern: number | number[] = 6;
      if (type === 'heavy') pattern = 20;
      else if (type === 'medium') pattern = 12;
      else if (type === 'success') pattern = [40, 40, 80];
      else if (type === 'warning') pattern = [50, 30, 50];
      else if (type === 'error') pattern = [50, 100, 50];
      navigator.vibrate(pattern);
    }
  } catch {
    // Ignore haptic errors on unsupported web views (e.g. wall tablets, desktop)
  }
}

// ---- Color Parsing Cache (O(1) Lookup, LRU Eviction) ----
const COLOR_CACHE = new Map<string, string>();
const COLOR_CACHE_MAX = 250;

function resolveColorCached(colorStr: string | undefined): string {
  if (!colorStr) return '';
  const cached = COLOR_CACHE.get(colorStr);
  if (cached !== undefined) return cached;

  const trimmed = colorStr.trim();
  if (!trimmed) {
    COLOR_CACHE.set(colorStr, '');
    return '';
  }

  let res = trimmed;
  if (trimmed.startsWith('#') || trimmed.startsWith('rgb') || trimmed.startsWith('hsl') || trimmed.startsWith('var(')) {
    res = trimmed;
  } else if (RGB_TRIPLET_REGEX.test(trimmed)) {
    res = `rgb(${trimmed})`;
  } else if (RGBA_QUADRUPLET_REGEX.test(trimmed)) {
    res = `rgba(${trimmed})`;
  } else if (trimmed.toLowerCase() === 'state') {
    res = 'var(--state-icon-color, var(--primary-color))';
  } else if (HA_NAMED_COLORS.has(trimmed.toLowerCase())) {
    res = `var(--${trimmed.toLowerCase()}-color, ${trimmed.toLowerCase()})`;
  }

  // LRU eviction: delete oldest 25% when limit is reached instead of full wipe
  if (COLOR_CACHE.size >= COLOR_CACHE_MAX) {
    const evictCount = Math.floor(COLOR_CACHE_MAX / 4);
    const iter = COLOR_CACHE.keys();
    for (let i = 0; i < evictCount; i++) {
      const key = iter.next().value;
      if (key !== undefined) COLOR_CACHE.delete(key);
    }
  }
  COLOR_CACHE.set(colorStr, res);
  return res;
}

@customElement('antigravity-with-icon-card')
export class AntigravityWithIconCard extends LitElement {
  private _previousLiveRgb: [number, number, number] | null = null;
  private _currentLiveRgb: [number, number, number] | null = null;
  private _lastTrackedState: string | null = null;

  // --- SECTIONS LAYOUT SUPPORT ---
  public getGridOptions() {
    const isLarge = this.config?.card_layout === 'large';
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: isLarge ? 2 : 1, max: 4 },
    };
  }

  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  public getCardSize(): number {
    return this.config?.card_layout === 'large' ? 3 : 2;
  }

  public static getStubConfig(): Record<string, unknown> {
    return { ...DEFAULT_CARD_CONFIG };
  }

  public static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public preview = false;
  @state() private config!: AntigravityCardConfig;
  @state() private _collapsed = true;

  private _holdTimer: any = null;
  private _held = false;
  private _moved = false;
  private _tapTimer: any = null;
  private _throttleMap = new Map<string, number>();
  private _startX = 0;
  private _startY = 0;

  // Sub-button mobile hold & double-tap state
  private _subHoldTimer: any = null;
  private _subHeld = false;
  private _subMoved = false;
  private _subStartX = 0;
  private _subStartY = 0;
  private _subTapTimerMap = new Map<string, any>();

  private _monitoredEntities: string[] = [];
  private _powerUnsubscribe: (() => void) | null = null;
  private _gl: WebGLRenderingContext | null = null;

  setConfig(config: AntigravityCardConfig) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this.config = {
      ...DEFAULT_CARD_CONFIG,
      ...config
    };
    this._cachedSubButtons = null;

    // Pre-calculate monitored entities for zero-allocation shouldUpdate checks
    const entitySet = new Set<string>();
    if (this.config.entity) entitySet.add(this.config.entity);
    if (this.config.sub_button_1_entity) entitySet.add(this.config.sub_button_1_entity);
    if (this.config.sub_button_2_entity) entitySet.add(this.config.sub_button_2_entity);
    if (this.config.sub_button_3_entity) entitySet.add(this.config.sub_button_3_entity);
    if (this.config.sub_button_4_entity) entitySet.add(this.config.sub_button_4_entity);
    if ((this.config.tap_action as any)?.target?.entity_id) {
      const t = (this.config.tap_action as any).target.entity_id;
      if (typeof t === 'string') entitySet.add(t);
      else if (Array.isArray(t)) t.forEach(id => entitySet.add(id));
    }
    if ((this.config.hold_action as any)?.target?.entity_id) {
      const t = (this.config.hold_action as any).target.entity_id;
      if (typeof t === 'string') entitySet.add(t);
      else if (Array.isArray(t)) t.forEach(id => entitySet.add(id));
    }
    this._monitoredEntities = Array.from(entitySet);

    this._computeStaticStylesAndClasses();
  }

  public override shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config || !this.hass) return true;
    if (changedProps.has('config') || changedProps.has('preview') || changedProps.has('_collapsed')) return true;

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;

    // Check global theme, language, and locale changes
    if (
      oldHass.themes !== this.hass.themes || 
      oldHass.locale !== this.hass.locale || 
      oldHass.language !== this.hass.language ||
      oldHass.selectedTheme !== this.hass.selectedTheme
    ) {
      return true;
    }

    // Linear scan on monitored entities without array/heap allocation
    const monitored = this._monitoredEntities;
    const len = monitored.length;
    for (let i = 0; i < len; i++) {
      const ent = monitored[i];
      if (oldHass.states[ent] !== this.hass.states[ent]) {
        return true;
      }
    }
    return false;
  }

  private _staticCardStyles = '';
  private _staticCardClasses = '';
  private _textOffsetStyle = '';
  private _iconOffsetStyle = '';
  private _featuresOffsetStyle = '';
  private _mainSliderMarginOffsets = '';
  private _colorTempMarginOffsets = '';
  private _colorHueMarginOffsets = '';
  private _textBoxWidth = '';
  private _primaryTextStyle = '';
  private _secondaryTextStyle = '';
  private _primaryTextOffsetStyle = '';
  private _secondaryTextOffsetStyle = '';
  private _iconShapeClass = '';
  private _iconAnimClass = '';
  private _iconContainerSize = 36;
  private _iconSize = 24;
  private _iconOpacityStyle = '';
  private _iconRotateStyle = '';
  private _fadeStaticConfig: any = null;

  private _computeStaticStylesAndClasses() {
    if (!this.config) return;

    const cardPaddingVert = this.config.card_padding_vertical ?? this.config.card_padding ?? 0;
    const cardPaddingHoriz = this.config.card_padding_horizontal ?? this.config.card_padding ?? 15;

    const pTop = this.config.card_padding_top ?? cardPaddingVert;
    const pBottom = this.config.card_padding_bottom ?? cardPaddingVert;
    const pLeft = this.config.card_padding_left ?? cardPaddingHoriz;
    const pRight = this.config.card_padding_right ?? cardPaddingHoriz;

    const baseMargin = this.config.card_margin ?? -1;
    const marginVert = this.config.card_margin_vertical ?? baseMargin;
    const marginHoriz = this.config.card_margin_horizontal ?? baseMargin;
    const mTop = this.config.card_margin_top ?? marginVert;
    const mBottom = this.config.card_margin_bottom ?? marginVert;
    const mLeft = this.config.card_margin_left ?? marginHoriz;
    const mRight = this.config.card_margin_right ?? marginHoriz;

    let cardMarginStyle = '';
    if (mTop !== undefined || mBottom !== undefined || mLeft !== undefined || mRight !== undefined) {
      cardMarginStyle = `margin: ${mTop ?? 0}px ${mRight ?? 0}px ${mBottom ?? 0}px ${mLeft ?? 0}px;`;
    }
    const borderRadius = this.config.border_radius ?? 12;

    const isGoogleSlider = this.config.slider_style === 'google';
    const isFullSlider = this.config.slider_style === 'full';
    const defaultSliderHeight = isGoogleSlider ? 42 : isFullSlider ? 40 : 12;
    const sliderHeight = this.config.slider_height !== undefined ? this.config.slider_height : defaultSliderHeight;
    const defaultSliderRadius = isGoogleSlider ? 21 : isFullSlider ? 0 : (sliderHeight / 2);
    const sliderRadius = this.config.slider_border_radius !== undefined ? this.config.slider_border_radius : defaultSliderRadius;

    const borderWidth = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0);
    const borderStyle = this.config.card_border_style ?? 'solid';
    const borderProp = borderWidth > 0 ? `border: ${borderWidth}px ${borderStyle} ${this._resolveColor(this.config.card_border_color) || 'var(--divider-color, rgba(150, 150, 150, 0.2))'};` : '';

    const widthStyle = this.config.card_width ? `width: ${this.config.card_width};` : '';
    const maxWidthStyle = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : '';
    const heightStyle = this.config.card_height ? `height: ${this.config.card_height};` : '';
    const minHeightStyle = this.config.card_min_height !== undefined ? `min-height: ${this.config.card_min_height}px;` : '';
    const fillStyle = this.config.fill_container === true ? 'height: 100%; width: 100%;' : '';
    const overflowStyle = this.config.overflow_hidden !== false ? 'overflow: hidden;' : 'overflow: visible;';
    const blurStyle = this.config.backdrop_blur !== undefined ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : '';
    const cardOpacityStyle = this.config.card_opacity !== undefined ? `opacity: ${this.config.card_opacity / 100};` : '';
    const transitionStyle = this.config.transition_duration !== undefined ? `transition: all ${this.config.transition_duration}ms ease;` : '';

    const iconPaddingVar = this.config.icon_padding !== undefined ? `--ag-icon-padding: ${this.config.icon_padding}px;` : '';
    const textPaddingVert = this.config.text_padding_vertical ?? this.config.text_padding ?? 0;
    const textPaddingHoriz = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0;
    const featuresPaddingVert = this.config.features_padding_vertical ?? this.config.features_padding ?? 0;
    const featuresPaddingHoriz = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0;
    const subBtnPadding = this.config.sub_button_padding ?? 6;
    const subBtnContainerPadding = this.config.sub_button_container_padding ?? 0;

    const subBtnAlign = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : '--ag-sub-button-alignment: flex-end;';
    const scrollSpeedVar = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : '';
    const fullSliderOpacity = this.config.full_slider_opacity !== undefined ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : '';

    this._staticCardStyles = [
      cardMarginStyle,
      `border-radius: ${borderRadius}px;`,
      borderProp,
      widthStyle,
      maxWidthStyle,
      heightStyle,
      minHeightStyle,
      fillStyle,
      overflowStyle,
      blurStyle,
      cardOpacityStyle,
      transitionStyle,
      iconPaddingVar,
      `--ag-card-padding: ${pTop}px ${pRight}px ${pBottom}px ${pLeft}px;`,
      `--ag-text-padding: ${textPaddingVert}px ${textPaddingHoriz}px;`,
      `--ag-features-padding: ${featuresPaddingVert}px ${featuresPaddingHoriz}px;`,
      `--ag-sub-button-padding: ${subBtnPadding}px;`,
      `--ag-sub-button-container-padding: ${subBtnContainerPadding}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-icon-margin: ${this.config.icon_margin ?? 0}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${sliderHeight}px;`,
      `--ag-slider-radius: ${sliderRadius}px;`,
      `--ag-badge-size: ${this.config.badge_size ?? 16}px;`,
      `--ag-badge-offset: ${this.config.badge_offset ?? -2}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? 'left'};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? 'flex-start'};`,
      subBtnAlign,
      scrollSpeedVar,
      fullSliderOpacity
    ].filter(Boolean).join(' ');

    this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === 'large' ? 'card-large' : '',
      `theme-${this.config.theme_preset ?? 'default'}`,
      `hover-${this.config.hover_effect ?? 'glow'}`,
      `slider-style-${this.config.slider_style ?? 'circle'}`,
      this.config.text_color_mode === 'inverse' ? 'text-color-mode-inverse' : ''
    ].filter(Boolean).join(' ');

    const textOffsetX = this.config.text_offset_x !== undefined ? Number(this.config.text_offset_x) : -28;
    const textOffsetY = this.config.text_offset_y !== undefined ? Number(this.config.text_offset_y) : 2;
    this._textOffsetStyle = textOffsetX !== 0 || textOffsetY !== 0 ? `transform: translate(${textOffsetX}px, ${textOffsetY}px);` : '';

    const pStartX = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x ?? 8);
    const pEndX = Number(this.config.primary_text_end_offset ?? 250);
    const pOffsetY = Number(this.config.primary_text_offset_y) || 0;
    const pTrans = (pStartX !== 0 || pOffsetY !== 0) ? `transform: translate(${pStartX}px, ${pOffsetY}px);` : '';
    const pMargin = (pStartX !== 0 || pEndX !== 0) ? `margin-left: ${pStartX}px; margin-right: ${pEndX}px;` : '';
    this._primaryTextOffsetStyle = `${pTrans} ${pMargin}`.trim();

    const sStartX = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x ?? 8);
    const sEndX = Number(this.config.secondary_text_end_offset ?? 250);
    const sOffsetY = Number(this.config.secondary_text_offset_y) || 0;
    const sTrans = (sStartX !== 0 || sOffsetY !== 0) ? `transform: translate(${sStartX}px, ${sOffsetY}px);` : '';
    const sMargin = (sStartX !== 0 || sEndX !== 0) ? `margin-left: ${sStartX}px; margin-right: ${sEndX}px;` : '';
    this._secondaryTextOffsetStyle = `${sTrans} ${sMargin}`.trim();

    const iconOffsetX = Number(this.config.icon_offset_x) || 0;
    const iconOffsetY = Number(this.config.icon_offset_y) || 0;
    this._iconOffsetStyle = iconOffsetX !== 0 || iconOffsetY !== 0 ? `transform: translate(${iconOffsetX}px, ${iconOffsetY}px);` : '';

    const featuresOffsetX = Number(this.config.features_offset_x) || 0;
    const featuresOffsetY = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = featuresOffsetX !== 0 || featuresOffsetY !== 0 ? `transform: translate(${featuresOffsetX}px, ${featuresOffsetY}px);` : '';

    const mainStartOffset = Number(this.config.slider_start_offset) || 0;
    const mainEndOffset = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      mainStartOffset ? `margin-left: ${mainStartOffset}px !important;` : '',
      mainEndOffset ? `margin-right: ${mainEndOffset}px !important;` : ''
    ].filter(Boolean).join(' ');

    const ctStartOffset = Number(this.config.color_temp_start_offset) || 0;
    const ctEndOffset = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      ctStartOffset ? `margin-left: ${ctStartOffset}px !important;` : '',
      ctEndOffset ? `margin-right: ${ctEndOffset}px !important;` : ''
    ].filter(Boolean).join(' ');

    const csStartOffset = Number(this.config.color_slider_start_offset) || 0;
    const csEndOffset = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      csStartOffset ? `margin-left: ${csStartOffset}px !important;` : '',
      csEndOffset ? `margin-right: ${csEndOffset}px !important;` : ''
    ].filter(Boolean).join(' ');

    this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : 'width: 100%; max-width: 100%;';

    const txtTransformPrimary = `text-transform: ${this.config.text_transform_primary ?? 'capitalize'};`;
    const txtTransformSecondary = `text-transform: ${this.config.text_transform_secondary ?? 'capitalize'};`;
    const letterSpacingStyle = `letter-spacing: ${this.config.letter_spacing ?? -0.5}px;`;
    const lineHeightStyle = `line-height: ${this.config.line_height ?? 1.1};`;
    const primaryWeight = this.config.font_weight_primary ?? '800';

    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${primaryWeight}; ${txtTransformPrimary} ${letterSpacingStyle} ${lineHeightStyle}`;
    this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${txtTransformSecondary} ${letterSpacingStyle} ${lineHeightStyle}`;

    this._iconShapeClass = `icon-shape-${this.config.icon_shape || 'circle'}`;
    this._iconAnimClass = `anim-${this.config.icon_animation || 'none'}`;
    this._iconContainerSize = this.config.icon_container_size ?? (this.config.card_layout === 'large' ? 48 : 36);
    this._iconSize = this.config.icon_size ?? 24;
    this._iconOpacityStyle = (this.config.icon_opacity !== undefined && this.config.icon_opacity < 100) ? `opacity: ${this.config.icon_opacity / 100};` : '';
    this._iconRotateStyle = (this.config.icon_rotate && this.config.icon_rotate !== 0) ? `transform: rotate(${this.config.icon_rotate}deg);` : '';

    // Pre-calculate sub-buttons array once
    const entityId = this.config.entity;
    const buttons: any[] = [];
    for (let i = 1; i <= 4; i++) {
      const e = (this.config as any)[`sub_button_${i}_entity`];
      const icon = (this.config as any)[`sub_button_${i}_icon`];
      const name = (this.config as any)[`sub_button_${i}_name`];
      const tap = (this.config as any)[`sub_button_${i}_tap_action`];
      const hold = (this.config as any)[`sub_button_${i}_hold_action`];
      const dbl = (this.config as any)[`sub_button_${i}_double_tap_action`];
      const type = (this.config as any)[`sub_button_${i}_type`];
      const color = (this.config as any)[`sub_button_${i}_color`];
      const bg = (this.config as any)[`sub_button_${i}_show_background`];
      const showState = (this.config as any)[`sub_button_${i}_show_state`];
      
      const isConfigured = !!(e || icon || name || (type && type !== 'button') || showState);
      if (isConfigured) {
        const resolvedEntity = e || entityId;
        buttons.push(Object.freeze({
          key: `${resolvedEntity || 'sub'}_${i}`,
          entity: resolvedEntity,
          type: type || 'button',
          icon,
          color,
          bg,
          name,
          showState: showState === true,
          tapAction: tap,
          holdAction: hold,
          doubleTapAction: dbl
        }));
      }
    }
    this._cachedSubButtons = Object.freeze(buttons) as any[];

    // Pre-calculate Multi-Stage Fade static settings
    if (this.config.fade_transition_enabled) {
      const d1 = Number(this.config.fade_stage_1_duration) || 60;
      const d2 = Number(this.config.fade_stage_2_duration) || 600;
      const d3 = Number(this.config.fade_stage_3_duration) || 1800;
      const c1Rgb = parseColorToRgb(this.config.fade_stage_1_color) || [255, 152, 0];
      const c2Rgb = parseColorToRgb(this.config.fade_stage_2_color) || [205, 220, 57];
      const c3Rgb = parseColorToRgb(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1,
        d2,
        d3,
        totalDuration: d1 + d2 + d3,
        c1Rgb,
        c2Rgb,
        c3Rgb,
        restingResult: Object.freeze({
          enabled: true,
          activeFade: false,
          currentColor: c3Rgb ? formatRgb(c3Rgb) : '',
          progressPct: 100,
          remainingSeconds: 0,
          currentStage: 0,
          stageLabel: 'Resting'
        })
      };
    } else {
      this._fadeStaticConfig = null;
    }
  }

  private _relativeTimer: any = null;
  private _cachedSubButtons: any[] | null = null;
  private _intersectionObserver: IntersectionObserver | null = null;
  private _cachedHasCollapsible = false;

  private _getSubButtons(): any[] {
    return this._cachedSubButtons || [];
  }

  private _hasCollapsible(): boolean {
    return this._cachedHasCollapsible;
  }

  private _recomputeHasCollapsible(): void {
    if (!this.hass || !this.config || !this.config.entity) { this._cachedHasCollapsible = false; return; }
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) { this._cachedHasCollapsible = false; return; }

    const domain = this.config.entity.split('.')[0];
    const isLight = domain === 'light';
    const isActive = stateObj.state === 'on';

    const hideColorTempWhenOff = this.config.hide_color_temp_when_off !== false;
    const hideColorPickerWhenOff = this.config.hide_color_picker_when_off !== false;
    const hideColorSliderWhenOff = this.config.hide_color_slider_when_off !== false;

    const colorTempAttr = stateObj.attributes?.color_temp_kelvin ?? stateObj.attributes?.color_temp;
    const showColorTemp = isLight && this.config.show_color_temp === true && (colorTempAttr !== undefined || stateObj.attributes?.supported_color_modes?.some((m: string) => ['color_temp'].includes(m))) && (!hideColorTempWhenOff || isActive);

    const supportedModes = stateObj.attributes?.supported_color_modes;
    const supportsColor = Array.isArray(supportedModes) && supportedModes.some((m: string) => ['hs', 'xy', 'rgb', 'rgbw', 'rgbww'].includes(m));
    const isSliderColorPicker = this.config.color_picker_type !== 'wheel';
    const showColorSlider = isLight && (this.config.show_color_slider === true || (this.config.show_color_picker === true && isSliderColorPicker)) && supportsColor && (!hideColorSliderWhenOff || isActive);
    const showColorWheel = isLight && this.config.show_color_picker === true && !isSliderColorPicker && supportsColor && (!hideColorPickerWhenOff || isActive);

    const hasSecondarySliders = showColorTemp || showColorSlider || showColorWheel;
    const subButtons = this._getSubButtons();

    this._cachedHasCollapsible = hasSecondarySliders || subButtons.length > 0;
  }

  connectedCallback() {
    super.connectedCallback();
    memoryTracker.registerCard(this);
    this._mountTime = Date.now();
    this._pointerDownReceived = false;
    
    // Subscribe to battery / power-save changes
    this._powerUnsubscribe = powerHelper.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    });
    this._updatePowerSaveAttribute();

    this._setupRelativeTimer();
    this._setupIntersectionObserver();
  }

  private _updatePowerSaveAttribute() {
    const isPowerSave = powerHelper.isPowerSaveActive(this.hass);
    if (isPowerSave) {
      this.setAttribute('power-save', '');
    } else {
      this.removeAttribute('power-save');
    }
  }

  private _setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined' || this._intersectionObserver) return;
    this._intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this.setAttribute('offscreen', '');
        } else {
          this.removeAttribute('offscreen');
        }
      }
    }, { rootMargin: '200px 0px', threshold: 0 });
    this._intersectionObserver.observe(this);
  }

  private _setupRelativeTimer() {
    const p = this.config?.primary_info;
    const s = this.config?.secondary_info;
    const entity = this.config?.entity;
    const domain = entity ? entity.split('.')[0] : '';
    const isStateDynamic = (domain === 'binary_sensor' || domain === 'timer') && (p === 'state' || s === 'state');
    const hasFade = this.config?.fade_transition_enabled === true;
    const stateObj = entity && this.hass ? this.hass.states[entity] : null;
    
    // Check if fade is actively in progress (not expired)
    let isFading = false;
    if (hasFade && stateObj) {
      const multiStage = this._calculateMultiStageFade(stateObj);
      isFading = multiStage.enabled && multiStage.activeFade && multiStage.progressPct < 100;
    }

    const needsTimer = (
      isFading ||
      isStateDynamic ||
      p === 'last-changed' || p === 'last_changed' || p === 'last-updated' || p === 'last_updated' ||
      p === 'last-triggered' ||
      s === 'last-changed' || s === 'last_changed' || s === 'last-updated' || s === 'last_updated' ||
      s === 'last-triggered'
    );
    if (needsTimer && !this._relativeTimer) {
      let intervalMs = isFading ? 1000 : 5000;
      const ts = stateObj?.attributes?.last_triggered || stateObj?.last_changed || stateObj?.last_updated;
      if (ts && !isFading && !isStateDynamic) {
        const d = this._parseDate(ts);
        if (d) {
          const ageSec = Math.max(0, ((Date.now() - d.getTime()) / 1000) | 0);
          if (ageSec > 3600) {
            intervalMs = 60000; // Over 1 hour old: tick once per minute
          } else if (ageSec > 60) {
            intervalMs = 15000; // Over 1 min old: tick every 15s
          }
        }
      }
      if (powerHelper.isPowerSaveActive(this.hass)) {
        intervalMs = Math.max(intervalMs, 10000); // Low-power battery optimization
      }
      this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute('offscreen') && this.style.display !== 'none') {
          // If fade completed, teardown timer to save battery
          if (isFading && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, intervalMs);
    } else if (!needsTimer && this._relativeTimer) {
      clearInterval(this._relativeTimer);
      this._relativeTimer = null;
    }
  }

  private _isFadeActive(): boolean {
    const entity = this.config?.entity;
    if (!entity || !this.hass) return false;
    const stateObj = this.hass.states[entity];
    if (!stateObj) return false;
    const multiStage = this._calculateMultiStageFade(stateObj);
    return multiStage.enabled && multiStage.activeFade && multiStage.progressPct < 100;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    memoryTracker.unregisterCard(this);
    if (this._powerUnsubscribe) {
      this._powerUnsubscribe();
      this._powerUnsubscribe = null;
    }
    if (this._gl) {
      cleanupWebGL(this._gl);
      this._gl = null;
    }
    this._throttleMap.clear();
    this._subTapTimerMap.forEach(t => clearTimeout(t));
    this._subTapTimerMap.clear();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }
    if (this._relativeTimer) {
      clearInterval(this._relativeTimer);
      this._relativeTimer = null;
    }
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    // Visibility handled by updated() — no redundant call needed here
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this._updateVisibility();
    // Only recompute collapsible state when config or entity state actually changed
    if (changedProperties.has('config') || changedProperties.has('_collapsed')) {
      this._recomputeHasCollapsible();
      this._setupRelativeTimer();
    } else if (changedProperties.has('hass') && this.config?.entity) {
      const oldHass = changedProperties.get('hass') as HomeAssistant | undefined;
      if (!oldHass || oldHass.states[this.config.entity] !== this.hass.states[this.config.entity]) {
        this._recomputeHasCollapsible();
        this._setupRelativeTimer();
      }
    }
  }

  private _toggleDisplay(shouldHide: boolean) {
    if (this.preview) {
      if (this.style.display === 'none') {
        this.style.removeProperty('display');
      }
      this.hidden = false;
      return;
    }

    if (shouldHide) {
      this.style.setProperty('display', 'none', 'important');
      this.hidden = true;
    } else {
      if (this.style.display === 'none') {
        this.style.removeProperty('display');
      }
      this.hidden = false;
    }
  }

  private _updateVisibility() {
    if (!this.config || !this.hass) return;
    const visState = this.config.visibility_state;
    if (!visState || visState === 'always') {
      this._toggleDisplay(false);
      return;
    }

    const entityId = this.config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    if (!stateObj) {
      this._toggleDisplay(false);
      return;
    }

    const isStateOn = stateObj.state === 'on' || this._isEntityActive(stateObj);
    let shouldHide = false;
    if (visState === 'on' && !isStateOn) {
      shouldHide = true;
    } else if (visState === 'off' && isStateOn) {
      shouldHide = true;
    }

    this._toggleDisplay(shouldHide);
  }

  private _isEntityActive(stateObj: any): boolean {
    if (!stateObj) return false;
    return ACTIVE_STATES.has(stateObj.state);
  }

  private _calculateMultiStageFade(
    stateObj: any,
    defaultActiveStr: string = '',
    defaultInactiveStr: string = ''
  ): FadeCalculationResult {
    if (!this.config?.fade_transition_enabled || !stateObj) {
      return DISABLED_FADE_RESULT;
    }

    const isActive = this._isEntityActive(stateObj);
    const trigger = this.config.fade_trigger ?? 'on_inactive';

    // Check if current state triggers fading
    const shouldFade = (trigger === 'on_inactive' && !isActive) ||
                       (trigger === 'on_active' && isActive) ||
                       (trigger === 'both');

    if (!shouldFade) {
      return DISABLED_FADE_RESULT;
    }

    // Determine base colors
    const startColorStr = isActive 
      ? (this._resolveColor(this.config.inactive_color) || defaultInactiveStr || '#4caf50')
      : (this._resolveColor(this.config.active_color) || defaultActiveStr || '#d60000');
    
    const finalColorStr = isActive
      ? (this._resolveColor(this.config.active_color) || defaultActiveStr || '#d60000')
      : (this._resolveColor(this.config.inactive_color) || defaultInactiveStr || '#03b100');

    const startRgb = parseColorToRgb(startColorStr) || [214, 0, 0];
    const finalRgb = parseColorToRgb(finalColorStr) || [3, 177, 0];

    const cfg = this._fadeStaticConfig;
    const d1 = cfg?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60);
    const d2 = cfg?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600);
    const d3 = cfg?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800);
    const totalDuration = cfg?.totalDuration ?? (d1 + d2 + d3);
    if (totalDuration <= 0) {
      return DISABLED_FADE_RESULT;
    }

    // Check if state changed to capture live color continuity
    if (this._lastTrackedState !== null && this._lastTrackedState !== stateObj.state) {
      if (this._currentLiveRgb && this.config.fade_smooth_retrigger !== false) {
        this._previousLiveRgb = this._currentLiveRgb;
      }
    }
    this._lastTrackedState = stateObj.state;

    // Base start color (Stage 1)
    const stage1StartRgb = (this.config.fade_stage_1_pickup !== false && this._previousLiveRgb && this.config.fade_smooth_retrigger !== false)
      ? this._previousLiveRgb
      : startRgb;

    // Stage targets & continuous pickups
    const c1Rgb = cfg?.c1Rgb ?? (parseColorToRgb(this.config.fade_stage_1_color) || [255, 152, 0]);
    const stage2StartRgb = (this.config.fade_stage_2_pickup !== false) ? c1Rgb : startRgb;

    const c2Rgb = cfg?.c2Rgb ?? (parseColorToRgb(this.config.fade_stage_2_color) || [205, 220, 57]);
    const stage3StartRgb = (this.config.fade_stage_3_pickup !== false) ? c2Rgb : c1Rgb;

    const c3Rgb = cfg?.c3Rgb ?? (parseColorToRgb(this.config.fade_stage_3_color) || finalRgb);

    const lastChangedDate = this._parseDate(stateObj.attributes?.last_triggered || stateObj.last_changed || stateObj.last_updated);
    if (!lastChangedDate) {
      return DISABLED_FADE_RESULT;
    }

    const elapsed = Math.max(0, (Date.now() - lastChangedDate.getTime()) / 1000);

    if (elapsed >= totalDuration) {
      this._currentLiveRgb = c3Rgb;
      this._previousLiveRgb = null;
      if (cfg?.restingResult) {
        return cfg.restingResult;
      }
      return {
        enabled: true,
        activeFade: false,
        currentColor: formatRgb(c3Rgb),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: 'Resting'
      };
    }

    let interpolatedRgb: [number, number, number];
    let currentStage = 1;
    let stageProgress = 0;
    const remainingSeconds = Math.max(0, Math.round(totalDuration - elapsed));

    if (elapsed < d1 && d1 > 0) {
      currentStage = 1;
      stageProgress = elapsed / d1;
      interpolatedRgb = lerpRgb(stage1StartRgb, c1Rgb, stageProgress);
    } else if (elapsed < (d1 + d2) && d2 > 0) {
      currentStage = 2;
      stageProgress = (elapsed - d1) / d2;
      interpolatedRgb = lerpRgb(stage2StartRgb, c2Rgb, stageProgress);
    } else if (d3 > 0) {
      currentStage = 3;
      stageProgress = (elapsed - d1 - d2) / d3;
      interpolatedRgb = lerpRgb(stage3StartRgb, c3Rgb, stageProgress);
    } else {
      currentStage = 0;
      interpolatedRgb = c3Rgb;
    }

    this._currentLiveRgb = interpolatedRgb;

    const totalProgressPct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
    const currentColor = formatRgb(interpolatedRgb);

    let stageLabel = '';
    if (remainingSeconds >= 60) {
      const mins = Math.ceil(remainingSeconds / 60);
      stageLabel = `${mins}m left`;
    } else {
      stageLabel = `${remainingSeconds}s left`;
    }

    return {
      enabled: true,
      activeFade: true,
      currentColor,
      progressPct: totalProgressPct,
      remainingSeconds,
      currentStage,
      stageLabel
    };
  }

  private _resolveColor(colorStr: string | undefined): string {
    return resolveColorCached(colorStr);
  }

  private _parseDate(dateInput: string | Date | number | undefined): Date | null {
    return InfoFormatter.parseDate(dateInput);
  }

  private _computeDynamicIcon(stateObj: any): string | undefined {
    if (!stateObj) return undefined;
    const domain = (stateObj.entity_id || '').split('.')[0];
    const devClass = stateObj.attributes?.device_class;
    const isOn = stateObj.state === 'on';

    if (domain === 'lock') {
      if (stateObj.state === 'locked') return 'mdi:lock';
      if (stateObj.state === 'jammed') return 'mdi:lock-alert';
      if (stateObj.state === 'locking' || stateObj.state === 'unlocking') return 'mdi:lock-clock';
      return 'mdi:lock-open-variant';
    }
    if (domain === 'binary_sensor') {
      if (devClass === 'door') return isOn ? 'mdi:door-open' : 'mdi:door-closed';
      if (devClass === 'window') return isOn ? 'mdi:window-open-variant' : 'mdi:window-closed-variant';
      if (devClass === 'garage_door') return isOn ? 'mdi:garage-open' : 'mdi:garage';
      if (devClass === 'motion') return isOn ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
      if (devClass === 'occupancy') return isOn ? 'mdi:home-account' : 'mdi:home-outline';
      if (devClass === 'presence') return isOn ? 'mdi:account' : 'mdi:account-outline';
      if (devClass === 'opening') return isOn ? 'mdi:lock-open' : 'mdi:lock';
    }
    if (domain === 'light') {
      return isOn ? 'mdi:lightbulb' : 'mdi:lightbulb-outline';
    }
    if (domain === 'cover') {
      const isOpen = stateObj.state === 'open' || stateObj.state === 'opening';
      if (devClass === 'garage') return isOpen ? 'mdi:garage-open' : 'mdi:garage';
      if (devClass === 'blind' || devClass === 'shutter') return isOpen ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
      if (devClass === 'curtain') return isOpen ? 'mdi:curtains-open' : 'mdi:curtains';
      return isOpen ? 'mdi:window-open' : 'mdi:window-closed';
    }
    if (domain === 'fan') {
      return isOn ? 'mdi:fan' : 'mdi:fan-off';
    }
    if (domain === 'climate') {
      if (stateObj.state === 'heat') return 'mdi:fire';
      if (stateObj.state === 'cool') return 'mdi:snowflake';
      if (stateObj.state === 'dry') return 'mdi:water-percent';
      if (stateObj.state === 'fan_only') return 'mdi:fan';
      if (stateObj.state === 'auto' || stateObj.state === 'heat_cool') return 'mdi:thermostat-auto';
      return 'mdi:thermostat';
    }
    if (domain === 'media_player') {
      if (stateObj.state === 'playing') return 'mdi:play-circle';
      if (stateObj.state === 'paused') return 'mdi:pause-circle';
      return 'mdi:cast';
    }
    return undefined;
  }

  private _getInfoContent(type: string | undefined, stateObj: any): string | TemplateResult {
    return InfoFormatter.getInfoContent(type, stateObj, this.config, this.hass);
  }

  // --- NATIVE ACTION ROUTING & TOUCH GESTURE HANDLING ---

  private _mountTime = 0;
  private _pointerDownReceived = false;
  private _pointerDownTime = 0;
  private _canceled = false;

  private _dispatchAction(actionType: 'tap' | 'hold' | 'double_tap', actionConfigOverride?: any, entityOverride?: string) {
    const entity = entityOverride || this.config.entity;
    const domain = entity ? entity.split('.')[0] : '';
    const isNonToggleable = NON_TOGGLEABLE_DOMAINS.has(domain);

    let actionConfig = actionConfigOverride;
    if (!actionConfig) {
      if (actionType === 'double_tap') actionConfig = this.config.double_tap_action;
      else if (actionType === 'hold') {
        actionConfig = this.config.hold_action || (isNonToggleable ? { action: 'more-info' } : { action: 'toggle' });
      }
      else {
        if (this.config.tap_action && this.config.tap_action.action && (this.config.tap_action.action as string) !== 'default') {
          // If explicit tap_action is toggle on a non-toggleable domain, safely treat as none
          if (isNonToggleable && this.config.tap_action.action === 'toggle') {
            actionConfig = { action: 'none' };
          } else {
            actionConfig = this.config.tap_action;
          }
        } else {
          // Default tap on read-only status sensors (motion, doors) is 'none' to prevent unwanted dialog popups!
          actionConfig = isNonToggleable ? { action: 'none' } : { action: 'toggle' };
        }
      }
    }

    if (!actionConfig || actionConfig.action === 'none') return;

    if (actionConfig.action === 'more-info') {
      const targetEntity = actionConfig.entity || entity;
      if (targetEntity) {
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: targetEntity },
          bubbles: true,
          composed: true,
        }));
        return;
      }
    }

    if (actionConfig.action === 'toggle' && entity) {
      if (isNonToggleable) {
        return;
      }
      const service = domain === 'lock' ? (this._isEntityActive(this.hass?.states[entity]) ? 'lock' : 'unlock')
                    : 'toggle';
      const sDomain = ['lock', 'cover'].includes(domain) ? domain : (domain === 'group' ? 'homeassistant' : domain);
      this.hass?.callService(sDomain, service, { entity_id: entity });
      return;
    }

    if (actionConfig.action === 'navigate' && actionConfig.navigation_path) {
      history.pushState(null, '', actionConfig.navigation_path);
      window.dispatchEvent(new CustomEvent('location-changed', {
        detail: { replace: false },
        bubbles: true,
        composed: true,
      }));
      return;
    }

    if (actionConfig.action === 'url' && actionConfig.url_path) {
      window.open(actionConfig.url_path, '_blank');
      return;
    }

    if (actionConfig.action === 'call-service' && actionConfig.service) {
      const [sDomain, sName] = actionConfig.service.split('.', 2);
      this.hass?.callService(sDomain, sName, actionConfig.data || actionConfig.service_data || {}, actionConfig.target);
      return;
    }

    // Fallback to custom-card-helpers (with non-toggleable guard)
    if (isNonToggleable && (!actionConfig.action || actionConfig.action === 'toggle')) {
      return;
    }

    handleAction(this, this.hass, { ...this.config, entity }, actionType);
  }

  private _handleTap(e: Event) {
    e.stopPropagation();
    if (this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - LAST_APP_RESUME_TIME < 800) {
      // Ignore startup / app resume ghost clicks from Android swipe-up gestures
      this._pointerDownReceived = false;
      return;
    }
    if (!this._pointerDownReceived) {
      return;
    }
    this._pointerDownReceived = false;
    if (this._moved || this._canceled) {
      this._moved = false;
      this._canceled = false;
      return;
    }
    if (this._held) {
      this._held = false;
      return;
    }
    if (this._pointerDownTime && (Date.now() - this._pointerDownTime > 600)) {
      return;
    }

    const trigger = this.config.collapse_controls_trigger || 'hold';
    const isDoubleTapCollapse = trigger === 'double_tap';

    // Zero-latency tap execution when double_tap_action is not set or 'none' AND not double_tap collapse trigger
    const hasDoubleTap = isDoubleTapCollapse || (this.config.double_tap_action && this.config.double_tap_action.action !== 'none');

    if (!hasDoubleTap) {
      safeForwardHaptic('light', this.config.haptic_feedback !== false);
      this._dispatchAction('tap');
      return;
    }

    // Double-tap debounce: if a tap timer is already running, this is a double-tap
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
      safeForwardHaptic('medium', this.config.haptic_feedback !== false);

      if (isDoubleTapCollapse && this._hasCollapsible()) {
        this._collapsed = !this._collapsed;
      }
      this._dispatchAction('double_tap');
      return;
    }

    // Start the debounce — wait 250ms for a possible second tap
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null;
      safeForwardHaptic('light', this.config.haptic_feedback !== false);
      this._dispatchAction('tap');
    }, 250);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - LAST_APP_RESUME_TIME < 800) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      safeForwardHaptic('light', this.config.haptic_feedback !== false);
      this._dispatchAction('tap');
    }
  }

  private _handleContextMenu(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (Date.now() - this._mountTime < 1500 || Date.now() - LAST_APP_RESUME_TIME < 800 || this._held) return;
    safeForwardHaptic('medium', this.config.haptic_feedback !== false);
    const trigger = this.config.collapse_controls_trigger || 'hold';
    if (trigger === 'hold' && this._hasCollapsible()) {
      this._collapsed = !this._collapsed;
    } else if (this.config.hold_action && this.config.hold_action.action !== 'none') {
      this._dispatchAction('hold');
    }
  }

  private _activePointerId: number | null = null;

  private _handlePointerDown(e: PointerEvent) {
    if (this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - LAST_APP_RESUME_TIME < 800) {
      return;
    }
    if (this._activePointerId !== null && this._activePointerId !== e.pointerId) {
      return; // Ignore secondary simultaneous multi-touch touches on the same card
    }
    this._activePointerId = e.pointerId;
    this._pointerDownReceived = true;
    this._pointerDownTime = Date.now();
    this._held = false;
    this._moved = false;
    this._canceled = false;
    this._startX = e.clientX;
    this._startY = e.clientY;
    this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = true;
      this._holdTimer = null;
      if (this._tapTimer) {
        clearTimeout(this._tapTimer);
        this._tapTimer = null;
      }
      safeForwardHaptic('heavy', this.config.haptic_feedback !== false);
      const trigger = this.config.collapse_controls_trigger || 'hold';
      if (trigger === 'hold' && this._hasCollapsible()) {
        this._collapsed = !this._collapsed;
      } else if (this.config.hold_action && this.config.hold_action.action !== 'none') {
        this._dispatchAction('hold');
      }
    }, 500);
  }

  @eventOptions({ passive: true })
  private _handlePointerMove(e: PointerEvent) {
    if (this._isSubElement(e)) return;
    if (this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const dx = e.clientX - this._startX;
    const dy = e.clientY - this._startY;
    const dist = Math.hypot(dx, dy);
    const dt = Math.max(1, Date.now() - this._pointerDownTime);
    const velocity = dist / dt;
    if (dist > 8 || velocity > 0.5) {
      this._moved = true;
      this._pointerDownReceived = false;
      if (this._holdTimer) {
        clearTimeout(this._holdTimer);
        this._holdTimer = null;
      }
    }
  }

  private _handlePointerUp(e: PointerEvent | Event) {
    if (this._isSubElement(e)) return;
    this._activePointerId = null;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  private _handlePointerCancel(e: PointerEvent | Event) {
    if (this._isSubElement(e)) return;
    this._activePointerId = null;
    this._canceled = true;
    this._moved = true;
    this._pointerDownReceived = false;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  private _isSubElement(e: Event): boolean {
    const target = e.target as HTMLElement;
    if (!target) return false;
    // Fast check: see if the event target itself or a parent is an interactive sub-element
    if (target.tagName === 'INPUT') return true;
    if (target.hasAttribute('data-ag-sub')) return true;
    const closest = target.closest?.('[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker');
    return !!closest;
  }

  // --- SUB BUTTON ROUTING (with mobile touch hold support) ---

  private _subCanceled = false;
  private _subPointerDownTime = 0;

  private _handleSubPointerDown(e: PointerEvent, entityId: string, holdAction?: any) {
    e.stopPropagation();
    this._subHeld = false;
    this._subMoved = false;
    this._subCanceled = false;
    this._subPointerDownTime = Date.now();
    this._subStartX = e.clientX;
    this._subStartY = e.clientY;
    this._subHoldTimer = setTimeout(() => {
      if (this._subMoved || this._subCanceled) return;
      this._subHeld = true;
      this._subHoldTimer = null;
      safeForwardHaptic('heavy', this.config.haptic_feedback !== false);
      this._dispatchAction('hold', holdAction || { action: 'more-info' }, entityId);
    }, 500);
  }

  @eventOptions({ passive: true })
  private _handleSubPointerMove(e: PointerEvent) {
    e.stopPropagation();
    const dx = e.clientX - this._subStartX;
    const dy = e.clientY - this._subStartY;
    const dist = Math.hypot(dx, dy);
    const dt = Math.max(1, Date.now() - this._subPointerDownTime);
    const velocity = dist / dt;
    if (dist > 8 || velocity > 0.5) {
      this._subMoved = true;
      if (this._subHoldTimer) {
        clearTimeout(this._subHoldTimer);
        this._subHoldTimer = null;
      }
    }
  }

  private _handleSubPointerUp(e: Event) {
    e.stopPropagation();
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
  }

  private _handleSubPointerCancel(e: Event) {
    e.stopPropagation();
    this._subCanceled = true;
    this._subMoved = true;
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
  }

  private _handleSubTap(e: Event, entityId: string, tapAction?: any, doubleTapAction?: any, defaultAction?: () => void) {
    e.stopPropagation();
    if (this._subHoldTimer) {
      clearTimeout(this._subHoldTimer);
      this._subHoldTimer = null;
    }
    if (this._subMoved || this._subCanceled) {
      this._subMoved = false;
      this._subCanceled = false;
      return;
    }
    if (this._subHeld) {
      this._subHeld = false;
      return;
    }
    if (this._subPointerDownTime && Date.now() - this._subPointerDownTime > 600) {
      return;
    }

    const hasDoubleTap = doubleTapAction && doubleTapAction.action !== 'none';
    const timerKey = entityId || 'sub_default';

    const executeTap = () => {
      safeForwardHaptic('light', this.config.haptic_feedback !== false);
      if (tapAction && tapAction.action && tapAction.action !== 'none' && tapAction.action !== 'default') {
        this._dispatchAction('tap', tapAction, entityId);
      } else if (defaultAction) {
        defaultAction();
      } else {
        this._dispatchAction('tap', { action: 'toggle' }, entityId);
      }
    };

    if (!hasDoubleTap) {
      executeTap();
      return;
    }

    const existingTimer = this._subTapTimerMap.get(timerKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
      this._subTapTimerMap.delete(timerKey);
      safeForwardHaptic('medium', this.config.haptic_feedback !== false);
      this._dispatchAction('double_tap', doubleTapAction, entityId);
      return;
    }

    const timer = setTimeout(() => {
      this._subTapTimerMap.delete(timerKey);
      executeTap();
    }, 250);

    this._subTapTimerMap.set(timerKey, timer);
  }

  private _handleSubContextMenu(e: Event, entityId: string, holdAction?: any) {
    e.preventDefault();
    e.stopPropagation();
    if (this._subHeld) return;
    safeForwardHaptic('medium', this.config.haptic_feedback !== false);
    this._dispatchAction('hold', holdAction || { action: 'more-info' }, entityId);
  }

  // --- THROTTLED SERVICE CALL HELPER ---

  private _throttledCall(key: string, fn: () => void, delayMs?: number): void {
    const effectiveDelay = delayMs ?? (powerHelper.isPowerSaveActive(this.hass) ? 60 : 30);
    const last = this._throttleMap.get(key) ?? 0;
    const now = Date.now();
    if (now - last < effectiveDelay) return;
    this._throttleMap.set(key, now);
    try {
      fn();
    } finally {
      // Auto-prune throttle entry after cooldown to keep memory clean
      setTimeout(() => {
        if (this._throttleMap.get(key) === now) {
          this._throttleMap.delete(key);
        }
      }, effectiveDelay + 50);
    }
  }

  // --- GENERIC SLIDER GESTURE & SCROLL DISAMBIGUATION ---

  private _sliderStateMap = new WeakMap<HTMLInputElement, {
    startX: number;
    startY: number;
    initialVal: number;
    initialPct: string;
    initialBadge: string;
    isScrolling: boolean;
    isSliding: boolean;
    rafPending?: boolean;
  }>();

  private _onSliderPointerDown = (e: PointerEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input) return;
    const container = input.closest('.slider-container, .sub-button-slider-container');
    const badge = container?.querySelector('.slider-percent-badge, .sub-slider-pct');
    const initialVal = Number(input.value) || 0;
    const initialPct = input.style.getPropertyValue('--slider-pct') || '';
    const initialBadge = badge?.textContent || '';

    this._sliderStateMap.set(input, {
      startX: e.clientX,
      startY: e.clientY,
      initialVal,
      initialPct,
      initialBadge,
      isScrolling: false,
      isSliding: false,
    });
  };

  private _onSliderPointerMove = (e: PointerEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input) return;
    const state = this._sliderStateMap.get(input);
    if (!state) return;

    const dx = Math.abs(e.clientX - state.startX);
    const dy = Math.abs(e.clientY - state.startY);

    if (!state.isSliding && !state.isScrolling) {
      if (dy > 6 && dy > dx) {
        // Vertical scroll gesture detected: lock to scroll and revert slider!
        state.isScrolling = true;
        this._revertSlider(input, state);
      } else if (dx > 6 && dx >= dy) {
        // Intentional horizontal drag: lock to slide
        state.isSliding = true;
      }
    } else if (state.isScrolling) {
      this._revertSlider(input, state);
    }
  };

  private _onSliderPointerCancel = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input) return;
    const state = this._sliderStateMap.get(input);
    if (!state) return;
    state.isScrolling = true;
    this._revertSlider(input, state);
    this._sliderStateMap.delete(input);
  };

  private _onSliderPointerUp = (e: PointerEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input) return;
    const state = this._sliderStateMap.get(input);
    if (!state) return;
    if (state.isScrolling) {
      this._revertSlider(input, state);
      this._sliderStateMap.delete(input);
      return;
    }

    // Tap-to-toggle feature from Slider Button Card: if user tapped slider without dragging
    if (this.config.tap_slider_to_toggle && !state.isSliding) {
      const dx = Math.abs(e.clientX - state.startX);
      const dy = Math.abs(e.clientY - state.startY);
      if (dx < 6 && dy < 6) {
        this._revertSlider(input, state);
        safeForwardHaptic('light', this.config.haptic_feedback !== false);
        this._dispatchAction('tap');
      }
    }
  };

  private _revertSlider(input: HTMLInputElement, state: any) {
    input.value = String(state.initialVal);
    input.style.setProperty('--slider-pct', state.initialPct);
    const container = input.closest('.slider-container, .sub-button-slider-container');
    const badge = container?.querySelector('.slider-percent-badge, .sub-slider-pct');
    if (badge) badge.textContent = state.initialBadge;
  }

  private _sliderInput(
    e: Event, 
    key: string, 
    _domain: string, 
    _service: string, 
    _dataFn: (val: number) => Record<string, any>, 
    pctCalc?: (val: number) => number,
    labelFormatter?: (val: number, pct: number) => string
  ) {
    e.stopPropagation();
    const input = e.target as HTMLInputElement;
    const state = this._sliderStateMap.get(input);
    
    if (state?.isScrolling) {
      this._revertSlider(input, state);
      return;
    }

    const rawVal = Number(input.value);
    const value = isNaN(rawVal) ? 0 : rawVal;
    const pct = pctCalc ? pctCalc(value) : value;
    
    if (state) {
      if (state.rafPending) return;
      state.rafPending = true;
    }

    requestAnimationFrame(() => {
      if (state) state.rafPending = false;
      if (state?.isScrolling) {
        this._revertSlider(input, state);
        return;
      }
      input.style.setProperty('--slider-pct', `${pct}%`);
      const container = input.closest('.slider-container, .sub-button-slider-container') as HTMLElement;
      const badge = container?.querySelector('.slider-percent-badge, .sub-slider-pct');
      if (badge) {
        badge.textContent = labelFormatter ? labelFormatter(value, pct) : `${pct}%`;
      }
      if (key === 'color_hue' && container) {
        container.style.setProperty('--color-hue-val', `hsl(${value}, 100%, 50%)`);
        const chip = container.querySelector('.color-chip-badge span') as HTMLElement;
        if (chip) chip.style.background = `hsl(${value}, 100%, 50%)`;
      }
    });

    safeForwardHaptic('selection', this.config.haptic_feedback !== false);
  }

  private _sliderChange(e: Event, domain: string, service: string, dataFn: (val: number) => Record<string, any>) {
    e.stopPropagation();
    const input = e.target as HTMLInputElement;
    const state = this._sliderStateMap.get(input);

    if (state?.isScrolling) {
      this._revertSlider(input, state);
      state.isScrolling = false;
      return;
    }

    const rawVal = Number(input.value);
    const value = isNaN(rawVal) ? 0 : rawVal;

    if (state && value === state.initialVal) {
      return;
    }

    // Auto-off: if slider reaches minimum, turn off the device
    if (domain === 'light' && service === 'turn_on') {
      const pct = Math.round((value / 255) * 100);
      if (value <= 3 || pct <= 1) {
        this.hass.callService('light', 'turn_off', { entity_id: this.config.entity });
        return;
      }
    }
    if (domain === 'fan' && service === 'set_percentage' && value <= 0) {
      this.hass.callService('fan', 'turn_off', { entity_id: this.config.entity });
      return;
    }

    this.hass.callService(domain, service, { entity_id: this.config.entity, ...dataFn(value) });
  }

  private _getLightLiveColor(stateObj: any): string | null {
    if (!stateObj || !stateObj.attributes || stateObj.state !== 'on') return null;
    const attr = stateObj.attributes;
    const colorMode = attr.color_mode;

    // 1. If explicit color_temp mode, use color temperature
    if (colorMode === 'color_temp') {
      const kelvin = attr.color_temp_kelvin ?? (attr.color_temp ? Math.round(1000000 / attr.color_temp) : 3000);
      const [r, g, b] = kelvinToRgb(kelvin);
      return `rgb(${r}, ${g}, ${b})`;
    }

    // 2. If RGB / HS / XY / RGBW / RGBWW or rgb_color is present, prioritize RGB color!
    if (Array.isArray(attr.rgb_color) && attr.rgb_color.length >= 3) {
      return `rgb(${attr.rgb_color[0]}, ${attr.rgb_color[1]}, ${attr.rgb_color[2]})`;
    }

    if (Array.isArray(attr.hs_color) && attr.hs_color.length >= 2) {
      const [r, g, b] = hsToRgb(attr.hs_color[0], attr.hs_color[1]);
      return `rgb(${r}, ${g}, ${b})`;
    }

    if (Array.isArray(attr.rgbw_color) && attr.rgbw_color.length >= 3) {
      return `rgb(${attr.rgbw_color[0]}, ${attr.rgbw_color[1]}, ${attr.rgbw_color[2]})`;
    }

    if (Array.isArray(attr.rgbww_color) && attr.rgbww_color.length >= 3) {
      return `rgb(${attr.rgbww_color[0]}, ${attr.rgbww_color[1]}, ${attr.rgbww_color[2]})`;
    }

    // 3. Fallback color temp if defined and no RGB was present
    if (attr.color_temp_kelvin !== undefined || attr.color_temp !== undefined) {
      const kelvin = attr.color_temp_kelvin ?? Math.round(1000000 / attr.color_temp);
      const [r, g, b] = kelvinToRgb(kelvin);
      return `rgb(${r}, ${g}, ${b})`;
    }

    // 4. Default warm light glow when turned on
    if (stateObj.state === 'on') {
      return 'var(--state-light-active-color, rgb(255, 205, 120))';
    }

    return null;
  }

  private _getLiveHex(stateObj: any): string {
    if (!stateObj?.attributes || stateObj.state !== 'on') return "#ffffff";
    const attr = stateObj.attributes;
    if (Array.isArray(attr.rgb_color) && attr.rgb_color.length >= 3) {
      return rgbToHex(attr.rgb_color);
    }
    if (Array.isArray(attr.hs_color) && attr.hs_color.length >= 2) {
      return rgbToHex(hsToRgb(attr.hs_color[0], attr.hs_color[1]));
    }
    if (attr.color_temp_kelvin !== undefined || attr.color_temp !== undefined) {
      const kelvin = attr.color_temp_kelvin ?? Math.round(1000000 / attr.color_temp);
      return rgbToHex(kelvinToRgb(kelvin));
    }
    const liveColor = this._getLightLiveColor(stateObj);
    if (!liveColor) return "#ffffff";
    const rgb = parseColorToRgb(liveColor);
    return rgb ? rgbToHex(rgb) : "#ffffff";
  }

  private _getLiveHue(stateObj: any): number {
    if (!stateObj) return 0;
    if (Array.isArray(stateObj.attributes?.hs_color) && stateObj.attributes.hs_color.length >= 1) {
      return Math.round(stateObj.attributes.hs_color[0]) % 360;
    }
    if (Array.isArray(stateObj.attributes?.rgb_color) && stateObj.attributes.rgb_color.length >= 3) {
      const [r, g, b] = stateObj.attributes.rgb_color;
      return rgbToHue(r, g, b);
    }
    return 0;
  }

  private _handleColorInput(e: Event, throttle: boolean, entityOverride?: string, throttleKey?: string) {
    e.stopPropagation();
    const hex = (e.target as HTMLInputElement).value;
    if (!hex) return;
    const rgb = parseColorToRgb(hex);
    if (!rgb) return;
    const entity = entityOverride || this.config.entity;
    const callService = () => {
      this.hass.callService('light', 'turn_on', { entity_id: entity, rgb_color: rgb });
    };
    if (throttle) {
      this._throttledCall(throttleKey || 'color_picker', callService);
    } else {
      callService();
    }
  }

  // --- RENDER ---

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const entityId = this.config.entity;
    if (!entityId) {
      return html`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    }

    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${entityId}</code></span>
        </ha-card>
      `;
    }

    // Visibility is handled exclusively by _updateVisibility() in updated().
    // Do NOT return `nothing` here — it empties the shadow DOM and causes race conditions.


    const primaryText = this.config.show_name !== false ? this._getInfoContent(this.config.primary_info, stateObj) : "";
    const secondaryText = this.config.show_state !== false ? this._getInfoContent(this.config.secondary_info, stateObj) : "";
    
    const isActive = this._isEntityActive(stateObj);
    const domain = entityId.split('.')[0];

    // Icon & Shape formatting
    const iconType = this.config.icon_type ?? 'icon';
    const showIconArea = this.config.show_icon !== false && iconType !== 'none';
    const iconShapeClass = this._iconShapeClass;
    const iconAnimClass = this._iconAnimClass;

    // Smart Domain-Aware Default Active Color
    let defaultActiveColor = 'var(--primary-color)';
    let liveLightColor: string | null = null;
    if (domain === 'climate') {
      if (stateObj.state === 'heat') defaultActiveColor = 'var(--state-climate-heat-color, #ff7043)';
      else if (stateObj.state === 'cool') defaultActiveColor = 'var(--state-climate-cool-color, #42a5f5)';
      else if (stateObj.state === 'dry') defaultActiveColor = 'var(--state-climate-dry-color, #ab47bc)';
      else if (stateObj.state === 'fan_only') defaultActiveColor = 'var(--state-climate-fan_only-color, #26a69a)';
    } else if (domain === 'light') {
      liveLightColor = this._getLightLiveColor(stateObj);
      if (liveLightColor) {
        defaultActiveColor = liveLightColor;
      }
    } else if (domain === 'binary_sensor' || domain === 'lock' || domain === 'switch') {
      defaultActiveColor = '#d60000';
    }

    // color_type: 'card' floods the whole card background with current light color or color_temp
    const colorTypeIsCard = this.config.color_type === 'card';
    let activeColor = this._resolveColor(this.config.active_color);
    if (!activeColor || this.config.use_light_color) {
      if (domain === 'light' && liveLightColor) {
        activeColor = liveLightColor;
      } else {
        activeColor = defaultActiveColor;
      }
    }

    let defaultInactiveColor = 'var(--secondary-background-color, rgba(150, 150, 150, 0.2))';
    if (domain === 'light') {
      defaultInactiveColor = '#000000';
    } else if (domain === 'binary_sensor' || domain === 'lock' || domain === 'switch') {
      defaultInactiveColor = '#03b500';
    }

    const inactiveColor = this._resolveColor(this.config.inactive_color) || defaultInactiveColor;
    const iconBg = colorTypeIsCard ? 'transparent' : (isActive ? activeColor : inactiveColor);
    const iconColorStyle = this.config.icon_color 
      ? `color: ${this._resolveColor(this.config.icon_color)};` 
      : (colorTypeIsCard && isActive ? `color: #ffffff; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));` : '');
    const iconOpacityStyle = this._iconOpacityStyle;
    const iconRotateStyle = this._iconRotateStyle;

    // Multi-Domain Interactive Sliders
    const hasControls = this.config.show_slider !== false;
    const isLight = domain === 'light';
    const isCover = domain === 'cover';
    const isFan = domain === 'fan';
    const isHumidifier = domain === 'humidifier';
    const isMediaPlayer = domain === 'media_player';
    const isNumber = domain === 'number' || domain === 'input_number';
    const isClimate = domain === 'climate';

    // Light Features: support hiding sliders when light is off (default: true)
    const hideSliderWhenOff = this.config.hide_slider_when_off !== false;
    const hideColorTempWhenOff = this.config.hide_color_temp_when_off !== false;
    const hideColorPickerWhenOff = this.config.hide_color_picker_when_off !== false;
    const hideColorSliderWhenOff = this.config.hide_color_slider_when_off !== false;

    const supportedModes = stateObj.attributes?.supported_color_modes;
    let supportsBrightness = stateObj.attributes?.brightness !== undefined;
    let supportsColorTemp = false;
    let supportsColor = false;
    if (Array.isArray(supportedModes)) {
      for (let i = 0; i < supportedModes.length; i++) {
        const m = supportedModes[i];
        if (m !== 'onoff') supportsBrightness = true;
        if (m === 'color_temp') supportsColorTemp = true;
        if (COLOR_MODES_SET.has(m)) supportsColor = true;
      }
    }

    const showLightSlider = isLight && hasControls && supportsBrightness && (!hideSliderWhenOff || isActive);
    const colorTempAttr = stateObj.attributes?.color_temp_kelvin ?? stateObj.attributes?.color_temp;
    const showColorTemp = isLight && hasControls && this.config.show_color_temp === true && (colorTempAttr !== undefined || supportsColorTemp) && (!hideColorTempWhenOff || isActive);
    
    // RGB / Hue / XY Color Mode Support
    const isSliderColorPicker = this.config.color_picker_type !== 'wheel';
    const showColorSlider = isLight && hasControls && (this.config.show_color_slider === true || (this.config.show_color_picker === true && isSliderColorPicker)) && supportsColor && (!hideColorSliderWhenOff || isActive);
    const showColorWheel = isLight && hasControls && this.config.show_color_picker === true && !isSliderColorPicker && supportsColor && (!hideColorPickerWhenOff || isActive);

    // Cover Features
    const isAvailable = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    const showCoverSlider = isCover && isAvailable && hasControls && stateObj.attributes?.current_position !== undefined;
    // Fan Features
    const showFanSlider = isFan && isAvailable && isActive && hasControls && stateObj.attributes?.percentage !== undefined;
    // Humidifier Features
    const showHumidifierSlider = isHumidifier && isAvailable && isActive && hasControls && (stateObj.attributes?.humidity !== undefined || stateObj.attributes?.target_humidity !== undefined);
    // Media Player Features
    const showMediaSlider = isMediaPlayer && isAvailable && isActive && hasControls && stateObj.attributes?.volume_level !== undefined;
    // Number / Climate Features
    const showNumberSlider = isNumber && isAvailable && hasControls;
    const showClimateSlider = isClimate && isAvailable && isActive && hasControls && (stateObj.attributes?.temperature !== undefined || stateObj.attributes?.target_temp_high !== undefined);

    // Dynamic CSS Variables & Styles
    const bgOpacity = (this.config.bg_opacity ?? 10) / 100;
    
    const sliderColor = this.config.slider_color 
      ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` 
      : (colorTypeIsCard && isActive && !this.config.use_light_color ? `--slider-color: rgba(255, 255, 255, 0.95);` : `--slider-color: ${activeColor};`);
    const sliderTrackColor = this.config.slider_track_color 
      ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` 
      : (colorTypeIsCard && isActive ? `--slider-track-color: rgba(0, 0, 0, 0.25);` : '');

    // Multi-Stage Fade Transitions & Decay Sliders
    const multiStageFade = this._calculateMultiStageFade(stateObj, defaultActiveColor, inactiveColor);
    const fadeTarget = this.config.fade_target ?? 'card';

    // Card background: when color_type is 'card' or multi-stage fade is active on card
    const resolvedBg = this._resolveColor(this.config.bg_color);
    let rawBgStyle: string;
    if (multiStageFade.activeFade && (fadeTarget === 'card' || fadeTarget === 'all' || colorTypeIsCard)) {
      rawBgStyle = multiStageFade.currentColor;
    } else if (colorTypeIsCard) {
      if (domain === 'light') {
        rawBgStyle = isActive ? (liveLightColor || activeColor) : (this.config.inactive_color ? inactiveColor : '#000000');
      } else {
        rawBgStyle = isActive ? activeColor : inactiveColor;
      }
    } else if (resolvedBg) {
      rawBgStyle = resolvedBg;
    } else if (domain === 'light' && !isActive) {
      rawBgStyle = '#000000';
    } else {
      rawBgStyle = `rgba(150, 150, 150, ${bgOpacity})`;
    }

    let effectiveIconBg = iconBg;
    if (multiStageFade.activeFade && (fadeTarget === 'icon' || fadeTarget === 'all')) {
      effectiveIconBg = colorTypeIsCard ? 'transparent' : multiStageFade.currentColor;
    }

    let effectiveGlowColor = this._resolveColor(this.config.active_color) || (domain === 'light' && liveLightColor ? liveLightColor : activeColor) || 'var(--primary-color)';
    if (multiStageFade.activeFade && (fadeTarget === 'all' || this.config.active_glow === true)) {
      effectiveGlowColor = multiStageFade.currentColor;
    }

    let shadowStyle = '';
    if (this.config.box_shadow === 'soft') shadowStyle = 'box-shadow: 0 4px 10px rgba(0,0,0,0.1);';
    if (this.config.box_shadow === 'deep') shadowStyle = 'box-shadow: 0 10px 20px rgba(0,0,0,0.3);';
    if (this.config.box_shadow === 'glow' || this.config.active_glow === true) {
      shadowStyle = (isActive || multiStageFade.activeFade) ? `box-shadow: 0 0 22px ${effectiveGlowColor}, 0 0 45px rgba(255, 255, 255, 0.18);` : '';
    }

    const activeGlowClass = (this.config.active_glow === true || this.config.box_shadow === 'glow') ? 'card-active-glow' : '';
    const devClass = stateObj?.attributes?.device_class;
    const isMotionSensor = domain === 'binary_sensor' && (devClass === 'motion' || devClass === 'occupancy' || devClass === 'presence');
    const isDoorSensor = domain === 'binary_sensor' && (devClass === 'door' || devClass === 'window' || devClass === 'garage_door' || devClass === 'opening');
    const motionActiveClass = isMotionSensor && (isActive || (multiStageFade.activeFade && multiStageFade.currentStage === 1)) ? 'motion-active' : '';
    const doorOpenClass = isDoorSensor && isActive ? 'door-open' : '';
    const hvacClass = domain === 'climate' && stateObj?.attributes?.hvac_action ? `hvac-${stateObj.attributes.hvac_action}` : '';
    const coverMotionClass = domain === 'cover' ? (stateObj?.state === 'opening' ? 'cover-opening' : (stateObj?.state === 'closing' ? 'cover-closing' : '')) : '';
    const cardClasses = `${this._staticCardClasses} ${activeGlowClass} ${motionActiveClass} ${doorOpenClass} ${hvacClass} ${coverMotionClass}`;

    const subButtons = this._getSubButtons();

    // Typography
    let overrideTextVars = '';
    if (this.config.text_color_mode === 'active_accent' && isActive) {
      overrideTextVars += `--primary-text-color: ${activeColor}; `;
    } else if (this.config.text_color_primary) {
      overrideTextVars += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; `;
    } else if (colorTypeIsCard && isActive) {
      overrideTextVars += `--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); `;
    }
    
    if (this.config.text_color_secondary) {
      overrideTextVars += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; `;
    } else if (colorTypeIsCard && isActive) {
      overrideTextVars += `--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); `;
    }

    const isInline = this.config.features_position === 'inline';
    const iconSize = this._iconSize;
    const containerSize = this._iconContainerSize;

    const scrollPrimary = this.config.text_scrolling_primary || 'none';
    const scrollSecondary = this.config.text_scrolling_secondary || 'none';

    // Build main slider block (Primary brightness/domain slider - ALWAYS VISIBLE)
    const mainSliderBlock = html`
      ${showLightSlider ? this._renderLightSlider(stateObj) : nothing}
      ${showCoverSlider ? this._renderCoverSlider(stateObj) : nothing}
      ${showFanSlider ? this._renderFanSlider(stateObj) : nothing}
      ${showHumidifierSlider ? this._renderHumidifierSlider(stateObj) : nothing}
      ${showMediaSlider ? this._renderMediaSlider(stateObj) : nothing}
      ${showNumberSlider ? this._renderNumberSlider(stateObj) : nothing}
      ${showClimateSlider ? this._renderClimateSlider(stateObj) : nothing}
    `;

    // Build secondary slider block (Color Temp, Hue Spectrum, Picker - COLLAPSIBLE)
    const secondarySliderBlock = html`
      ${showColorTemp ? this._renderColorTempSlider(stateObj) : nothing}
      ${showColorSlider ? this._renderColorSlider(stateObj) : nothing}
      ${showColorWheel ? this._renderColorPicker(stateObj) : nothing}
    `;

    const hasMainSlider = showLightSlider || showCoverSlider || showFanSlider || showHumidifierSlider || showMediaSlider || showNumberSlider || showClimateSlider;
    const hasSecondarySliders = showColorTemp || showColorSlider || showColorWheel;
    const hasCollapsible = (!isInline && hasSecondarySliders) || subButtons.length > 0;
    const decayPos = this.config.decay_slider_position ?? 'bottom';
    const sanitizedStyles = StyleBuilder.sanitizeCustomStyles(this.config.custom_styles);

    return html`
      ${sanitizedStyles ? html`<style>${unsafeCSS(sanitizedStyles)}</style>` : nothing}
      <ha-card 
        class="${cardClasses}" 
        ?active=${isActive}
        style="${this._staticCardStyles} background: ${rawBgStyle}; ${shadowStyle} ${sliderColor} ${sliderTrackColor} ${overrideTextVars} --ag-glow-color: ${effectiveGlowColor}; --ag-active-color: ${activeColor};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${isInline ? 'features-inline' : ''}" style="justify-content: var(--ag-content-alignment);">
          ${decayPos === 'top' ? this._renderDecaySlider(multiStageFade) : nothing}

          <div class="info-container">
            ${showIconArea ? html`
              <div class="icon-container ${iconShapeClass} ${iconAnimClass} ${this.config.active_pulse && isActive ? 'pulse' : ''} ${(this.config.active_glow || this.config.box_shadow === 'glow') && (isActive || multiStageFade.activeFade) ? 'glow' : ''}" 
                   style="${this._iconOffsetStyle} ${iconColorStyle} ${iconOpacityStyle} background-color: ${effectiveIconBg}; width: ${containerSize}px; height: ${containerSize}px; --mdc-icon-size: ${iconSize}px; ${!isAvailable ? 'opacity: 0.5; pointer-events: none;' : ''}" 
                   ?active=${isActive}>
                ${iconType === 'entity-picture' && stateObj.attributes.entity_picture
                  ? html`<img class="entity-picture ${iconShapeClass}" src="${stateObj.attributes.entity_picture}" style="width: ${iconSize}px; height: ${iconSize}px; ${iconRotateStyle}" />`
                  : html`<ha-state-icon
                      .hass=${this.hass}
                      .stateObj=${stateObj}
                      .icon=${this.config.icon || this._computeDynamicIcon(stateObj)}
                      style="--mdc-icon-size: ${iconSize}px; width: ${iconSize}px; height: ${iconSize}px; ${iconRotateStyle}"
                    ></ha-state-icon>`
                }
                ${this.config.badge_icon ? html`
                  <div class="badge" style="background: ${this._resolveColor(this.config.badge_color) || activeColor};">
                    <ha-icon .icon=${this.config.badge_icon}></ha-icon>
                  </div>
                ` : nothing}
              </div>
            ` : nothing}
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${primaryText ? html`
                <div class="text-marquee-container scroll-${scrollPrimary}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${primaryText}</span>
                </div>` : nothing}
              ${secondaryText ? html`
                <div class="text-marquee-container scroll-${scrollSecondary}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${secondaryText}</span>
                </div>` : nothing}
            </div>
            ${decayPos === 'inline' ? html`<div class="inline-sliders">${this._renderDecaySlider(multiStageFade)}</div>` : nothing}
            ${isInline && hasMainSlider ? html`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${mainSliderBlock}</div>` : nothing}
            ${isInline && hasSecondarySliders ? html`<div class="inline-sliders ${this._collapsed ? 'collapsed' : ''}">${secondarySliderBlock}</div>` : nothing}
          </div>
          
          ${decayPos === 'bottom' ? this._renderDecaySlider(multiStageFade) : nothing}
          ${!isInline && hasMainSlider ? html`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${mainSliderBlock}</div>` : nothing}

          ${hasCollapsible ? html`
            <div class="collapsible-wrapper ${this._collapsed ? 'collapsed' : ''}">
              ${!isInline && hasSecondarySliders ? html`<div class="features-container" style="${this._featuresOffsetStyle}">${secondarySliderBlock}</div>` : nothing}

              ${subButtons.length > 0 ? html`
                <div class="sub-buttons-container">
                  ${repeat(
                    subButtons,
                    (sb) => sb.key,
                    (sb) => this._renderSubButton(sb.entity || '', sb.icon, sb.color, sb.bg !== false, sb.name, sb.tapAction, sb.holdAction, sb.type, sb.doubleTapAction, sb.showState)
                  )}
                </div>
              ` : nothing}
            </div>
          ` : nothing}

        </div>
      </ha-card>
    `;
  }

  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  private _renderDecaySlider(fade: FadeCalculationResult) {
    if (!this.config.show_decay_slider || !fade.enabled || !fade.activeFade) {
      return nothing;
    }

    const isGoogle = this.config.slider_style === 'google';
    const sliderHeight = this.config.decay_slider_height ?? (isGoogle ? 32 : 10);
    const sliderRadius = this.config.slider_border_radius ?? (isGoogle ? 16 : 5);
    const remainingPct = Math.max(0, 100 - fade.progressPct);

    return html`
      <div class="decay-slider-container" style="--decay-color: ${fade.currentColor}; --decay-pct: ${remainingPct}%;">
        <div class="decay-slider-track" style="height: ${sliderHeight}px; border-radius: ${sliderRadius}px;">
          <div class="decay-slider-fill" style="background: ${fade.currentColor}; border-radius: ${sliderRadius}px;"></div>
          <span class="decay-slider-badge">${fade.stageLabel}</span>
        </div>
      </div>
    `;
  }

  // --- GENERIC SLIDER COMPONENT HELPER ---
  private _renderGenericSlider(
    key: string,
    label: string,
    min: number,
    max: number,
    step: number,
    val: number,
    pct: number,
    domain: string,
    service: string,
    dataFn: (v: number) => Record<string, any>,
    pctCalc?: (v: number) => number,
    labelFormatter?: (v: number, p: number) => string,
    customClass = '',
    customStyle = '',
    badgeContent?: TemplateResult | string
  ) {
    const isGoogle = this.config.slider_style === 'google';
    const showPercent = (isGoogle && this.config.show_slider_percent !== false) || this.config.show_slider_percent === true;
    const defaultBadgeText = labelFormatter ? labelFormatter(val, pct) : `${pct}%`;
    const finalBadge = badgeContent !== undefined ? badgeContent : defaultBadgeText;

    const effectiveStep = (this.config.slider_stepped_movement === false) ? 'any' : step;

    const isMainSlider = key !== 'color_temp' && key !== 'color_hue';
    const isFullStyle = this.config.slider_style === 'full';
    const fullClass = (isMainSlider && isFullStyle) ? 'main-slider-full' : '';

    let marginOffsets = '';
    if (isMainSlider && isFullStyle) {
      const startOffset = Number(this.config.slider_start_offset) || 0;
      const endOffset = Number(this.config.slider_end_offset) || 0;
      marginOffsets = `left: ${startOffset}px !important; right: ${endOffset}px !important; width: calc(100% - ${(startOffset + endOffset)}px) !important;`;
    } else if (key === 'color_temp') {
      marginOffsets = this._colorTempMarginOffsets;
    } else if (key === 'color_hue') {
      marginOffsets = this._colorHueMarginOffsets;
    } else {
      marginOffsets = this._mainSliderMarginOffsets;
    }

    return html`
      <div class="slider-container ${customClass} ${fullClass} ${isGoogle ? 'slider-google-wrap' : ''}" style="${marginOffsets} ${customStyle}">
        <input type="range" min=${min} max=${max} step=${effectiveStep} .value=${val}
               aria-label="${label}"
               style="--slider-pct: ${pct}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(e: Event) => this._sliderInput(e, key, domain, service, dataFn, pctCalc, labelFormatter)}
               @change=${(e: Event) => this._sliderChange(e, domain, service, dataFn)} />
        ${showPercent && finalBadge ? html`<span class="slider-percent-badge">${finalBadge}</span>` : nothing}
      </div>
    `;
  }

  // --- MULTI-DOMAIN SLIDER RENDERERS ---

  private _renderLightSlider(stateObj: any) {
    const isActive = this._isEntityActive(stateObj);
    const val = stateObj.attributes.brightness ?? 0;
    const pct = Math.max(0, Math.min(100, Math.round((val / 255) * 100)));
    const liveColor = this._getLightLiveColor(stateObj);
    const sliderColorStyle = (this.config.use_light_color !== false || !this.config.slider_color) && liveColor ? `--slider-color: ${liveColor};` : '';
    return this._renderGenericSlider(
      'brightness', 'Brightness', 0, 255, 1, val, pct, 'light', 'turn_on',
      (v) => ({ brightness: v }), (v) => Math.round((v / 255) * 100), (_, p) => (!isActive || p <= 0 ? '' : `${p}%`),
      '', sliderColorStyle
    );
  }

  private _renderColorTempSlider(stateObj: any) {
    const tempType = this.config.color_temp_type || 'gradient';
    const isKelvin = stateObj.attributes.color_temp_kelvin !== undefined || stateObj.attributes.min_color_temp_kelvin !== undefined || stateObj.attributes.max_color_temp_kelvin !== undefined;
    const min = isKelvin ? (stateObj.attributes.min_color_temp_kelvin || 2000) : (stateObj.attributes.min_mireds || 153);
    const max = isKelvin ? (stateObj.attributes.max_color_temp_kelvin || 6500) : (stateObj.attributes.max_mireds || 500);
    const val = isKelvin ? (stateObj.attributes.color_temp_kelvin || 3000) : (stateObj.attributes.color_temp || 300);
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
    const paramKey = isKelvin ? 'color_temp_kelvin' : 'color_temp';
    const isGoogle = tempType === 'google' || (tempType === 'gradient' && this.config.slider_style === 'google');
    const defaultSliderHeight = isGoogle ? 42 : (tempType === 'thin' ? 6 : 12);
    const defaultSliderRadius = isGoogle ? 21 : (tempType === 'thin' ? 3 : 6);
    const ctHeight = this.config.color_temp_height !== undefined ? this.config.color_temp_height : (this.config.slider_height ?? defaultSliderHeight);
    const ctRadius = this.config.color_temp_border_radius !== undefined ? this.config.color_temp_border_radius : (this.config.slider_border_radius ?? defaultSliderRadius);
    const labelText = isKelvin ? `${val} K` : `${val} mireds`;

    if (tempType === 'presets') {
      const ctStartOffset = Number(this.config.color_temp_start_offset) || 0;
      const ctEndOffset = Number(this.config.color_temp_end_offset) || 0;
      const ctMarginOffsets = [
        ctStartOffset ? `margin-left: ${ctStartOffset}px;` : '',
        ctEndOffset ? `margin-right: ${ctEndOffset}px;` : ''
      ].filter(Boolean).join(' ');

      return html`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${ctMarginOffsets}">
          ${COLOR_TEMP_PRESETS.map(p => {
            const [r, g, b] = p.rgb;
            const isSelected = Math.abs(val - p.k) < 200;
            const applyPreset = () => {
              safeForwardHaptic('light', this.config.haptic_feedback !== false);
              this.hass?.callService('light', 'turn_on', { entity_id: this.config.entity, [paramKey]: p.k });
            };
            return html`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${p.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${ctHeight}px; border-radius: ${ctRadius}px; border: ${isSelected ? '2px solid #ffffff' : '1px solid rgba(150, 150, 150, 0.3)'}; background: rgba(${r}, ${g}, ${b}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${isSelected ? '0 0 8px rgba(' + r + ',' + g + ',' + b + ', 0.8)' : 'none'};"
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    applyPreset();
                  }
                }}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  applyPreset();
                }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${r}, ${g}, ${b}); display: inline-block;"></span>
                ${p.label}
              </button>
            `;
          })}
        </div>
      `;
    }
    
    return this._renderGenericSlider(
      'color_temp', 'Color Temperature', min, max, 1, val, pct, 'light', 'turn_on',
      (v) => ({ [paramKey]: v }), (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (v) => isKelvin ? `${v} K` : `${v} mireds`,
      `color-temp ${isKelvin ? 'kelvin' : 'mireds'} ${isGoogle ? 'slider-google-wrap' : ''}`,
      `--ag-slider-height: ${ctHeight}px; --ag-slider-radius: ${ctRadius}px;`,
      labelText
    );
  }

  private _renderColorSlider(stateObj: any) {
    const pickerType = this.config.color_picker_type || 'slider';
    if (pickerType === 'wheel') {
      return this._renderColorPicker(stateObj);
    }
    if (pickerType === 'swatches') {
      const curHex = this._getLiveHex(stateObj).toLowerCase();
      const csHeight = this.config.color_slider_height !== undefined ? this.config.color_slider_height : 32;
      const csRadius = this.config.color_slider_border_radius !== undefined ? this.config.color_slider_border_radius : 8;

      const csStartOffset = Number(this.config.color_slider_start_offset) || 0;
      const csEndOffset = Number(this.config.color_slider_end_offset) || 0;
      const csMarginOffsets = [
        csStartOffset ? `margin-left: ${csStartOffset}px;` : '',
        csEndOffset ? `margin-right: ${csEndOffset}px;` : ''
      ].filter(Boolean).join(' ');

      return html`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${csMarginOffsets}">
          ${COLOR_SWATCHES.map(s => {
            const isSelected = curHex === s.hex.toLowerCase();
            const applySwatch = () => {
              safeForwardHaptic('light', this.config.haptic_feedback !== false);
              this.hass?.callService('light', 'turn_on', { entity_id: this.config.entity, rgb_color: s.rgb });
            };
            return html`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${s.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${s.label}"
                style="flex: 1; min-width: 28px; height: ${csHeight}px; border-radius: ${csRadius}px; background: ${s.hex}; border: ${isSelected ? '2px solid #ffffff' : '1px solid rgba(0,0,0,0.2)'}; cursor: pointer; box-shadow: ${isSelected ? '0 0 10px ' + s.hex : '0 1px 3px rgba(0,0,0,0.3)'}; transition: transform 0.15s ease;"
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    applySwatch();
                  }
                }}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  applySwatch();
                }}>
              </button>
            `;
          })}
        </div>
      `;
    }

    const hue = this._getLiveHue(stateObj);
    const pct = Math.max(0, Math.min(100, Math.round((hue / 360) * 100)));
    const isGoogle = pickerType === 'google' || this.config.slider_style === 'google';
    const defaultSliderHeight = isGoogle ? 42 : 12;
    const defaultSliderRadius = isGoogle ? 21 : 6;
    const csHeight = this.config.color_slider_height !== undefined ? this.config.color_slider_height : (this.config.slider_height ?? defaultSliderHeight);
    const csRadius = this.config.color_slider_border_radius !== undefined ? this.config.color_slider_border_radius : (this.config.slider_border_radius ?? defaultSliderRadius);
    const currentColor = `hsl(${hue}, 100%, 50%)`;

    const badgeContent = html`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${currentColor}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
        ${hue}°
      </span>
    `;

    return this._renderGenericSlider(
      'color_hue', 'Color Hue', 0, 360, 1, hue, pct, 'light', 'turn_on',
      (v) => {
        const [r, g, b] = hsToRgb(v, 100);
        return { rgb_color: [r, g, b] };
      },
      (v) => Math.round((v / 360) * 100), (v) => `${v}°`,
      `color-hue ${isGoogle ? 'slider-google-wrap' : ''}`,
      `--ag-slider-height: ${csHeight}px; --ag-slider-radius: ${csRadius}px; --color-hue-val: ${currentColor};`,
      badgeContent
    );
  }

  private _renderColorPicker(stateObj: any) {
    const hex = this._getLiveHex(stateObj);
    const cpHeight = this.config.color_slider_height !== undefined ? this.config.color_slider_height : (this.config.slider_height ?? 36);
    const cpRadius = this.config.color_slider_border_radius !== undefined ? this.config.color_slider_border_radius : (this.config.slider_border_radius ?? 8);
    return html`
      <div class="color-picker" title="Adjust Light Color" style="height: ${cpHeight}px; border-radius: ${cpRadius}px;">
        <input type="color" 
               .value=${hex} 
               @input=${(e: Event) => this._handleColorInput(e, true)}
               @change=${(e: Event) => this._handleColorInput(e, false)} />
        <span class="color-label">Color (${hex})</span>
      </div>
    `;
  }

  private _renderCoverSlider(stateObj: any) {
    const pos = stateObj.attributes.current_position ?? ((stateObj.state === 'open' || stateObj.state === 'opening') ? 100 : 0);
    return this._renderGenericSlider(
      'cover', 'Cover Position', 0, 100, 1, pos, pos, 'cover', 'set_cover_position',
      (v) => ({ position: v }), (v) => v, (_, p) => `${p}%`
    );
  }

  private _renderFanSlider(stateObj: any) {
    const pct = stateObj.attributes.percentage ?? 0;
    const step = stateObj.attributes.percentage_step ?? 1;
    return this._renderGenericSlider(
      'fan', 'Fan Speed', 0, 100, step, pct, pct, 'fan', 'set_percentage',
      (v) => {
        const snapped = step > 1 ? Math.round(v / step) * step : v;
        return { percentage: Math.min(100, Math.max(0, snapped)) };
      }, (v) => v, (_, p) => `${p}%`
    );
  }

  private _renderMediaSlider(stateObj: any) {
    const isMuted = stateObj.attributes.is_volume_muted === true;
    const vol = isMuted ? 0 : Math.round((stateObj.attributes.volume_level ?? 0) * 100);
    const label = isMuted ? 'Muted (0%)' : undefined;
    return this._renderGenericSlider(
      'media', 'Volume', 0, 100, 1, vol, vol, 'media_player', 'volume_set',
      (v) => ({ volume_level: v / 100 }), (v) => v, (_, p) => (isMuted ? 'Muted' : `${p}%`),
      'media', '', label
    );
  }

  private _renderNumberSlider(stateObj: any) {
    const min = Number(stateObj.attributes.min ?? 0);
    let max = Number(stateObj.attributes.max ?? 100);
    if (min >= max) max = min + 100;
    const step = Number(stateObj.attributes.step ?? 1);
    const numVal = Number(stateObj.state);
    const val = !isNaN(numVal) ? numVal : min;
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
    const svcDomain = (this.config.entity || 'number').split('.')[0];
    const unit = stateObj.attributes.unit_of_measurement ? ` ${stateObj.attributes.unit_of_measurement}` : '';
    const stepStr = step.toString();
    const precision = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;

    return this._renderGenericSlider(
      'number', 'Value', min, max, step, val, pct, svcDomain, 'set_value',
      (v) => ({ value: precision > 0 ? Number(v.toFixed(precision)) : Math.round(v) }),
      (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0, 
      (v) => `${precision > 0 ? Number(v).toFixed(precision) : Math.round(Number(v))}${unit}`
    );
  }

  private _renderClimateSlider(stateObj: any) {
    const isFahrenheit = this.hass.config?.unit_system?.temperature === '°F' || this.hass.config?.unit_system?.temperature === 'F';
    const unit = isFahrenheit ? '°F' : '°C';
    const defaultMin = isFahrenheit ? 60 : 16;
    const defaultMax = isFahrenheit ? 85 : 30;
    const min = stateObj.attributes.min_temp ?? defaultMin;
    const max = stateObj.attributes.max_temp ?? defaultMax;
    const step = stateObj.attributes.target_temp_step ?? stateObj.attributes.target_temperature_step ?? (isFahrenheit ? 1 : 0.5);
    const hasDualTargets = stateObj.attributes.target_temp_low !== undefined && stateObj.attributes.target_temp_high !== undefined;
    const val = stateObj.attributes.temperature ?? stateObj.attributes.target_temp_low ?? stateObj.attributes.target_temp_high ?? min;
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
    return this._renderGenericSlider(
      'climate', 'Temperature', min, max, step, val, pct, 'climate', 'set_temperature',
      (v) => (hasDualTargets ? { target_temp_low: v, target_temp_high: Math.min(max, v + (isFahrenheit ? 4 : 2)) } : { temperature: v }),
      (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (v) => `${v}${unit}`,
      'climate-temp',
      '', `${val}${unit}`
    );
  }

  private _renderHumidifierSlider(stateObj: any) {
    const min = stateObj.attributes?.min_humidity ?? 0;
    const max = stateObj.attributes?.max_humidity ?? 100;
    const val = stateObj.attributes?.humidity ?? stateObj.attributes?.target_humidity ?? min;
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
    return this._renderGenericSlider(
      'humidifier', 'Humidity', min, max, 1, val, pct, 'humidifier', 'set_humidity',
      (v) => ({ humidity: v }), (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (_, p) => `${p}%`
    );
  }

  // --- EXTRACTED SUB-BUTTON RENDERERS ---

  private _renderSubSlider(
    entityId: string, stateObj: any, subType: string,
    colorStyle: string, bgClass: string
  ) {
    const targetState = stateObj || this.hass.states[this.config.entity || ''];
    const subEntityId = entityId || this.config.entity || '';
    
    const isVolume = targetState?.attributes?.volume_level !== undefined || targetState?.entity_id?.startsWith('media_player.');
    const isFan = targetState?.attributes?.percentage !== undefined || targetState?.entity_id?.startsWith('fan.');
    const isCover = targetState?.attributes?.current_position !== undefined || targetState?.entity_id?.startsWith('cover.');
    
    let val = 0;
    let minVal = 0;
    let maxVal = 255;
    let stepVal = '1';
    let service = 'turn_on';
    let domainName = 'light';
    let dataKey = 'brightness';

    if (isVolume) {
      val = targetState?.attributes?.volume_level ?? 0;
      maxVal = 1;
      stepVal = '0.01';
      service = 'set_volume_level';
      domainName = 'media_player';
      dataKey = 'volume_level';
    } else if (isFan) {
      val = targetState?.attributes?.percentage ?? 0;
      maxVal = 100;
      stepVal = '1';
      service = 'set_percentage';
      domainName = 'fan';
      dataKey = 'percentage';
    } else if (isCover) {
      val = targetState?.attributes?.current_position ?? 0;
      maxVal = 100;
      stepVal = '1';
      service = 'set_cover_position';
      domainName = 'cover';
      dataKey = 'position';
    } else {
      val = targetState?.attributes?.brightness ?? 0;
    }
    
    const pct = maxVal === 1 ? Math.round(val * 100) : (maxVal === 100 ? Math.round(val) : Math.round((val / 255) * 100));

    if (subType === 'slider') {
      return html`
        <div class="sub-button-slider-container ${bgClass}" style="${colorStyle}" title="Level: ${pct}%">
          <input type="range" 
                 min="${minVal}" 
                 max=${maxVal} 
                 step=${stepVal} 
                 .value=${val}
                 @pointerdown=${(e: Event) => e.stopPropagation()}
                 @input=${(e: Event) => {
                   e.stopPropagation();
                   const v = parseFloat((e.target as HTMLInputElement).value);
                   const p = maxVal === 1 ? Math.round(v * 100) : (maxVal === 100 ? Math.round(v) : Math.round((v / 255) * 100));
                   const container = (e.target as HTMLElement).closest('.sub-button-slider-container');
                   if (container) {
                     container.setAttribute('title', `Level: ${p}%`);
                   }
                   this._throttledCall('sub_slider_' + subEntityId, () => {
                     this.hass?.callService(domainName, service, { entity_id: subEntityId, [dataKey]: v });
                   });
                 }}
                 @change=${(e: Event) => {
                   e.stopPropagation();
                   const v = parseFloat((e.target as HTMLInputElement).value);
                   this.hass?.callService(domainName, service, { entity_id: subEntityId, [dataKey]: v });
                 }} />
        </div>
      `;
    } else {
      return html`
        <div class="sub-button-google-slider ${bgClass}" style="${colorStyle} --slider-pct: ${pct}%;" title="Level: ${pct}%">
          <input type="range" 
                 min="${minVal}" 
                 max=${maxVal} 
                 step=${stepVal} 
                 .value=${val}
                 style="--slider-pct: ${pct}%;"
                 @pointerdown=${(e: Event) => e.stopPropagation()}
                 @input=${(e: Event) => {
                   e.stopPropagation();
                   const v = parseFloat((e.target as HTMLInputElement).value);
                   const p = maxVal === 1 ? Math.round(v * 100) : (maxVal === 100 ? Math.round(v) : Math.round((v / 255) * 100));
                   const inputEl = e.target as HTMLInputElement;
                   requestAnimationFrame(() => {
                     inputEl.style.setProperty('--slider-pct', `${p}%`);
                     const container = inputEl.closest('.sub-button-google-slider') as HTMLElement;
                     if (container) {
                       container.style.setProperty('--slider-pct', `${p}%`);
                       container.title = `Level: ${p}%`;
                       const pctEl = container.querySelector('.sub-slider-pct');
                       if (pctEl) pctEl.textContent = `${p}%`;
                     }
                   });
                   this._throttledCall('sub_slider_' + subEntityId, () => {
                     this.hass?.callService(domainName, service, { entity_id: subEntityId, [dataKey]: v });
                   });
                 }}
                 @change=${(e: Event) => {
                   e.stopPropagation();
                   const v = parseFloat((e.target as HTMLInputElement).value);
                   this.hass?.callService(domainName, service, { entity_id: subEntityId, [dataKey]: v });
                 }} />
          <span class="sub-slider-pct">${pct}%</span>
        </div>
      `;
    }
  }

  private _renderSubColorPicker(
    entityId: string, stateObj: any,
    colorStyle: string, bgClass: string, label?: string, liveStateText?: string | TemplateResult
  ) {
    const targetState = stateObj || this.hass.states[this.config.entity || ''];
    const currentHex = this._getLiveHex(targetState);
    return html`
      <div class="sub-button sub-color-picker ${bgClass}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${currentHex})" 
           style="${colorStyle} background: ${currentHex} !important; border: 2px solid rgba(255,255,255,0.7); box-shadow: 0 1px 4px rgba(0,0,0,0.3);"
           @keydown=${(e: KeyboardEvent) => {
             if (e.key === 'Enter' || e.key === ' ') {
               e.preventDefault();
               (e.currentTarget as HTMLElement).querySelector('input')?.click();
             }
           }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${currentHex} 
               @input=${(e: Event) => this._handleColorInput(e, true, entityId || this.config.entity, 'sub_color_picker_' + entityId)}
               @change=${(e: Event) => this._handleColorInput(e, false, entityId || this.config.entity)} />
        ${label ? html`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${label}</span>` : nothing}
        ${liveStateText ? html`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${liveStateText}</span>` : nothing}
      </div>
    `;
  }

  private _renderSubButton(
    entityId: string,
    customIcon?: string,
    customColor?: string,
    showBg = true,
    label?: string,
    tapAction?: any,
    holdAction?: any,
    subType: string = 'button',
    doubleTapAction?: any,
    showState = false
  ) {
    const stateObj = entityId ? this.hass?.states[entityId] : this.hass?.states[this.config.entity || ''];
    const isActive = this._isEntityActive(stateObj);

    const colorStyle = customColor ? `color: ${customColor};` : '';
    const bgClass = showBg ? '' : 'no-bg';
    const dynamicSubColor = customColor ? this._resolveColor(customColor) : undefined;

    if (subType === 'slider' || subType === 'google_slider') {
      const sliderColorStyle = customColor ? `--primary-color: ${customColor}; --slider-color: ${customColor};` : '';
      return this._renderSubSlider(entityId, stateObj, subType, sliderColorStyle, bgClass);
    }

    let liveStateText: string | TemplateResult | undefined;
    if (showState && stateObj) {
      liveStateText = this._getInfoContent('state', stateObj);
    }

    const domain = (entityId || this.config.entity || '').split('.')[0];
    if (subType === 'color_picker' && (domain === 'light' || (!entityId && this.config.entity?.startsWith('light.')))) {
      return this._renderSubColorPicker(entityId, stateObj, colorStyle, bgClass, label, liveStateText);
    }

    const resolved = SubButtonController.resolve(
      subType,
      entityId,
      this.config.entity,
      stateObj,
      customIcon,
      label,
      isActive,
      this.hass?.config?.unit_system?.temperature,
      tapAction
    );

    const subIcon = resolved.icon;
    const subTitle = resolved.title;
    const subLabel = resolved.label;
    const subIsActive = resolved.isActive;
    const subAnimClass = resolved.animClass;
    let defaultAction: (() => void) | undefined = undefined;

    if (resolved.defaultAction) {
      defaultAction = () => resolved.defaultAction!(this.hass, this.config.entity);
    }

    const clickHandler = (e: Event) => {
      this._handleSubTap(e, entityId, tapAction, doubleTapAction, defaultAction);
    };

    return html`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${bgClass}" 
        ?active=${subIsActive} 
        style="${colorStyle} ${subIsActive && dynamicSubColor && showBg ? `background: ${dynamicSubColor}; color: #fff;` : ''}"
        title="${subTitle}"
        @click=${clickHandler}
        @dblclick=${(e: Event) => e.stopPropagation()}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(e);
          }
        }}
        @pointerdown=${(e: PointerEvent) => this._handleSubPointerDown(e, entityId, holdAction)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(e: Event) => this._handleSubContextMenu(e, entityId, holdAction)}>
        <ha-icon .icon=${subIcon} class="${subAnimClass}"></ha-icon>
        ${subLabel ? html`<span class="sub-button-label">${subLabel}</span>` : nothing}
        ${liveStateText ? html`<span class="sub-button-state">${liveStateText}</span>` : nothing}
      </div>
    `;
  }

  // --- STATIC STYLES ---

  static get styles() {
    return antigravityCardStyles;
  }
}

if (!customElements.get('antigravity-with-icon-card')) {
  customElements.define('antigravity-with-icon-card', AntigravityWithIconCard);
}

