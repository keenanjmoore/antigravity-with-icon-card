# 📝 Antigravity Card Changelog

All notable changes to the Antigravity Cards project will be documented in this file.

---

## [v145.0.0] - 2026-08-22
### 🏛️ Modular Architecture Refactor
- **Split Monolithic Codebase**: Re-architected `antigravity-card.ts` into specialized domain modules:
  - `constants.ts`: Frozen sets (`ACTIVE_STATES`, `NON_TOGGLEABLE_DOMAINS`) and timing constants.
  - `types.ts`: Branded types (`Percentage`, `Seconds`, `RGBTuple`), shared `InfoType`, and discriminated unions.
  - `color-converter.ts`: High-performance `ColorConverter` with 256-entry LRU cache.
  - `themes.ts`: 10 built-in aesthetic themes (Glassmorphism, Neumorphism, Cyberpunk, Aurora, OLED, Sunset, Flat, Material You, 80s Synthwave, Minimal).
  - `slider-calculations.ts`: Multi-domain `SliderCalculations` engine across lights, fans, covers, climate, and media.
  - `fade-transition.ts`: Physical-time `FadeTransitionManager` with continuous live-state color pickup.
  - `style-builder.ts`: `StyleBuilder` with zero-allocation static CSS precomputation.
  - `sub-button-renderer.ts`: `SubButtonRenderer` with built-in domain action presets.
  - `config-validator.ts`: Runtime schema validation and type guards.
- **Hardware Telemetry & Power Management**:
  - `gpu-utils.ts`: WebGL2 context initialization with VRS and FP16 texture support.
  - `memory-tracker.ts`: JS heap telemetry and active instance tracking.
  - `power-helper.ts`: Hardware battery API listeners with adaptive 60fps/30fps throttling.
  - `ci-workflow.ts`: Headless benchmark suite and automated GitHub Actions CI.
- **Zero Breaking Changes**: 100% backward-compatible with all existing dashboard configurations.
