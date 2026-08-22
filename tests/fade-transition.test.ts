import { describe, it, expect } from 'vitest';
import { fadeTransitionManager } from '../src/fade-transition';

describe('FadeTransitionManager', () => {
  it('returns disabled result when fade is disabled or staticDurations is null', () => {
    const config = { fade_transition_enabled: false };
    const stateObj = { state: 'off', last_changed: new Date().toISOString() };
    const res = fadeTransitionManager.calculateFade(config as any, stateObj, null, '#ff0000', '#00ff00');
    expect(res.enabled).toBe(false);
    expect(res.activeFade).toBe(false);
  });

  it('returns disabled result when stateObj is null or missing timestamps', () => {
    const config = { fade_transition_enabled: true };
    const staticDurations = fadeTransitionManager.precomputeDurations(config as any);
    const res = fadeTransitionManager.calculateFade(config as any, null, staticDurations, '#ff0000', '#00ff00');
    expect(res.enabled).toBe(false);
  });

  it('calculates stage 1 fade when entity recently changed', () => {
    const now = Date.now();
    const config = {
      fade_transition_enabled: true,
      fade_trigger: 'on_inactive',
      fade_stage_1_duration: 60,
      fade_stage_1_color: '#ff9800',
      fade_stage_2_duration: 600,
      fade_stage_2_color: '#cddc39',
      fade_stage_3_duration: 1800,
      fade_stage_3_color: '#4caf50',
    };
    const staticDurations = fadeTransitionManager.precomputeDurations(config as any);
    // 30 seconds ago (midway in Stage 1)
    const stateObj = {
      state: 'off',
      last_changed: new Date(now - 30 * 1000).toISOString()
    };
    const res = fadeTransitionManager.calculateFade(config as any, stateObj, staticDurations, '#d60000', '#03b500');
    expect(res.enabled).toBe(true);
    expect(res.activeFade).toBe(true);
    expect(res.currentStage).toBe(1);
    expect(res.progressPct).toBeGreaterThan(0);
    expect(res.progressPct).toBeLessThan(100);
  });

  it('reaches terminal inactive state after all stages elapse (>2460s)', () => {
    const now = Date.now();
    const config = {
      fade_transition_enabled: true,
      fade_trigger: 'on_inactive',
      fade_stage_1_duration: 60,
      fade_stage_1_color: '#ff9800',
      fade_stage_2_duration: 600,
      fade_stage_2_color: '#cddc39',
      fade_stage_3_duration: 1800,
      fade_stage_3_color: '#4caf50',
    };
    const staticDurations = fadeTransitionManager.precomputeDurations(config as any);
    // 3000 seconds ago (past total duration 60+600+1800 = 2460s)
    const stateObj = {
      state: 'off',
      last_changed: new Date(now - 3000 * 1000).toISOString()
    };
    const res = fadeTransitionManager.calculateFade(config as any, stateObj, staticDurations, '#d60000', '#03b500');
    expect(res.enabled).toBe(true);
    expect(res.currentColor).toEqual([3, 181, 0]);
    expect(res.progressPct).toBe(100);
  });
});
