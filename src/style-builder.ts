/**
 * StyleBuilder Engine for Antigravity Cards
 * Systematically constructs scoped CSS variables, dynamic typography, offsets, theme classes,
 * with style memoization and custom styles CSS sanitization.
 */

import { AntigravityCardConfig, ThemePreset } from './types';
import { THEME_PRESETS } from './themes';

export interface ComputedCardStyles {
  staticCardStyles: string;
  staticCardClasses: string;
  textOffsetStyle: string;
  primaryTextOffsetStyle: string;
  secondaryTextOffsetStyle: string;
  featuresOffsetStyle: string;
  mainSliderMarginOffsets: string;
  colorTempMarginOffsets: string;
  colorHueMarginOffsets: string;
  textBoxWidth: string;
  primaryTextStyle: string;
  secondaryTextStyle: string;
}

export class StyleBuilder {
  private static _computedStylesCache = new Map<string, ComputedCardStyles>();

  /**
   * Sanitize custom styles string to reject tag breakouts and script tags.
   */
  public static sanitizeCustomStyles(css?: string): string {
    if (!css || typeof css !== 'string') return '';
    // Disallow closing style tags, script elements, and HTML tags
    if (/<\/?(script|style|iframe|object|embed)/i.test(css)) {
      console.warn('[Antigravity] custom_styles contains invalid HTML tags. Ignored for security.');
      return '';
    }
    return css;
  }

  /**
   * Precompute static style strings on configuration changes with memoization.
   */
  public static computeStaticStyles(config: AntigravityCardConfig): ComputedCardStyles {
    if (!config) {
      return {
        staticCardStyles: '',
        staticCardClasses: 'ha-card',
        textOffsetStyle: '',
        primaryTextOffsetStyle: '',
        secondaryTextOffsetStyle: '',
        featuresOffsetStyle: '',
        mainSliderMarginOffsets: '',
        colorTempMarginOffsets: '',
        colorHueMarginOffsets: '',
        textBoxWidth: 'width: 100%; max-width: 100%;',
        primaryTextStyle: '',
        secondaryTextStyle: '',
      };
    }

    // Fast memoization hash based on layout, spacing, colors, and offsets
    const cacheKey = [
      config.theme_preset,
      config.card_padding,
      config.card_padding_vertical,
      config.card_padding_horizontal,
      config.card_margin,
      config.border_radius,
      config.slider_style,
      config.slider_height,
      config.slider_border_radius,
      config.content_spacing,
      config.text_spacing,
      config.features_margin,
      config.sub_button_spacing,
      config.sub_button_padding,
      config.text_offset_x,
      config.text_offset_y,
      config.primary_text_start_offset,
      config.primary_text_end_offset,
      config.secondary_text_start_offset,
      config.secondary_text_end_offset,
      config.font_size_primary,
      config.font_size_secondary,
      config.font_weight_primary,
      config.letter_spacing,
      config.line_height,
      config.layout,
      config.card_layout,
      config.full_slider_opacity,
      config.text_color_mode,
    ].join('|');

    if (this._computedStylesCache.has(cacheKey)) {
      return this._computedStylesCache.get(cacheKey)!;
    }

    const cardPaddingVert = config.card_padding_vertical ?? config.card_padding ?? 0;
    const cardPaddingHoriz = config.card_padding_horizontal ?? config.card_padding ?? 15;

    const pTop = config.card_padding_top ?? cardPaddingVert;
    const pBottom = config.card_padding_bottom ?? cardPaddingVert;
    const pLeft = config.card_padding_left ?? cardPaddingHoriz;
    const pRight = config.card_padding_right ?? cardPaddingHoriz;

    const baseMargin = config.card_margin ?? -1;
    const marginVert = config.card_margin_vertical ?? baseMargin;
    const marginHoriz = config.card_margin_horizontal ?? baseMargin;
    const mTop = config.card_margin_top ?? marginVert;
    const mBottom = config.card_margin_bottom ?? marginVert;
    const mLeft = config.card_margin_left ?? marginHoriz;
    const mRight = config.card_margin_right ?? marginHoriz;

    let cardMarginStyle = '';
    if (mTop !== undefined || mBottom !== undefined || mLeft !== undefined || mRight !== undefined) {
      cardMarginStyle = `margin: ${mTop ?? 0}px ${mRight ?? 0}px ${mBottom ?? 0}px ${mLeft ?? 0}px;`;
    }

    const borderRadius = config.border_radius ?? 12;
    const isGoogleSlider = config.slider_style === 'google';
    const isFullSlider = config.slider_style === 'full';
    const defaultSliderHeight = isGoogleSlider ? 42 : isFullSlider ? 40 : 12;
    const sliderHeight = config.slider_height !== undefined ? config.slider_height : defaultSliderHeight;
    const defaultSliderRadius = isGoogleSlider ? 21 : isFullSlider ? 0 : (sliderHeight / 2);
    const sliderRadius = config.slider_border_radius !== undefined ? config.slider_border_radius : defaultSliderRadius;

    const borderWidth = config.card_border_width ?? (config.card_border_color ? 1 : 0);
    const borderStyle = config.card_border_style ?? 'solid';
    const borderProp = borderWidth > 0 ? `border: ${borderWidth}px ${borderStyle} ${config.card_border_color || 'var(--divider-color, rgba(150, 150, 150, 0.2))'};` : '';

    const widthStyle = config.card_width ? `width: ${config.card_width};` : '';
    const maxWidthStyle = config.card_max_width ? `max-width: ${config.card_max_width};` : '';
    const heightStyle = config.card_height ? `height: ${config.card_height};` : '';
    const minHeightStyle = config.card_min_height !== undefined ? `min-height: ${config.card_min_height}px;` : '';
    const fillStyle = config.fill_container === true ? 'height: 100%; width: 100%;' : '';
    const overflowStyle = config.overflow_hidden !== false ? 'overflow: hidden;' : 'overflow: visible;';
    const blurStyle = config.backdrop_blur !== undefined ? `backdrop-filter: blur(${config.backdrop_blur}px); -webkit-backdrop-filter: blur(${config.backdrop_blur}px);` : '';
    const cardOpacityStyle = config.card_opacity !== undefined ? `opacity: ${config.card_opacity / 100};` : '';
    const transitionStyle = config.transition_duration !== undefined ? `transition: all ${config.transition_duration}ms ease;` : '';

    const textPaddingVert = config.card_padding_vertical ?? 0;
    const textPaddingHoriz = config.card_padding_horizontal ?? 0;
    const featuresPaddingVert = 0;
    const featuresPaddingHoriz = 0;
    const subBtnPadding = config.sub_button_padding ?? 6;
    const subBtnContainerPadding = config.sub_button_container_padding ?? 0;

    const subBtnAlign = config.sub_button_alignment ? `--ag-sub-button-alignment: ${config.sub_button_alignment};` : '--ag-sub-button-alignment: flex-end;';
    const scrollSpeedVar = config.text_scrolling_speed ? `--ag-scroll-speed: ${config.text_scrolling_speed}s;` : '';
    const fullSliderOpacity = config.full_slider_opacity !== undefined ? `--ag-full-slider-opacity: ${config.full_slider_opacity / 100};` : '';

    // Theme preset resolution with fallback safety (Fix #8)
    const rawTheme = config.theme_preset || 'glassmorphism';
    const themeDef = THEME_PRESETS[rawTheme as ThemePreset] || THEME_PRESETS.glassmorphism;
    const themeStyles = themeDef.generateStyles(config);

    const staticCardStyles = [
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
      `--ag-card-padding: ${pTop}px ${pRight}px ${pBottom}px ${pLeft}px;`,
      `--ag-text-padding: ${textPaddingVert}px ${textPaddingHoriz}px;`,
      `--ag-features-padding: ${featuresPaddingVert}px ${featuresPaddingHoriz}px;`,
      `--ag-sub-button-padding: ${subBtnPadding}px;`,
      `--ag-sub-button-container-padding: ${subBtnContainerPadding}px;`,
      `--ag-content-spacing: ${config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${sliderHeight}px;`,
      `--ag-slider-radius: ${sliderRadius}px;`,
      `--ag-text-alignment: ${config.text_alignment ?? 'left'};`,
      `--ag-content-alignment: ${config.content_alignment ?? 'flex-start'};`,
      subBtnAlign,
      scrollSpeedVar,
      fullSliderOpacity,
      themeStyles,
    ].filter(Boolean).join(' ').trim();

    const staticCardClasses = [
      'ha-card',
      themeDef.cssClass,
      `layout-${config.layout || 'default'}`,
      config.card_layout === 'large' ? 'card-large' : '',
      `slider-style-${config.slider_style ?? 'circle'}`,
      config.text_color_mode === 'inverse' ? 'text-color-mode-inverse' : '',
    ].filter(Boolean).join(' ');

    // Text & Container Offsets
    const textOffsetX = Number(config.text_offset_x) || -28;
    const textOffsetY = Number(config.text_offset_y) || 2;
    const textOffsetStyle = `transform: translate(${textOffsetX}px, ${textOffsetY}px);`;

    const pStartX = Number(config.primary_text_start_offset ?? config.primary_text_offset_x) || 8;
    const pEndX = Number(config.primary_text_end_offset) || 250;
    const pOffsetY = Number(config.primary_text_offset_y) || 0;
    const pTrans = (pStartX !== 0 || pOffsetY !== 0) ? `transform: translate(${pStartX}px, ${pOffsetY}px);` : '';
    const pMargin = (pStartX !== 0 || pEndX !== 0) ? `margin-left: ${pStartX}px; margin-right: ${pEndX}px;` : '';
    const primaryTextOffsetStyle = `${pTrans} ${pMargin}`.trim();

    const sStartX = Number(config.secondary_text_start_offset ?? config.secondary_text_offset_x) || 8;
    const sEndX = Number(config.secondary_text_end_offset) || 250;
    const sOffsetY = Number(config.secondary_text_offset_y) || 0;
    const sTrans = (sStartX !== 0 || sOffsetY !== 0) ? `transform: translate(${sStartX}px, ${sOffsetY}px);` : '';
    const sMargin = (sStartX !== 0 || sEndX !== 0) ? `margin-left: ${sStartX}px; margin-right: ${sEndX}px;` : '';
    const secondaryTextOffsetStyle = `${sTrans} ${sMargin}`.trim();

    const featuresOffsetX = Number(config.features_offset_x) || 0;
    const featuresOffsetY = Number(config.features_offset_y) || 0;
    const featuresOffsetStyle = (featuresOffsetX !== 0 || featuresOffsetY !== 0) ? `transform: translate(${featuresOffsetX}px, ${featuresOffsetY}px);` : '';

    const mainStartOffset = Number(config.slider_start_offset) || 0;
    const mainEndOffset = Number(config.slider_end_offset) || 0;
    const mainSliderMarginOffsets = [
      mainStartOffset ? `margin-left: ${mainStartOffset}px !important;` : '',
      mainEndOffset ? `margin-right: ${mainEndOffset}px !important;` : '',
    ].filter(Boolean).join(' ');

    const ctStartOffset = Number(config.color_temp_start_offset) || 0;
    const ctEndOffset = Number(config.color_temp_end_offset) || 0;
    const colorTempMarginOffsets = [
      ctStartOffset ? `margin-left: ${ctStartOffset}px !important;` : '',
      ctEndOffset ? `margin-right: ${ctEndOffset}px !important;` : '',
    ].filter(Boolean).join(' ');

    const csStartOffset = Number(config.color_slider_start_offset) || 0;
    const csEndOffset = Number(config.color_slider_end_offset) || 0;
    const colorHueMarginOffsets = [
      csStartOffset ? `margin-left: ${csStartOffset}px !important;` : '',
      csEndOffset ? `margin-right: ${csEndOffset}px !important;` : '',
    ].filter(Boolean).join(' ');

    const textBoxWidth = config.text_box_width ? `max-width: ${config.text_box_width}; width: ${config.text_box_width};` : 'width: 100%; max-width: 100%;';

    // Typography
    const primaryFamily = config.font_family_primary ? `font-family: ${config.font_family_primary};` : '';
    const primarySize = `font-size: ${config.font_size_primary ?? 14}px;`;
    const primaryWeight = `font-weight: ${config.font_weight_primary ?? '800'};`;
    const primaryTransform = `text-transform: ${config.text_transform_primary ?? 'capitalize'};`;
    const letterSpacingStyle = `letter-spacing: ${config.letter_spacing ?? -0.5}px;`;
    const lineHeightStyle = `line-height: ${config.line_height ?? 1.1};`;
    const primaryTextStyle = `${primaryFamily} ${primarySize} ${primaryWeight} ${primaryTransform} ${letterSpacingStyle} ${lineHeightStyle}`.trim();

    const secondaryFamily = config.font_family_secondary ? `font-family: ${config.font_family_secondary};` : '';
    const secondarySize = `font-size: ${config.font_size_secondary ?? 15}px;`;
    const secondaryWeight = config.font_weight_secondary ? `font-weight: ${config.font_weight_secondary};` : '';
    const secondaryTransform = `text-transform: ${config.text_transform_secondary ?? 'capitalize'};`;
    const secondaryTextStyle = `${secondaryFamily} ${secondarySize} ${secondaryWeight} ${secondaryTransform} ${letterSpacingStyle} ${lineHeightStyle}`.trim();

    const result: ComputedCardStyles = {
      staticCardStyles,
      staticCardClasses,
      textOffsetStyle,
      primaryTextOffsetStyle,
      secondaryTextOffsetStyle,
      featuresOffsetStyle,
      mainSliderMarginOffsets,
      colorTempMarginOffsets,
      colorHueMarginOffsets,
      textBoxWidth,
      primaryTextStyle,
      secondaryTextStyle,
    };

    this._computedStylesCache.set(cacheKey, result);
    return result;
  }
}
