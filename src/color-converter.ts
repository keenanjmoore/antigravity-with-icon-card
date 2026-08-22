/**
 * Color Converter & Parser Utility for Antigravity Cards
 * Features a true LRU cache with access tracking, pre-compiled regexes, fast bitwise math, and bounds safety.
 */

import { RGBTuple } from './types';
import { COLOR_CACHE_MAX_ENTRIES } from './constants';

const RGB_RGBA_REGEX = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i;
const ARRAY_STR_REGEX = /^\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]$/;

class ColorConverterService {
  private _cache = new Map<string, RGBTuple | null>();
  private _cacheAccessTimes = new Map<string, number>();

  /**
   * Parse any CSS color string into an [r, g, b] integer tuple.
   * Uses a true LRU cache with access timestamp tracking.
   */
  public parseColorToRgb(colorStr: string): RGBTuple | null {
    if (!colorStr || typeof colorStr !== 'string') return null;
    const trimmed = colorStr.trim();
    if (!trimmed) return null;

    if (this._cache.has(trimmed)) {
      this._cacheAccessTimes.set(trimmed, Date.now());
      return this._cache.get(trimmed)!;
    }

    let result: RGBTuple | null = null;

    // 1. Hex Color (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
    if (trimmed.charCodeAt(0) === 35 /* '#' */) {
      const hex = trimmed.substring(1);
      const len = hex.length;
      if (len === 3 || len === 4) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          result = [r, g, b];
        }
      } else if (len >= 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          result = [r, g, b];
        }
      }
    }
    // 2. rgb(...) / rgba(...)
    else if (trimmed.startsWith('rgb')) {
      const match = trimmed.match(RGB_RGBA_REGEX);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          result = [
            Math.max(0, Math.min(255, r)),
            Math.max(0, Math.min(255, g)),
            Math.max(0, Math.min(255, b)),
          ];
        }
      }
    }
    // 3. Array string e.g. "[255, 0, 0]"
    else if (trimmed.charCodeAt(0) === 91 /* '[' */ && trimmed.charCodeAt(trimmed.length - 1) === 93 /* ']' */) {
      const match = trimmed.match(ARRAY_STR_REGEX);
      if (match) {
        result = [
          Math.max(0, Math.min(255, parseInt(match[1], 10))),
          Math.max(0, Math.min(255, parseInt(match[2], 10))),
          Math.max(0, Math.min(255, parseInt(match[3], 10))),
        ];
      }
    }

    // Evict least recently accessed if cache is full
    if (this._cache.size >= COLOR_CACHE_MAX_ENTRIES) {
      let lruKey: string | null = null;
      let lruTime = Infinity;
      for (const [key, time] of this._cacheAccessTimes) {
        if (time < lruTime) {
          lruTime = time;
          lruKey = key;
        }
      }
      if (lruKey !== null) {
        this._cache.delete(lruKey);
        this._cacheAccessTimes.delete(lruKey);
      }
    }

    const now = Date.now();
    this._cache.set(trimmed, result);
    this._cacheAccessTimes.set(trimmed, now);
    return result;
  }

  /**
   * Convert an [r, g, b] tuple to a 6-character hex string (#rrggbb).
   */
  public rgbToHex(rgb: RGBTuple): string {
    if (!rgb || isNaN(rgb[0]) || isNaN(rgb[1]) || isNaN(rgb[2])) return '#000000';
    const r = Math.max(0, Math.min(255, rgb[0] | 0)).toString(16).padStart(2, '0');
    const g = Math.max(0, Math.min(255, rgb[1] | 0)).toString(16).padStart(2, '0');
    const b = Math.max(0, Math.min(255, rgb[2] | 0)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  /**
   * Extract Hue angle (0-360) from an RGB tuple with strict NaN and bounds guards.
   */
  public rgbToHue(r: number, g: number, b: number): number {
    if (isNaN(r) || isNaN(g) || isNaN(b)) return 0;
    r = Math.max(0, Math.min(255, r)) / 255;
    g = Math.max(0, Math.min(255, g)) / 255;
    b = Math.max(0, Math.min(255, b)) / 255;

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
    h = isNaN(h) ? 0 : Math.max(0, Math.min(360, h));
    s = isNaN(s) ? 0 : Math.max(0, Math.min(1, s));
    v = isNaN(v) ? 0 : Math.max(0, Math.min(1, v));

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h >= 0 && h < 60) { r1 = c; g1 = x; }
    else if (h >= 60 && h < 120) { r1 = x; g1 = c; }
    else if (h >= 120 && h < 180) { g1 = c; b1 = x; }
    else if (h >= 180 && h < 240) { g1 = x; b1 = c; }
    else if (h >= 240 && h < 300) { r1 = x; b1 = c; }
    else if (h >= 300 && h <= 360) { r1 = c; b1 = x; }
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
    if (isNaN(kelvin)) return [255, 255, 255];
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
    if (!a || !b) return [0, 0, 0];
    const f = isNaN(factor) ? 0 : Math.max(0, Math.min(1, factor));
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
