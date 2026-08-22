# 🏛️ Antigravity Card Architecture & Module System

The **Antigravity Card** is built on an ultra-optimized, modular web-components architecture leveraging **Lit 3.x**, **TypeScript**, and hardware-accelerated GPU pipelines.

```
                  ┌─────────────────────────────────────┐
                  │          Home Assistant             │
                  │   (WebSocket State & Service Bus)   │
                  └──────────────────┬──────────────────┘
                                     │
                     hass / stateObj │ set_state / call_service
                                     ▼
        ┌────────────────────────────────────────────────────────┐
        │                 AntigravityCard (Lit)                  │
        │          Component Lifecycle & Event Delegate          │
        └───────┬──────────────┬──────────────┬───────────┬──────┘
                │              │              │           │
                ▼              ▼              ▼           ▼
       ┌────────────────┐ ┌──────────────┐ ┌─────────┐ ┌─────────────┐
       │ SliderEngine   │ │ FadeManager  │ │ Themes  │ │ SubButtons  │
       │ Multi-Domain   │ │ 3-Stage Lerp │ │ 10 Skin │ │ 1-4 Feature │
       │ Bounds & Steps │ │ Continuous   │ │ Presets │ │ Grid Engine │
       └────────────────┘ └──────────────┘ └─────────┘ └─────────────┘
                │              │              │           │
                └──────────────┼──────────────┼───────────┘
                               ▼
        ┌────────────────────────────────────────────────────────┐
        │             StyleBuilder & ColorConverter              │
        │      Zero-Reflow CSS Variables & 256-Entry LRU Cache   │
        └──────────────────────────────┬─────────────────────────┘
                                       │
                                       ▼
        ┌────────────────────────────────────────────────────────┐
        │                    Shadow DOM Output                   │
        │      (Hardware-Accelerated Mobile WebView Rendering)   │
        └────────────────────────────────────────────────────────┘
```

---

## 📦 Core Domain Modules

### 1. `constants.ts`
Centralizes all numerical and string constants (fade durations, timing thresholds, color defaults, Kelvin limits) and exports frozen `ReadonlySet` collections (`ACTIVE_STATES`, `NON_TOGGLEABLE_DOMAINS`, `SLIDER_SUPPORTED_DOMAINS`) for instant $O(1)$ lookup complexity.

### 2. `types.ts`
Defines branded types (`Percentage`, `Seconds`, `RGBTuple`), discriminated union schemas for Home Assistant actions, shared `InfoType` unions, and the full `AntigravityCardConfig` interface.

### 3. `color-converter.ts`
Implements `ColorConverter` with a 256-entry LRU cache, fast bitwise integer conversions between Hex, RGB, RGBA, HSL, HSV, and Kelvin approximations, and 60fps linear vector interpolation (`lerpRgb`).

### 4. `themes.ts`
Houses 10 built-in aesthetic themes (Frosted Glassmorphism, Soft Neumorphism, Cyberpunk Neon, Nordic Aurora, OLED Pitch Black, Sunset Gradient, Minimal Flat, Material You Pill, 80s Synthwave, and Minimal Clean) with scoped CSS property generation.

### 5. `slider-calculations.ts`
Consolidates multi-domain slider logic across lights, fans, covers, climate thermostats, humidifiers, and number inputs. Handles bounds clamping, step snapping, dual-target climate ranges, and touch scrubbing math.

### 6. `fade-transition.ts`
Encapsulates the `FadeTransitionManager` class for physical-time multi-stage color transitions (Stage 1 Amber, Stage 2 Lime, Stage 3 Green) with seamless mid-transition pickup and timestamp decay calculations.

### 7. `style-builder.ts`
Systematically computes card padding, margins, border radii, text offsets, and typography CSS tokens during configuration updates to eliminate inline style template allocations during renders.

### 8. `sub-button-renderer.ts`
Manages extraction and rendering for up to 4 integrated sub-buttons with built-in domain action presets (Media transport, Climate presets, Fan speeds, Light white mode, Garage toggles, and Humidity steps).

### 9. `config-validator.ts`
Provides runtime type guards (`isActionConfig`, `isRGBTuple`) and schema validation to catch configuration errors before component rendering.

### 10. `utils/`
Contains modular telemetry and device integration utilities:
- **`memory-tracker.ts`**: JS heap telemetry and active instance leak prevention.
- **`power-helper.ts`**: Hardware battery API listener, `saveData` detection, and adaptive 60fps/30fps throttling.
- **`gpu-utils.ts`**: WebGL2 context setup, VRS, and FP16 shader optimizations.
- **`ci-workflow.ts`**: Headless benchmark runner and assertion test suite.
