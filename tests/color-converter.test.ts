import { describe, it, expect } from 'vitest';
import { colorConverter } from '../src/color-converter';

describe('ColorConverter', () => {
  describe('kelvinToRgb', () => {
    it('converts warm kelvin (2000K) to high red warm color', () => {
      const rgb = colorConverter.kelvinToRgb(2000);
      expect(rgb[0]).toBe(255);
      expect(rgb[1]).toBeGreaterThan(100);
      expect(rgb[2]).toBeLessThan(100);
    });

    it('converts daylight kelvin (6500K) to neutral/blue-tinted color', () => {
      const rgb = colorConverter.kelvinToRgb(6500);
      expect(rgb[0]).toBeGreaterThan(200);
      expect(rgb[1]).toBeGreaterThan(200);
      expect(rgb[2]).toBeGreaterThan(200);
    });

    it('clamps kelvin outside 1000-40000K', () => {
      const low = colorConverter.kelvinToRgb(500);
      const lowClamped = colorConverter.kelvinToRgb(1000);
      expect(low).toEqual(lowClamped);
    });
  });

  describe('parseColorToRgb and rgbToHex', () => {
    it('parses standard 6-digit hex and 3-digit hex', () => {
      expect(colorConverter.parseColorToRgb('#ff0000')).toEqual([255, 0, 0]);
      expect(colorConverter.parseColorToRgb('#03b500')).toEqual([3, 181, 0]);
      expect(colorConverter.parseColorToRgb('#f00')).toEqual([255, 0, 0]);
    });

    it('parses rgb and rgba strings', () => {
      expect(colorConverter.parseColorToRgb('rgb(255, 128, 0)')).toEqual([255, 128, 0]);
      expect(colorConverter.parseColorToRgb('rgba(0, 200, 100, 0.5)')).toEqual([0, 200, 100]);
    });

    it('converts rgb tuple back to hex string', () => {
      expect(colorConverter.rgbToHex([255, 0, 0])).toBe('#ff0000');
      expect(colorConverter.rgbToHex([3, 181, 0])).toBe('#03b500');
    });

    it('returns null for invalid color strings', () => {
      expect(colorConverter.parseColorToRgb('invalid')).toBeNull();
      expect(colorConverter.parseColorToRgb('')).toBeNull();
    });
  });

  describe('hsvToRgb and rgbToHue', () => {
    it('converts HSV hue=0 sat=1 val=1 to pure Red', () => {
      expect(colorConverter.hsvToRgb(0, 1, 1)).toEqual([255, 0, 0]);
    });

    it('converts HSV hue=120 sat=1 val=1 to pure Green', () => {
      expect(colorConverter.hsvToRgb(120, 1, 1)).toEqual([0, 255, 0]);
    });

    it('converts HSV hue=240 sat=1 val=1 to pure Blue', () => {
      expect(colorConverter.hsvToRgb(240, 1, 1)).toEqual([0, 0, 255]);
    });

    it('calculates Hue angle from RGB correctly', () => {
      expect(colorConverter.rgbToHue(255, 0, 0)).toBe(0);
      expect(colorConverter.rgbToHue(0, 255, 0)).toBe(120);
      expect(colorConverter.rgbToHue(0, 0, 255)).toBe(240);
    });
  });

  describe('lerpRgb', () => {
    it('interpolates between two RGB tuples smoothly', () => {
      const red = [255, 0, 0] as const;
      const blue = [0, 0, 255] as const;
      const mid = colorConverter.lerpRgb(red as any, blue as any, 0.5);
      expect(mid[0]).toBe(128);
      expect(mid[1]).toBe(0);
      expect(mid[2]).toBe(128);
    });
  });
});
