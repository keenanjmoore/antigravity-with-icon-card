import { describe, it, expect } from 'vitest';
import { EntityController } from '../src/controllers/entity-controller';
import { InteractionController } from '../src/controllers/interaction-controller';

describe('EntityController', () => {
  it('detects domain correctly', () => {
    expect(EntityController.getDomain('light.living_room')).toBe('light');
    expect(EntityController.getDomain('binary_sensor.motion')).toBe('binary_sensor');
    expect(EntityController.getDomain('')).toBe('');
  });

  it('evaluates active states properly', () => {
    expect(EntityController.isEntityActive({ state: 'on' })).toBe(true);
    expect(EntityController.isEntityActive({ state: 'unlocked' })).toBe(true);
    expect(EntityController.isEntityActive({ state: 'open' })).toBe(true);
    expect(EntityController.isEntityActive({ state: 'off' })).toBe(false);
    expect(EntityController.isEntityActive({ state: 'locked' })).toBe(false);
    expect(EntityController.isEntityActive(null)).toBe(false);
  });

  it('strips redundant words from friendly names', () => {
    const stateObj = { attributes: { friendly_name: 'Living Room Motion Sensor' } };
    expect(EntityController.getCleanName('binary_sensor.living_room', stateObj)).toBe('Living Room');
  });

  it('preserves custom names', () => {
    const stateObj = { attributes: { friendly_name: 'Living Room Motion' } };
    expect(EntityController.getCleanName('binary_sensor.living_room', stateObj, 'Custom Lounge')).toBe('Custom Lounge');
  });

  it('resolves live light color prioritizing rgb_color', () => {
    const stateObj = {
      attributes: {
        color_mode: 'rgb',
        rgb_color: [255, 100, 50],
        color_temp_kelvin: 3000
      }
    };
    expect(EntityController.getLiveLightColor(stateObj)).toBe('rgb(255, 100, 50)');
  });
});

describe('InteractionController', () => {
  it('tracks touch slop and detects movements over threshold', () => {
    const controller = new InteractionController();
    const eDown = { clientX: 100, clientY: 100 } as PointerEvent;
    controller.handlePointerDown(eDown);

    // Small micro-jitter (under 8px)
    const eMoveSmall = { clientX: 103, clientY: 104 } as PointerEvent;
    expect(controller.handlePointerMove(eMoveSmall, 8)).toBe(false);

    // Significant drag (over 8px)
    const eMoveLarge = { clientX: 120, clientY: 100 } as PointerEvent;
    expect(controller.handlePointerMove(eMoveLarge, 8)).toBe(true);

    // When pointer up fires after large move, it should not trigger a valid tap
    expect(controller.handlePointerUp()).toBe(false);
  });

  it('validates a clean stationary tap', () => {
    const controller = new InteractionController();
    controller.handlePointerDown({ clientX: 50, clientY: 50 } as PointerEvent);
    expect(controller.handlePointerUp()).toBe(true);
  });

  it('cancels tap on pointercancel', () => {
    const controller = new InteractionController();
    controller.handlePointerDown({ clientX: 50, clientY: 50 } as PointerEvent);
    controller.handlePointerCancel();
    expect(controller.handlePointerUp()).toBe(false);
  });
});
