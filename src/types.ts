import { LovelaceCardConfig, ActionConfig } from 'custom-card-helpers';

export interface AntigravityCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  icon_color?: string;
  icon_type?: 'icon' | 'entity-picture' | 'none';
  icon_shape?: 'circle' | 'rounded' | 'square' | 'none';
  icon_animation?: 'none' | 'spin' | 'pulse' | 'bounce';
  icon_opacity?: number;
  icon_rotate?: number;
  
  layout?: 'default' | 'horizontal' | 'vertical';
  card_layout?: 'normal' | 'large';
  primary_info?: 'name' | 'state' | 'last-changed' | 'last_changed' | 'last-updated' | 'last_updated' | 'last-triggered' | 'brightness' | 'temperature' | 'humidity' | 'battery' | 'none';
  secondary_info?: 'name' | 'state' | 'last-changed' | 'last_changed' | 'last-updated' | 'last_updated' | 'last-triggered' | 'brightness' | 'temperature' | 'humidity' | 'battery' | 'none';
  text_scrolling_primary?: 'none' | 'marquee' | 'continuous' | 'hover';
  text_scrolling_secondary?: 'none' | 'marquee' | 'continuous' | 'hover';
  text_scrolling_speed?: number;
  
  show_icon?: boolean;
  show_name?: boolean;
  show_state?: boolean;
  fill_container?: boolean;
  overflow_hidden?: boolean;
  visibility_state?: 'always' | 'on' | 'off';
  
  // Badge (Mushroom Style)
  badge_icon?: string;
  badge_color?: string;
  badge_size?: number;
  badge_offset?: number;
  
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
  color_temp_start_offset?: number;
  color_temp_end_offset?: number;
  color_slider_start_offset?: number;
  color_slider_end_offset?: number;
  features_position?: 'bottom' | 'inline';
  
  // Collapsible Secondary Controls & Text Color Modes
  collapse_controls_trigger?: 'none' | 'hold' | 'double_tap';
  text_color_mode?: 'selected' | 'inverse' | 'active_accent';

  // Haptic feedback customization
  haptic_type?: 'selection' | 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

  // Native Actions
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;

  // Theming & Visual Presets
  theme_preset?: 'default' | 'glassmorphism' | 'neumorphism' | 'cyberpunk' | 'minimal_flat' | 'sunset_gradient' | 'oled_black' | 'aurora' | 'material_you' | 'retro_synth';
  hover_effect?: 'none' | 'lift' | 'glow' | 'scale';
  color_type?: 'icon' | 'card';
  
  // Bubble & Custom Styling
  bg_color?: string;
  bg_opacity?: number;
  border_radius?: number;
  card_border_width?: number;
  card_border_color?: string;
  card_border_style?: 'none' | 'solid' | 'dashed' | 'dotted';
  active_color?: string;
  inactive_color?: string;
  custom_styles?: string;
  aspect_ratio?: string;
  card_opacity?: number;
  transition_duration?: number;

  // Advanced Typography & Spacing
  font_size_primary?: number;
  font_size_secondary?: number;
  font_weight_primary?: 'normal' | '500' | 'bold' | '800';
  text_color_primary?: string;
  text_color_secondary?: string;
  text_transform_primary?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  text_transform_secondary?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  letter_spacing?: number;
  line_height?: number;
  icon_size?: number;

  // Layout Spacing & Padding
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
  icon_padding?: number;
  text_padding?: number;
  text_padding_vertical?: number;
  text_padding_horizontal?: number;
  features_padding?: number;
  features_padding_vertical?: number;
  features_padding_horizontal?: number;
  sub_button_container_padding?: number;
  content_spacing?: number;
  text_spacing?: number;
  features_margin?: number;
  icon_margin?: number;
  sub_button_spacing?: number;
  sub_button_padding?: number;
  sub_button_alignment?: 'flex-end' | 'flex-start' | 'center' | 'space-between' | 'space-around';

  // Positioning & Sizing
  card_width?: string;
  card_max_width?: string;
  card_height?: string;
  card_min_height?: number;
  text_box_width?: string;
  icon_container_size?: number;
  text_alignment?: 'left' | 'center' | 'right' | 'justify';
  content_alignment?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  text_offset_x?: number;
  text_offset_y?: number;
  primary_text_offset_x?: number;
  primary_text_offset_y?: number;
  primary_text_start_offset?: number;
  primary_text_end_offset?: number;
  secondary_text_offset_x?: number;
  secondary_text_offset_y?: number;
  secondary_text_start_offset?: number;
  secondary_text_end_offset?: number;
  icon_offset_x?: number;
  icon_offset_y?: number;
  features_offset_x?: number;
  features_offset_y?: number;

  // Effects
  box_shadow?: 'none' | 'soft' | 'deep' | 'glow';
  backdrop_blur?: number;
  active_pulse?: boolean;
  active_glow?: boolean;

  // Sub-Buttons (1-4)
  sub_button_1_entity?: string;
  sub_button_1_type?: 'button' | 'play_pause' | 'next' | 'previous' | 'vol_up' | 'vol_down' | 'mute' | 'source' | 'sound_mode' | 'open_close' | 'stop' | 'open_tilt' | 'close_tilt' | 'stop_tilt' | 'lock_unlock' | 'garage_toggle' | 'fan_speed' | 'fan_mode' | 'swing_mode' | 'climate_preset' | 'clean' | 'dock' | 'locate' | 'vacuum_fan_speed' | 'hvac_mode' | 'light_effect' | 'dim_up' | 'dim_down' | 'humidity_up' | 'humidity_down' | 'input_select' | 'counter_inc' | 'counter_dec' | 'temp_warm' | 'temp_cool' | 'slider' | 'google_slider' | 'color_temp' | 'color_picker' | 'brightness';
  sub_button_1_icon?: string;
  sub_button_1_color?: string;
  sub_button_1_show_background?: boolean;
  sub_button_1_show_state?: boolean;
  sub_button_1_name?: string;
  sub_button_1_tap_action?: ActionConfig;
  sub_button_1_hold_action?: ActionConfig;
  sub_button_1_double_tap_action?: ActionConfig;

  sub_button_2_entity?: string;
  sub_button_2_type?: 'button' | 'play_pause' | 'next' | 'previous' | 'vol_up' | 'vol_down' | 'mute' | 'source' | 'sound_mode' | 'open_close' | 'stop' | 'open_tilt' | 'close_tilt' | 'stop_tilt' | 'lock_unlock' | 'garage_toggle' | 'fan_speed' | 'fan_mode' | 'swing_mode' | 'climate_preset' | 'clean' | 'dock' | 'locate' | 'vacuum_fan_speed' | 'hvac_mode' | 'light_effect' | 'dim_up' | 'dim_down' | 'humidity_up' | 'humidity_down' | 'input_select' | 'counter_inc' | 'counter_dec' | 'temp_warm' | 'temp_cool' | 'slider' | 'google_slider' | 'color_temp' | 'color_picker' | 'brightness';
  sub_button_2_icon?: string;
  sub_button_2_color?: string;
  sub_button_2_show_background?: boolean;
  sub_button_2_show_state?: boolean;
  sub_button_2_name?: string;
  sub_button_2_tap_action?: ActionConfig;
  sub_button_2_hold_action?: ActionConfig;
  sub_button_2_double_tap_action?: ActionConfig;

  sub_button_3_entity?: string;
  sub_button_3_type?: 'button' | 'play_pause' | 'next' | 'previous' | 'vol_up' | 'vol_down' | 'mute' | 'source' | 'sound_mode' | 'open_close' | 'stop' | 'open_tilt' | 'close_tilt' | 'stop_tilt' | 'lock_unlock' | 'garage_toggle' | 'fan_speed' | 'fan_mode' | 'swing_mode' | 'climate_preset' | 'clean' | 'dock' | 'locate' | 'vacuum_fan_speed' | 'hvac_mode' | 'light_effect' | 'dim_up' | 'dim_down' | 'humidity_up' | 'humidity_down' | 'input_select' | 'counter_inc' | 'counter_dec' | 'temp_warm' | 'temp_cool' | 'slider' | 'google_slider' | 'color_temp' | 'color_picker' | 'brightness';
  sub_button_3_icon?: string;
  sub_button_3_color?: string;
  sub_button_3_show_background?: boolean;
  sub_button_3_show_state?: boolean;
  sub_button_3_name?: string;
  sub_button_3_tap_action?: ActionConfig;
  sub_button_3_hold_action?: ActionConfig;
  sub_button_3_double_tap_action?: ActionConfig;

  sub_button_4_entity?: string;
  sub_button_4_type?: 'button' | 'play_pause' | 'next' | 'previous' | 'vol_up' | 'vol_down' | 'mute' | 'source' | 'sound_mode' | 'open_close' | 'stop' | 'open_tilt' | 'close_tilt' | 'stop_tilt' | 'lock_unlock' | 'garage_toggle' | 'fan_speed' | 'fan_mode' | 'swing_mode' | 'climate_preset' | 'clean' | 'dock' | 'locate' | 'vacuum_fan_speed' | 'hvac_mode' | 'light_effect' | 'dim_up' | 'dim_down' | 'humidity_up' | 'humidity_down' | 'input_select' | 'counter_inc' | 'counter_dec' | 'temp_warm' | 'temp_cool' | 'slider' | 'google_slider' | 'color_temp' | 'color_picker' | 'brightness';
  sub_button_4_icon?: string;
  sub_button_4_color?: string;
  sub_button_4_show_background?: boolean;
  sub_button_4_show_state?: boolean;
  sub_button_4_name?: string;
  sub_button_4_tap_action?: ActionConfig;
  sub_button_4_hold_action?: ActionConfig;
  sub_button_4_double_tap_action?: ActionConfig;

  // Custom Presets & Advanced Sliders
  color_presets?: string[];
  show_cover_tilt?: boolean;
  show_dual_climate_sliders?: boolean;

  // Multi-Stage Fade Transitions & Decay Sliders
  fade_transition_enabled?: boolean;
  fade_trigger?: 'on_inactive' | 'on_active' | 'both';
  fade_target?: 'card' | 'icon' | 'slider' | 'all';
  show_decay_slider?: boolean;
  decay_slider_height?: number;
  decay_slider_position?: 'bottom' | 'top' | 'inline';
  fade_stage_1_duration?: number; // seconds
  fade_stage_1_pickup?: boolean;
  fade_stage_1_color?: string;
  fade_stage_2_duration?: number; // seconds
  fade_stage_2_pickup?: boolean;
  fade_stage_2_color?: string;
  fade_stage_3_duration?: number; // seconds
  fade_stage_3_pickup?: boolean;
  fade_stage_3_color?: string;
  fade_smooth_retrigger?: boolean;
}

export const DEFAULT_CARD_CONFIG: Record<string, any> = {
  // Multi-Stage Fade & Decay defaults
  fade_transition_enabled: false,
  fade_trigger: "on_inactive",
  fade_target: "card",
  fade_smooth_retrigger: true,
  show_decay_slider: false,
  decay_slider_height: 10,
  decay_slider_position: "bottom",
  fade_stage_1_duration: 60,
  fade_stage_1_pickup: true,
  fade_stage_1_color: "#ff9800",
  fade_stage_2_duration: 600,
  fade_stage_2_pickup: true,
  fade_stage_2_color: "#cddc39",
  fade_stage_3_duration: 1800,
  fade_stage_3_pickup: true,
  fade_stage_3_color: "#4caf50",
  entity: "",
  name: "",
  icon: "",
  icon_color: "var(--primary-color)",
  icon_type: "icon",
  icon_shape: "circle",
  icon_animation: "none",
  icon_opacity: 100,
  icon_rotate: 0,
  icon_size: 24,
  icon_margin: 0,
  // Visual appearance defaults
  bg_color: "",
  bg_opacity: 10,
  border_radius: 12,
  card_border_width: 0,
  card_border_style: "none",
  card_border_color: "",
  card_opacity: 100,
  card_padding: 12,
  card_padding_vertical: 0,
  card_padding_horizontal: 15,
  card_margin: -1,
  card_width: "",
  card_max_width: "",
  card_height: "",
  card_min_height: 0,
  text_box_width: "",
  icon_container_size: 40,
  aspect_ratio: "",
  // Hover and interaction
  hover_effect: "glow",
  active_pulse: false,
  active_glow: false,
  // Theme and presets
  theme_preset: "default",
  color_type: "icon",
  active_color: "",
  inactive_color: "",
  // Slider styling & layer isolation
  use_light_color: false,
  haptic_feedback: true,
  haptic_type: "light",
  slider_stepped_movement: false,
  tap_slider_to_toggle: false,
  slider_style: "full",
  full_slider_opacity: 100,
  slider_color: "",
  slider_track_color: "",
  slider_height: 40,
  slider_border_radius: 15,
  slider_start_offset: -22,
  slider_end_offset: -16,
  slider_spacing: 2,
  color_temp_height: 37,
  color_temp_border_radius: 20,
  color_temp_start_offset: 0,
  color_temp_end_offset: 0,
  color_temp_type: "thin",
  color_slider_height: 41,
  color_slider_border_radius: 20,
  color_slider_start_offset: 0,
  color_slider_end_offset: 0,
  color_picker_type: "slider",
  features_position: "bottom",
  // Collapsible & Text Color Mode defaults
  collapse_controls_trigger: "hold",
  text_color_mode: "selected",
  // Typography defaults
  font_size_primary: 14,
  font_weight_primary: "800",
  text_transform_primary: "capitalize",
  text_color_primary: "#ffffff",
  font_size_secondary: 15,
  text_transform_secondary: "capitalize",
  text_color_secondary: "#ffffff",
  text_scrolling_primary: "none",
  text_scrolling_secondary: "none",
  text_scrolling_speed: 10,
  text_alignment: "left",
  content_alignment: "flex-start",
  letter_spacing: -0.5,
  line_height: 1.1,
  // Spacing defaults
  content_spacing: 6,
  text_spacing: -1,
  features_margin: -3,
  sub_button_spacing: -4,
  sub_button_padding: 6,
  sub_button_alignment: "flex-end",
  text_offset_x: -28,
  text_offset_y: 2,
  primary_text_offset_x: 0,
  primary_text_offset_y: 0,
  primary_text_start_offset: 8,
  primary_text_end_offset: 250,
  secondary_text_offset_x: 0,
  secondary_text_offset_y: 0,
  secondary_text_start_offset: 8,
  secondary_text_end_offset: 250,
  icon_offset_x: 0,
  icon_offset_y: 0,
  features_offset_x: 0,
  features_offset_y: 0,
  // Badge defaults
  badge_icon: "",
  badge_color: "",
  badge_size: 16,
  badge_offset: -2,
  // Box shadow and blur
  box_shadow: "none",
  backdrop_blur: 0,
  transition_duration: 300,
  // Action defaults
  tap_action: { action: "toggle" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
  // Feature toggles
  show_icon: true,
  show_name: true,
  show_state: true,
  visibility_state: "always",
  show_slider: true,
  hide_slider_when_off: true,
  show_slider_percent: false,
  show_color_temp: false,
  hide_color_temp_when_off: true,
  show_color_picker: false,
  hide_color_picker_when_off: true,
  show_color_slider: false,
  hide_color_slider_when_off: true,
  fill_container: true,
  overflow_hidden: true,
  // Layout defaults
  layout: "default",
  card_layout: "normal",
  primary_info: "name",
  secondary_info: "last-updated",
  // Sub-button defaults
  sub_button_1_entity: "",
  sub_button_1_type: "button",
  sub_button_1_icon: "",
  sub_button_1_color: "",
  sub_button_1_show_background: true,
  sub_button_1_show_state: false,
  sub_button_1_name: "",
  sub_button_1_tap_action: { action: "toggle" },
  sub_button_1_hold_action: { action: "none" },
  sub_button_1_double_tap_action: { action: "none" },
  sub_button_2_entity: "",
  sub_button_2_type: "button",
  sub_button_2_icon: "",
  sub_button_2_color: "",
  sub_button_2_show_background: true,
  sub_button_2_show_state: false,
  sub_button_2_name: "",
  sub_button_2_tap_action: { action: "toggle" },
  sub_button_2_hold_action: { action: "none" },
  sub_button_2_double_tap_action: { action: "none" },
  sub_button_3_entity: "",
  sub_button_3_type: "button",
  sub_button_3_icon: "",
  sub_button_3_color: "",
  sub_button_3_show_background: true,
  sub_button_3_show_state: false,
  sub_button_3_name: "",
  sub_button_3_tap_action: { action: "toggle" },
  sub_button_3_hold_action: { action: "none" },
  sub_button_3_double_tap_action: { action: "none" },
  sub_button_4_entity: "",
  sub_button_4_type: "button",
  sub_button_4_icon: "",
  sub_button_4_color: "",
  sub_button_4_show_background: true,
  sub_button_4_show_state: false,
  sub_button_4_name: "",
  sub_button_4_tap_action: { action: "toggle" },
  sub_button_4_hold_action: { action: "none" },
  sub_button_4_double_tap_action: { action: "none" },
  // Miscellaneous
  custom_styles: "",
};
