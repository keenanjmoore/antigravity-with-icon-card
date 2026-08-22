/**
 * Static CSS Stylesheet for Antigravity Cards
 * Encapsulates core layout, Google Material 3 sliders, decay animations, themes, and touch feedback.
 */

import { css, CSSResult } from 'lit';

export const antigravityCardStyles: CSSResult = css`
  :host {
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  :host([hidden]),
  :host([offscreen]) *,
  :host([offscreen]) .anim-spin,
  :host([offscreen]) .anim-bounce,
  :host([offscreen]) .pulse,
  :host([offscreen]) .scroll-content {
    animation-play-state: paused !important;
  }
  :host([power-save]) {
    --ag-transition-speed: 0.1s;
  }
  :host([power-save]) .pulse,
  :host([power-save]) .anim-spin,
  :host([power-save]) .anim-bounce {
    animation: none !important;
  }
  :host([power-save]) .theme-glassmorphism,
  :host([power-save]) .theme-aurora {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: var(--card-background-color, rgba(30, 30, 30, 0.9)) !important;
  }
  :host([hidden]) {
    display: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  :host([hidden]) {
    display: none !important;
  }
  input[type="range"] {
    touch-action: pan-y;
    -webkit-appearance: none;
    appearance: none;
  }
  ha-card {
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    contain: layout paint style;
    content-visibility: auto;
    contain-intrinsic-size: 64px;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    --ha-card-border-width: 0;
    position: relative;
    outline: none;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  ha-card:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  .sub-button {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  .sub-button ha-icon,
  .sub-button ha-svg-icon {
    pointer-events: none;
  }
  .sub-button:hover {
    will-change: transform, background, color;
  }
  .sub-button:active {
    transform: scale(0.93) translate3d(0, 0, 0) !important;
    will-change: transform, background, color;
  }
  .color-temp-chips,
  .color-swatch-chips,
  .sub-buttons-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
    contain: layout style;
  }
  .color-temp-chips::-webkit-scrollbar,
  .color-swatch-chips::-webkit-scrollbar,
  .sub-buttons-container::-webkit-scrollbar {
    display: none;
  }
  .active-border-gradient {
    border: 2px solid transparent !important;
    background-image: linear-gradient(var(--card-background-color, #1e1e1e), var(--card-background-color, #1e1e1e)), linear-gradient(135deg, #6200ea, #00e5ff, #76ff03) !important;
    background-origin: border-box !important;
    background-clip: padding-box, border-box !important;
  }
  .glass-specular-edge {
    box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
  }
  .card-chip .card-content {
    min-height: 32px !important;
    padding: 4px 8px !important;
  }
  .color-swatch-chip[active] {
    outline: 2px solid #ffffff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.85);
  }
  .alarm-pending {
    animation: ag-alarm-pulse 1.5s infinite alternate;
  }
  @keyframes ag-alarm-pulse {
    from { box-shadow: 0 0 4px #ff9800; }
    to { box-shadow: 0 0 16px #ff9800, inset 0 0 8px rgba(255, 152, 0, 0.3); }
  }
  .warning-card {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--warning-color, #ff9800);
    background: rgba(255, 152, 0, 0.08);
    border: 1px solid rgba(255, 152, 0, 0.2);
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
  }
  .warning-card code {
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    gap: var(--ag-features-margin, 12px);
    width: 100%;
    box-sizing: border-box;
  }
  .card-content.features-inline .info-container { flex-wrap: wrap; }

  /* --- THEME PRESETS --- */
  .theme-glassmorphism {
    background: rgba(255, 255, 255, 0.08) !important;
    backdrop-filter: blur(16px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25) !important;
  }
  .theme-neumorphism {
    background: var(--card-background-color, #1e1e1e) !important;
    box-shadow: 6px 6px 14px rgba(0,0,0,0.4), -6px -6px 14px rgba(255,255,255,0.05) !important;
    border: none !important;
  }
  .theme-cyberpunk {
    background: rgba(10, 10, 20, 0.95) !important;
    border: 1px solid #00ffcc !important;
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.35), inset 0 0 15px rgba(255, 0, 128, 0.2) !important;
  }
  .theme-minimal_flat {
    background: var(--card-background-color, rgba(150, 150, 150, 0.05)) !important;
    border: none !important;
    box-shadow: none !important;
  }
  .theme-sunset_gradient {
    background: linear-gradient(135deg, rgba(255, 94, 98, 0.85), rgba(255, 153, 102, 0.85)) !important;
    color: white !important;
  }
  .theme-oled_black {
    background: #000000 !important;
    border: 1px solid #222222 !important;
    box-shadow: none !important;
  }
  .theme-aurora {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.25)) !important;
    backdrop-filter: blur(20px) saturate(190%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(190%) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
  }
  .theme-material_you {
    background: var(--ha-card-background, var(--card-background-color, rgba(150, 150, 150, 0.08))) !important;
    border: 1px solid var(--divider-color, rgba(150, 150, 150, 0.25)) !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
  }
  .theme-retro_synth {
    background: linear-gradient(135deg, #18002e 0%, #0d001a 100%) !important;
    border: 1px solid #ff007f !important;
    box-shadow: 0 0 15px rgba(255, 0, 127, 0.35), inset 0 0 15px rgba(0, 255, 255, 0.15) !important;
  }

  /* --- HOVER EFFECTS --- */
  .hover-lift:hover {
    will-change: transform, box-shadow;
    transform: translateY(-3px) translateZ(0);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  }
  .hover-glow:hover {
    box-shadow: 0 0 24px var(--ag-glow-color, var(--ag-active-color, var(--primary-color))) !important;
  }
  ha-card[active].card-active-glow {
    box-shadow: 0 0 22px var(--ag-glow-color, var(--ag-active-color, var(--primary-color))), 0 0 45px rgba(255, 255, 255, 0.18) !important;
  }
  .hover-scale:hover {
    will-change: transform;
    transform: scale(1.02) translateZ(0);
  }

  /* --- CARD LAYOUT: LARGE --- */
  .card-large .card-content {
    min-height: 64px;
    justify-content: center;
  }
  .card-large .info-container {
    gap: 16px !important;
  }

  /* --- CONTENT LAYOUT --- */
  .layout-default .info-container, .layout-horizontal .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ag-content-spacing, 12px);
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
  .layout-default .info, .layout-horizontal .info { align-items: flex-start; }
  .layout-vertical .info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ag-content-spacing, 8px);
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
  .layout-vertical .info { align-items: center; }

  /* --- COLLAPSIBLE CONTROLS ACCORDION --- */
  .collapsible-wrapper {
    display: grid;
    grid-template-rows: 1fr;
    gap: var(--ag-features-margin, 4px);
    opacity: 1;
    overflow: hidden;
    transform: translateZ(0);
    transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin 0.35s ease;
  }
  .collapsible-wrapper.collapsed {
    grid-template-rows: 0fr !important;
    opacity: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    pointer-events: none !important;
  }
  .collapsible-wrapper > div {
    overflow: hidden;
    min-height: 0;
  }
  .inline-sliders.collapsed {
    display: none !important;
  }

  /* --- INVERSE TEXT COLOR MODE --- */
  .text-color-mode-inverse .primary,
  .text-color-mode-inverse .secondary {
    mix-blend-mode: difference !important;
    color: #ffffff !important;
  }

  /* --- INLINE FEATURES POSITION --- */
  .features-container {
    display: flex;
    flex-direction: column;
    gap: var(--ag-slider-spacing, 4px);
    width: 100%;
    padding: var(--ag-features-padding, 0px);
  }
  .inline-sliders {
    flex: 1;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    gap: var(--ag-slider-spacing, 4px);
  }

  .door-open {
    border-color: rgba(255, 152, 0, 0.5) !important;
  }

  /* --- TEXT & MARQUEE SCROLLING --- */
  .info {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    width: 100%;
    min-width: 0;
    justify-content: center;
    overflow: hidden;
    gap: var(--ag-text-spacing, 0px);
    padding: var(--ag-text-padding, 0px);
    box-sizing: border-box;
  }
  .text-marquee-container {
    display: flex;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    position: relative;
    white-space: nowrap;
  }
  .primary {
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: clamp(12px, 2.8vw, var(--ag-primary-font-size, 14px));
    pointer-events: none;
  }
  .secondary {
    font-weight: 500;
    opacity: 0.7;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: clamp(11px, 2.5vw, var(--ag-secondary-font-size, 15px));
    pointer-events: none;
  }
  .hvac-heating {
    box-shadow: 0 0 16px rgba(255, 112, 67, 0.45) !important;
  }
  .hvac-cooling {
    box-shadow: 0 0 16px rgba(41, 182, 246, 0.45) !important;
  }
  .hvac-drying {
    box-shadow: 0 0 16px rgba(171, 71, 188, 0.45) !important;
  }
  .cover-opening ha-icon {
    animation: ag-bounce-up 1s infinite alternate ease-in-out;
  }
  .cover-closing ha-icon {
    animation: ag-bounce-down 1s infinite alternate ease-in-out;
  }
  @keyframes ag-bounce-up {
    from { transform: translateY(0); }
    to { transform: translateY(-3px); }
  }
  @keyframes ag-bounce-down {
    from { transform: translateY(0); }
    to { transform: translateY(3px); }
  }

  /* Bounce / Ping-Pong Marquee Animation */
  .text-marquee-container.scroll-marquee .scroll-content {
    overflow: visible;
    text-overflow: clip;
    width: auto;
    display: inline-block;
    will-change: transform;
    animation: text-marquee-bounce var(--ag-marquee-speed, 10s) ease-in-out infinite alternate;
  }

  /* Continuous Ticker Loop Animation */
  .text-marquee-container.scroll-continuous .scroll-content {
    overflow: visible;
    text-overflow: clip;
    width: auto;
    display: inline-block;
    will-change: transform;
    animation: text-marquee-continuous var(--ag-marquee-speed, 10s) linear infinite;
  }

  /* Scroll on Hover Animation */
  .text-marquee-container.scroll-hover:hover .scroll-content,
  ha-card:hover .text-marquee-container.scroll-hover .scroll-content {
    overflow: visible;
    text-overflow: clip;
    width: auto;
    display: inline-block;
    will-change: transform;
    animation: text-marquee-bounce var(--ag-marquee-speed, 6s) ease-in-out infinite alternate;
  }

  @keyframes text-marquee-bounce {
    0%, 20% {
      transform: translateX(0%);
    }
    80%, 100% {
      transform: translateX(-40%);
    }
  }

  @keyframes text-marquee-continuous {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* --- DECAY / COOLDOWN SLIDER --- */
  .decay-slider-container {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    margin: 2px 0;
  }
  .decay-slider-track {
    width: 100%;
    background: var(--slider-track-color, rgba(150, 150, 150, 0.2));
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .decay-slider-fill {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: width 1s linear, background-color 1s ease-out;
  }
  .decay-slider-badge {
    position: relative;
    z-index: 2;
    margin-left: auto;
    margin-right: 8px;
    font-size: 11px;
    font-weight: 700;
    color: var(--primary-text-color, #ffffff);
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    pointer-events: none;
  }

  /* --- FULL CARD SLIDER --- */
  .slider-style-full {
    position: relative;
    overflow: hidden !important;
  }
  .slider-style-full .card-content {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }
  .slider-style-full .collapsible-wrapper {
    position: relative !important;
    z-index: 2 !important;
    pointer-events: auto !important;
  }
  .slider-style-full .info {
    position: relative !important;
    z-index: 2 !important;
    pointer-events: none !important;
  }
  .slider-style-full .info .primary,
  .slider-style-full .info .secondary {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  }
  .slider-style-full .main-slider-full {
    position: absolute !important;
    top: 0 !important;
    left: 0;
    right: 0;
    width: 100%;
    height: 100% !important;
    padding: 0 !important;
    z-index: 1 !important;
    pointer-events: auto !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    overflow: hidden !important;
    opacity: var(--ag-full-slider-opacity, 1) !important;
  }
  .slider-style-full .main-slider-full input[type=range] {
    height: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    cursor: grab !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    overflow: hidden !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-webkit-slider-runnable-track {
    height: 100% !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    border: none !important;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) 100%
    ) !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-moz-range-track {
    height: 100% !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    border: none !important;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) 100%
    ) !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    border: none !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-moz-range-thumb {
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    border: none !important;
  }
  .slider-style-full .card-content > .features-container {
    height: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    padding: 0 !important;
  }
  .slider-style-full .info-container > .inline-sliders {
    height: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    padding: 0 !important;
  }

  /* --- CAPSULE SLIDERS (BUBBLE & MUSHROOM SIGNATURE) --- */
  .slider-container { padding: 0 2px; }
  .slider-container input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%; margin: 0; cursor: grab;
    background: transparent;
    height: calc(var(--ag-slider-height, 12px) + 12px);
    touch-action: pan-y;
  }
  .slider-container input[type=range]::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
    );
    height: var(--ag-slider-height, 12px);
    border-radius: var(--ag-slider-radius, 6px);
    transition: background 0.05s ease;
  }
  /* --- SLIDER STYLE 1: CIRCLE KNOB (DEFAULT) --- */
  .slider-style-circle .slider-container input[type=range]::-webkit-slider-thumb,
  .slider-container input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--slider-color, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    margin-top: calc((var(--ag-slider-height, 12px) - 22px) / 2);
    cursor: grab;
    transition: transform 0.15s ease;
  }
  .slider-style-circle .slider-container input[type=range]::-webkit-slider-thumb:hover,
  .slider-container input[type=range]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
  .slider-style-circle .slider-container input[type=range]:active::-webkit-slider-thumb,
  .slider-container input[type=range]:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scale(1.25);
  }
  /* Firefox */
  .slider-container input[type=range]::-moz-range-track {
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
    );
    height: var(--ag-slider-height, 12px); border-radius: var(--ag-slider-radius, 6px); border: none;
  }
  .slider-container input[type=range]::-moz-range-thumb {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--slider-color, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    cursor: grab;
  }
  .slider-container.color-temp.kelvin input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #ff9b2b 0%, #ffffff 50%, #b5d5ff 100%); }
  .slider-container.color-temp.kelvin input[type=range]::-moz-range-track { background: linear-gradient(90deg, #ff9b2b 0%, #ffffff 50%, #b5d5ff 100%); }
  .slider-container.color-temp.mireds input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #b5d5ff 0%, #ffffff 50%, #ff9b2b 100%); }
  .slider-container.color-temp.mireds input[type=range]::-moz-range-track { background: linear-gradient(90deg, #b5d5ff 0%, #ffffff 50%, #ff9b2b 100%); }
  .slider-container.climate-temp input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #42a5f5 0%, #ffca28 50%, #ff7043 100%) !important; }
  .slider-container.climate-temp input[type=range]::-moz-range-track { background: linear-gradient(90deg, #42a5f5 0%, #ffca28 50%, #ff7043 100%) !important; }

  /* --- COLOR HUE SPECTRUM SLIDER --- */
  .slider-container.color-hue input[type=range]::-webkit-slider-runnable-track {
    background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%) !important;
  }
  .slider-container.color-hue input[type=range]::-moz-range-track {
    background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%) !important;
  }
  .slider-container.color-hue input[type=range]::-webkit-slider-thumb {
    background: var(--color-hue-val, #ffffff);
    border: 2px solid #ffffff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.45);
  }
  .slider-container.color-hue input[type=range]::-moz-range-thumb {
    background: var(--color-hue-val, #ffffff);
    border: 2px solid #ffffff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.45);
  }
  .slider-container.color-hue.slider-google-wrap input[type=range]::-webkit-slider-thumb,
  .slider-container.color-hue.slider-google-wrap input[type=range]::-moz-range-thumb {
    background: #ffffff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  }

  /* --- SLIDER STYLE 2: FILLED HUE CAPSULE (FLUID PILL / NO KNOB) --- */
  .slider-style-filled .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: var(--ag-slider-height, 18px);
    border-radius: var(--ag-slider-radius, 9px);
    overflow: hidden;
  }
  .slider-style-filled .slider-container input[type=range]::-webkit-slider-thumb {
    width: 0px; height: var(--ag-slider-height, 18px);
    opacity: 0;
    cursor: grab;
  }
  .slider-style-filled .slider-container input[type=range]::-moz-range-track {
    height: var(--ag-slider-height, 18px);
    border-radius: var(--ag-slider-radius, 9px);
    overflow: hidden;
  }
  .slider-style-filled .slider-container input[type=range]::-moz-range-thumb {
    width: 0px; height: var(--ag-slider-height, 18px);
    opacity: 0;
    cursor: grab;
  }

  /* --- SLIDER STYLE 3: THIN MINIMALIST LINE --- */
  .slider-style-thin .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
  }
  .slider-style-thin .slider-container input[type=range]::-webkit-slider-thumb {
    width: 14px; height: 14px;
    border-radius: 50%;
    margin-top: calc((4px - 14px) / 2);
  }
  .slider-style-thin .slider-container input[type=range]::-moz-range-track {
    height: 4px; border-radius: 2px;
  }
  .slider-style-thin .slider-container input[type=range]::-moz-range-thumb {
    width: 12px; height: 12px;
  }

  /* --- SLIDER STYLE 4: NEON GLOW LASER LINE --- */
  .slider-style-glow .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: var(--ag-slider-height, 8px);
    border-radius: var(--ag-slider-radius, 4px);
    box-shadow: 0 0 12px var(--slider-color, var(--primary-color));
  }
  .slider-style-glow .slider-container input[type=range]::-webkit-slider-thumb {
    width: 18px; height: 18px;
    background: #ffffff;
    border: 2px solid var(--slider-color, var(--primary-color));
    box-shadow: 0 0 12px var(--slider-color, var(--primary-color));
    margin-top: calc((var(--ag-slider-height, 8px) - 18px) / 2);
  }

  /* --- SLIDER STYLE 5: SEGMENTED STEPPED BAR --- */
  .slider-style-segmented .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: var(--ag-slider-height, 14px);
    border-radius: var(--ag-slider-radius, 4px);
    background-image: repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px),
      linear-gradient(
        to right,
        var(--slider-color, var(--primary-color)) 0%,
        var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
        var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
        var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
      );
  }

  /* --- COLOR PICKER --- */
  .color-picker { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: bold; color: var(--secondary-text-color); padding: 0 4px; }
  .color-picker input[type="color"] { border: none; width: 32px; height: 32px; border-radius: 50%; overflow: hidden; cursor: pointer; padding: 0; background: transparent; }
  .color-picker input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
  .color-picker input[type="color"]::-webkit-color-swatch { border: none; border-radius: 50%; }

  /* --- SUB-BUTTONS (1-4) --- */
  .sub-buttons-container { display: flex; gap: var(--ag-sub-button-spacing, 8px); padding-top: var(--ag-sub-btn-container-padding, 8px); border-top: 1px solid var(--divider-color, rgba(150, 150, 150, 0.2)); justify-content: var(--ag-sub-btn-align, flex-end); align-items: center; flex-wrap: wrap; }
  .sub-button { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 36px; height: auto; padding: var(--ag-sub-button-padding, 6px); border-radius: 50%; background: var(--secondary-background-color, rgba(150,150,150,0.2)); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; gap: 2px; outline: none; }
  .sub-button:hover { filter: brightness(1.15); transform: scale(1.08); }
  .sub-button:active { transform: scale(0.95); }
  .sub-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
  .sub-button.no-bg { background: transparent !important; }
  .sub-button[active] { background: var(--primary-color); color: var(--text-primary-color); }
  .sub-button.no-bg[active] { background: transparent !important; color: var(--primary-color) !important; }
  .sub-button.missing { background: var(--error-color, red); color: var(--text-primary-color, white); font-weight: bold; }
  .sub-button-label { font-size: 9px; font-weight: 500; opacity: 0.8; white-space: nowrap; max-width: 48px; overflow: hidden; text-overflow: ellipsis; }
  .sub-button-state { font-size: 8.5px; font-weight: 700; opacity: 0.85; letter-spacing: 0.2px; white-space: nowrap; max-width: 54px; overflow: hidden; text-overflow: ellipsis; }

  .sub-color-picker {
    position: relative;
    overflow: hidden;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .sub-color-picker input[type="color"] {
    position: absolute;
    width: 140%;
    height: 140%;
    top: -20%;
    left: -20%;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    background: transparent;
  }
  .sub-color-picker input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
  .sub-color-picker input[type="color"]::-webkit-color-swatch { border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; }

  .sub-button-slider-container {
    min-width: 70px;
    max-width: 110px;
    height: 24px;
    display: flex;
    align-items: center;
  }
  .sub-button-slider-container input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 16px;
    border-radius: 8px;
    background: transparent;
    cursor: grab;
  }
  .sub-button-slider-container input[type="range"]::-webkit-slider-runnable-track {
    height: 14px;
    border-radius: 7px;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
    );
  }
  .sub-button-slider-container input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 14px;
    opacity: 0;
  }
  /* --- SLIDER STYLE 6: GOOGLE HOME / MATERIAL 3 PILL --- */
  .slider-style-google .slider-container,
  .slider-container.slider-google-wrap {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--ag-slider-height, 42px);
    border-radius: var(--ag-slider-radius, 21px);
    background: var(--slider-track-color, rgba(140, 140, 140, 0.16));
    overflow: hidden;
    box-sizing: border-box;
    transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slider-style-google .slider-container:focus-within,
  .slider-style-google .slider-container:hover,
  .slider-container.slider-google-wrap:focus-within,
  .slider-container.slider-google-wrap:hover {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.18);
  }
  .slider-style-google .slider-container input[type=range],
  .slider-container.slider-google-wrap input[type=range] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: grab;
    z-index: 2;
  }
  .slider-style-google .slider-container input[type=range]::-webkit-slider-runnable-track,
  .slider-container.slider-google-wrap input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      transparent var(--slider-pct, 100%),
      transparent 100%
    );
    transition: background 0.05s ease;
  }
  .slider-style-google .slider-container input[type=range]::-webkit-slider-thumb,
  .slider-container.slider-google-wrap input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 4px;
    height: 24px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    margin-top: calc((var(--ag-slider-height, 42px) - 24px) / 2);
    cursor: grab;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s ease;
  }
  .slider-style-google .slider-container input[type=range]:active::-webkit-slider-thumb,
  .slider-container.slider-google-wrap input[type=range]:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scaleY(1.25);
    background: #ffffff;
  }
  /* Firefox */
  .slider-style-google .slider-container input[type=range]::-moz-range-track,
  .slider-container.slider-google-wrap input[type=range]::-moz-range-track {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      transparent var(--slider-pct, 100%),
      transparent 100%
    );
    border: none;
  }
  .slider-style-google .slider-container input[type=range]::-moz-range-thumb,
  .slider-container.slider-google-wrap input[type=range]::-moz-range-thumb {
    width: 4px;
    height: 24px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    border: none;
    cursor: grab;
  }
  /* Live Percentage / Value Badge Inside Google Slider */
  .slider-percent-badge {
    position: absolute;
    right: 14px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: var(--primary-text-color, #ffffff);
    pointer-events: none;
    z-index: 3;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    user-select: none;
    transition: opacity 0.2s ease;
  }

  .sub-button-google-slider {
    position: relative;
    min-width: 85px;
    max-width: 120px;
    height: 28px;
    border-radius: 14px;
    background: var(--slider-track-color, rgba(140, 140, 140, 0.18));
    overflow: hidden;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .sub-button-google-slider input[type="range"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: grab;
    z-index: 2;
  }
  .sub-button-google-slider input[type="range"]::-webkit-slider-runnable-track {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      transparent var(--slider-pct, 100%),
      transparent 100%
    );
  }
  .sub-button-google-slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 3px;
    height: 16px;
    border-radius: 1.5px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    margin-top: calc((28px - 16px) / 2);
  }
  .sub-button-google-slider .sub-slider-pct {
    position: absolute;
    right: 8px;
    font-size: 10px;
    font-weight: 700;
    color: var(--primary-text-color, #ffffff);
    pointer-events: none;
    z-index: 3;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  /* --- DECAY / COOLDOWN SLIDER --- */
  .decay-slider-container {
    width: 100%;
    margin-bottom: 2px;
  }
  .decay-slider-track {
    width: 100%;
    position: relative;
    background: rgba(140, 140, 140, 0.15);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .decay-slider-fill {
    height: 100%;
    width: var(--decay-pct, 0%);
    transition: width 0.3s linear;
  }
  .decay-slider-badge {
    position: absolute;
    right: 8px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    pointer-events: none;
  }

  /* --- COLOR TEMP & SWATCH CHIP PRESS ANIMATIONS --- */
  .color-temp-chips, .color-swatch-chips {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .temp-chip, .color-swatch-chip {
    cursor: pointer;
    outline: none;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.15s ease;
  }
  .temp-chip {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-weight: 600;
  }
  .temp-chip:hover, .color-swatch-chip:hover {
    filter: brightness(1.2);
  }
  .temp-chip:active, .color-swatch-chip:active {
    transform: scale(0.9) translate3d(0, 0, 0) !important;
  }
  .color-swatch-chip {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* --- LOCK JAMMED SHAKE ANIMATION --- */
  .lock-jammed {
    animation: ag-shake 0.5s ease-in-out infinite;
  }
  @keyframes ag-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-3px); }
    40%, 80% { transform: translateX(3px); }
  }
`;
