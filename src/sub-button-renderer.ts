/**
 * Sub-Button Extraction & Rendering Engine for Antigravity Cards
 * Handles sub-buttons 1-4, domain presets, sliders, swatches, and action bindings.
 */

import { AntigravityCardConfig, SubButtonConfig, SubButtonType } from './types';

export class SubButtonRenderer {
  /**
   * Extract list of defined sub-buttons (1 to 4) from configuration.
   */
  public static extractSubButtons(config: AntigravityCardConfig): SubButtonConfig[] {
    const list: SubButtonConfig[] = [];

    for (let i = 1; i <= 4; i++) {
      const p = `sub_button_${i}_` as const;
      const entity = (config as any)[`${p}entity`];
      const icon = (config as any)[`${p}icon`];
      const color = (config as any)[`${p}color`];
      const showBg = (config as any)[`${p}show_background`] ?? true;
      const label = (config as any)[`${p}label`];
      const tapAction = (config as any)[`${p}tap_action`];
      const holdAction = (config as any)[`${p}hold_action`];
      const doubleTapAction = (config as any)[`${p}double_tap_action`];
      const subType = (config as any)[`${p}type`] as SubButtonType || 'button';
      const showState = (config as any)[`${p}show_state`] ?? false;

      // Include if any meaningful sub-button property is defined
      if (entity || icon || label || (tapAction && tapAction.action !== 'none') || subType !== 'button' || showState) {
        list.push({
          id: `sub_${i}`,
          entity,
          icon,
          color,
          show_background: showBg,
          label,
          tap_action: tapAction,
          hold_action: holdAction,
          double_tap_action: doubleTapAction,
          sub_type: subType,
          show_state: showState,
        });
      }
    }

    return list;
  }
}
