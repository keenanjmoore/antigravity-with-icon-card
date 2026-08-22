# Antigravity Custom Cards — Compatibility & Feature Matrix

This matrix documents verified platform support, Home Assistant integration layers, and browser execution environments for the **Antigravity Custom Cards Suite**.

---

## 1. Browser & Rendering Engine Support

| Browser / Web Engine | Minimum Version | Compositing & Animations | Touch Physics & Slop | CSS Houdini Custom Properties |
| :--- | :---: | :---: | :---: | :---: |
| **Google Chrome / Chromium** | 110+ | ✅ GPU Hardware (`translate3d`) | ✅ 8px Touch Slop & RAF Coalescing | ✅ Supported (`CSS.registerProperty`) |
| **Apple Safari / iOS WebKit** | 16.0+ | ✅ CAMetalLayer Wide-Gamut P3 | ✅ PointerCancel & Native Momentum | ✅ Supported (`@property`) |
| **Mozilla Firefox** | 115+ ESR | ✅ Hardware Compositor | ✅ Multi-Touch Disambiguation | ✅ Supported |
| **Microsoft Edge** | 110+ | ✅ Variable Rate Shading (VRS) | ✅ Sub-pixel Pointer Events | ✅ Supported |
| **Android System WebView** | 110+ | ✅ Tensor G4 EAS Task Pinning | ✅ Coalesced Touch Loops (120Hz) | ✅ Supported |

---

## 2. Platform & App Execution

| Client / Environment | Support Status | Notes & Capabilities |
| :--- | :---: | :--- |
| **Home Assistant Companion (Android)** | ✅ Verified | Automatic WebView cache invalidation on pull-to-refresh. Hardware haptics enabled. |
| **Home Assistant Companion (iOS)** | ✅ Verified | Transient & continuous haptic feedback waveforms via WebKit IPC. |
| **Desktop Web (Chrome / Edge / Firefox)** | ✅ Verified | Full hover glow, keyboard navigation (`Enter` / `Space`), context menus, and tooltips. |
| **Fully Kiosk Browser** | ✅ Verified | Optimized for low-power wall displays with OLED pure black tokens. |

---

## 3. Supported Entity Domains & Feature Matrix

| Domain | Visual Modes | Primary Controls | Secondary Controls | Multi-Stage Decay |
| :--- | :--- | :--- | :--- | :---: |
| **`light`** | `icon`, `card` | Brightness Slider (`0-255` / `0-100%`) | Color Temperature, 360° Hue Spectrum, Color Swatches | ❌ (Off = Dark `#000000`) |
| **`binary_sensor`** | `card`, `icon` | State Badge / Name | Action Sub-Buttons (60+ Handlers) | ✅ 3-Stage Temporal Decay |
| **`lock`** | `card`, `icon` | Lock / Unlock Tap & Hold Actions | Gate & Relay Multi-Buttons | ✅ Red/Green State Inversion |
| **`cover`** | `card`, `icon` | Position Slider (`0-100%`) | Open, Close, Stop, Tilt Controls | ✅ Status Badging |
| **`fan`** | `card`, `icon` | Speed Percentage Slider | Preset Modes & Oscillation Toggles | ✅ Active Glow |
| **`climate`** | `card`, `icon` | Target Temperature Slider (`°F`/`°C`) | HVAC Modes (`heat`, `cool`, `dry`, `auto`) | ✅ Thermal Accents |
| **`media_player`** | `card`, `icon` | Volume Slider (`0-100%`) | Play, Pause, Next, Previous, Mute | ✅ Track Marquee |
| **`humidifier`** | `card`, `icon` | Target Humidity Slider (`0-100%`) | Mode Selectors & Sub-Buttons | ✅ Water Accents |
| **`number` / `input_number`** | `card`, `icon` | Step Snapping Value Slider | Custom Min/Max Steps | ✅ Live Feedback |
| **`switch`** | `card`, `icon` | Toggle Tap / Hold Actions | Device Monitoring & Power Draw | ✅ Active Glow |

---

## 4. Edge Case & Safety Invariants

1. **Missing Attributes**: All domain controllers gracefully fall back to native defaults when `supported_color_modes`, `min_temp`, `max_temp`, or `percentage_step` are omitted.
2. **`unavailable` / `unknown` Entities**: Cards display non-blocking unavailable state badges without throwing runtime exceptions or generating blank Shadow DOMs.
3. **Power-Save & Low Battery Throttling**: Automatically switches animation intervals from 16ms (60fps) to 33ms (30fps) when device battery drops below 20% or `input_boolean.antigravity_power_save` is active.
4. **Zero Layout Containment Collapses**: Card layouts avoid `:host { contain: content }`, preserving natural height across Lovelace Sections and Expander Accordions.
