/**
 * Editor Field Factory for Antigravity Cards
 * Eliminates visual editor schema duplication for sub-buttons, action blocks, and domain configurations.
 */

export class EditorFieldFactory {
  /**
   * Generate schema for a numbered sub-button (1 through 4) with icon, entity, actions, and custom styles.
   */
  public static createSubButtonSchema(num: number) {
    const p = `sub_button_${num}_`;
    return [
      { name: `${p}entity`, selector: { entity: {} } },
      { name: `${p}type`, selector: { select: { options: [
        { value: 'button', label: 'Standard Button' },
        { value: 'slider', label: 'Thin Slider (Brightness / Volume / Speed)' },
        { value: 'google_slider', label: 'Large Capsule Slider (Google Home Style)' },
        { value: 'color_picker', label: 'Color Picker Swatch (Lights)' },
        { value: 'play_pause', label: 'Media: Play / Pause Toggle' },
        { value: 'next', label: 'Media: Next Track' },
        { value: 'previous', label: 'Media: Previous Track' },
        { value: 'volume_up', label: 'Media: Volume Up Step' },
        { value: 'volume_down', label: 'Media: Volume Down Step' },
        { value: 'mute_toggle', label: 'Media: Mute / Unmute Toggle' },
        { value: 'service_call', label: 'Custom Service Call' },
      ] } } },
      { name: `${p}icon`, selector: { icon: {} } },
      { name: `${p}name`, selector: { text: {} } },
      { name: `${p}color`, selector: { color_rgb: {} } },
      { name: `${p}show_background`, selector: { boolean: {} } },
      { name: `${p}show_state`, selector: { boolean: {} } },
      { name: `${p}tap_action`, selector: { 'ui-action': {} } },
      { name: `${p}hold_action`, selector: { 'ui-action': {} } },
      { name: `${p}double_tap_action`, selector: { 'ui-action': {} } },
    ];
  }
}
