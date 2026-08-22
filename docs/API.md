# 📖 Antigravity Card API Reference

Complete reference of all configuration properties, default values, and valid options for Antigravity Cards.

---

## ⚙️ Core Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Required** | `custom:antigravity-card`, `custom:antigravity-no-icon-card`, or `custom:antigravity-with-icon-card` |
| `entity` | `string` | `undefined` | Primary Home Assistant entity ID (e.g. `light.living_room`, `binary_sensor.motion`) |
| `name` | `string` | `undefined` | Custom display title (defaults to entity `friendly_name`) |
| `layout` | `string` | `'default'` | `'default'`, `'horizontal'`, or `'vertical'` |
| `card_layout` | `string` | `'normal'` | `'normal'` or `'large'` (for HA Sections dashboard view) |
| `primary_info` | `string` | `'name'` | `'name'`, `'state'`, `'last-changed'`, `'brightness'`, `'temperature'`, `'humidity'`, `'battery'`, `'none'` |
| `secondary_info` | `string` | `'state'` | `'name'`, `'state'`, `'last-changed'`, `'brightness'`, `'temperature'`, `'humidity'`, `'battery'`, `'none'` |
| `visibility_state` | `string` | `'always'` | `'always'`, `'on'`, or `'off'` |

---

## 🎛️ Multi-Domain Sliders

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `show_slider` | `boolean` | `true` | Enable primary domain slider (brightness, volume, cover position, fan speed, temp) |
| `slider_style` | `string` | `'filled'` | `'circle'`, `'filled'`, `'thin'`, `'glow'`, `'segmented'`, `'google'`, `'full'` |
| `tap_slider_to_toggle`| `boolean`| `true` | Tapping slider toggles entity state |
| `show_color_temp` | `boolean` | `false` | Show Kelvin color temperature slider for lights |
| `color_temp_type` | `string` | `'gradient'`| `'gradient'`, `'google'`, `'presets'`, `'thin'` |
| `show_color_picker` | `boolean` | `false` | Show light color picker control |
| `color_picker_type` | `string` | `'slider'` | `'slider'` (Hue bar), `'google'`, `'wheel'`, `'swatches'` |
| `slider_height` | `number` | `36` | Height of the primary slider track in pixels |

---

## ⏳ Multi-Stage Fade Transitions

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fade_transition_enabled` | `boolean` | `false` | Enable physical-time multi-stage color decay |
| `fade_trigger` | `string` | `'on_inactive'` | Trigger mode: `'on_inactive'`, `'on_active'`, or `'both'` |
| `fade_target` | `string` | `'card'` | Target: `'card'`, `'slider'`, `'icon'`, or `'all'` |
| `show_decay_slider` | `boolean` | `true` | Display active progress bar representing fade progress |
| `decay_slider_position` | `string` | `'bottom'` | `'top'`, `'bottom'`, or `'inline'` |
| `fade_stage_1_duration` | `number` | `60` | Duration of Stage 1 in seconds |
| `fade_stage_1_color` | `string` | `'#ff9800'` | Target color for Stage 1 (e.g. Amber) |
| `fade_stage_2_duration` | `number` | `600` | Duration of Stage 2 in seconds |
| `fade_stage_2_color` | `string` | `'#cddc39'` | Target color for Stage 2 (e.g. Lime) |
| `fade_stage_3_duration` | `number` | `1800` | Duration of Stage 3 in seconds |
| `fade_stage_3_color` | `string` | `'#4caf50'` | Target color for Stage 3 (e.g. Green) |
| `fade_smooth_retrigger`| `boolean` | `true` | Smoothly pick up current in-flight color if state changes mid-fade |

---

## 🎨 Themes & Aesthetic Presets

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme_preset` | `string` | `'glassmorphism'` | `'glassmorphism'`, `'neumorphism'`, `'cyberpunk'`, `'aurora'`, `'oled'`, `'sunset'`, `'flat'`, `'material_you'`, `'retro_synth'`, `'minimal'`, `'custom'` |
| `glassmorphism_blur` | `number` | `16` | Backdrop blur radius in pixels |
| `glassmorphism_opacity`| `number` | `0.25` | Background translucency opacity (0.0 to 1.0) |
| `neumorphism_depth` | `number` | `6` | Shadow elevation depth for soft neumorphism |
| `cyberpunk_glow` | `string` | `'#00f0ff'` | Accent glow color for Cyberpunk theme |
