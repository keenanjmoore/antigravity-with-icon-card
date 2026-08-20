# 🚀 Antigravity Card (With Icon) for Home Assistant

A sleek, ultra-responsive custom Lovelace card combining the fluid aesthetics of **Bubble Card** with the interactive control power of **Mushroom Card** and **Slider-Button Card**, featuring a complete icon styling suite and multi-stage physical-time fade transitions.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024+-blue.svg)
![HACS](https://img.shields.io/badge/HACS-Custom%20Card-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

- 🎨 **10 Built-In Aesthetic Theme Presets**: Frosted Glassmorphism, Soft Neumorphism, Cyberpunk Neon, Minimal Flat, Sunset Gradient, OLED Pitch Black, Nordic Aurora, Material You Pill, and 80s Synthwave.
- 🎛️ **Universal Multi-Domain Sliders**: Dimmable lights, Kelvin color temperature, 360° RGB hue sliders, covers, fans, humidifiers, media volume, and climate targets.
- ⏳ **Physical-Time Multi-Stage Color Fade Transitions**: Customizable 0–120 min multi-step occupancy cooldowns and warmup decays computed directly from `last_changed` timestamps.
- 🔘 **Up to 4 Integrated Sub-Buttons**: Media transport, HVAC modes, service actions, scene toggles, and compact sliders.
- 🪟 **Complete Icon Customization**: Custom icon shapes (circle, rounded, square), dynamic animations (spin, pulse, bounce), rotation angles, sizes, and badge indicators.
- ⚡ **Full Visual Editor**: Every single parameter, padding, margin, font size, and color is configurable directly from the Home Assistant card editor with live preview.

---

## 📦 Installation via HACS

1. Open **HACS** in Home Assistant.
2. Go to **Frontend** > Top Right 3-dots > **Custom Repositories**.
3. Add this repository URL and select Category: **Lovelace**.
4. Click **Install**.
5. Reload your Lovelace dashboard resources.

---

## 🛠️ YAML Configuration Example

```yaml
type: custom:antigravity-with-icon-card
entity: light.living_room_lights
name: Living Room
icon: mdi:lightbulb-outline
icon_shape: circle
show_slider: true
slider_style: google
show_color_temp: true
show_color_slider: true
theme_preset: glassmorphism
hover_effect: glow
sub_button_1_entity: scene.movie_mode
sub_button_1_icon: mdi:movie
sub_button_1_type: button
```

---

## 📄 License
MIT License © 2026 Keenan
