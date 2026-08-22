/**
 * Entity Controller for Antigravity Cards
 * Manages domain-aware state resolution, friendly name sanitization, active state detection, and live color computation.
 */

import { ACTIVE_STATES, COLOR_MODES_SET } from '../constants';
import { colorConverter } from '../color-converter';

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
   * Resolve live light color from state attributes (prioritizing RGB / HS over stale color temp).
   */
  public static getLiveLightColor(stateObj: any): string | null {
    if (!stateObj?.attributes) return null;
    const attrs = stateObj.attributes;

    if (attrs.color_mode && COLOR_MODES_SET.has(attrs.color_mode)) {
      if (Array.isArray(attrs.rgb_color) && attrs.rgb_color.length === 3) {
        return `rgb(${attrs.rgb_color[0]}, ${attrs.rgb_color[1]}, ${attrs.rgb_color[2]})`;
      }
      if (Array.isArray(attrs.hs_color) && attrs.hs_color.length === 2) {
        const rgb = colorConverter.hsvToRgb(attrs.hs_color[0], attrs.hs_color[1] / 100, 1);
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
    }

    if (attrs.color_mode === 'color_temp' || attrs.color_temp_kelvin || attrs.color_temp) {
      const kelvin = attrs.color_temp_kelvin || (attrs.color_temp ? Math.round(1000000 / attrs.color_temp) : 4000);
      const rgb = colorConverter.kelvinToRgb(kelvin);
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    if (Array.isArray(attrs.rgb_color) && attrs.rgb_color.length === 3) {
      return `rgb(${attrs.rgb_color[0]}, ${attrs.rgb_color[1]}, ${attrs.rgb_color[2]})`;
    }

    return null;
  }
}
