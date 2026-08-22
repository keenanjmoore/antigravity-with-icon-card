import { describe, it, expect, vi } from 'vitest';
import { SubButtonController } from '../src/controllers/sub-button-controller';

describe('SubButtonController', () => {
  it('resolves play_pause for playing media player', () => {
    const stateObj = { state: 'playing', attributes: {} };
    const res = SubButtonController.resolve('play_pause', 'media_player.living_room', undefined, stateObj);
    expect(res.icon).toBe('mdi:pause');
    expect(res.title).toBe('Pause');
    expect(res.isActive).toBe(true);

    const fakeHass = { callService: vi.fn() };
    res.defaultAction?.(fakeHass);
    expect(fakeHass.callService).toHaveBeenCalledWith('media_player', 'media_play_pause', {
      entity_id: 'media_player.living_room'
    });
  });

  it('resolves lock_unlock for locked and jammed states', () => {
    const lockedState = { state: 'locked', attributes: {} };
    const resLocked = SubButtonController.resolve('lock_unlock', 'lock.front_door', undefined, lockedState);
    expect(resLocked.icon).toBe('mdi:lock');
    expect(resLocked.title).toBe('Unlock');
    expect(resLocked.isActive).toBe(false);

    const jammedState = { state: 'jammed', attributes: {} };
    const resJammed = SubButtonController.resolve('lock_unlock', 'lock.front_door', undefined, jammedState);
    expect(resJammed.icon).toBe('mdi:lock-alert');
    expect(resJammed.title).toBe('Jammed (Alert!)');
    expect(resJammed.animClass).toBe('lock-jammed');
  });

  it('resolves temperature step up and step down in Fahrenheit', () => {
    const stateObj = { state: 'heat', attributes: { temperature: 70, max_temp: 85 } };
    const resUp = SubButtonController.resolve('temp_up', 'climate.thermostat', undefined, stateObj, undefined, undefined, true, '°F');
    expect(resUp.icon).toBe('mdi:thermometer-chevron-up');
    expect(resUp.label).toBe('+1°');

    const fakeHass = { callService: vi.fn() };
    resUp.defaultAction?.(fakeHass);
    expect(fakeHass.callService).toHaveBeenCalledWith('climate', 'set_temperature', {
      entity_id: 'climate.thermostat',
      temperature: 71
    });
  });

  it('resolves garage door toggle action', () => {
    const stateObj = { state: 'closed', attributes: {} };
    const res = SubButtonController.resolve('garage_toggle', 'cover.garage', undefined, stateObj);
    expect(res.icon).toBe('mdi:garage');
    expect(res.title).toBe('Open Garage');
    expect(res.isActive).toBe(false);

    const fakeHass = { callService: vi.fn() };
    res.defaultAction?.(fakeHass);
    expect(fakeHass.callService).toHaveBeenCalledWith('cover', 'toggle', {
      entity_id: 'cover.garage'
    });
  });
});
