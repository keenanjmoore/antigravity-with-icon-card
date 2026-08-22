/**
 * System Constants & Domain Configuration for Antigravity Cards
 * Extracts magic numbers, defaults, and frozen lookup sets for O(1) performance.
 */

// Timing & Animation Constants
export const DEFAULT_FADE_STAGE_1_SECONDS = 60;
export const DEFAULT_FADE_STAGE_2_SECONDS = 600;
export const DEFAULT_FADE_STAGE_3_SECONDS = 1800;

export const TAP_THRESHOLD_MS = 250;
export const HOLD_THRESHOLD_MS = 400;
export const TAP_SLOP_PX = 8;
export const SLIDER_THROTTLE_MS = 30;
export const SLIDER_THROTTLE_POWER_SAVE_MS = 60;
export const RELATIVE_TIMER_DEFAULT_MS = 5000;
export const RELATIVE_TIMER_FADING_MS = 1000;
export const RELATIVE_TIMER_MID_AGE_MS = 15000;
export const RELATIVE_TIMER_OLD_AGE_MS = 60000;

// Color Constants & Defaults
export const COLOR_CACHE_MAX_ENTRIES = 256;
export const DEFAULT_ACTIVE_COLOR = '#d60000';
export const DEFAULT_INACTIVE_COLOR = '#03b100';
export const DEFAULT_STAGE_1_COLOR = '#ff9800';
export const DEFAULT_STAGE_2_COLOR = '#cddc39';
export const DEFAULT_STAGE_3_COLOR = '#4caf50';

// Light Temperature Defaults (Kelvin & Mireds)
export const KELVIN_WARM_WHITE = 2700;
export const KELVIN_NEUTRAL_WHITE = 4000;
export const KELVIN_COOL_WHITE = 6000;
export const KELVIN_MIN_BOUND = 2000;
export const KELVIN_MAX_BOUND = 6500;
export const MIREDS_MIN_BOUND = 153;
export const MIREDS_MAX_BOUND = 500;

// Layout & Dimension Defaults
export const DEFAULT_BORDER_RADIUS_PX = 12;
export const DEFAULT_CARD_PADDING_PX = 12;
export const DEFAULT_CARD_PADDING_VERT_PX = 4;
export const DEFAULT_SLIDER_HEIGHT_PX = 36;
export const DEFAULT_COLOR_SLIDER_HEIGHT_PX = 36;
export const DEFAULT_DECAY_SLIDER_HEIGHT_PX = 8;
export const DEFAULT_ICON_SIZE_PX = 24;
export const DEFAULT_ICON_CONTAINER_SIZE_PX = 36;

// Frozen Lookup Sets for O(1) Access
export const ACTIVE_STATES: ReadonlySet<string> = Object.freeze(
  new Set([
    'on',
    'open',
    'opening',
    'closing',
    'unlocked',
    'unlocking',
    'locking',
    'playing',
    'buffering',
    'active',
    'running',
    'cool',
    'heat',
    'auto',
    'heat_cool',
    'fan_only',
    'dry',
    'home',
    'occupied',
    'motion',
    'cleaning',
    'returning',
  ])
);

export const NON_TOGGLEABLE_DOMAINS: ReadonlySet<string> = Object.freeze(
  new Set([
    'binary_sensor',
    'sensor',
    'weather',
    'sun',
    'device_tracker',
    'person',
    'zone',
    'camera',
    'image',
  ])
);

export const SLIDER_SUPPORTED_DOMAINS: ReadonlySet<string> = Object.freeze(
  new Set([
    'light',
    'cover',
    'fan',
    'media_player',
    'climate',
    'humidifier',
    'number',
    'input_number',
  ])
);
