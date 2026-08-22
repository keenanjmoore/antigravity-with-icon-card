/**
 * Multi-Stage Physical-Time Fade & Decay Transition Manager for Antigravity Cards
 * Computes 3-stage temporal decays with invalid timestamp guards and duration memoization.
 */

import { AntigravityCardConfig, FadeCalculationResult, RGBTuple } from './types';
import { parseColorToRgb, rgbToHex, lerpRgb } from './color-converter';
import {
  DEFAULT_FADE_STAGE_1_SECONDS,
  DEFAULT_FADE_STAGE_2_SECONDS,
  DEFAULT_FADE_STAGE_3_SECONDS,
  DEFAULT_STAGE_1_COLOR,
  DEFAULT_STAGE_2_COLOR,
  DEFAULT_STAGE_3_COLOR,
  ACTIVE_STATES,
} from './constants';

export interface FadeStaticDurations {
  d1: number;
  d2: number;
  d3: number;
  totalDuration: number;
  c1: RGBTuple;
  c2: RGBTuple;
  c3: RGBTuple;
}

const DISABLED_FADE_RESULT: FadeCalculationResult = Object.freeze({
  enabled: false,
  activeFade: false,
  currentColor: [0, 0, 0] as RGBTuple,
  colorHex: '',
  progressPct: 0,
  currentStage: 0,
});

export class FadeTransitionManager {
  private _previousLiveRgb: RGBTuple | null = null;
  private _currentLiveRgb: RGBTuple | null = null;
  private _lastTrackedState: string | null = null;
  private _cachedDurations: FadeStaticDurations | null = null;
  private _lastFadeConfigHash: string | null = null;

  /**
   * Precompute static duration and color bounds on configuration update.
   * Uses hashing to avoid re-parsing regexes when config is unchanged.
   */
  public precomputeDurations(config: AntigravityCardConfig): FadeStaticDurations | null {
    if (!config?.fade_transition_enabled) {
      this._cachedDurations = null;
      this._lastFadeConfigHash = null;
      return null;
    }

    const hash = `${config.fade_stage_1_duration}_${config.fade_stage_1_color}_${config.fade_stage_2_duration}_${config.fade_stage_2_color}_${config.fade_stage_3_duration}_${config.fade_stage_3_color}`;
    if (hash === this._lastFadeConfigHash && this._cachedDurations) {
      return this._cachedDurations;
    }

    const d1 = Number(config.fade_stage_1_duration) || DEFAULT_FADE_STAGE_1_SECONDS;
    const d2 = Number(config.fade_stage_2_duration) || DEFAULT_FADE_STAGE_2_SECONDS;
    const d3 = Number(config.fade_stage_3_duration) || DEFAULT_FADE_STAGE_3_SECONDS;
    const totalDuration = d1 + d2 + d3;
    if (totalDuration <= 0) {
      this._cachedDurations = null;
      this._lastFadeConfigHash = hash;
      return null;
    }

    const c1 = parseColorToRgb(config.fade_stage_1_color || DEFAULT_STAGE_1_COLOR) || [255, 152, 0];
    const c2 = parseColorToRgb(config.fade_stage_2_color || DEFAULT_STAGE_2_COLOR) || [205, 220, 57];
    const c3 = parseColorToRgb(config.fade_stage_3_color || DEFAULT_STAGE_3_COLOR) || [76, 175, 80];

    this._cachedDurations = { d1, d2, d3, totalDuration, c1, c2, c3 };
    this._lastFadeConfigHash = hash;
    return this._cachedDurations;
  }

  /**
   * Calculate live 3-stage fade color, stage number, and progress percentage.
   */
  public calculateFade(
    config: AntigravityCardConfig,
    stateObj: any,
    staticDurations: FadeStaticDurations | null,
    defaultActiveHex: string,
    defaultInactiveHex: string
  ): FadeCalculationResult {
    if (!config?.fade_transition_enabled || !stateObj || !staticDurations) {
      return DISABLED_FADE_RESULT;
    }

    const isActive = ACTIVE_STATES.has(stateObj.state);
    const trigger = config.fade_trigger ?? 'on_inactive';

    const shouldFade =
      (trigger === 'on_inactive' && !isActive) ||
      (trigger === 'on_active' && isActive) ||
      trigger === 'both';

    if (!shouldFade) {
      return DISABLED_FADE_RESULT;
    }

    const startColorStr = isActive ? defaultInactiveHex : defaultActiveHex;
    const finalColorStr = isActive ? defaultActiveHex : defaultInactiveHex;

    const startRgb = parseColorToRgb(startColorStr) || [214, 0, 0];
    const finalRgb = parseColorToRgb(finalColorStr) || [3, 177, 0];

    const { d1, d2, d3, totalDuration, c1: targetC1, c2: targetC2, c3: targetC3 } = staticDurations;

    // Track state changes for continuous live color pickup
    if (this._lastTrackedState !== null && this._lastTrackedState !== stateObj.state) {
      if (this._currentLiveRgb && config.fade_smooth_retrigger !== false) {
        this._previousLiveRgb = this._currentLiveRgb;
      }
    }
    this._lastTrackedState = stateObj.state;

    // Parse and validate timestamp safely (Fix #1: null/empty string/invalid date check)
    const rawTs = stateObj.attributes?.last_triggered || stateObj.last_changed || stateObj.last_updated;
    const tsStr = (typeof rawTs === 'string' ? rawTs : '').trim();
    if (!tsStr) {
      return DISABLED_FADE_RESULT;
    }

    const tsDate = new Date(tsStr);
    if (isNaN(tsDate.getTime())) {
      return DISABLED_FADE_RESULT;
    }

    const now = Date.now();
    const ageSeconds = Math.max(0, ((now - tsDate.getTime()) / 1000) | 0);

    let currentColor: RGBTuple;
    let currentStage = 1;
    let progressPct = 0;

    const stage1StartRgb = (config.fade_stage_1_pickup !== false && this._previousLiveRgb)
      ? this._previousLiveRgb
      : startRgb;

    if (ageSeconds < d1) {
      // Stage 1
      currentStage = 1;
      const progress = d1 > 0 ? ageSeconds / d1 : 1;
      currentColor = lerpRgb(stage1StartRgb, targetC1, progress);
      progressPct = Math.round((ageSeconds / totalDuration) * 100);
    } else if (ageSeconds < d1 + d2) {
      // Stage 2
      currentStage = 2;
      const stageAge = ageSeconds - d1;
      const progress = d2 > 0 ? stageAge / d2 : 1;
      const s2Start = config.fade_stage_2_pickup !== false ? targetC1 : startRgb;
      currentColor = lerpRgb(s2Start, targetC2, progress);
      progressPct = Math.round((ageSeconds / totalDuration) * 100);
    } else if (ageSeconds < totalDuration) {
      // Stage 3
      currentStage = 3;
      const stageAge = ageSeconds - (d1 + d2);
      const progress = d3 > 0 ? stageAge / d3 : 1;
      const s3Start = config.fade_stage_3_pickup !== false ? targetC2 : startRgb;
      currentColor = lerpRgb(s3Start, targetC3, progress);
      progressPct = Math.round((ageSeconds / totalDuration) * 100);
    } else {
      // Terminal stage complete
      currentStage = 3;
      currentColor = finalRgb;
      progressPct = 100;
    }

    this._currentLiveRgb = currentColor;

    return {
      enabled: true,
      activeFade: true,
      currentColor,
      colorHex: rgbToHex(currentColor),
      progressPct: Math.min(100, progressPct),
      currentStage,
    };
  }

  public reset(): void {
    this._previousLiveRgb = null;
    this._currentLiveRgb = null;
    this._lastTrackedState = null;
    this._cachedDurations = null;
    this._lastFadeConfigHash = null;
  }
}

export const fadeTransitionManager = new FadeTransitionManager();
