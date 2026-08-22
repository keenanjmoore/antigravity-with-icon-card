/**
 * Domain Sliders, Color Palettes & Preset Definitions for Antigravity Cards
 * Encapsulates color chips, temperature presets, and slider calculation helper structures.
 */

export interface ColorSwatchPreset {
  label: string;
  hex: string;
  rgb: [number, number, number];
}

export interface ColorTempPreset {
  k: number;
  label: string;
  rgb: [number, number, number];
}

export const COLOR_SWATCHES: readonly ColorSwatchPreset[] = Object.freeze([
  { label: 'Warm White', hex: '#ffb74d', rgb: [255, 183, 77] },
  { label: 'Neutral White', hex: '#ffffff', rgb: [255, 255, 255] },
  { label: 'Cool White', hex: '#e1f5fe', rgb: [225, 245, 254] },
  { label: 'Crimson Red', hex: '#f44336', rgb: [244, 67, 54] },
  { label: 'Sunset Orange', hex: '#ff9800', rgb: [255, 152, 0] },
  { label: 'Amber Gold', hex: '#ffc107', rgb: [255, 193, 7] },
  { label: 'Emerald Green', hex: '#4caf50', rgb: [76, 175, 80] },
  { label: 'Cyan Blue', hex: '#00bcd4', rgb: [0, 188, 212] },
  { label: 'Sky Blue', hex: '#2196f3', rgb: [33, 150, 243] },
  { label: 'Deep Indigo', hex: '#3f51b5', rgb: [63, 81, 181] },
  { label: 'Vibrant Purple', hex: '#9c27b0', rgb: [156, 39, 176] },
  { label: 'Hot Pink', hex: '#e91e63', rgb: [233, 30, 99] },
]);

export const COLOR_TEMP_PRESETS: readonly ColorTempPreset[] = Object.freeze([
  { k: 2200, label: 'Candle (2200K)', rgb: [255, 147, 41] },
  { k: 2700, label: 'Warm (2700K)', rgb: [255, 180, 107] },
  { k: 3000, label: 'Soft (3000K)', rgb: [255, 197, 143] },
  { k: 4000, label: 'Neutral (4000K)', rgb: [255, 228, 206] },
  { k: 5000, label: 'Daylight (5000K)', rgb: [255, 249, 253] },
  { k: 6500, label: 'Cool (6500K)', rgb: [205, 226, 255] },
]);
