import { describe, it, expect } from 'vitest';
import { InfoFormatter } from '../src/controllers/info-formatter';

describe('InfoFormatter', () => {
  it('parses timestamps and numbers safely', () => {
    const d1 = InfoFormatter.parseDate('2026-08-22T12:00:00Z');
    expect(d1).toBeInstanceOf(Date);
    expect(d1?.getTime()).toBe(Date.parse('2026-08-22T12:00:00Z'));

    const d2 = InfoFormatter.parseDate(1787415382000);
    expect(d2).toBeInstanceOf(Date);
    expect(d2?.getTime()).toBe(1787415382000);
  });

  it('formats relative elapsed time accurately', () => {
    const now = 1787415382000;
    expect(InfoFormatter.formatTimeAgo(now - 3000, true, now)).toBe('< 5s');
    expect(InfoFormatter.formatTimeAgo(now - 45000, true, now)).toBe('45s');
    expect(InfoFormatter.formatTimeAgo(now - 300000, true, now)).toBe('5m');
    expect(InfoFormatter.formatTimeAgo(now - 7200000, true, now)).toBe('2h');
  });

  it('formats climate state correctly with current and target temps', () => {
    const stateObj = {
      entity_id: 'climate.living_room',
      state: 'heat',
      attributes: {
        current_temperature: 68,
        temperature: 72,
        unit_of_measurement: '°F',
        hvac_action: 'heating'
      }
    };
    const hass = { config: { unit_system: { temperature: '°F' } } };
    const res = InfoFormatter.getInfoContent('state', stateObj, {}, hass);
    expect(res).toBe('heat (68°F → 72°F • heating)');
  });

  it('formats vacuum state with battery percentage', () => {
    const stateObj = {
      entity_id: 'vacuum.roborock',
      state: 'cleaning',
      attributes: {
        battery_level: 85
      }
    };
    const res = InfoFormatter.getInfoContent('state', stateObj, {}, {});
    expect(res).toBe('🧹 Cleaning • 🔋85%');
  });

  it('formats timer active countdown string', () => {
    const now = Date.now();
    const stateObj = {
      entity_id: 'timer.kitchen',
      state: 'active',
      attributes: {
        finishes_at: new Date(now + 125000).toISOString()
      }
    };
    const res = InfoFormatter.getInfoContent('state', stateObj, {}, {});
    expect(res).toMatch(/02:0[45]/);
  });
});
