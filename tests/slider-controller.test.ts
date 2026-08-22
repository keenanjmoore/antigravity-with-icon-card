import { describe, it, expect, vi } from 'vitest';
import { EntityController } from '../src/controllers/entity-controller';
import { SliderController, SliderCallbacks } from '../src/controllers/slider-controller';

describe('EntityController', () => {
  it('correctly identifies active states', () => {
    expect(EntityController.isEntityActive({ state: 'on' })).toBe(true);
    expect(EntityController.isEntityActive({ state: 'open' })).toBe(true);
    expect(EntityController.isEntityActive({ state: 'playing' })).toBe(true);
    expect(EntityController.isEntityActive({ state: 'off' })).toBe(false);
    expect(EntityController.isEntityActive({ state: 'closed' })).toBe(false);
    expect(EntityController.isEntityActive(null)).toBe(false);
  });

  it('extracts clean domains from entity IDs', () => {
    expect(EntityController.getDomain('light.living_room')).toBe('light');
    expect(EntityController.getDomain('binary_sensor.front_door')).toBe('binary_sensor');
    expect(EntityController.getDomain('')).toBe('');
  });

  it('cleans redundant device class words from friendly names', () => {
    expect(EntityController.getCleanName('binary_sensor.front_door_motion', {
      attributes: { friendly_name: 'Front Door Motion Sensor' }
    })).toBe('Front Door');

    expect(EntityController.getCleanName('switch.kitchen_plug', {
      attributes: { friendly_name: 'Kitchen Smart Plug' }
    })).toBe('Kitchen');
  });

  it('detects supported light features', () => {
    const lightWithTemp = {
      attributes: {
        supported_color_modes: ['color_temp', 'brightness'],
        brightness: 180,
      }
    };
    const features = EntityController.detectLightFeatures(lightWithTemp);
    expect(features.supportsBrightness).toBe(true);
    expect(features.supportsColorTemp).toBe(true);
    expect(features.supportsColor).toBe(false);

    const rgbLight = {
      attributes: {
        supported_color_modes: ['hs', 'rgb'],
        brightness: 255,
      }
    };
    const rgbFeatures = EntityController.detectLightFeatures(rgbLight);
    expect(rgbFeatures.supportsBrightness).toBe(true);
    expect(rgbFeatures.supportsColorTemp).toBe(false);
    expect(rgbFeatures.supportsColor).toBe(true);
  });

  it('maps domain default active and inactive colors', () => {
    expect(EntityController.getDefaultActiveColor('climate', { state: 'heat' })).toBe('var(--state-climate-heat-color, #ff7043)');
    expect(EntityController.getDefaultActiveColor('binary_sensor', { state: 'on' })).toBe('#d60000');
    expect(EntityController.getDefaultInactiveColor('binary_sensor')).toBe('#03b500');
    expect(EntityController.getDefaultInactiveColor('light')).toBe('#000000');
  });
});

describe('SliderController', () => {
  const mockCallbacks: SliderCallbacks = {
    onSliderInput: vi.fn(),
    onSliderChange: vi.fn(),
    onColorInput: vi.fn(),
    callService: vi.fn(),
    forwardHaptic: vi.fn(),
  };

  it('renders generic slider without errors', () => {
    const config = { slider_style: 'google', show_slider_percent: true };
    const template = SliderController.renderGenericSlider(
      config as any,
      'brightness',
      'Brightness',
      0,
      255,
      1,
      128,
      50,
      'light',
      'turn_on',
      (v) => ({ brightness: v }),
      mockCallbacks
    );
    expect(template).toBeDefined();
    expect(template.strings.length).toBeGreaterThan(0);
  });

  it('renders decay slider with stage label', () => {
    const fade = {
      enabled: true,
      activeFade: true,
      currentColor: 'rgb(255, 152, 0)',
      progressPct: 45,
      remainingSeconds: 30,
      currentStage: 1,
      stageLabel: '30s left'
    };
    const template = SliderController.renderDecaySlider(fade as any);
    expect(template).toBeDefined();
    expect(template.values).toContain('30s left');
  });

  it('renders color temp presets correctly', () => {
    const config = { color_temp_type: 'presets', entity: 'light.lamp' };
    const stateObj = { attributes: { color_temp_kelvin: 2700 } };
    const template = SliderController.renderColorTempSlider(config as any, stateObj, mockCallbacks);
    expect(template).toBeDefined();
  });
});
