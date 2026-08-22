/**
 * Color Converter & Parser Utility for Antigravity Cards
 * Features a 256-entry LRU cache, fast integer math, and support for Hex/RGB/RGBA/HSL/HSV formats.
 */

import { RGBTuple } from './types';
import { COLOR_CACHE_MAX_ENTRIES } from './constants';

class ColorConverterService {
  private _cache = new Map<string, RGBTuple | null>();

  /**
   * Parse any CSS color string into an [r, g, b] integer tuple.
   * Caches results in an LRU map to avoid repeated regex and DOM allocation.
   */
  public parseColorToRgb(colorStr: string): RGBTuple | null {
    if (!colorStr || typeof colorStr !== 'string') return null;
    const trimmed = colorStr.trim();
    if (this._cache.has(trimmed)) {
      return this._cache.get(trimmed)!;
    }

    let result: RGBTuple | null = null;

    // 1. Hex Color (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
    if (trimmed.startsWith('#')) {
      const hex = trimmed.substring(1);
      if (hex.length === 3 || hex.length === 4) {
        result = [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16),
        ];
      } else if (hex.length >= 6) {
        result = [
          parseInt(hex.substring(0, 2), 16),
          parseInt(hex.substring(2, 4), 16),
          parseInt(hex.substring(4, 6), 16),
        ];
      }
    }
    // 2. rgb(...) / rgba(...)
    else if (trimmed.startsWith('rgb')) {
      const match = trimmed.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
      if (match) {
        result = [
          parseInt(match[1], 10),
          parseInt(match[2], 10),
          parseInt(match[3], 10),
        ];
      }
    }
    // 3. Array formatted string e.g. "[255, 0, 0]"
    else if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          result = [Number(parsed[0]) | 0, Number(parsed[1]) | 0, Number(parsed[2]) | 0];
        }
      } catch {
        // Ignore parse error
      }
    }

    // LRU Cache eviction
    if (this._cache.size >= COLOR_CACHE_MAX_ENTRIES) {
      const oldestKey = this._cache.keys().next().value;
      if (oldestKey !== undefined) this._cache.delete(oldestKey);
    }
    this._cache.set(trimmed, result);
    return result;
  }

  /**
   * Convert an [r, g, b] tuple to a 6-character hex string (#rrggbb).
   */
  public rgbToHex(rgb: RGBTuple): string {
    const r = Math.max(0, Math.min(255, rgb[0] | 0)).toString(16).padStart(2, '0');
    const g = Math.max(0, Math.min(255, rgb[1] | 0)).toString(16).padStart(2, '0');
    const b = Math.max(0, Math.min(255, rgb[2] | 0)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  /**
   * Extract Hue angle (0-360) from an RGB tuple.
   */
  public rgbToHue(r: number, g: number, b: number): number {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d === 0) return 0;
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else if (max === b) h = (r - g) / d + 4;
    return Math.round((h / 6) * 360) % 360;
  }

  /**
   * Convert HSV values (h: 0-360, s: 0-1, v: 0-1) to an RGB tuple.
   */
  public hsvToRgb(h: number, s: number, v: number): RGBTuple {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h >= 0 && h < 60) { r1 = c; g1 = x; }
    else if (h >= 60 && h < 120) { r1 = x; g1 = c; }
    else if (h >= 120 && h < 180) { g1 = c; b1 = x; }
    else if (h >= 180 && h < 240) { g1 = x; b1 = c; }
    else if (h >= 240 && h < 300) { r1 = x; b1 = c; }
    else if (h >= 300 && h < 360) { r1 = c; b1 = x; }
    return [
      Math.round((r1 + m) * 255),
      Math.round((g1 + m) * 255),
      Math.round((b1 + m) * 255),
    ];
  }

  /**
   * Convert Kelvin temperature to an approximation RGB tuple.
   */
  public kelvinToRgb(kelvin: number): RGBTuple {
    const temp = Math.max(1000, Math.min(40000, kelvin)) / 100;
    let r = 0, g = 0, b = 0;

    // Red
    if (temp <= 66) {
      r = 255;
    } else {
      r = Math.min(255, Math.max(0, 329.698727446 * Math.pow(temp - 60, -0.1332047592)));
    }

    // Green
    if (temp <= 66) {
      g = Math.min(255, Math.max(0, 99.4708025861 * Math.log(temp) - 161.1195681661));
    } else {
      g = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)));
    }

    // Blue
    if (temp >= 66) {
      b = 255;
    } else if (temp <= 19) {
      b = 0;
    } else {
      b = Math.min(255, Math.max(0, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
    }

    return [Math.round(r), Math.round(g), Math.round(b)];
  }

  /**
   * Linear interpolation between two RGB tuples.
   */
  public lerpRgb(a: RGBTuple, b: RGBTuple, factor: number): RGBTuple {
    const f = Math.max(0, Math.min(1, factor));
    return [
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f),
    ];
  }
}

export const colorConverter = new ColorConverterService();
export const parseColorToRgb = colorConverter.parseColorToRgb.bind(colorConverter);
export const rgbToHex = colorConverter.rgbToHex.bind(colorConverter);
export const rgbToHue = colorConverter.rgbToHue.bind(colorConverter);
export const hsvToRgb = colorConverter.hsvToRgb.bind(colorConverter);
export const kelvinToRgb = colorConverter.kelvinToRgb.bind(colorConverter);
export const lerpRgb = colorConverter.lerpRgb.bind(colorConverter);
