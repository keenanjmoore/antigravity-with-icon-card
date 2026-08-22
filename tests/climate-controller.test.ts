import { describe, it, expect } from 'vitest';
import { sliderCalculations } from '../src/slider-calculations';

describe('Climate Temperature Unit & Range Resolution', () => {
  it('respects entity-provided min_temp and max_temp', () => {
    const stateObj = {
      state: 'heat',
      attributes: {
        min_temp: 62,
        max_temp: 82,
        temperature: 72,
        target_temp_step: 1
      }
    };
    const cfg = sliderCalculations.getSliderConfig('climate', stateObj);
    expect(cfg).not.toBeNull();
    expect(cfg?.min).toBe(62);
    expect(cfg?.max).toBe(82);
    expect(cfg?.currentValue).toBe(72);
    expect(cfg?.currentPercent).toBe(50);
  });

  it('uses Home Assistant unit_system °F when min/max are omitted', () => {
    const stateObj = {
      state: 'cool',
      attributes: {
        temperature: 70
      }
    };
    const hass = {
      config: {
        unit_system: {
          temperature: '°F'
        }
      }
    };
    const cfg = sliderCalculations.getSliderConfig('climate', stateObj, hass);
    expect(cfg).not.toBeNull();
    expect(cfg?.min).toBe(50);
    expect(cfg?.max).toBe(90);
    expect(cfg?.step).toBe(1);
    expect(cfg?.currentPercent).toBe(50); // 70 is midpoint of 50-90
  });

  it('uses Celsius bounds when unit is °C', () => {
    const stateObj = {
      state: 'heat',
      attributes: {
        unit_of_measurement: '°C',
        temperature: 20
      }
    };
    const cfg = sliderCalculations.getSliderConfig('climate', stateObj);
    expect(cfg).not.toBeNull();
    expect(cfg?.min).toBe(15);
    expect(cfg?.max).toBe(32);
    expect(cfg?.step).toBe(0.5);
  });

  it('safely handles reversed min >= max bounds', () => {
    const stateObj = {
      state: 'heat',
      attributes: {
        min_temp: 80,
        max_temp: 70,
        temperature: 75
      }
    };
    const cfg = sliderCalculations.getSliderConfig('climate', stateObj);
    expect(cfg).not.toBeNull();
    expect(cfg?.max).toBeGreaterThan(cfg!.min);
  });
});
