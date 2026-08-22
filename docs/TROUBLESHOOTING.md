# 🛠️ Antigravity Card Troubleshooting Guide

Common questions, diagnostics, and solutions for Antigravity Card configurations.

---

## 1. Card Shows "Entity Not Found" or Red Banner
- **Cause**: The specified entity ID does not exist in Home Assistant or is misspelled.
- **Solution**: Verify the entity in Home Assistant **Developer Tools > States**. Ensure the exact entity name matches (e.g. `light.living_room_ceiling`).

## 2. Slider Does Not Respond or Has Touch Lag on Mobile
- **Cause**: Mobile WebView gesture collision with page vertical scrolling.
- **Solution**: Antigravity Card natively applies `touch-action: pan-y` and pointer capture. Ensure your Home Assistant Companion App is running the latest WebView version. In battery-save mode, timers automatically throttle to conserve CPU.

## 3. Multi-Stage Fade Color Does Not Update
- **Cause**: Entity state has not transitioned, or `fade_transition_enabled` is set to `false`.
- **Solution**: Ensure `fade_transition_enabled: true` is set in your card configuration. Fading begins automatically when the state changes (e.g. motion turns from `on` to `off`).

## 4. Sub-Buttons Are Truncated or Overlapping
- **Cause**: More than 4 sub-buttons configured or `features_columns` set too high.
- **Solution**: Set `features_columns: 4` (or `features_position: 'bottom'`) to give sub-buttons ample horizontal room.

## 5. Dashboard Shows Old Card Version After Update
- **Cause**: Mobile browser or Companion App cache.
- **Solution**: In Home Assistant **Settings > Dashboards > Resources**, update the URL parameter (e.g. `/local/antigravity-card.js?v=145`). Perform a hard refresh (`Ctrl + Shift + R` or swipe-down to refresh on mobile).
