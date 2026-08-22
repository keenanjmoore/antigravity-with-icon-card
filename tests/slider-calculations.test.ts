import { describe, it, expect } from 'vitest';
import { sliderCalculations } from '../src/slider-calculations';

describe('SliderCalculationsEngine', () => {
  describe('snapToStep', () => {
    it('correctly snaps integers with step 1', () => {
      expect(sliderCalculations.snapToStep(42.3, 1, 0)).toBe(42);
      expect(sliderCalculations.snapToStep(42.7, 1, 0)).toBe(43);
    });

    it('correctly snaps floats avoiding 0.1 float precision issues', () => {
      expect(sliderCalculations.snapToStep(20.34, 0.5, 10)).toBe(20.5);
      expect(sliderCalculations.snapToStep(0.1 + 0.2, 0.1, 0)).toBe(0.3);
      expect(sliderCalculations.snapToStep(21.1234, 0.2, 20)).toBe(21.2);
    });

    it('handles NaN and zero/negative step', () => {
      expect(sliderCalculations.snapToStep(NaN, 1, 10)).toBe(10);
      expect(sliderCalculations.snapToStep(25, 0, 0)).toBe(25);
      expect(sliderCalculations.snapToStep(25, -1, 0)).toBe(25);
    });
  });

  describe('clamp', () => {
    it('clamps values within bounds', () => {
      expect(sliderCalculations.clamp(50, 0, 100)).toBe(50);
      expect(sliderCalculations.clamp(-10, 0, 100)).toBe(0);
      expect(sliderCalculations.clamp(150, 0, 100)).toBe(100);
      expect(sliderCalculations.clamp(NaN, 10, 20)).toBe(10);
    });
  });

  describe('valueToPercent and percentToValue', () => {
    it('converts value to 0-100 percentage accurately', () => {
      expect(sliderCalculations.valueToPercent(50, 0, 100)).toBe(50);
      expect(sliderCalculations.valueToPercent(15, 10, 20)).toBe(50);
      expect(sliderCalculations.valueToPercent(20, 10, 20)).toBe(100);
      expect(sliderCalculations.valueToPercent(5, 10, 20)).toBe(0);
      expect(sliderCalculations.valueToPercent(NaN, 0, 100)).toBe(0);
    });

    it('converts percent back to value accurately', () => {
      expect(sliderCalculations.percentToValue(50, 0, 100)).toBe(50);
      expect(sliderCalculations.percentToValue(50, 10, 20)).toBe(15);
      expect(sliderCalculations.percentToValue(100, 10, 20)).toBe(20);
      expect(sliderCalculations.percentToValue(0, 10, 20)).toBe(10);
    });

    it('handles reversed min/max bounds safely without crashing', () => {
      expect(sliderCalculations.valueToPercent(15, 20, 10)).toBe(0);
      expect(sliderCalculations.percentToValue(50, 20, 20)).toBe(20);
    });
  });

  describe('domain slider configs', () => {
    it('creates light slider config', () => {
      const stateObj = { attributes: { brightness: 128 } };
      const cfg = sliderCalculations.getSliderConfig('light', stateObj);
      expect(cfg).not.toBeNull();
      expect(cfg?.domain).toBe('light');
      expect(cfg?.currentValue).toBe(128);
      expect(cfg?.currentPercent).toBe(50);
      expect(cfg?.min).toBe(0);
      expect(cfg?.max).toBe(255);
    });

    it('creates fan slider config with percentage_step', () => {
      const stateObj = { attributes: { percentage: 60, percentage_step: 20 } };
      const cfg = sliderCalculations.getSliderConfig('fan', stateObj);
      expect(cfg).not.toBeNull();
      expect(cfg?.currentPercent).toBe(60);
      expect(cfg?.step).toBe(20);
    });

    it('creates media_player slider config with muted state', () => {
      const stateObj = { attributes: { volume_level: 0.75, is_volume_muted: true } };
      const cfg = sliderCalculations.getSliderConfig('media_player', stateObj);
      expect(cfg).not.toBeNull();
      expect(cfg?.label).toBe('Muted');
      expect(cfg?.currentValue).toBe(0);
    });

    it('returns null for unhandled domain or null stateObj', () => {
      expect(sliderCalculations.getSliderConfig('sensor', { state: '12' })).toBeNull();
      expect(sliderCalculations.getSliderConfig('light', null)).toBeNull();
    });
  });
});
