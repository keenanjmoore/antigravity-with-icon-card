/**
 * Sub-Button Extraction & Rendering Engine for Antigravity Cards
 * Handles sub-buttons 1-4, domain presets, sliders, swatches, and action bindings with direct property indexing.
 */

import { AntigravityCardConfig, SubButtonConfig, SubButtonType } from './types';

export class SubButtonRenderer {
  /**
   * Extract list of defined sub-buttons (1 to 4) from configuration.
   * Uses unrolled property access to eliminate runtime string concatenation overhead.
   */
  public static extractSubButtons(config: AntigravityCardConfig): SubButtonConfig[] {
    if (!config) return [];
    const list: SubButtonConfig[] = [];

    // Sub Button 1
    const s1Entity = config.sub_button_1_entity;
    const s1Icon = config.sub_button_1_icon;
    const s1Label = config.sub_button_1_label ?? (config as any).sub_button_1_name;
    const s1Tap = config.sub_button_1_tap_action;
    const s1Type = (config.sub_button_1_type ?? 'button') as SubButtonType;
    const s1State = config.sub_button_1_show_state ?? false;
    if (s1Entity || s1Icon || s1Label || (s1Tap && s1Tap.action !== 'none') || s1Type !== 'button' || s1State) {
      list.push({
        id: 'sub_1',
        entity: s1Entity,
        icon: s1Icon,
        color: config.sub_button_1_color,
        show_background: config.sub_button_1_show_background ?? true,
        label: s1Label,
        tap_action: s1Tap,
        hold_action: config.sub_button_1_hold_action,
        double_tap_action: config.sub_button_1_double_tap_action,
        sub_type: s1Type,
        show_state: s1State,
      });
    }

    // Sub Button 2
    const s2Entity = config.sub_button_2_entity;
    const s2Icon = config.sub_button_2_icon;
    const s2Label = config.sub_button_2_label ?? (config as any).sub_button_2_name;
    const s2Tap = config.sub_button_2_tap_action;
    const s2Type = (config.sub_button_2_type ?? 'button') as SubButtonType;
    const s2State = config.sub_button_2_show_state ?? false;
    if (s2Entity || s2Icon || s2Label || (s2Tap && s2Tap.action !== 'none') || s2Type !== 'button' || s2State) {
      list.push({
        id: 'sub_2',
        entity: s2Entity,
        icon: s2Icon,
        color: config.sub_button_2_color,
        show_background: config.sub_button_2_show_background ?? true,
        label: s2Label,
        tap_action: s2Tap,
        hold_action: config.sub_button_2_hold_action,
        double_tap_action: config.sub_button_2_double_tap_action,
        sub_type: s2Type,
        show_state: s2State,
      });
    }

    // Sub Button 3
    const s3Entity = config.sub_button_3_entity;
    const s3Icon = config.sub_button_3_icon;
    const s3Label = config.sub_button_3_label ?? (config as any).sub_button_3_name;
    const s3Tap = config.sub_button_3_tap_action;
    const s3Type = (config.sub_button_3_type ?? 'button') as SubButtonType;
    const s3State = config.sub_button_3_show_state ?? false;
    if (s3Entity || s3Icon || s3Label || (s3Tap && s3Tap.action !== 'none') || s3Type !== 'button' || s3State) {
      list.push({
        id: 'sub_3',
        entity: s3Entity,
        icon: s3Icon,
        color: config.sub_button_3_color,
        show_background: config.sub_button_3_show_background ?? true,
        label: s3Label,
        tap_action: s3Tap,
        hold_action: config.sub_button_3_hold_action,
        double_tap_action: config.sub_button_3_double_tap_action,
        sub_type: s3Type,
        show_state: s3State,
      });
    }

    // Sub Button 4
    const s4Entity = config.sub_button_4_entity;
    const s4Icon = config.sub_button_4_icon;
    const s4Label = config.sub_button_4_label ?? (config as any).sub_button_4_name;
    const s4Tap = config.sub_button_4_tap_action;
    const s4Type = (config.sub_button_4_type ?? 'button') as SubButtonType;
    const s4State = config.sub_button_4_show_state ?? false;
    if (s4Entity || s4Icon || s4Label || (s4Tap && s4Tap.action !== 'none') || s4Type !== 'button' || s4State) {
      list.push({
        id: 'sub_4',
        entity: s4Entity,
        icon: s4Icon,
        color: config.sub_button_4_color,
        show_background: config.sub_button_4_show_background ?? true,
        label: s4Label,
        tap_action: s4Tap,
        hold_action: config.sub_button_4_hold_action,
        double_tap_action: config.sub_button_4_double_tap_action,
        sub_type: s4Type,
        show_state: s4State,
      });
    }

    return list;
  }
}
