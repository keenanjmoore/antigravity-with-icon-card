# Antigravity Modular Architecture & Platform Performance Invariants

## Core Principles for Modularization & Refactoring

Whenever code, features, or styling are split, extracted, or refactored into modular files, **all configurations, typography metrics, platform optimizations, and performance invariants MUST strictly carry over without omission**.

---

### 1. 📱 Mobile & Hardware Performance Invariants (Android 17, Tensor G4 / Pixel 9a, iOS WebKit)

Every card component and extracted sub-module must uphold the following platform optimizations:

1. **Hardware-Accelerated Compositing & Zero-Reflow GPU Layers:**
   - Cards and interactive sub-elements must enforce `transform: translate3d(0, 0, 0)` and `backface-visibility: hidden`.
   - Layout containment via `contain: layout paint style` and virtualization via `content-visibility: auto; contain-intrinsic-size: 64px;`.
   - CSS Houdini `@property` registration (`--slider-pct`, `--decay-pct`, `--glow-intensity`) for compositor-driven transitions.

2. **Touch Gestures & Scroll Disambiguation (`TouchGestureManager`):**
   - Slider inputs must use `touch-action: pan-y;` to enable seamless vertical page scrolling during mobile touch.
   - Root cards must enforce `touch-action: manipulation; -webkit-tap-highlight-color: transparent;` to eliminate the 300ms mobile tap delay.
   - 1500ms mount debounce and 800ms app resume debounce to reject ghost touches from Android/iOS system navigation gestures.
   - Instant 0ms tap execution when `double_tap_action` is not set or set to `none`.

3. **Multi-Platform Haptics:**
   - Dual-pipeline dispatch: `forwardHaptic()` from `custom-card-helpers` + Web `navigator.vibrate()` patterns + CustomEvent DOM bubbling for companion app hooks.

4. **Power & Battery Efficiency (`PowerHelper` & `IntersectionObserver`):**
   - Cards observe viewport intersection (`:host([offscreen])`) and immediately freeze CSS animations (`animation-play-state: paused`) and relative time intervals when scrolled out of view.
   - In low-battery or power-saving states (`:host([power-save])`), heavy CSS blur shaders (`backdrop-filter`) degrade gracefully and interval frequencies reduce automatically.

5. **Memory Safety & Bounded Caching (`MemoryTracker`):**
   - All gesture tracking states use `WeakMap` keyed by DOM elements to guarantee zero-leak garbage collection on unmount.
   - All caches (Color parsing, Date parsing, State calculations, REST API history) implement true LRU eviction with bounded maximum entries.

---

### 2. 🎨 Learned Styling & Typography Defaults Matrix

When extracting or modifying style generators ([`src/style-builder.ts`](file:///C:/Users/Keenan/.gemini/antigravity-ide/scratch/antigravity-card/src/style-builder.ts), [`src/themes.ts`](file:///C:/Users/Keenan/.gemini/antigravity-ide/scratch/antigravity-card/src/themes.ts)):

| Category | Default Invariant | Description |
| :--- | :--- | :--- |
| **Primary Typography** | `14px`, `font-weight: 800`, `capitalize`, `letter-spacing: -0.5px`, `line-height: 1.1` | Crisp, high-contrast primary entity text |
| **Secondary Typography** | `15px`, `capitalize`, `letter-spacing: -0.5px`, `line-height: 1.1` | Clean, legible secondary state / status text |
| **Default Offsets** | `text_offset_x: -28px; text_offset_y: 2px;` | Aligned text box positioning without icon margin |
| **Default Card Padding** | `vertical: 0px, horizontal: 15px, margin: -1px` | Compact Lovelace grid card layout |
| **Default Inner Spacing** | `content: 6px, text: -1px, features_margin: -3px, sub_btn: -4px` | Unified tight flow across mushroom & bubble elements |
| **Default Sliders** | `height: 11px, border_radius: 5px, hide_slider_when_off: true` | Low-profile inline sliders with auto-hide when off |
| **Default Colors** | Active: `#d60000` (Red), Inactive: `#03b500` (Green), Background Opacity: `10%` | Universal status color schema |
| **Default Multi-Stage Fade** | `Stage 1 (60s @ #ff9800) -> Stage 2 (600s @ #cddc39) -> Stage 3 (1800s @ #4caf50)` | Temporal smooth decay color engine |

---

### 3. 🌐 Resource Cachebusting Protocol

- Whenever frontend card JS bundles are deployed to `X:\www\`, all entries in `X:\.storage\lovelace_resources` must be updated with an explicit timestamp query parameter (`?v=<timestamp>`).
- This guarantees that both desktop browsers (Chrome, Edge, Firefox, Safari) and mobile clients receive the exact same production bundle without stale HTTP/service-worker caching discrepancies.

---

### 7. Mandatory Triple-Phase Build & Verification Pipeline
Whenever compiling, building, or modifying any Antigravity Card variant, the build pipeline must strictly execute in sequence:
1. `npm run check` *(TypeScript static type checking with zero errors)*
2. `npm run test` *(Vitest automated unit tests with 100% pass rate)*
3. `npm run build` *(Production Vite bundle compilation and minification)*

Never deploy to `X:\www\` or commit to GitHub unless all three steps complete with exit code 0.
