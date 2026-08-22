/**
 * Type Definitions & Configuration Schema for Antigravity Cards
 * Incorporates branded types, discriminated unions, and shared info unions.
 */

import { LovelaceCardConfig, ActionConfig } from 'custom-card-helpers';

// Branded Types for Type-Safe Values
export type Percentage = number & { readonly __brand: 'Percentage' };
export type Seconds = number & { readonly __brand: 'Seconds' };
export type RGBTuple = [number, number, number];

export function toPercentage(val: number): Percentage {
  return Math.min(100, Math.max(0, Math.round(val))) as Percentage;
}

export function toSeconds(val: number): Seconds {
  return Math.max(0, Math.round(val)) as Seconds;
}

// Shared Information Display Union
export type InfoType = 
  | 'name' 
  | 'state' 
  | 'last-changed' 
  | 'last_changed' 
  | 'last-updated' 
  | 'last_updated' 
  | 'last-triggered' 
  | 'brightness' 
  | 'temperature' 
  | 'humidity' 
  | 'battery' 
  | 'none';

// Supported Theme Presets
export type ThemePreset =
  | 'glassmorphism'
  | 'neumorphism'
  | 'cyberpunk'
  | 'aurora'
  | 'oled'
  | 'sunset'
  | 'flat'
  | 'material_you'
  | 'retro_synth'
  | 'minimal'
  | 'custom';

// Sub Button Action & Preset Types
export type SubButtonType =
  | 'button'
  | 'slider'
  | 'google_slider'
  | 'color_picker'
  | 'play_pause'
  | 'next'
  | 'previous'
  | 'vol_up'
  | 'vol_down'
  | 'mute'
  | 'source'
  | 'sound_mode'
  | 'shuffle'
  | 'repeat'
  | 'cover_toggle'
  | 'open'
  | 'close'
  | 'stop'
  | 'open_tilt'
  | 'close_tilt'
  | 'stop_tilt'
  | 'lock_unlock'
  | 'fan_speed'
  | 'fan_mode'
  | 'swing_mode'
  | 'climate_preset'
  | 'climate_mode'
  | 'light_effect'
  | 'effect_next'
  | 'effect_prev'
  | 'white_mode'
  | 'brightness'
  | 'garage_toggle'
  | 'dim_up'
  | 'dim_down'
  | 'temp_up'
  | 'temp_down'
  | 'temp_warm'
  | 'temp_cool'
  | 'color_temp'
  | 'humidity_up'
  | 'humidity_down'
  | 'humidity_step_up'
  | 'humidity_step_down'
  | 'input_select';

export interface FadeCalculationResult {
  enabled: boolean;
  activeFade: boolean;
  currentColor: RGBTuple;
  colorHex: string;
  progressPct: number;
  currentStage: number;
}

export interface SubButtonConfig {
  id?: string;
  entity?: string;
  icon?: string;
  color?: string;
  show_background?: boolean;
  label?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  sub_type?: SubButtonType;
  show_state?: boolean;
}

export interface AntigravityCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  
  layout?: 'default' | 'horizontal' | 'vertical';
  card_layout?: 'normal' | 'large';
  primary_info?: InfoType;
  secondary_info?: InfoType;
  text_scrolling_primary?: 'none' | 'marquee' | 'continuous' | 'hover';
  text_scrolling_secondary?: 'none' | 'marquee' | 'continuous' | 'hover';
  text_scrolling_speed?: number;
  
  show_name?: boolean;
  show_state?: boolean;
  fill_container?: boolean;
  overflow_hidden?: boolean;
  visibility_state?: 'always' | 'on' | 'off';
  
  // Sliders & Interactive Controls (Multi-Domain)
  use_light_color?: boolean;
  haptic_feedback?: boolean;
  slider_stepped_movement?: boolean;
  tap_slider_to_toggle?: boolean;
  show_slider?: boolean;
  hide_slider_when_off?: boolean;
  show_slider_percent?: boolean;
  show_color_temp?: boolean;
  hide_color_temp_when_off?: boolean;
  color_temp_type?: 'gradient' | 'google' | 'presets' | 'thin';
  color_temp_height?: number;
  color_temp_border_radius?: number;
  show_color_picker?: boolean;
  hide_color_picker_when_off?: boolean;
  show_color_slider?: boolean;
  hide_color_slider_when_off?: boolean;
  color_slider_height?: number;
  color_slider_border_radius?: number;
  color_picker_type?: 'slider' | 'google' | 'wheel' | 'swatches';
  slider_style?: 'circle' | 'filled' | 'thin' | 'glow' | 'segmented' | 'google' | 'full';
  full_slider_opacity?: number;
  slider_color?: string;
  slider_track_color?: string;
  slider_height?: number;
  slider_border_radius?: number;
  slider_start_offset?: number;
  slider_end_offset?: number;
  slider_spacing?: number;
  show_cover_tilt?: boolean;
  show_dual_climate_sliders?: boolean;
  
  // Features / Sub-buttons (Collapsible & Grid)
  features_position?: 'bottom' | 'inline';
  features_columns?: number;
  collapsible_sub_buttons?: boolean;
  auto_collapse?: boolean;
  collapse_timeout?: number;
  tap_action_collapses?: boolean;
  
  // Sub-button 1
  sub_button_1_entity?: string;
  sub_button_1_icon?: string;
  sub_button_1_color?: string;
  sub_button_1_show_background?: boolean;
  sub_button_1_label?: string;
  sub_button_1_tap_action?: ActionConfig;
  sub_button_1_hold_action?: ActionConfig;
  sub_button_1_double_tap_action?: ActionConfig;
  sub_button_1_type?: SubButtonType;
  sub_button_1_show_state?: boolean;
  
  // Sub-button 2
  sub_button_2_entity?: string;
  sub_button_2_icon?: string;
  sub_button_2_color?: string;
  sub_button_2_show_background?: boolean;
  sub_button_2_label?: string;
  sub_button_2_tap_action?: ActionConfig;
  sub_button_2_hold_action?: ActionConfig;
  sub_button_2_double_tap_action?: ActionConfig;
  sub_button_2_type?: SubButtonType;
  sub_button_2_show_state?: boolean;
  
  // Sub-button 3
  sub_button_3_entity?: string;
  sub_button_3_icon?: string;
  sub_button_3_color?: string;
  sub_button_3_show_background?: boolean;
  sub_button_3_label?: string;
  sub_button_3_tap_action?: ActionConfig;
  sub_button_3_hold_action?: ActionConfig;
  sub_button_3_double_tap_action?: ActionConfig;
  sub_button_3_type?: SubButtonType;
  sub_button_3_show_state?: boolean;
  
  // Sub-button 4
  sub_button_4_entity?: string;
  sub_button_4_icon?: string;
  sub_button_4_color?: string;
  sub_button_4_show_background?: boolean;
  sub_button_4_label?: string;
  sub_button_4_tap_action?: ActionConfig;
  sub_button_4_hold_action?: ActionConfig;
  sub_button_4_double_tap_action?: ActionConfig;
  sub_button_4_type?: SubButtonType;
  sub_button_4_show_state?: boolean;
  
  // Multi-Stage Fade Transitions
  fade_transition_enabled?: boolean;
  fade_trigger?: 'on_inactive' | 'on_active' | 'both';
  fade_target?: 'card' | 'slider' | 'icon' | 'all';
  show_decay_slider?: boolean;
  decay_slider_position?: 'top' | 'bottom' | 'inline';
  decay_slider_height?: number;
  fade_stage_1_duration?: number;
  fade_stage_1_pickup?: boolean;
  fade_stage_1_color?: string;
  fade_stage_2_duration?: number;
  fade_stage_2_pickup?: boolean;
  fade_stage_2_color?: string;
  fade_stage_3_duration?: number;
  fade_stage_3_pickup?: boolean;
  fade_stage_3_color?: string;
  fade_smooth_retrigger?: boolean;
  
  // Colors & Styling
  active_color?: string;
  inactive_color?: string;
  color_type?: 'card' | 'icon' | 'slider';
  active_glow?: boolean;
  active_glow_color?: string;
  border_glow?: boolean;
  border_glow_color?: string;
  active_border_color?: string;
  active_border_width?: number;
  active_pulse?: boolean;
  active_pulse_speed?: number;
  active_pulse_color?: string;
  
  // Themes & Presets
  theme_preset?: ThemePreset;
  glassmorphism_blur?: number;
  glassmorphism_opacity?: number;
  neumorphism_depth?: number;
  cyberpunk_glow?: string;
  oled_true_black?: boolean;
  color_presets?: string[];
  
  // Typography
  font_family_primary?: string;
  font_family_secondary?: string;
  font_size_primary?: number;
  font_size_secondary?: number;
  font_weight_primary?: string;
  font_weight_secondary?: string;
  text_transform_primary?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  text_transform_secondary?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  text_color_mode?: 'default' | 'active_accent' | 'contrast' | 'inverse';
  text_color_primary?: string;
  text_color_secondary?: string;
  text_offset_x?: number;
  text_offset_y?: number;
  primary_text_start_offset?: number;
  primary_text_end_offset?: number;
  primary_text_offset_x?: number;
  primary_text_offset_y?: number;
  secondary_text_start_offset?: number;
  secondary_text_end_offset?: number;
  secondary_text_offset_x?: number;
  secondary_text_offset_y?: number;
  features_offset_x?: number;
  features_offset_y?: number;
  letter_spacing?: number;
  line_height?: number | string;
  
  // Layout Spacing & Offsets
  card_padding?: number;
  card_padding_vertical?: number;
  card_padding_horizontal?: number;
  card_padding_top?: number;
  card_padding_bottom?: number;
  card_padding_left?: number;
  card_padding_right?: number;
  card_margin?: number;
  card_margin_vertical?: number;
  card_margin_horizontal?: number;
  card_margin_top?: number;
  card_margin_bottom?: number;
  card_margin_left?: number;
  card_margin_right?: number;
  content_spacing?: number;
  text_spacing?: number;
  features_margin?: number;
  sub_button_spacing?: number;
  sub_button_padding?: number;
  sub_button_container_padding?: number;
  sub_button_alignment?: string;
  text_alignment?: string;
  content_alignment?: string;
  text_box_width?: string;
  card_border_width?: number;
  card_border_style?: string;
  card_border_color?: string;
  card_width?: string;
  card_max_width?: string;
  card_height?: string;
  card_min_height?: number;
  backdrop_blur?: number;
  card_opacity?: number;
  transition_duration?: number;
  border_radius?: number;
  border_width?: number;
  border_color?: string;
  
  // Actions
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  custom_styles?: string;
}

export const DEFAULT_CARD_CONFIG: Partial<AntigravityCardConfig> = {
  primary_info: "name",
  secondary_info: "state",
  show_name: true,
  show_state: true,
  haptic_feedback: true,
  slider_stepped_movement: true,
  tap_slider_to_toggle: true,
  show_slider: true,
  hide_slider_when_off: false,
  show_slider_percent: true,
  color_type: "card",
  theme_preset: "glassmorphism",
  glassmorphism_blur: 16,
  glassmorphism_opacity: 0.25,
  fade_transition_enabled: false,
  fade_trigger: "on_inactive",
  fade_target: "card",
  fade_smooth_retrigger: true,
  show_decay_slider: true,
  decay_slider_position: "bottom",
  decay_slider_height: 8,
  fade_stage_1_duration: 60,
  fade_stage_1_pickup: true,
  fade_stage_1_color: "#ff9800",
  fade_stage_2_duration: 600,
  fade_stage_2_pickup: true,
  fade_stage_2_color: "#cddc39",
  fade_stage_3_duration: 1800,
  fade_stage_3_pickup: true,
  fade_stage_3_color: "#4caf50",
  features_position: "bottom",
  features_columns: 4,
  collapsible_sub_buttons: false,
  auto_collapse: false,
  collapse_timeout: 5000,
  
  // Learned Formatting Defaults
  font_size_primary: 14,
  font_size_secondary: 15,
  font_weight_primary: "800",
  text_transform_primary: "capitalize",
  text_transform_secondary: "capitalize",
  letter_spacing: -0.5,
  line_height: 1.1,
  content_spacing: 6,
  text_spacing: -1,
  features_margin: -3,
  sub_button_spacing: -4,
  sub_button_padding: 6,
  card_padding_vertical: 0,
  card_padding_horizontal: 15,
  card_margin: -1,
  text_offset_x: -28,
  text_offset_y: 2,
  primary_text_start_offset: 8,
  primary_text_end_offset: 250,
  secondary_text_start_offset: 8,
  secondary_text_end_offset: 250,
  active_color: "rgb(214, 0, 0)",
  inactive_color: "rgb(3, 181, 0)",
};
