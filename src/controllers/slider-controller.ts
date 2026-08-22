/**
 * Slider Controller & Domain Slider Renderer for Antigravity Cards
 * Encapsulates multi-domain slider templates, preset swatches, Google/Full/Compact slider themes, and sub-sliders.
 */

import { html, nothing, TemplateResult } from 'lit';
import type { AntigravityCardConfig, FadeCalculationResult } from '../types';
import { COLOR_SWATCHES, COLOR_TEMP_PRESETS, hsToRgb } from '../color-converter';
import { EntityController } from './entity-controller';

export interface SliderCallbacks {
  onPointerDown?: (e: PointerEvent) => void;
  onPointerMove?: (e: PointerEvent) => void;
  onPointerUp?: (e: PointerEvent) => void;
  onPointerCancel?: (e: Event) => void;
  onSliderInput: (
    e: Event,
    key: string,
    domain: string,
    service: string,
    dataFn: (v: number) => Record<string, any>,
    pctCalc?: (v: number) => number,
    labelFormatter?: (v: number, p: number) => string
  ) => void;
  onSliderChange: (
    e: Event,
    domain: string,
    service: string,
    dataFn: (v: number) => Record<string, any>
  ) => void;
  onColorInput: (e: Event, throttle: boolean, entityOverride?: string, throttleKey?: string) => void;
  callService: (domain: string, service: string, serviceData: Record<string, any>) => void;
  forwardHaptic?: (type: string) => void;
}

export class SliderController {
  /**
   * Render a generic slider container with support for Google, Full, and Compact themes.
   */
  public static renderGenericSlider(
    config: AntigravityCardConfig,
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
    callbacks: SliderCallbacks,
    pctCalc?: (v: number) => number,
    labelFormatter?: (v: number, p: number) => string,
    customClass = '',
    customStyle = '',
    badgeContent?: TemplateResult | string,
    marginOffsets = ''
  ): TemplateResult {
    const isGoogle = config.slider_style === 'google';
    const showPercent = (isGoogle && config.show_slider_percent !== false) || config.show_slider_percent === true;
    const defaultBadgeText = labelFormatter ? labelFormatter(val, pct) : `${pct}%`;
    const finalBadge = badgeContent !== undefined ? badgeContent : defaultBadgeText;

    const effectiveStep = (config.slider_stepped_movement === false) ? 'any' : step;

    const isMainSlider = key !== 'color_temp' && key !== 'color_hue';
    const isFullStyle = config.slider_style === 'full';
    const fullClass = (isMainSlider && isFullStyle) ? 'main-slider-full' : '';

    let calculatedMargins = marginOffsets;
    if (isMainSlider && isFullStyle) {
      const startOffset = Number(config.slider_start_offset) || 0;
      const endOffset = Number(config.slider_end_offset) || 0;
      calculatedMargins = `left: ${startOffset}px !important; right: ${endOffset}px !important; width: calc(100% - ${(startOffset + endOffset)}px) !important;`;
    }

    return html`
      <div class="slider-container ${customClass} ${fullClass} ${isGoogle ? 'slider-google-wrap' : ''}" style="${calculatedMargins} ${customStyle}">
        <input type="range" min=${min} max=${max} step=${effectiveStep} .value=${val}
               aria-label="${label}"
               style="--slider-pct: ${pct}%;"
               @pointerdown=${callbacks.onPointerDown}
               @pointermove=${callbacks.onPointerMove}
               @pointerup=${callbacks.onPointerUp}
               @pointercancel=${callbacks.onPointerCancel}
               @input=${(e: Event) => callbacks.onSliderInput(e, key, domain, service, dataFn, pctCalc, labelFormatter)}
               @change=${(e: Event) => callbacks.onSliderChange(e, domain, service, dataFn)} />
        ${showPercent && finalBadge ? html`<span class="slider-percent-badge">${finalBadge}</span>` : nothing}
      </div>
    `;
  }

  /**
   * Render decay / cooldown progress bar slider.
   */
  public static renderDecaySlider(
    fade: FadeCalculationResult,
    customStyle = ''
  ): TemplateResult {
    if (!fade.enabled || !fade.activeFade) return html``;
    return html`
      <div class="slider-container decay-slider-container" style="${customStyle}">
        <div class="decay-slider-track" style="--decay-pct: ${fade.progressPct}%; --decay-color: ${fade.currentColor};">
          <div class="decay-slider-fill"></div>
        </div>
        <span class="decay-slider-badge">${fade.stageLabel}</span>
      </div>
    `;
  }

  /**
   * Render light brightness slider.
   */
  public static renderLightSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const isActive = EntityController.isEntityActive(stateObj);
    const val = stateObj.attributes.brightness ?? 0;
    const pct = Math.max(0, Math.min(100, Math.round((val / 255) * 100)));
    const liveColor = EntityController.getLightLiveColor(stateObj);
    const sliderColorStyle = (config.use_light_color !== false || !config.slider_color) && liveColor ? `--slider-color: ${liveColor};` : '';

    return this.renderGenericSlider(
      config, 'brightness', 'Brightness', 0, 255, 1, val, pct, 'light', 'turn_on',
      (v) => ({ brightness: v }), callbacks,
      (v) => Math.round((v / 255) * 100),
      (_, p) => (!isActive || p <= 0 ? '' : `${p}%`),
      '', sliderColorStyle, undefined, marginOffsets
    );
  }

  /**
   * Render color temperature slider or chip presets.
   */
  public static renderColorTempSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const tempType = config.color_temp_type || 'gradient';
    const isKelvin = stateObj.attributes.color_temp_kelvin !== undefined || stateObj.attributes.min_color_temp_kelvin !== undefined || stateObj.attributes.max_color_temp_kelvin !== undefined;
    const min = isKelvin ? (stateObj.attributes.min_color_temp_kelvin || 2000) : (stateObj.attributes.min_mireds || 153);
    const max = isKelvin ? (stateObj.attributes.max_color_temp_kelvin || 6500) : (stateObj.attributes.max_mireds || 500);
    const val = isKelvin ? (stateObj.attributes.color_temp_kelvin || 3000) : (stateObj.attributes.color_temp || 300);
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
    const paramKey = isKelvin ? 'color_temp_kelvin' : 'color_temp';
    const isGoogle = tempType === 'google' || (tempType === 'gradient' && config.slider_style === 'google');
    const defaultSliderHeight = isGoogle ? 42 : (tempType === 'thin' ? 6 : 12);
    const defaultSliderRadius = isGoogle ? 21 : (tempType === 'thin' ? 3 : 6);
    const ctHeight = config.color_temp_height !== undefined ? config.color_temp_height : (config.slider_height ?? defaultSliderHeight);
    const ctRadius = config.color_temp_border_radius !== undefined ? config.color_temp_border_radius : (config.slider_border_radius ?? defaultSliderRadius);
    const labelText = isKelvin ? `${val} K` : `${val} mireds`;

    if (tempType === 'presets') {
      const ctStartOffset = Number(config.color_temp_start_offset) || 0;
      const ctEndOffset = Number(config.color_temp_end_offset) || 0;
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
              if (callbacks.forwardHaptic) callbacks.forwardHaptic('light');
              callbacks.callService('light', 'turn_on', { entity_id: config.entity, [paramKey]: p.k });
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

    return this.renderGenericSlider(
      config, 'color_temp', 'Color Temperature', min, max, 1, val, pct, 'light', 'turn_on',
      (v) => ({ [paramKey]: v }), callbacks,
      (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (v) => isKelvin ? `${v} K` : `${v} mireds`,
      `color-temp ${isKelvin ? 'kelvin' : 'mireds'} ${isGoogle ? 'slider-google-wrap' : ''}`,
      `--ag-slider-height: ${ctHeight}px; --ag-slider-radius: ${ctRadius}px;`,
      labelText, marginOffsets
    );
  }

  /**
   * Render color hue slider, preset palette swatches, or wheel picker.
   */
  public static renderColorSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const pickerType = config.color_picker_type || 'slider';
    if (pickerType === 'wheel') {
      return this.renderColorPicker(config, stateObj, callbacks);
    }
    if (pickerType === 'swatches') {
      const curHex = EntityController.getLiveHex(stateObj).toLowerCase();
      const csHeight = config.color_slider_height !== undefined ? config.color_slider_height : 32;
      const csRadius = config.color_slider_border_radius !== undefined ? config.color_slider_border_radius : 8;

      const csStartOffset = Number(config.color_slider_start_offset) || 0;
      const csEndOffset = Number(config.color_slider_end_offset) || 0;
      const csMarginOffsets = [
        csStartOffset ? `margin-left: ${csStartOffset}px;` : '',
        csEndOffset ? `margin-right: ${csEndOffset}px;` : ''
      ].filter(Boolean).join(' ');

      return html`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${csMarginOffsets}">
          ${COLOR_SWATCHES.map(s => {
            const isSelected = curHex === s.hex.toLowerCase();
            const applySwatch = () => {
              if (callbacks.forwardHaptic) callbacks.forwardHaptic('light');
              callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: s.rgb });
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

    const isGoogle = config.slider_style === 'google';
    const csHeight = config.color_slider_height !== undefined ? config.color_slider_height : (config.slider_height ?? (isGoogle ? 42 : 36));
    const csRadius = config.color_slider_border_radius !== undefined ? config.color_slider_border_radius : (config.slider_border_radius ?? (isGoogle ? 21 : 8));
    const currentHue = EntityController.getLiveHue(stateObj);
    const currentColor = `hsl(${currentHue}, 100%, 50%)`;
    const pct = Math.round((currentHue / 360) * 100);

    let badgeContent: TemplateResult | undefined;
    if (config.color_swatch_presets !== false) {
      badgeContent = html`
        <div class="color-swatch-chips">
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Red Color" style="background: #f44336;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [244, 67, 54] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [244, 67, 54] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Orange Color" style="background: #ff9800;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [255, 152, 0] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [255, 152, 0] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Yellow Color" style="background: #ffeb3b;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [255, 235, 59] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [255, 235, 59] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Green Color" style="background: #4caf50;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [76, 175, 80] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [76, 175, 80] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Cyan Color" style="background: #00bcd4;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [0, 188, 212] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [0, 188, 212] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Blue Color" style="background: #2196f3;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [33, 150, 243] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [33, 150, 243] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Purple Color" style="background: #9c27b0;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [156, 39, 176] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [156, 39, 176] }); } }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Pink Color" style="background: #e91e63;" @click=${(e: Event) => { e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [233, 30, 99] }); }} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); callbacks.callService('light', 'turn_on', { entity_id: config.entity, rgb_color: [233, 30, 99] }); } }}></span>
        </div>
      `;
    }

    return this.renderGenericSlider(
      config, 'color_hue', 'Light Color Hue', 0, 360, 1, currentHue, pct, 'light', 'turn_on',
      (v) => {
        const [r, g, b] = hsToRgb(v, 100);
        return { rgb_color: [r, g, b] };
      }, callbacks,
      (v) => Math.round((v / 360) * 100), (v) => `${v}°`,
      `color-hue ${isGoogle ? 'slider-google-wrap' : ''}`,
      `--ag-slider-height: ${csHeight}px; --ag-slider-radius: ${csRadius}px; --color-hue-val: ${currentColor};`,
      badgeContent, marginOffsets
    );
  }

  /**
   * Render HTML color picker.
   */
  public static renderColorPicker(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks
  ): TemplateResult {
    const hex = EntityController.getLiveHex(stateObj);
    const cpHeight = config.color_slider_height !== undefined ? config.color_slider_height : (config.slider_height ?? 36);
    const cpRadius = config.color_slider_border_radius !== undefined ? config.color_slider_border_radius : (config.slider_border_radius ?? 8);
    return html`
      <div class="color-picker" title="Adjust Light Color" style="height: ${cpHeight}px; border-radius: ${cpRadius}px;">
        <input type="color" 
               .value=${hex} 
               @input=${(e: Event) => callbacks.onColorInput(e, true)}
               @change=${(e: Event) => callbacks.onColorInput(e, false)} />
        <span class="color-label">Color (${hex})</span>
      </div>
    `;
  }

  /**
   * Render cover position slider.
   */
  public static renderCoverSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const pos = stateObj.attributes.current_position ?? ((stateObj.state === 'open' || stateObj.state === 'opening') ? 100 : 0);
    return this.renderGenericSlider(
      config, 'cover', 'Cover Position', 0, 100, 1, pos, pos, 'cover', 'set_cover_position',
      (v) => ({ position: v }), callbacks,
      (v) => v, (_, p) => `${p}%`, '', '', undefined, marginOffsets
    );
  }

  /**
   * Render fan speed percentage slider.
   */
  public static renderFanSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const pct = stateObj.attributes.percentage ?? 0;
    const step = stateObj.attributes.percentage_step ?? 1;
    return this.renderGenericSlider(
      config, 'fan', 'Fan Speed', 0, 100, step, pct, pct, 'fan', 'set_percentage',
      (v) => {
        const snapped = step > 1 ? Math.round(v / step) * step : v;
        return { percentage: Math.min(100, Math.max(0, snapped)) };
      }, callbacks,
      (v) => v, (_, p) => `${p}%`, '', '', undefined, marginOffsets
    );
  }

  /**
   * Render media volume slider.
   */
  public static renderMediaSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const isMuted = stateObj.attributes.is_volume_muted === true;
    const vol = isMuted ? 0 : Math.round((stateObj.attributes.volume_level ?? 0) * 100);
    const label = isMuted ? 'Muted (0%)' : undefined;
    return this.renderGenericSlider(
      config, 'media', 'Volume', 0, 100, 1, vol, vol, 'media_player', 'volume_set',
      (v) => ({ volume_level: v / 100 }), callbacks,
      (v) => v, (_, p) => (isMuted ? 'Muted' : `${p}%`),
      'media', '', label, marginOffsets
    );
  }

  /**
   * Render number domain slider.
   */
  public static renderNumberSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const min = Number(stateObj.attributes.min ?? 0);
    let max = Number(stateObj.attributes.max ?? 100);
    if (min >= max) max = min + 100;
    const step = Number(stateObj.attributes.step ?? 1);
    const numVal = Number(stateObj.state);
    const val = !isNaN(numVal) ? numVal : min;
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
    const svcDomain = (config.entity || 'number').split('.')[0];
    const unit = stateObj.attributes.unit_of_measurement ? ` ${stateObj.attributes.unit_of_measurement}` : '';
    const stepStr = step.toString();
    const precision = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;

    return this.renderGenericSlider(
      config, 'number', 'Value', min, max, step, val, pct, svcDomain, 'set_value',
      (v) => ({ value: precision > 0 ? Number(v.toFixed(precision)) : Math.round(v) }), callbacks,
      (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (v) => `${precision > 0 ? Number(v).toFixed(precision) : Math.round(Number(v))}${unit}`,
      '', '', undefined, marginOffsets
    );
  }

  /**
   * Render climate temperature slider.
   */
  public static renderClimateSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    hass: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const isFahrenheit = hass?.config?.unit_system?.temperature === '°F' || hass?.config?.unit_system?.temperature === 'F';
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

    return this.renderGenericSlider(
      config, 'climate', 'Temperature', min, max, step, val, pct, 'climate', 'set_temperature',
      (v) => (hasDualTargets ? { target_temp_low: v, target_temp_high: Math.min(max, v + (isFahrenheit ? 4 : 2)) } : { temperature: v }),
      callbacks,
      (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (v) => `${v}${unit}`,
      'climate-temp', '', `${val}${unit}`, marginOffsets
    );
  }

  /**
   * Render humidifier slider.
   */
  public static renderHumidifierSlider(
    config: AntigravityCardConfig,
    stateObj: any,
    callbacks: SliderCallbacks,
    marginOffsets = ''
  ): TemplateResult {
    const min = stateObj.attributes?.min_humidity ?? 0;
    const max = stateObj.attributes?.max_humidity ?? 100;
    const val = stateObj.attributes?.humidity ?? stateObj.attributes?.target_humidity ?? min;
    const range = max - min;
    const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;

    return this.renderGenericSlider(
      config, 'humidifier', 'Humidity', min, max, 1, val, pct, 'humidifier', 'set_humidity',
      (v) => ({ humidity: v }), callbacks,
      (v) => range > 0 ? Math.round(((v - min) / range) * 100) : 0,
      (_, p) => `${p}%`, '', '', undefined, marginOffsets
    );
  }

  /**
   * Render compact sub-slider inside sub-button row.
   */
  public static renderSubSlider(
    config: AntigravityCardConfig,
    hass: any,
    entityId: string,
    stateObj: any,
    subType: string,
    colorStyle: string,
    bgClass: string,
    throttledCall: (key: string, fn: () => void, delayMs?: number) => void
  ): TemplateResult {
    const targetState = stateObj || hass.states[config.entity || ''];
    const subEntityId = entityId || config.entity || '';

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
                   if (container) (container as HTMLElement).style.setProperty('--sub-slider-pct', `${p}%`);
                   throttledCall(`sub_${subEntityId}`, () => {
                     hass.callService(domainName, service, { entity_id: subEntityId, [dataKey]: v });
                   }, 50);
                 }}
                 @change=${(e: Event) => {
                   e.stopPropagation();
                   const v = parseFloat((e.target as HTMLInputElement).value);
                   hass.callService(domainName, service, { entity_id: subEntityId, [dataKey]: v });
                 }}
                 style="--sub-slider-pct: ${pct}%;" />
        </div>
      `;
    }

    // subType === 'up_down'
    return html`
      <div class="sub-button-group-updown" style="${colorStyle}">
        <button type="button" class="sub-button ${bgClass}" title="Decrease Level"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  const step = maxVal === 1 ? 0.05 : (maxVal === 100 ? 5 : 25);
                  const next = Math.max(minVal, val - step);
                  hass.callService(domainName, service, { entity_id: subEntityId, [dataKey]: next });
                }}>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </button>
        <span class="sub-button-updown-val">${pct}%</span>
        <button type="button" class="sub-button ${bgClass}" title="Increase Level"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  const step = maxVal === 1 ? 0.05 : (maxVal === 100 ? 5 : 25);
                  const next = Math.min(maxVal, val + step);
                  hass.callService(domainName, service, { entity_id: subEntityId, [dataKey]: next });
                }}>
          <ha-icon icon="mdi:chevron-up"></ha-icon>
        </button>
      </div>
    `;
  }

  /**
   * Render sub color picker.
   */
  public static renderSubColorPicker(
    hass: any,
    entityId: string,
    stateObj: any,
    colorStyle: string,
    bgClass: string,
    callbacks: SliderCallbacks,
    label?: string,
    liveStateText?: string | TemplateResult
  ): TemplateResult {
    const targetState = stateObj || hass.states[entityId || ''];
    const subEntityId = entityId || targetState?.entity_id;
    const hex = EntityController.getLiveHex(targetState);

    return html`
      <div class="sub-button sub-button-color-picker ${bgClass}" style="${colorStyle}" title="Color (${hex})">
        <input type="color" 
               .value=${hex} 
               @click=${(e: Event) => e.stopPropagation()}
               @input=${(e: Event) => callbacks.onColorInput(e, true, subEntityId, `sub_color_${subEntityId}`)}
               @change=${(e: Event) => callbacks.onColorInput(e, false, subEntityId, `sub_color_${subEntityId}`)} />
        <ha-icon icon="mdi:palette" style="color: ${hex};"></ha-icon>
        ${label ? html`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${label}</span>` : nothing}
        ${liveStateText ? html`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${liveStateText}</span>` : nothing}
      </div>
    `;
  }
}
