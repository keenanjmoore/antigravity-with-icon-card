/**
 * StyleBuilder Engine for Antigravity Cards
 * Systematically constructs scoped CSS variables, dynamic typography, offsets, and theme classes.
 */

import { AntigravityCardConfig } from './types';
import { THEME_PRESETS } from './themes';
import {
  DEFAULT_BORDER_RADIUS_PX,
  DEFAULT_CARD_PADDING_PX,
  DEFAULT_CARD_PADDING_VERT_PX,
} from './constants';

export interface ComputedCardStyles {
  staticCardStyles: string;
  staticCardClasses: string;
  textOffsetStyle: string;
  featuresOffsetStyle: string;
  mainSliderMarginOffsets: string;
  colorTempMarginOffsets: string;
  colorHueMarginOffsets: string;
  textBoxWidth: string;
  primaryTextStyle: string;
  secondaryTextStyle: string;
}

export class StyleBuilder {
  /**
   * Precompute static style strings on configuration changes to eliminate render allocations.
   */
  public static computeStaticStyles(config: AntigravityCardConfig): ComputedCardStyles {
    const basePadding = config.card_padding ?? DEFAULT_CARD_PADDING_PX;
    const cardPaddingVert = config.card_padding_vertical ?? DEFAULT_CARD_PADDING_VERT_PX;
    const cardPaddingHoriz = config.card_padding_horizontal ?? basePadding;

    const pTop = config.card_padding_top ?? cardPaddingVert;
    const pBottom = config.card_padding_bottom ?? cardPaddingVert;
    const pLeft = config.card_padding_left ?? cardPaddingHoriz;
    const pRight = config.card_padding_right ?? cardPaddingHoriz;

    const baseMargin = config.card_margin;
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

    const borderRadius = config.border_radius ?? DEFAULT_BORDER_RADIUS_PX;
    const themeName = config.theme_preset ?? 'glassmorphism';
    const themeDef = THEME_PRESETS[themeName] || THEME_PRESETS.glassmorphism;
    const themeStyles = themeDef.generateStyles(config);

    const staticCardStyles = `
      padding: ${pTop}px ${pRight}px ${pBottom}px ${pLeft}px;
      border-radius: ${borderRadius}px;
      ${cardMarginStyle}
      ${themeStyles}
    `.trim();

    const staticCardClasses = `ha-card ${themeDef.cssClass} ${config.layout || 'default'}`;

    // Text & Container Offsets
    const textOffsetX = config.text_offset_x ?? 0;
    const textOffsetY = config.text_offset_y ?? 0;
    const textOffsetStyle = (textOffsetX !== 0 || textOffsetY !== 0)
      ? `transform: translate(${textOffsetX}px, ${textOffsetY}px);`
      : '';

    // Typography
    const primaryFamily = config.font_family_primary ? `font-family: ${config.font_family_primary};` : '';
    const primarySize = config.font_size_primary ? `font-size: ${config.font_size_primary}px;` : '';
    const primaryWeight = config.font_weight_primary ? `font-weight: ${config.font_weight_primary};` : '';
    const primaryTransform = config.text_transform_primary && config.text_transform_primary !== 'none'
      ? `text-transform: ${config.text_transform_primary};`
      : '';
    const primaryTextStyle = `${primaryFamily} ${primarySize} ${primaryWeight} ${primaryTransform}`.trim();

    const secondaryFamily = config.font_family_secondary ? `font-family: ${config.font_family_secondary};` : '';
    const secondarySize = config.font_size_secondary ? `font-size: ${config.font_size_secondary}px;` : '';
    const secondaryWeight = config.font_weight_secondary ? `font-weight: ${config.font_weight_secondary};` : '';
    const secondaryTransform = config.text_transform_secondary && config.text_transform_secondary !== 'none'
      ? `text-transform: ${config.text_transform_secondary};`
      : '';
    const secondaryTextStyle = `${secondaryFamily} ${secondarySize} ${secondaryWeight} ${secondaryTransform}`.trim();

    return {
      staticCardStyles,
      staticCardClasses,
      textOffsetStyle,
      featuresOffsetStyle: '',
      mainSliderMarginOffsets: '',
      colorTempMarginOffsets: '',
      colorHueMarginOffsets: '',
      textBoxWidth: '',
      primaryTextStyle,
      secondaryTextStyle,
    };
  }
}
