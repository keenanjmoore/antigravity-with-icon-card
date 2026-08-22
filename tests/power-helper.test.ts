import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PowerHelperService } from '../src/power-helper';

describe('PowerHelperService', () => {
  let service: PowerHelperService;

  beforeEach(() => {
    service = new PowerHelperService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('allows registering and unregistering change listeners cleanly', () => {
    let callCount = 0;
    const unsub = service.addChangeListener(() => {
      callCount++;
    });

    expect(service.listenerCount).toBe(1);

    service.setMockLowPower(true);
    expect(callCount).toBe(1);

    // Call unsubscribe
    unsub();
    expect(service.listenerCount).toBe(0);

    service.setMockLowPower(false);
    expect(callCount).toBe(1); // Should not increase after unsub
  });

  it('adjusts target frame interval based on power mode', () => {
    service.setMockLowPower(false);
    expect(service.getTargetFrameIntervalMs()).toBe(16);

    service.setMockLowPower(true);
    expect(service.getTargetFrameIntervalMs()).toBe(33);
  });

  it('prioritizes Home Assistant input_boolean.antigravity_power_save helper', () => {
    service.setMockLowPower(false);
    const mockHass = {
      states: {
        'input_boolean.antigravity_power_save': { state: 'on' }
      }
    };
    expect(service.isPowerSaveActive(mockHass)).toBe(true);
    expect(service.getTargetFrameIntervalMs(mockHass)).toBe(33);
  });
});
