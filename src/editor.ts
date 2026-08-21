import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import type { AntigravityCardConfig } from './types';
import { DEFAULT_CARD_CONFIG } from './types';

// ==========================================
// 1. CORE & LAYOUT SCHEMA
// ==========================================
const SCHEMA_CORE = [
  { name: 'entity', selector: { entity: {} } },
  { name: 'name', selector: { text: {} } },
  { name: 'visibility_state', selector: { select: { options: [
    { value: 'always', label: 'Always Visible (Default)' },
    { value: 'on', label: 'Show ONLY When ON (Hide When OFF)' },
    { value: 'off', label: 'Show ONLY When OFF (Hide When ON)' },
  ] } } },
  { name: 'layout', selector: { select: { options: [
    { value: 'default', label: 'Default (Horizontal Row)' },
    { value: 'horizontal', label: 'Horizontal Compact' },
    { value: 'vertical', label: 'Vertical Centered' },
  ] } } },
  { name: 'card_layout', selector: { select: { options: [
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large (Bubble Style)' },
  ] } } },
  { name: 'primary_info', selector: { select: { options: [
    { value: 'name', label: 'Name (Default)' },
    { value: 'state', label: 'State' },
    { value: 'last-changed', label: 'Last Changed (Relative: e.g. 5 min ago)' },
    { value: 'last-updated', label: 'Last Updated (Relative: e.g. 5 min ago)' },
    { value: 'last-triggered', label: 'Last Triggered (Automations/Scripts)' },
    { value: 'brightness', label: 'Brightness % (Lights)' },
    { value: 'temperature', label: 'Temperature (Climate/Sensors)' },
    { value: 'humidity', label: 'Humidity % (Sensors)' },
    { value: 'battery', label: 'Battery Level %' },
    { value: 'none', label: 'None' },
  ] } } },
  { name: 'secondary_info', selector: { select: { options: [
    { value: 'state', label: 'State (Default)' },
    { value: 'name', label: 'Name' },
    { value: 'last-changed', label: 'Last Changed (Relative: e.g. 5 min ago)' },
    { value: 'last-updated', label: 'Last Updated (Relative: e.g. 5 min ago)' },
    { value: 'last-triggered', label: 'Last Triggered (Automations/Scripts)' },
    { value: 'brightness', label: 'Brightness % (Lights)' },
    { value: 'temperature', label: 'Temperature (Climate/Sensors)' },
    { value: 'humidity', label: 'Humidity % (Sensors)' },
    { value: 'battery', label: 'Battery Level %' },
    { value: 'none', label: 'None' },
  ] } } },
  { name: 'aspect_ratio', selector: { text: { suffix: 'e.g. 1/1, 2/1' } } },
  { name: 'show_icon', selector: { boolean: {} } },
  { name: 'show_name', selector: { boolean: {} } },
  { name: 'show_state', selector: { boolean: {} } },
  { name: 'fill_container', selector: { boolean: {} } },
  { name: 'overflow_hidden', selector: { boolean: {} } },
  { name: 'badge_icon', selector: { icon: {} } },
  { name: 'badge_color', selector: { color_rgb: {} } },
  { name: 'badge_size', selector: { number: { min: 8, max: 64, mode: 'slider' } } },
  { name: 'badge_offset', selector: { number: { min: -30, max: 50, mode: 'slider' } } },
];

// ==========================================
// 2. APPEARANCE & THEMING SCHEMA
// ==========================================
const SCHEMA_APPEARANCE = [
  { name: 'theme_preset', selector: { select: { options: [
    { value: 'default', label: 'Default (Card Colors)' },
    { value: 'glassmorphism', label: 'Frosted Glass (Glassmorphism)' },
    { value: 'neumorphism', label: 'Soft Neumorphism Extrusion' },
    { value: 'cyberpunk', label: 'Cyberpunk Neon Glow' },
    { value: 'minimal_flat', label: 'Clean Minimal Flat' },
    { value: 'sunset_gradient', label: 'Warm Sunset Gradient' },
    { value: 'oled_black', label: 'OLED Pitch Black' },
    { value: 'aurora', label: 'Nordic Aurora Ambient Flow' },
    { value: 'material_you', label: 'Material You Adaptive Pill' },
    { value: 'retro_synth', label: '80s Synthwave / Neon Grid Glow' },
  ] } } },
  { name: 'hover_effect', selector: { select: { options: [
    { value: 'none', label: 'None' },
    { value: 'lift', label: 'Elevate & Lift (TranslateY)' },
    { value: 'glow', label: 'Glow Border' },
    { value: 'scale', label: 'Smooth Micro-Scale (1.02x)' },
  ] } } },
  { name: 'color_type', selector: { select: { options: [
    { value: 'icon', label: 'Icon Only (Default)' },
    { value: 'card', label: 'Flood Entire Card Background' },
  ] } } },
  { name: 'bg_color', selector: { color_rgb: {} } },
  { name: 'bg_opacity', selector: { number: { min: 0, max: 100, mode: 'slider' } } },
  { name: 'active_color', selector: { color_rgb: {} } },
  { name: 'inactive_color', selector: { color_rgb: {} } },
  { name: 'text_color_primary', selector: { color_rgb: {} } },
  { name: 'text_color_secondary', selector: { color_rgb: {} } },
  { name: 'card_border_width', selector: { number: { min: 0, max: 20, mode: 'slider' } } },
  { name: 'card_border_color', selector: { color_rgb: {} } },
  { name: 'card_border_style', selector: { select: { options: [
    { value: 'none', label: 'None' },
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
  ] } } },
  { name: 'border_radius', selector: { number: { min: 0, max: 100, mode: 'slider' } } },
  { name: 'box_shadow', selector: { select: { options: [
    { value: 'none', label: 'None' },
    { value: 'soft', label: 'Soft Drop' },
    { value: 'deep', label: 'Deep Shadow' },
    { value: 'glow', label: 'Neon Glow' },
  ] } } },
  { name: 'backdrop_blur', selector: { number: { min: 0, max: 50, mode: 'slider' } } },
  { name: 'card_opacity', selector: { number: { min: 0, max: 100, mode: 'slider' } } },
  { name: 'transition_duration', selector: { number: { min: 0, max: 3000, mode: 'slider', step: 50 } } },
  { name: 'active_glow', selector: { boolean: {} } },
  { name: 'active_pulse', selector: { boolean: {} } },
  // Icon styling
  { name: 'icon', selector: { icon: {} } },
  { name: 'icon_size', selector: { number: { min: 12, max: 96, mode: 'slider', step: 2 } } },
  { name: 'icon_container_size', selector: { number: { min: 16, max: 128, mode: 'slider', step: 2 } } },
  { name: 'icon_color', selector: { color_rgb: {} } },
  { name: 'icon_type', selector: { select: { options: [
    { value: 'icon', label: 'Icon' },
    { value: 'entity-picture', label: 'Entity Picture' },
    { value: 'none', label: 'None' },
  ] } } },
  { name: 'icon_shape', selector: { select: { options: [
    { value: 'circle', label: 'Circle (Default)' },
    { value: 'rounded', label: 'Rounded Square' },
    { value: 'square', label: 'Square' },
    { value: 'none', label: 'Transparent / No Background' },
  ] } } },
  { name: 'icon_animation', selector: { select: { options: [
    { value: 'none', label: 'None' },
    { value: 'spin', label: 'Spin (Fans & Rotations)' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'bounce', label: 'Bounce' },
  ] } } },
  { name: 'icon_opacity', selector: { number: { min: 0, max: 100, mode: 'slider' } } },
  { name: 'icon_rotate', selector: { number: { min: 0, max: 360, mode: 'slider', step: 5 } } },
  // Multi-Stage Fade Transitions & Decay Sliders (Integrated into Appearance)
  { name: 'fade_transition_enabled', selector: { boolean: {} } },
  { name: 'fade_trigger', selector: { select: { options: [
    { value: 'on_inactive', label: 'On Inactive (Cooldown / Motion Cleared)' },
    { value: 'on_active', label: 'On Active (Warmup / Motion Active)' },
    { value: 'both', label: 'Both Active and Inactive' },
  ] } } },
  { name: 'fade_target', selector: { select: { options: [
    { value: 'card', label: 'Card Background' },
    { value: 'icon', label: 'Icon Container' },
    { value: 'slider', label: 'Decay Slider Only' },
    { value: 'all', label: 'All Elements (Card, Icon & Slider)' },
  ] } } },
  { name: 'fade_smooth_retrigger', selector: { boolean: {} } },
  { name: 'show_decay_slider', selector: { boolean: {} } },
  { name: 'decay_slider_height', selector: { number: { min: 4, max: 48, mode: 'slider', step: 1 } } },
  { name: 'decay_slider_position', selector: { select: { options: [
    { value: 'bottom', label: 'Bottom (Below Text/Features)' },
    { value: 'top', label: 'Top (Above Text)' },
    { value: 'inline', label: 'Inline (Inside Header)' },
  ] } } },
  { name: 'fade_stage_1_duration', selector: { number: { min: 0, max: 1800, mode: 'slider', unit_of_measurement: 'sec', step: 5 } } },
  { name: 'fade_stage_1_pickup', selector: { boolean: {} } },
  { name: 'fade_stage_1_color', selector: { color_rgb: {} } },
  { name: 'fade_stage_2_duration', selector: { number: { min: 0, max: 3600, mode: 'slider', unit_of_measurement: 'sec', step: 10 } } },
  { name: 'fade_stage_2_pickup', selector: { boolean: {} } },
  { name: 'fade_stage_2_color', selector: { color_rgb: {} } },
  { name: 'fade_stage_3_duration', selector: { number: { min: 0, max: 7200, mode: 'slider', unit_of_measurement: 'sec', step: 30 } } },
  { name: 'fade_stage_3_pickup', selector: { boolean: {} } },
  { name: 'fade_stage_3_color', selector: { color_rgb: {} } },
];

// ==========================================
// 3. SLIDERS & CONTROLS SCHEMA
// ==========================================
const SCHEMA_CONTROLS = [
  { name: 'use_light_color', label: 'Dynamic Light Color Accent (Mushroom/Bubble Style)', selector: { boolean: {} } },
  { name: 'haptic_feedback', label: 'Haptic Feedback Vibrations (Mobile / Companion App)', selector: { boolean: {} } },
  { name: 'haptic_type', label: 'Haptic Vibration Intensity / Pattern', selector: { select: { options: [
    { value: 'light', label: 'Light Tap (Default)' },
    { value: 'selection', label: 'Selection Tick' },
    { value: 'medium', label: 'Medium Pulse' },
    { value: 'heavy', label: 'Heavy Thud' },
    { value: 'success', label: 'Success Pattern' },
    { value: 'warning', label: 'Warning Pattern' },
    { value: 'error', label: 'Error Pattern' },
  ] } } },
  { name: 'slider_stepped_movement', label: 'Stepped Slider Movement (Discrete Values vs Smooth)', selector: { boolean: {} } },
  { name: 'tap_slider_to_toggle', label: 'Tap Slider Body to Toggle Entity (Slider-Button Card Style)', selector: { boolean: {} } },
  { name: 'show_slider', selector: { boolean: {} } },
  { name: 'hide_slider_when_off', selector: { boolean: {} } },
  { name: 'slider_style', selector: { select: { options: [
    { value: 'circle', label: 'Circle Knob (Line with Round Thumb - Default)' },
    { value: 'google', label: 'Google Home / Material 3 Pill Slider' },
    { value: 'filled', label: 'Hue-Style Filled Capsule (Fluid Pill / No Knob)' },
    { value: 'thin', label: 'Thin Minimalist Line (Compact Knob)' },
    { value: 'glow', label: 'Neon Glow Laser Line' },
    { value: 'segmented', label: 'Segmented Stepped Bar' },
    { value: 'full', label: 'Full Card Slider (slider-button-card style)' },
  ] } } },
  { name: 'full_slider_opacity', selector: { number: { min: 5, max: 100, mode: 'slider' } } },
  { name: 'show_slider_percent', selector: { boolean: {} } },
  { name: 'slider_color', selector: { color_rgb: {} } },
  { name: 'slider_track_color', selector: { color_rgb: {} } },
  { name: 'slider_height', selector: { number: { min: 2, max: 80, mode: 'slider' } } },
  { name: 'slider_border_radius', selector: { number: { min: 0, max: 40, mode: 'slider' } } },
  { name: 'slider_start_offset', selector: { number: { min: -100, max: 100, mode: 'slider' } } },
  { name: 'slider_end_offset', selector: { number: { min: -100, max: 100, mode: 'slider' } } },
  { name: 'show_color_temp', selector: { boolean: {} } },
  { name: 'hide_color_temp_when_off', selector: { boolean: {} } },
  { name: 'color_temp_type', selector: { select: { options: [
    { value: 'gradient', label: 'Kelvin Gradient Slider (Default)' },
    { value: 'google', label: 'Google Home Pill Temperature Slider' },
    { value: 'presets', label: 'Preset Temperature Quick Buttons (2200K - 6500K)' },
    { value: 'thin', label: 'Thin Minimalist Line Slider' },
  ] } } },
  { name: 'color_temp_height', selector: { number: { min: 2, max: 80, mode: 'slider' } } },
  { name: 'color_temp_border_radius', selector: { number: { min: 0, max: 40, mode: 'slider' } } },
  { name: 'color_temp_start_offset', selector: { number: { min: -100, max: 100, mode: 'slider' } } },
  { name: 'color_temp_end_offset', selector: { number: { min: -100, max: 100, mode: 'slider' } } },
  { name: 'show_color_slider', selector: { boolean: {} } },
  { name: 'hide_color_slider_when_off', selector: { boolean: {} } },
  { name: 'color_slider_height', selector: { number: { min: 2, max: 80, mode: 'slider' } } },
  { name: 'color_slider_border_radius', selector: { number: { min: 0, max: 40, mode: 'slider' } } },
  { name: 'color_slider_start_offset', selector: { number: { min: -100, max: 100, mode: 'slider' } } },
  { name: 'color_slider_end_offset', selector: { number: { min: -100, max: 100, mode: 'slider' } } },
  { name: 'color_picker_type', selector: { select: { options: [
    { value: 'slider', label: 'Hue Spectrum 360° Rainbow Slider (Default)' },
    { value: 'google', label: 'Google Home Material 3 Rainbow Pill Slider' },
    { value: 'wheel', label: 'Interactive Color Wheel' },
    { value: 'swatches', label: 'Quick Color Swatches (Palette Buttons)' },
  ] } } },
  { name: 'features_position', selector: { select: { options: [
    { value: 'bottom', label: 'Bottom Stack (Under Info)' },
    { value: 'inline', label: 'Inline (Right of Info - Bubble Card Style)' },
  ] } } },
  { name: 'collapse_controls_trigger', selector: { select: { options: [
    { value: 'none', label: 'Always Expanded (Disabled)' },
    { value: 'hold', label: 'Long Press / Hold Card (Recommended)' },
    { value: 'double_tap', label: 'Double Tap Card' },
  ] } } },
];

// ==========================================
// 4. SPACING, PADDING & SIZING SCHEMA
// ==========================================
const SCHEMA_SPACING = [
  { name: 'card_padding', label: 'Card Base Padding (All Sides px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },
  { name: 'card_padding_vertical', label: 'Card Vertical Padding (Top/Bottom px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },
  { name: 'card_padding_horizontal', label: 'Card Horizontal Padding (Left/Right px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },
  { name: 'card_padding_top', label: 'Card Padding Top (px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },
  { name: 'card_padding_bottom', label: 'Card Padding Bottom (px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },
  { name: 'card_padding_left', label: 'Card Padding Left (px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },
  { name: 'card_padding_right', label: 'Card Padding Right (px)', selector: { number: { min: 0, max: 64, mode: 'slider' } } },

  { name: 'card_margin', label: 'Card Base Margin (All Sides px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },
  { name: 'card_margin_vertical', label: 'Card Vertical Margin (Top/Bottom px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },
  { name: 'card_margin_horizontal', label: 'Card Horizontal Margin (Left/Right px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },
  { name: 'card_margin_top', label: 'Card Margin Top (px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },
  { name: 'card_margin_bottom', label: 'Card Margin Bottom (px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },
  { name: 'card_margin_left', label: 'Card Margin Left (px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },
  { name: 'card_margin_right', label: 'Card Margin Right (px)', selector: { number: { min: -30, max: 64, mode: 'slider' } } },

  { name: 'content_spacing', label: 'Content Gap (Icon, Text, Features px)', selector: { number: { min: -20, max: 80, mode: 'slider' } } },
  { name: 'text_spacing', label: 'Text Gap (Primary & Secondary px)', selector: { number: { min: -20, max: 48, mode: 'slider' } } },
  { name: 'features_margin', label: 'Controls Top Margin (px)', selector: { number: { min: -30, max: 80, mode: 'slider' } } },
  { name: 'slider_spacing', label: 'Gap Between Multiple Sliders (px)', selector: { number: { min: -10, max: 48, mode: 'slider' } } },
  { name: 'icon_margin', label: 'Icon Margin (px)', selector: { number: { min: -30, max: 80, mode: 'slider' } } },

  // Component Inner Paddings
  { name: 'icon_padding', label: 'Icon Inner Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'text_padding', label: 'Text Block Base Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'text_padding_vertical', label: 'Text Vertical Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'text_padding_horizontal', label: 'Text Horizontal Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'features_padding', label: 'Controls Container Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'features_padding_vertical', label: 'Controls Vertical Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'features_padding_horizontal', label: 'Controls Horizontal Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },

  // Sizing & Positioning
  { name: 'card_width', selector: { text: { suffix: 'e.g. 100%, 300px, auto' } } },
  { name: 'card_max_width', selector: { text: { suffix: 'e.g. 400px, 100%' } } },
  { name: 'card_height', selector: { text: { suffix: 'e.g. auto, 120px, 100%' } } },
  { name: 'card_min_height', selector: { number: { min: 0, max: 500, mode: 'slider', step: 10 } } },
  { name: 'text_box_width', selector: { text: { suffix: 'e.g. 100%, 180px, auto' } } },
  { name: 'text_alignment', selector: { select: { options: [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
    { value: 'justify', label: 'Justify' },
  ] } } },
  { name: 'content_alignment', selector: { select: { options: [
    { value: 'flex-start', label: 'Start (Top/Left)' },
    { value: 'center', label: 'Center' },
    { value: 'flex-end', label: 'End (Bottom/Right)' },
    { value: 'space-between', label: 'Space Between' },
    { value: 'space-around', label: 'Space Around' },
  ] } } },
  { name: 'text_offset_x', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'text_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'primary_text_start_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'primary_text_end_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'primary_text_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'secondary_text_start_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'secondary_text_end_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'secondary_text_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'icon_offset_x', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'icon_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'features_offset_x', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'features_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
];

// ==========================================
// 5. TYPOGRAPHY SCHEMA
// ==========================================
const SCHEMA_TYPOGRAPHY = [
  { name: 'text_color_mode', selector: { select: { options: [
    { value: 'selected', label: 'Fixed Selected Color (Default)' },
    { value: 'inverse', label: 'Inverse Dynamic Text (Blend Mode Difference)' },
    { value: 'active_accent', label: 'Adaptive Active Accent (Dynamic Color when On)' },
  ] } } },
  { name: 'font_size_primary', selector: { number: { min: 10, max: 36, mode: 'slider' } } },
  { name: 'font_size_secondary', selector: { number: { min: 10, max: 24, mode: 'slider' } } },
  { name: 'font_weight_primary', selector: { select: { options: [
    { value: 'normal', label: 'Normal (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: 'bold', label: 'Bold (700)' },
    { value: '800', label: 'Heavy (800)' },
  ] } } },
  { name: 'text_color_primary', selector: { color_rgb: {} } },
  { name: 'text_color_secondary', selector: { color_rgb: {} } },
  { name: 'primary_text_start_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'primary_text_end_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'primary_text_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'secondary_text_start_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'secondary_text_end_offset', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'secondary_text_offset_y', selector: { number: { min: -150, max: 250, mode: 'slider' } } },
  { name: 'text_scrolling_primary', selector: { select: { options: [
    { value: 'none', label: 'None (Standard Truncate with Ellipsis)' },
    { value: 'marquee', label: 'Marquee (Smooth Bounce / Ping-Pong)' },
    { value: 'continuous', label: 'Continuous Ticker Loop' },
    { value: 'hover', label: 'Scroll on Hover Only' },
  ] } } },
  { name: 'text_scrolling_secondary', selector: { select: { options: [
    { value: 'none', label: 'None (Standard Truncate with Ellipsis)' },
    { value: 'marquee', label: 'Marquee (Smooth Bounce / Ping-Pong)' },
    { value: 'continuous', label: 'Continuous Ticker Loop' },
    { value: 'hover', label: 'Scroll on Hover Only' },
  ] } } },
  { name: 'text_scrolling_speed', selector: { number: { min: 4, max: 30, mode: 'slider', step: 1 } } },
  { name: 'text_transform_primary', selector: { select: { options: [
    { value: 'none', label: 'None' },
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'capitalize', label: 'Capitalize' },
    { value: 'lowercase', label: 'lowercase' },
  ] } } },
  { name: 'text_transform_secondary', selector: { select: { options: [
    { value: 'none', label: 'None' },
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'capitalize', label: 'Capitalize (Default)' },
    { value: 'lowercase', label: 'lowercase' },
  ] } } },
];



// ==========================================
// 6. SUB-BUTTONS SCHEMAS
// ==========================================
const SCHEMA_SUB_CONTAINER = [
  { name: 'sub_button_alignment', selector: { select: { options: [
    { value: 'flex-end', label: 'Right Aligned (Default)' },
    { value: 'flex-start', label: 'Left Aligned' },
    { value: 'center', label: 'Centered' },
    { value: 'space-between', label: 'Space Between (Spread Evenly)' },
    { value: 'space-around', label: 'Space Around' },
  ] } } },
  { name: 'sub_button_spacing', label: 'Gap Between Sub-Buttons (px)', selector: { number: { min: -10, max: 64, mode: 'slider' } } },
  { name: 'sub_button_padding', label: 'Sub-Button Internal Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
  { name: 'sub_button_container_padding', label: 'Container Top Padding (px)', selector: { number: { min: 0, max: 48, mode: 'slider' } } },
];

function createSubButtonSchema(index: 1 | 2 | 3 | 4) {
  return [
    { name: `sub_button_${index}_entity`, selector: { entity: {} } },
    { name: `sub_button_${index}_type`, selector: { select: { options: [
      { value: 'button', label: 'Standard Action Button (Default)' },
      { value: 'play_pause', label: 'Media: Play/Pause Dynamic Toggle' },
      { value: 'next', label: 'Media: Next Track' },
      { value: 'previous', label: 'Media: Previous Track' },
      { value: 'open_close', label: 'Cover: Open/Close Toggle' },
      { value: 'stop', label: 'Cover: Stop' },
      { value: 'garage_toggle', label: 'Garage: Toggle Open / Close' },
      { value: 'lock_unlock', label: 'Lock: Toggle Lock/Unlock' },
      { value: 'fan_speed', label: 'Fan: Cycle Speed (0-33-66-100%)' },
      { value: 'clean', label: 'Vacuum: Start / Pause Clean' },
      { value: 'dock', label: 'Vacuum: Return to Base / Dock' },
      { value: 'locate', label: 'Vacuum: Locate / Beep' },
      { value: 'hvac_mode', label: 'Climate: Cycle HVAC Mode' },
      { value: 'light_effect', label: 'Light: Cycle Dynamic Effects' },
      { value: 'dim_up', label: 'Light: Step Brightness Up (+10%)' },
      { value: 'dim_down', label: 'Light: Step Brightness Down (-10%)' },
      { value: 'temp_warm', label: 'Light: Warm White (2700K)' },
      { value: 'temp_cool', label: 'Light: Cool Daylight (6000K)' },
      { value: 'slider', label: 'Mini Interactive Slider' },
      { value: 'google_slider', label: 'Google-Style Pill Slider' },
      { value: 'color_temp', label: 'Color Temp Control' },
      { value: 'color_picker', label: 'RGB Color Picker Swatch' },
      { value: 'brightness', label: 'Brightness Quick Button' },
    ] } } },
    { name: `sub_button_${index}_icon`, selector: { icon: {} } },
    { name: `sub_button_${index}_name`, selector: { text: {} } },
    { name: `sub_button_${index}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${index}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${index}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${index}_tap_action`, selector: { ui_action: {} } },
    { name: `sub_button_${index}_hold_action`, selector: { ui_action: {} } },
    { name: `sub_button_${index}_double_tap_action`, selector: { ui_action: {} } },
  ];
}

const SCHEMA_SUB1 = createSubButtonSchema(1);
const SCHEMA_SUB2 = createSubButtonSchema(2);
const SCHEMA_SUB3 = createSubButtonSchema(3);
const SCHEMA_SUB4 = createSubButtonSchema(4);

// ==========================================
// 7. ACTIONS & STYLESHEET SCHEMA
// ==========================================
const SCHEMA_ACTIONS = [
  { name: 'tap_action', selector: { ui_action: {} } },
  { name: 'hold_action', selector: { ui_action: {} } },
  { name: 'double_tap_action', selector: { ui_action: {} } },
  { name: 'custom_styles', selector: { text: { multiline: true } } },
];

const NAMED_COLORS: Record<string, string> = {
  red: '#ff0000', green: '#008000', blue: '#0000ff', white: '#ffffff', black: '#000000',
  orange: '#ffa500', yellow: '#ffff00', purple: '#800080', pink: '#ffc0cb', cyan: '#00ffff',
  gray: '#808080', grey: '#808080', teal: '#008080', gold: '#ffd700', lime: '#00ff00'
};

function normalizeColorForEditor(color: any): string | undefined {
  if (typeof color !== 'string' || !color.trim()) return undefined;
  const c = color.trim();

  if (NAMED_COLORS[c.toLowerCase()]) {
    return NAMED_COLORS[c.toLowerCase()];
  }

  // 3-digit hex like "#fff" or "#f00"
  if (/^#[0-9a-fA-F]{3}$/.test(c)) {
    return `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`;
  }

  // If it's a raw triplet like "0, 0, 0" or "150, 150, 150"
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(c)) {
    const parts = c.split(',').map(n => Math.max(0, Math.min(255, parseInt(n.trim(), 10))));
    return `#${parts[0].toString(16).padStart(2, '0')}${parts[1].toString(16).padStart(2, '0')}${parts[2].toString(16).padStart(2, '0')}`;
  }
  // If it's "rgba(r, g, b, a)" or "rgb(r, g, b)"
  const rgbaMatch = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseInt(rgbaMatch[1], 10)));
    const g = Math.max(0, Math.min(255, parseInt(rgbaMatch[2], 10)));
    const b = Math.max(0, Math.min(255, parseInt(rgbaMatch[3], 10)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  // If it's "hsl(h, s%, l%)" or "hsla(h, s%, l%, a)" — convert to hex
  const hslMatch = c.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]) / 360;
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    const toHex = (x: number) => Math.round(Math.max(0, Math.min(255, x * 255))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return c;
}

function cssToRgbArray(color: any): number[] | undefined {
  const hex = normalizeColorForEditor(color);
  if (!hex || !hex.startsWith('#') || hex.length < 7) return undefined;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return undefined;
  return [r, g, b];
}

const EDITOR_CUSTOM_LABELS: Record<string, string> = {
  entity: "Entity",
  name: "Name (Optional Override)",
  icon: "Icon Override",
  icon_color: "Icon Color",
  icon_type: "Icon Type",
  icon_shape: "Icon Background Shape",
  icon_animation: "Icon Dynamic Animation",
  icon_opacity: "Icon Opacity %",
  icon_rotate: "Icon Rotation (degrees)",
  badge_icon: "Status Badge Icon (Mushroom)",
  badge_color: "Status Badge Color",
  badge_size: "Badge Size (px)",
  badge_offset: "Badge Offset from Corner (px)",
  theme_preset: "Visual Design Theme Preset",
  hover_effect: "Card Hover / Interaction Effect",
  color_type: "Color Application Target",
  layout: "Content Flow Layout",
  card_layout: "Card Sizing",
  primary_info: "Primary Text Display",
  secondary_info: "Secondary Text Display",
  features_position: "Slider / Controls Position",
  aspect_ratio: "Card Aspect Ratio",
  show_icon: "Show Icon Area",
  show_name: "Show Primary Name",
  show_state: "Show Secondary State",
  visibility_state: "Conditional Visibility / Display Filter",
  fill_container: "Fill Container Height (100%)",
  overflow_hidden: "Clip Overflow Content",
  show_slider: "Interactive Slider",
  hide_slider_when_off: "Hide Main Slider When Off",
  slider_style: "Slider Visual Style",
  full_slider_opacity: "Full Card Slider Background Opacity %",
  show_slider_percent: "Show Live Percentage Badge on Slider",
  slider_height: "Slider Track Height (px)",
  slider_border_radius: "Slider Track Roundness (px)",
  slider_start_offset: "Main Slider Start Position (Left Offset px)",
  slider_end_offset: "Main Slider End Position (Right Offset px)",
  show_color_temp: "Expanding Color Temp Slider (Lights)",
  hide_color_temp_when_off: "Hide Color Temp Slider When Off",
  color_temp_height: "Color Temp Slider Height (px)",
  color_temp_border_radius: "Color Temp Slider Corner Radius (px)",
  color_temp_start_offset: "Color Temp Start Position (Left Offset px)",
  color_temp_end_offset: "Color Temp End Position (Right Offset px)",
  show_color_slider: "Expanding Color Hue Slider (Lights)",
  hide_color_slider_when_off: "Hide Color Hue Slider When Off",
  color_slider_height: "Color Hue Slider Height (px)",
  color_slider_border_radius: "Color Hue Slider Corner Radius (px)",
  color_slider_start_offset: "Color Hue Start Position (Left Offset px)",
  color_slider_end_offset: "Color Hue End Position (Right Offset px)",
  font_size_primary: "Primary Font Size (px)",
  font_size_secondary: "Secondary Font Size (px)",
  font_weight_primary: "Primary Text Weight",
  text_color_primary: "Primary Text Color",
  text_color_secondary: "Secondary Text Color",
  text_scrolling_primary: "Primary Text Scrolling Effect",
  text_scrolling_secondary: "Secondary Text Scrolling Effect",
  text_scrolling_speed: "Text Scrolling Speed (seconds)",
  text_transform_primary: "Primary Text Case",
  text_transform_secondary: "Secondary Text Case",
  letter_spacing: "Letter Spacing (px)",
  line_height: "Line Height",
  icon_size: "Icon Size (px)",
  card_padding: "Card Inner Base Padding (px)",
  card_padding_vertical: "Vertical Padding (Top/Bottom px)",
  card_padding_horizontal: "Horizontal Padding (Left/Right px)",
  card_padding_top: "Top Padding (px)",
  card_padding_bottom: "Bottom Padding (px)",
  card_padding_left: "Left Padding (px)",
  card_padding_right: "Right Padding (px)",
  card_margin: "Card Outer Margin (px)",
  card_margin_vertical: "Card Vertical Margin / Separator (px)",
  card_margin_horizontal: "Card Horizontal Margin / Separator (px)",
  card_margin_top: "Card Margin Top (px)",
  card_margin_bottom: "Card Margin Bottom (px)",
  card_margin_left: "Card Margin Left (px)",
  card_margin_right: "Card Margin Right (px)",
  icon_padding: "Icon Inner Padding (px)",
  text_padding: "Text Base Padding (px)",
  text_padding_vertical: "Text Vertical Padding (px)",
  text_padding_horizontal: "Text Horizontal Padding (px)",
  features_padding: "Controls Container Padding (px)",
  features_padding_vertical: "Controls Vertical Padding (px)",
  features_padding_horizontal: "Controls Horizontal Padding (px)",
  sub_button_container_padding: "Sub-Buttons Container Padding (px)",
  content_spacing: "Content Gap (Icon, Text, Features px)",
  text_spacing: "Text Gap (Primary & Secondary px)",
  features_margin: "Features Margin Top (px)",
  slider_spacing: "Gap Between Multiple Sliders (px)",
  icon_margin: "Icon Margin (px)",
  sub_button_spacing: "Sub-Buttons Gap (px)",
  sub_button_padding: "Sub-Buttons Padding (px)",
  sub_button_alignment: "Sub-Buttons Alignment & Distribution",
  card_width: "Card Width (e.g. 100%, 300px)",
  card_max_width: "Card Max Width (e.g. 400px, 100%)",
  card_height: "Card Fixed Height (e.g. auto, 120px)",
  card_min_height: "Card Minimum Height (px)",
  text_box_width: "Text Box / Info Area Width (e.g. 100%, 180px, auto)",
  icon_container_size: "Icon Box / Container Size (px)",
  text_alignment: "Text Alignment",
  content_alignment: "Content Box Alignment",
  text_offset_x: "Text Offset X (px)",
  text_offset_y: "Text Offset Y (px)",
  primary_text_start_offset: "Primary Text Start Position (Left Offset px)",
  primary_text_end_offset: "Primary Text End Position (Right Margin px)",
  primary_text_offset_x: "Primary Text Horizontal Offset X (px)",
  primary_text_offset_y: "Primary Text Vertical Offset Y (px)",
  secondary_text_start_offset: "Secondary Text Start Position (Left Offset px)",
  secondary_text_end_offset: "Secondary Text End Position (Right Margin px)",
  secondary_text_offset_x: "Secondary Text Horizontal Offset X (px)",
  secondary_text_offset_y: "Secondary Text Vertical Offset Y (px)",
  icon_offset_x: "Icon Offset X (px)",
  icon_offset_y: "Icon Offset Y (px)",
  features_offset_x: "Controls Offset X (px)",
  features_offset_y: "Controls Offset Y (px)",
  fade_transition_enabled: "Enable Multi-Stage Fade & Decay",
  fade_trigger: "Fade Trigger Mode",
  fade_target: "Fade Color Application Target",
  fade_smooth_retrigger: "Smooth Re-trigger (Pick up current live color if state changes mid-fade)",
  show_decay_slider: "Show Live Cooldown / Decay Progress Bar",
  decay_slider_height: "Decay Slider Height (px)",
  decay_slider_position: "Decay Slider Position",
  fade_stage_1_duration: "Stage 1 Duration (e.g. 60s for 1 min quick fade)",
  fade_stage_1_pickup: "Stage 1: Pick up from active/live state color",
  fade_stage_1_color: "Stage 1 Target Color (e.g. Amber / Orange)",
  fade_stage_2_duration: "Stage 2 Duration (e.g. 600s for 10 min mid fade)",
  fade_stage_2_pickup: "Stage 2: Pick up where Stage 1 left off",
  fade_stage_2_color: "Stage 2 Target Color (e.g. Yellow / Lime)",
  fade_stage_3_duration: "Stage 3 Duration (e.g. 1800s for 30 min final fade)",
  fade_stage_3_pickup: "Stage 3: Pick up where Stage 2 left off",
  fade_stage_3_color: "Stage 3 Final Color (e.g. Resting Green)",
  bg_color: "Card Background Color",
  bg_opacity: "Background Opacity %",
  border_radius: "Border Radius (px)",
  card_border_width: "Border Width (px)",
  card_border_color: "Border Color",
  card_border_style: "Border Style",
  active_color: "Active State Color",
  inactive_color: "Inactive State Color",
  box_shadow: "Box Shadow Preset",
  backdrop_blur: "Backdrop Blur (Frosted Glass px)",
  card_opacity: "Card Opacity %",
  transition_duration: "Transition Speed (ms)",
  active_glow: "Glow Card Outer Border When Active",
  active_pulse: "Pulse Icon When Active",
  tap_action: "Card Tap Action",
  hold_action: "Card Hold Action",
  double_tap_action: "Card Double Tap Action",
  sub_button_1_entity: "Entity",
  sub_button_1_type: "Control Type",
  sub_button_1_icon: "Icon Override",
  sub_button_1_name: "Label Text",
  sub_button_1_show_state: "Show Live State Text / Chip",
  sub_button_1_color: "Color",
  sub_button_1_show_background: "Show Background",
  sub_button_1_tap_action: "Tap Action",
  sub_button_1_hold_action: "Hold Action",
  sub_button_1_double_tap_action: "Double Tap Action",
  sub_button_2_entity: "Entity",
  sub_button_2_type: "Control Type",
  sub_button_2_icon: "Icon Override",
  sub_button_2_name: "Label Text",
  sub_button_2_show_state: "Show Live State Text / Chip",
  sub_button_2_color: "Color",
  sub_button_2_show_background: "Show Background",
  sub_button_2_tap_action: "Tap Action",
  sub_button_2_hold_action: "Hold Action",
  sub_button_2_double_tap_action: "Double Tap Action",
  sub_button_3_entity: "Entity",
  sub_button_3_type: "Control Type",
  sub_button_3_icon: "Icon Override",
  sub_button_3_name: "Label Text",
  sub_button_3_show_state: "Show Live State Text / Chip",
  sub_button_3_color: "Color",
  sub_button_3_show_background: "Show Background",
  sub_button_3_tap_action: "Tap Action",
  sub_button_3_hold_action: "Hold Action",
  sub_button_3_double_tap_action: "Double Tap Action",
  sub_button_4_entity: "Entity",
  sub_button_4_type: "Control Type",
  sub_button_4_icon: "Icon Override",
  sub_button_4_name: "Label Text",
  sub_button_4_show_state: "Show Live State Text / Chip",
  sub_button_4_color: "Color",
  sub_button_4_show_background: "Show Background",
  sub_button_4_tap_action: "Tap Action",
  sub_button_4_hold_action: "Hold Action",
  sub_button_4_double_tap_action: "Double Tap Action",
  custom_styles: "Custom Raw CSS / Scoped Stylesheet"
};

export class AntigravityWithIconCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: AntigravityCardConfig;
  @state() private _openPanels: Record<string, boolean> = {
    core: true,
    appearance: false,
    controls: true,
    spacing: false,
    typography: false,
    sub_buttons: false,
    actions: false,
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
  };

  public setConfig(config: AntigravityCardConfig): void {
    const raw = { ...config };
    if (raw.bg_color) {
      const rgbaMatch = typeof raw.bg_color === 'string' ? raw.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      if (rgbaMatch && raw.bg_opacity === undefined) {
        raw.bg_opacity = Math.round(parseFloat(rgbaMatch[1]) * 100);
      }
      raw.bg_color = normalizeColorForEditor(raw.bg_color);
    }
    if (raw.card_border_color) raw.card_border_color = normalizeColorForEditor(raw.card_border_color);
    if (raw.icon_color) raw.icon_color = normalizeColorForEditor(raw.icon_color);
    if (raw.active_color) raw.active_color = normalizeColorForEditor(raw.active_color);
    if (raw.inactive_color) raw.inactive_color = normalizeColorForEditor(raw.inactive_color);
    if (raw.badge_color) raw.badge_color = normalizeColorForEditor(raw.badge_color);
    if (raw.slider_color) raw.slider_color = normalizeColorForEditor(raw.slider_color);
    if (raw.slider_track_color) raw.slider_track_color = normalizeColorForEditor(raw.slider_track_color);
    if (raw.text_color_primary) raw.text_color_primary = normalizeColorForEditor(raw.text_color_primary);
    if (raw.text_color_secondary) raw.text_color_secondary = normalizeColorForEditor(raw.text_color_secondary);
    if (raw.sub_button_1_color) raw.sub_button_1_color = normalizeColorForEditor(raw.sub_button_1_color);
    if (raw.sub_button_2_color) raw.sub_button_2_color = normalizeColorForEditor(raw.sub_button_2_color);
    if (raw.sub_button_3_color) raw.sub_button_3_color = normalizeColorForEditor(raw.sub_button_3_color);
    if (raw.sub_button_4_color) raw.sub_button_4_color = normalizeColorForEditor(raw.sub_button_4_color);
    
    this._config = {
      ...DEFAULT_CARD_CONFIG,
      ...raw,
    };
  }

  private _computeLabel(schema: any): string {
    return EDITOR_CUSTOM_LABELS[schema.name] || schema.name;
  }

  private _valueChanged(ev: CustomEvent, schemaChunk: any[]): void {
    let newConfig = { ...this._config };
    const incoming = ev.detail.value || {};
    
    // Update or clear each key defined in this schema chunk
    for (const item of schemaChunk) {
      if (item.name) {
        if (item.selector?.boolean !== undefined) {
          if (incoming[item.name] !== undefined) {
            (newConfig as any)[item.name] = incoming[item.name] === true;
          } else {
            delete (newConfig as any)[item.name];
          }
        } else if (item.selector?.color_rgb !== undefined) {
          const val = incoming[item.name];
          if (Array.isArray(val) && val.length === 3) {
            (newConfig as any)[item.name] = `rgb(${val[0]}, ${val[1]}, ${val[2]})`;
          } else if (val !== undefined && val !== '') {
            (newConfig as any)[item.name] = val;
          } else {
            delete (newConfig as any)[item.name];
          }
        } else {
          // If value is present and not empty, use it; otherwise delete it to trigger default fallbacks
          if (incoming[item.name] !== undefined && incoming[item.name] !== '') {
            (newConfig as any)[item.name] = incoming[item.name];
          } else {
            delete (newConfig as any)[item.name];
          }
        }
      }
    }
    
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _transformConfigForForm(): any {
    const data = { ...this._config };
    const colorFields = [
      'icon_color', 'badge_color', 'bg_color', 'card_border_color', 'active_color', 'inactive_color',
      'text_color_primary', 'text_color_secondary', 'slider_color', 'slider_track_color',
      'sub_button_1_color', 'sub_button_2_color', 'sub_button_3_color', 'sub_button_4_color'
    ];
    for (const field of colorFields) {
      if ((data as any)[field]) {
        const rgbArray = cssToRgbArray((data as any)[field]);
        if (rgbArray) {
          (data as any)[field] = rgbArray;
        }
      }
    }
    return data;
  }

  private _togglePanel(key: string): void {
    this._openPanels = {
      ...this._openPanels,
      [key]: !this._openPanels[key]
    };
  }

  private _renderSection(key: string, icon: string, title: string, schema: any[], formData: any) {
    const isOpen = !!this._openPanels[key];
    return html`
      <div class="custom-panel ${isOpen ? 'open' : ''}">
        <div class="panel-header" @click=${() => this._togglePanel(key)}>
          <div class="header-left">
            <span class="header-icon">${icon}</span>
            <span class="header-title">${title}</span>
          </div>
          <ha-icon class="chevron-icon ${isOpen ? 'rotated' : ''}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${schema}
              .computeLabel=${this._computeLabel}
              @value-changed=${(e: CustomEvent) => this._valueChanged(e, schema)}
            ></ha-form>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderSubButtonPanel(num: number, subEntity: string, schema: any[], formData: any) {
    const key = `sub${num}`;
    const isOpen = !!this._openPanels[key];
    return html`
      <div class="sub-nested-panel ${isOpen ? 'open' : ''}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(key)}>
          <div class="header-left">
            <span class="sub-dot ${subEntity ? 'active' : ''}"></span>
            <span class="sub-title">Sub-Button ${num} ${subEntity ? `(${subEntity})` : '• Inactive'}</span>
          </div>
          <ha-icon class="chevron-icon ${isOpen ? 'rotated' : ''}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${schema}
              .computeLabel=${this._computeLabel}
              @value-changed=${(e: CustomEvent) => this._valueChanged(e, schema)}
            ></ha-form>
          </div>
        ` : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return html``;
    const formData = this._transformConfigForForm();
    const sub1Entity = this._config?.sub_button_1_entity || '';
    const sub2Entity = this._config?.sub_button_2_entity || '';
    const sub3Entity = this._config?.sub_button_3_entity || '';
    const sub4Entity = this._config?.sub_button_4_entity || '';
    const isSubButtonsOpen = !!this._openPanels['sub_buttons'];

    return html`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection('core', '📦', 'Core & Layout', SCHEMA_CORE, formData)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection('appearance', '🎨', 'Appearance & Theming', SCHEMA_APPEARANCE, formData)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection('controls', '🎛️', 'Sliders & Interactive Controls', SCHEMA_CONTROLS, formData)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection('spacing', '📏', 'Spacing, Padding & Sizing', SCHEMA_SPACING, formData)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection('typography', '✍️', 'Typography & Live Scrolling', SCHEMA_TYPOGRAPHY, formData)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${isSubButtonsOpen ? 'open' : ''}">
          <div class="panel-header" @click=${() => this._togglePanel('sub_buttons')}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${isSubButtonsOpen ? 'rotated' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${isSubButtonsOpen ? html`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${formData}
                .schema=${SCHEMA_SUB_CONTAINER}
                .computeLabel=${this._computeLabel}
                @value-changed=${(e: CustomEvent) => this._valueChanged(e, SCHEMA_SUB_CONTAINER)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, sub1Entity, SCHEMA_SUB1, formData)}
                ${this._renderSubButtonPanel(2, sub2Entity, SCHEMA_SUB2, formData)}
                ${this._renderSubButtonPanel(3, sub3Entity, SCHEMA_SUB3, formData)}
                ${this._renderSubButtonPanel(4, sub4Entity, SCHEMA_SUB4, formData)}
              </div>
            </div>
          ` : nothing}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection('actions', '⚡', 'Actions & Scoped CSS', SCHEMA_ACTIONS, formData)}
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }
      .custom-panel {
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        border-radius: 10px;
        background: var(--card-background-color, rgba(125, 125, 125, 0.05));
        overflow: hidden;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .custom-panel.open {
        border-color: var(--primary-color, #03a9f4);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        user-select: none;
        background: transparent;
        transition: background-color 0.15s ease;
      }
      .panel-header:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .header-icon {
        font-size: 18px;
        line-height: 1;
      }
      .header-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color, #ffffff);
      }
      .chevron-icon {
        color: var(--secondary-text-color, #9e9e9e);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
      }
      .chevron-icon.rotated {
        transform: rotate(180deg);
        color: var(--primary-color, #03a9f4);
      }
      .panel-body {
        padding: 14px 16px 18px;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
        animation: fadeIn 0.2s ease;
      }
      .section-subtitle {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color, #9e9e9e);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }
      .sub-buttons-nested-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
      }
      .sub-nested-panel {
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
        border-radius: 8px;
        background: rgba(125, 125, 125, 0.04);
        overflow: hidden;
      }
      .sub-nested-panel.open {
        border-color: rgba(3, 169, 244, 0.4);
      }
      .sub-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: pointer;
        user-select: none;
      }
      .sub-panel-header:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      .sub-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--secondary-text-color, #757575);
      }
      .sub-dot.active {
        background: #4caf50;
        box-shadow: 0 0 6px #4caf50;
      }
      .sub-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color, #ffffff);
      }
      .sub-panel-body {
        padding: 12px 14px 14px;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.06));
        background: rgba(0, 0, 0, 0.1);
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}

if (!customElements.get('antigravity-with-icon-card-editor')) {
  customElements.define('antigravity-with-icon-card-editor', AntigravityWithIconCardEditor);
}

