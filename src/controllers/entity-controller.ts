/**
 * Entity Controller for Antigravity Cards
 * Manages domain-aware state resolution, friendly name sanitization, active state detection, and live color computation.
 */

import { ACTIVE_STATES } from '../constants';
import {
  kelvinToRgb,
  rgbToHex,
  rgbToHue,
  hsToRgb,
  parseColorToRgb,
} from '../color-converter';

const RGB_COLOR_MODES = new Set(['hs', 'xy', 'rgb', 'rgbw', 'rgbww']);

export interface LightFeatureSupport {
  supportsBrightness: boolean;
  supportsColorTemp: boolean;
  supportsColor: boolean;
}

export class EntityController {
  private static _nameCache = new Map<string, string>();

  /**
   * Determine whether an entity is currently in an active state.
   */
  public static isEntityActive(stateObj: any): boolean {
    if (!stateObj) return false;
    return ACTIVE_STATES.has(stateObj.state);
  }

  /**
   * Extract clean domain from entity ID.
   */
  public static getDomain(entityId?: string): string {
    if (!entityId || typeof entityId !== 'string') return '';
    return entityId.split('.')[0] || '';
  }

  /**
   * Clean redundant domain words from friendly names (e.g. "Living Room Motion" -> "Living Room").
   */
  public static getCleanName(entityId: string, stateObj: any, customName?: string): string {
    if (customName && customName.trim()) {
      return customName.trim();
    }
    const rawName = stateObj?.attributes?.friendly_name;
    if (!rawName) {
      return entityId ? entityId.split('.')[1]?.replace(/_/g, ' ') || entityId : '';
    }

    if (this._nameCache.has(rawName)) {
      return this._nameCache.get(rawName)!;
    }

    let clean = rawName
      .replace(/\b(Motion Sensor|Motion Detector|Motion|Opening|Contact Sensor|Contact|Door Sensor|Door Lock|Lock|Smart Plug Dimmer|Smart Plug|Dimmer|Light Switch|Switch)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!clean) clean = rawName;
    this._nameCache.set(rawName, clean);
    return clean;
  }

  /**
   * Resolve live light color from state attributes (prioritizing RGB / HS over color temp).
   */
  public static getLightLiveColor(stateObj: any): string | null {
    if (!stateObj || !stateObj.attributes || (stateObj.state !== undefined && stateObj.state !== 'on')) return null;
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

  /**
   * Alias for getLightLiveColor
   */
  public static getLiveLightColor(stateObj: any): string | null {
    return this.getLightLiveColor(stateObj);
  }

  /**
   * Get hex color code for the live state.
   */
  public static getLiveHex(stateObj: any): string {
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
    const liveColor = this.getLightLiveColor(stateObj);
    if (!liveColor) return "#ffffff";
    const rgb = parseColorToRgb(liveColor);
    return rgb ? rgbToHex(rgb) : "#ffffff";
  }

  /**
   * Get live hue (0-360) for color wheel or hue slider.
   */
  public static getLiveHue(stateObj: any): number {
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

  /**
   * Detect supported color and brightness modes for light entities.
   */
  public static detectLightFeatures(stateObj: any): LightFeatureSupport {
    const supportedModes = stateObj?.attributes?.supported_color_modes;
    let supportsBrightness = stateObj?.attributes?.brightness !== undefined;
    let supportsColorTemp = false;
    let supportsColor = false;

    if (Array.isArray(supportedModes)) {
      for (let i = 0; i < supportedModes.length; i++) {
        const m = supportedModes[i];
        if (m !== 'onoff') supportsBrightness = true;
        if (m === 'color_temp') supportsColorTemp = true;
        if (RGB_COLOR_MODES.has(m)) supportsColor = true;
      }
    }

    return { supportsBrightness, supportsColorTemp, supportsColor };
  }

  /**
   * Determine the default active color for an entity based on its domain and state.
   */
  public static getDefaultActiveColor(domain: string, stateObj: any, liveLightColor: string | null = null): string {
    if (domain === 'climate') {
      if (stateObj?.state === 'heat') return 'var(--state-climate-heat-color, #ff7043)';
      if (stateObj?.state === 'cool') return 'var(--state-climate-cool-color, #42a5f5)';
      if (stateObj?.state === 'dry') return 'var(--state-climate-dry-color, #ab47bc)';
      if (stateObj?.state === 'fan_only') return 'var(--state-climate-fan_only-color, #26a69a)';
    } else if (domain === 'light') {
      if (liveLightColor) return liveLightColor;
    } else if (domain === 'binary_sensor' || domain === 'lock' || domain === 'switch') {
      return '#d60000';
    }
    return 'var(--primary-color)';
  }

  /**
   * Determine the default inactive color for an entity based on its domain.
   */
  public static getDefaultInactiveColor(domain: string): string {
    if (domain === 'light') {
      return '#000000';
    }
    if (domain === 'binary_sensor' || domain === 'lock' || domain === 'switch') {
      return '#03b500';
    }
    return 'var(--secondary-background-color, rgba(150, 150, 150, 0.2))';
  }
}
