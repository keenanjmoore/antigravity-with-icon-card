/**
 * Sub-Button Controller for Antigravity Cards
 * Resolves icons, titles, labels, active states, animations, and service call dispatches across all HA domains.
 */

export interface SubButtonResolution {
  icon?: string;
  title: string;
  label?: string;
  isActive: boolean;
  animClass: string;
  defaultAction?: (hass: any, fallbackEntity?: string) => void;
}

export class SubButtonController {
  /**
   * Resolves display properties and default service execution for a sub-button action type.
   */
  public static resolve(
    subType: string,
    entityId: string | undefined,
    fallbackEntity: string | undefined,
    stateObj: any,
    customIcon?: string,
    customLabel?: string,
    entityIsActive?: boolean,
    temperatureUnit?: string,
    tapAction?: any
  ): SubButtonResolution {
    if (tapAction && tapAction.action && tapAction.action !== 'none' && tapAction.action !== 'default') {
      return {
        icon: customIcon || stateObj?.attributes?.icon || 'mdi:checkbox-blank-circle',
        title: customLabel || (stateObj?.attributes?.friendly_name ?? ''),
        label: customLabel,
        isActive: entityIsActive ?? false,
        animClass: '',
        defaultAction: undefined
      };
    }

    const targetEntity = entityId || fallbackEntity || '';
    let subIcon = customIcon;
    let subTitle = '';
    let subIsActive = entityIsActive ?? false;
    let subAnimClass = '';
    let subLabel = customLabel;
    let defaultAction: ((hass: any, fallbackEntity?: string) => void) | undefined = undefined;

    switch (subType) {
      case 'play_pause': {
        const isPlaying = stateObj?.state === 'playing';
        subIsActive = isPlaying;
        if (!subIcon) subIcon = isPlaying ? 'mdi:pause' : 'mdi:play';
        subTitle = isPlaying ? 'Pause' : 'Play';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'media_play_pause', { entity_id: targetEntity });
        };
        break;
      }
      case 'next': {
        if (!subIcon) subIcon = 'mdi:skip-next';
        subTitle = 'Next Track';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'media_next_track', { entity_id: targetEntity });
        };
        break;
      }
      case 'previous': {
        if (!subIcon) subIcon = 'mdi:skip-previous';
        subTitle = 'Previous Track';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'media_previous_track', { entity_id: targetEntity });
        };
        break;
      }
      case 'vol_up': {
        if (!subIcon) subIcon = 'mdi:volume-plus';
        subTitle = 'Volume +5%';
        if (!subLabel) subLabel = '+5%';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'volume_up', { entity_id: targetEntity });
        };
        break;
      }
      case 'vol_down': {
        if (!subIcon) subIcon = 'mdi:volume-minus';
        subTitle = 'Volume -5%';
        if (!subLabel) subLabel = '-5%';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'volume_down', { entity_id: targetEntity });
        };
        break;
      }
      case 'mute': {
        const isMuted = stateObj?.attributes?.is_volume_muted === true;
        subIsActive = isMuted;
        if (!subIcon) subIcon = isMuted ? 'mdi:volume-off' : 'mdi:volume-high';
        subTitle = isMuted ? 'Unmute' : 'Mute';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'volume_mute', { entity_id: targetEntity, is_volume_muted: !isMuted });
        };
        break;
      }
      case 'source': {
        const curSource = stateObj?.attributes?.source || '';
        const sources: string[] = stateObj?.attributes?.source_list || [];
        const nextSource = sources.length > 0 ? (sources[(sources.indexOf(curSource) + 1) % sources.length] || sources[0]) : curSource;
        if (!subIcon) subIcon = 'mdi:import';
        subTitle = `Source: ${curSource} -> ${nextSource}`;
        if (!subLabel) subLabel = curSource || 'Source';
        defaultAction = (hass) => {
          if (nextSource) {
            hass?.callService('media_player', 'select_source', { entity_id: targetEntity, source: nextSource });
          }
        };
        break;
      }
      case 'sound_mode': {
        const curMode = stateObj?.attributes?.sound_mode || '';
        const modes: string[] = stateObj?.attributes?.sound_mode_list || [];
        const nextMode = modes.length > 0 ? (modes[(modes.indexOf(curMode) + 1) % modes.length] || modes[0]) : curMode;
        if (!subIcon) subIcon = 'mdi:surround-sound';
        subTitle = `Sound: ${curMode} -> ${nextMode}`;
        if (!subLabel) subLabel = curMode || 'Sound';
        defaultAction = (hass) => {
          if (nextMode) {
            hass?.callService('media_player', 'select_sound_mode', { entity_id: targetEntity, sound_mode: nextMode });
          }
        };
        break;
      }
      case 'shuffle': {
        const isShuffle = stateObj?.attributes?.shuffle === true;
        subIsActive = isShuffle;
        if (!subIcon) subIcon = isShuffle ? 'mdi:shuffle' : 'mdi:shuffle-disabled';
        subTitle = isShuffle ? 'Shuffle: On' : 'Shuffle: Off';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'shuffle_set', { entity_id: targetEntity, shuffle: !isShuffle });
        };
        break;
      }
      case 'repeat': {
        const curRepeat = stateObj?.attributes?.repeat || 'off';
        const repeats = ['off', 'all', 'one'];
        const nextRepeat = repeats[(repeats.indexOf(curRepeat) + 1) % repeats.length] || 'off';
        subIsActive = curRepeat !== 'off';
        if (!subIcon) subIcon = curRepeat === 'one' ? 'mdi:repeat-once' : (curRepeat === 'all' ? 'mdi:repeat' : 'mdi:repeat-off');
        subTitle = `Repeat: ${curRepeat} -> ${nextRepeat}`;
        if (!subLabel) subLabel = curRepeat;
        defaultAction = (hass) => {
          hass?.callService('media_player', 'repeat_set', { entity_id: targetEntity, repeat: nextRepeat });
        };
        break;
      }
      case 'chime': {
        if (!subIcon) subIcon = 'mdi:bell-ring-outline';
        subTitle = 'Play Chime';
        defaultAction = (hass) => {
          hass?.callService('chime_tts', 'say', { entity_id: targetEntity, message: 'ding-dong' }).catch(() => {
            hass?.callService('media_player', 'media_play', { entity_id: targetEntity });
          });
        };
        break;
      }
      case 'tts_announce': {
        if (!subIcon) subIcon = 'mdi:bullhorn-variant-outline';
        subTitle = 'Voice Announcement';
        defaultAction = (hass) => {
          hass?.callService('tts', 'speak', { media_player_entity_id: targetEntity, message: 'Attention: Test announcement' }).catch(() => {
            hass?.callService('tts', 'google_translate_say', { entity_id: targetEntity, message: 'Attention: Test announcement' });
          });
        };
        break;
      }
      case 'media_zone': {
        if (!subIcon) subIcon = 'mdi:speaker-multiple';
        subTitle = 'Group Speakers / Zone';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'join', { entity_id: targetEntity });
        };
        break;
      }
      case 'media_preset': {
        if (!subIcon) subIcon = 'mdi:radio-tower';
        subTitle = 'Play Radio Stream / Preset';
        defaultAction = (hass) => {
          hass?.callService('media_player', 'play_media', {
            entity_id: targetEntity,
            media_content_id: 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one',
            media_content_type: 'music'
          });
        };
        break;
      }
      case 'door_hold': {
        if (!subIcon) subIcon = 'mdi:door-open';
        subTitle = 'Hold Gate / Door Open';
        defaultAction = (hass) => {
          hass?.callService('cover', 'open_cover', { entity_id: targetEntity });
        };
        break;
      }
      case 'aux_heat': {
        const isAux = stateObj?.attributes?.aux_heat === 'on' || stateObj?.attributes?.aux_heat === true;
        subIsActive = isAux;
        if (!subIcon) subIcon = isAux ? 'mdi:radiator' : 'mdi:radiator-disabled';
        subTitle = isAux ? 'Disable Aux Heat' : 'Enable Aux Heat';
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_aux_heat', { entity_id: targetEntity, aux_heat: !isAux });
        };
        break;
      }
      case 'cover_preset': {
        if (!subIcon) subIcon = 'mdi:window-shutter';
        subTitle = 'Go to Shading Position (50%)';
        defaultAction = (hass) => {
          hass?.callService('cover', 'set_cover_position', { entity_id: targetEntity, position: 50 });
        };
        break;
      }
      case 'temp_up': {
        const isFahrenheit = temperatureUnit === '°F' || temperatureUnit === 'F';
        const step = isFahrenheit ? 1 : 0.5;
        const curTemp = Number(stateObj?.attributes?.temperature ?? stateObj?.attributes?.target_temp_high ?? 20);
        const maxTemp = Number(stateObj?.attributes?.max_temp ?? 35);
        const nextTemp = Math.min(maxTemp, curTemp + step);
        if (!subIcon) subIcon = 'mdi:thermometer-chevron-up';
        subTitle = `Temperature +${step}°`;
        if (!subLabel) subLabel = `+${step}°`;
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_temperature', { entity_id: targetEntity, temperature: nextTemp });
        };
        break;
      }
      case 'temp_down': {
        const isFahrenheit = temperatureUnit === '°F' || temperatureUnit === 'F';
        const step = isFahrenheit ? 1 : 0.5;
        const curTemp = Number(stateObj?.attributes?.temperature ?? stateObj?.attributes?.target_temp_low ?? 20);
        const minTemp = Number(stateObj?.attributes?.min_temp ?? 10);
        const nextTemp = Math.max(minTemp, curTemp - step);
        if (!subIcon) subIcon = 'mdi:thermometer-chevron-down';
        subTitle = `Temperature -${step}°`;
        if (!subLabel) subLabel = `-${step}°`;
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_temperature', { entity_id: targetEntity, temperature: nextTemp });
        };
        break;
      }
      case 'fan_oscillate': {
        const isOsc = stateObj?.attributes?.oscillating === true;
        subIsActive = isOsc;
        if (!subIcon) subIcon = isOsc ? 'mdi:arrow-oscillating' : 'mdi:fan-off';
        subTitle = isOsc ? 'Stop Oscillation' : 'Start Oscillation';
        defaultAction = (hass) => {
          hass?.callService('fan', 'oscillate', { entity_id: targetEntity, oscillating: !isOsc });
        };
        break;
      }
      case 'fan_direction': {
        const curDir = stateObj?.attributes?.direction || 'forward';
        const nextDir = curDir === 'forward' ? 'reverse' : 'forward';
        subIsActive = curDir === 'reverse';
        if (!subIcon) subIcon = curDir === 'reverse' ? 'mdi:rotate-left' : 'mdi:rotate-right';
        subTitle = `Direction: ${curDir} -> ${nextDir}`;
        if (!subLabel) subLabel = curDir;
        defaultAction = (hass) => {
          hass?.callService('fan', 'set_direction', { entity_id: targetEntity, direction: nextDir });
        };
        break;
      }
      case 'humidifier_mode': {
        const curMode = stateObj?.attributes?.mode || stateObj?.state || 'auto';
        const modes: string[] = stateObj?.attributes?.available_modes || ['auto', 'eco', 'boost', 'sleep'];
        const nextMode = modes[(modes.indexOf(curMode) + 1) % modes.length] || 'auto';
        if (!subIcon) subIcon = 'mdi:water-sync';
        subTitle = `Humidifier Mode: ${curMode} -> ${nextMode}`;
        if (!subLabel) subLabel = curMode;
        defaultAction = (hass) => {
          hass?.callService('humidifier', 'set_mode', { entity_id: targetEntity, mode: nextMode });
        };
        break;
      }
      case 'siren_toggle': {
        const isOn = stateObj?.state === 'on';
        subIsActive = isOn;
        if (!subIcon) subIcon = isOn ? 'mdi:bullhorn' : 'mdi:bullhorn-outline';
        subTitle = isOn ? 'Turn Off Siren' : 'Trigger Siren';
        defaultAction = (hass) => {
          hass?.callService('siren', 'toggle', { entity_id: targetEntity });
        };
        break;
      }
      case 'open_close': {
        const isDoorOpen = stateObj?.state === 'open' || stateObj?.state === 'on' || (stateObj?.attributes?.current_position !== undefined && stateObj.attributes.current_position > 0);
        subIsActive = isDoorOpen;
        const devClass = stateObj?.attributes?.device_class;
        if (!subIcon) {
          if (devClass === 'garage' || devClass === 'garage_door') {
            subIcon = isDoorOpen ? 'mdi:garage-open' : 'mdi:garage';
          } else if (devClass === 'blind' || devClass === 'shade') {
            subIcon = isDoorOpen ? 'mdi:blinds-open' : 'mdi:blinds';
          } else if (devClass === 'curtain') {
            subIcon = isDoorOpen ? 'mdi:curtains-open' : 'mdi:curtains';
          } else if (devClass === 'damper') {
            subIcon = isDoorOpen ? 'mdi:circle-slice-8' : 'mdi:circle-outline';
          } else {
            subIcon = isDoorOpen ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
          }
        }
        subTitle = isDoorOpen ? 'Close' : 'Open';
        defaultAction = (hass) => {
          hass?.callService('cover', 'toggle', { entity_id: targetEntity });
        };
        break;
      }
      case 'stop': {
        if (!subIcon) subIcon = 'mdi:stop';
        subTitle = 'Stop';
        defaultAction = (hass) => {
          hass?.callService('cover', 'stop_cover', { entity_id: targetEntity });
        };
        break;
      }
      case 'open_tilt': {
        if (!subIcon) subIcon = 'mdi:arrow-top-right-bottom-left';
        subTitle = 'Open Tilt';
        defaultAction = (hass) => {
          hass?.callService('cover', 'open_cover_tilt', { entity_id: targetEntity });
        };
        break;
      }
      case 'close_tilt': {
        if (!subIcon) subIcon = 'mdi:arrow-bottom-left-top-right';
        subTitle = 'Close Tilt';
        defaultAction = (hass) => {
          hass?.callService('cover', 'close_cover_tilt', { entity_id: targetEntity });
        };
        break;
      }
      case 'stop_tilt': {
        if (!subIcon) subIcon = 'mdi:stop';
        subTitle = 'Stop Tilt';
        defaultAction = (hass) => {
          hass?.callService('cover', 'stop_cover_tilt', { entity_id: targetEntity });
        };
        break;
      }
      case 'lock_unlock': {
        const isLocked = stateObj?.state === 'locked';
        const isJammed = stateObj?.state === 'jammed';
        subIsActive = !isLocked;
        if (isJammed) subAnimClass = 'lock-jammed';
        if (!subIcon) subIcon = isJammed ? 'mdi:lock-alert' : (isLocked ? 'mdi:lock' : 'mdi:lock-open-variant');
        subTitle = isJammed ? 'Jammed (Alert!)' : (isLocked ? 'Unlock' : 'Lock');
        defaultAction = (hass) => {
          hass?.callService('lock', isLocked ? 'unlock' : 'lock', { entity_id: targetEntity });
        };
        break;
      }
      case 'fan_speed': {
        const curPct = stateObj?.attributes?.percentage ?? 0;
        if (!subIcon) subIcon = 'mdi:fan';
        if (entityIsActive) subAnimClass = 'anim-spin';
        subTitle = `Speed: ${curPct}%`;
        if (!subLabel) subLabel = curPct > 0 ? `${curPct}%` : 'Off';
        defaultAction = (hass) => {
          let nextPct = 33;
          if (curPct >= 90) nextPct = 0;
          else if (curPct >= 60) nextPct = 100;
          else if (curPct >= 30) nextPct = 66;
          hass?.callService('fan', 'set_percentage', { entity_id: targetEntity, percentage: nextPct });
        };
        break;
      }
      case 'fan_mode': {
        const curFanMode = stateObj?.attributes?.fan_mode || 'auto';
        const fanModes: string[] = stateObj?.attributes?.fan_modes || ['auto', 'low', 'medium', 'high'];
        const nextFanMode = fanModes[(fanModes.indexOf(curFanMode) + 1) % fanModes.length] || 'auto';
        if (!subIcon) subIcon = 'mdi:fan';
        subTitle = `Fan Mode: ${curFanMode} -> ${nextFanMode}`;
        if (!subLabel) subLabel = curFanMode;
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_fan_mode', { entity_id: targetEntity, fan_mode: nextFanMode });
        };
        break;
      }
      case 'swing_mode': {
        const curSwing = stateObj?.attributes?.swing_mode || 'off';
        const swingModes: string[] = stateObj?.attributes?.swing_modes || ['off', 'vertical', 'horizontal', 'both'];
        const nextSwing = swingModes[(swingModes.indexOf(curSwing) + 1) % swingModes.length] || 'off';
        if (!subIcon) subIcon = 'mdi:arrow-split-horizontal';
        subTitle = `Swing: ${curSwing} -> ${nextSwing}`;
        if (!subLabel) subLabel = curSwing;
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_swing_mode', { entity_id: targetEntity, swing_mode: nextSwing });
        };
        break;
      }
      case 'climate_preset': {
        const curPreset = stateObj?.attributes?.preset_mode || 'none';
        const presets: string[] = stateObj?.attributes?.preset_modes || ['eco', 'comfort', 'boost', 'away', 'sleep', 'none'];
        const nextPreset = presets[(presets.indexOf(curPreset) + 1) % presets.length] || 'none';
        if (!subIcon) {
          if (curPreset === 'eco') subIcon = 'mdi:leaf';
          else if (curPreset === 'boost') subIcon = 'mdi:rocket-launch';
          else if (curPreset === 'away') subIcon = 'mdi:home-export-outline';
          else if (curPreset === 'sleep') subIcon = 'mdi:bed';
          else subIcon = 'mdi:thermostat';
        }
        subTitle = `Preset: ${curPreset} -> ${nextPreset}`;
        if (!subLabel) subLabel = curPreset;
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_preset_mode', { entity_id: targetEntity, preset_mode: nextPreset });
        };
        break;
      }
      case 'clean': {
        const isCleaning = stateObj?.state === 'cleaning';
        subIsActive = isCleaning;
        if (!subIcon) subIcon = isCleaning ? 'mdi:pause' : 'mdi:robot-vacuum';
        subTitle = isCleaning ? 'Pause Vacuum' : 'Start Vacuum';
        defaultAction = (hass) => {
          hass?.callService('vacuum', isCleaning ? 'pause' : 'start', { entity_id: targetEntity });
        };
        break;
      }
      case 'dock': {
        if (!subIcon) subIcon = 'mdi:home-import-outline';
        subTitle = 'Return to Dock';
        defaultAction = (hass) => {
          hass?.callService('vacuum', 'return_to_base', { entity_id: targetEntity });
        };
        break;
      }
      case 'locate': {
        if (!subIcon) subIcon = 'mdi:map-marker-question-outline';
        subTitle = 'Locate';
        defaultAction = (hass) => {
          hass?.callService('vacuum', 'locate', { entity_id: targetEntity });
        };
        break;
      }
      case 'clean_zone':
      case 'spot_clean': {
        if (!subIcon) subIcon = subType === 'clean_zone' ? 'mdi:map-marker-radius-outline' : 'mdi:target-variant';
        subTitle = subType === 'clean_zone' ? 'Zone / Room Clean' : 'Spot Clean Mode';
        defaultAction = (hass) => {
          hass?.callService('vacuum', 'clean_spot', { entity_id: targetEntity });
        };
        break;
      }
      case 'alarm_keypad': {
        if (!subIcon) subIcon = 'mdi:dialpad';
        subTitle = 'Open PIN Keypad';
        break;
      }
      case 'valve_close': {
        const isClosed = stateObj?.state === 'closed' || stateObj?.state === 'off';
        subIsActive = !isClosed;
        if (!subIcon) subIcon = isClosed ? 'mdi:valve-closed' : 'mdi:valve-open';
        subTitle = isClosed ? 'Valve is Closed' : 'Emergency Close Valve';
        defaultAction = (hass) => {
          const vDomain = targetEntity.split('.')[0];
          if (vDomain === 'valve') {
            hass?.callService('valve', 'close_valve', { entity_id: targetEntity });
          } else {
            hass?.callService('switch', 'turn_off', { entity_id: targetEntity });
          }
        };
        break;
      }
      case 'pool_speed': {
        const curSpeedPct = stateObj?.attributes?.percentage ?? 50;
        const nextSpeedPct = curSpeedPct > 50 ? 30 : 100;
        if (!subIcon) subIcon = 'mdi:pool';
        subTitle = `Pool Speed: ${curSpeedPct}% -> ${nextSpeedPct}%`;
        if (!subLabel) subLabel = `${curSpeedPct}%`;
        defaultAction = (hass) => {
          hass?.callService('fan', 'set_percentage', { entity_id: targetEntity, percentage: nextSpeedPct });
        };
        break;
      }
      case 'vacuum_fan_speed': {
        const curSpeed = stateObj?.attributes?.fan_speed || 'standard';
        const speeds: string[] = stateObj?.attributes?.fan_speed_list || ['quiet', 'standard', 'strong', 'turbo'];
        const nextSpeed = speeds[(speeds.indexOf(curSpeed) + 1) % speeds.length] || 'standard';
        if (!subIcon) subIcon = 'mdi:fan';
        subTitle = `Suction: ${curSpeed} -> ${nextSpeed}`;
        if (!subLabel) subLabel = curSpeed;
        defaultAction = (hass) => {
          hass?.callService('vacuum', 'set_fan_speed', { entity_id: targetEntity, fan_speed: nextSpeed });
        };
        break;
      }
      case 'counter_inc': {
        if (!subIcon) subIcon = 'mdi:plus-box';
        subTitle = 'Increment Counter (+1)';
        if (!subLabel) subLabel = '+1';
        defaultAction = (hass) => {
          hass?.callService('counter', 'increment', { entity_id: targetEntity });
        };
        break;
      }
      case 'counter_dec': {
        if (!subIcon) subIcon = 'mdi:minus-box';
        subTitle = 'Decrement Counter (-1)';
        if (!subLabel) subLabel = '-1';
        defaultAction = (hass) => {
          hass?.callService('counter', 'decrement', { entity_id: targetEntity });
        };
        break;
      }
      case 'hvac_mode': {
        const curMode = stateObj?.state || 'off';
        const modes: string[] = stateObj?.attributes?.hvac_modes || ['off', 'heat', 'cool', 'auto'];
        const nextMode = modes[(modes.indexOf(curMode) + 1) % modes.length] || 'auto';
        subIsActive = curMode !== 'off';
        if (!subIcon) {
          if (curMode === 'heat') subIcon = 'mdi:fire';
          else if (curMode === 'cool') subIcon = 'mdi:snowflake';
          else if (curMode === 'dry') subIcon = 'mdi:water-percent';
          else if (curMode === 'fan_only') subIcon = 'mdi:fan';
          else if (curMode === 'auto') subIcon = 'mdi:thermostat-auto';
          else subIcon = 'mdi:power';
        }
        subTitle = `Mode: ${curMode} -> Next: ${nextMode}`;
        if (!subLabel) subLabel = curMode;
        defaultAction = (hass) => {
          hass?.callService('climate', 'set_hvac_mode', { entity_id: targetEntity, hvac_mode: nextMode });
        };
        break;
      }
      case 'light_effect':
      case 'effect_next': {
        const effects: string[] = stateObj?.attributes?.effect_list || [];
        const curEffect = stateObj?.attributes?.effect || 'None';
        const nextEffect = effects.length > 0 ? (effects[(effects.indexOf(curEffect) + 1) % effects.length] || effects[0]) : 'None';
        if (!subIcon) subIcon = subType === 'light_effect' ? 'mdi:creation' : 'mdi:arrow-right-bold-circle-outline';
        subIsActive = curEffect !== 'None' && curEffect !== 'off' && (entityIsActive ?? false);
        subTitle = subType === 'light_effect' ? `Effect: ${curEffect} -> Next: ${nextEffect}` : `Next Effect: ${nextEffect}`;
        if (!subLabel) subLabel = curEffect !== 'None' ? curEffect : 'Effect';
        defaultAction = (hass) => {
          if (effects.length > 0) {
            hass?.callService('light', 'turn_on', { entity_id: targetEntity, effect: nextEffect });
          }
        };
        break;
      }
      case 'effect_prev': {
        const effects: string[] = stateObj?.attributes?.effect_list || [];
        const curEffect = stateObj?.attributes?.effect || 'None';
        const curIdx = effects.indexOf(curEffect);
        const prevIdx = curIdx <= 0 ? effects.length - 1 : curIdx - 1;
        const prevEffect = effects.length > 0 ? effects[prevIdx] : 'None';
        if (!subIcon) subIcon = 'mdi:arrow-left-bold-circle-outline';
        subTitle = `Previous Effect: ${prevEffect}`;
        if (!subLabel) subLabel = prevEffect;
        defaultAction = (hass) => {
          if (effects.length > 0) {
            hass?.callService('light', 'turn_on', { entity_id: targetEntity, effect: prevEffect });
          }
        };
        break;
      }
      case 'white_mode': {
        if (!subIcon) subIcon = 'mdi:white-balance-sunny';
        subTitle = 'Set Neutral White (4000K)';
        defaultAction = (hass) => {
          hass?.callService('light', 'turn_on', { entity_id: targetEntity, color_temp: 250 });
        };
        break;
      }
      case 'brightness': {
        const curB = stateObj?.attributes?.brightness;
        const pct = curB !== undefined ? Math.round((curB / 255) * 100) : 0;
        if (!subIcon) subIcon = 'mdi:brightness-6';
        subTitle = `Brightness: ${pct}%`;
        if (!subLabel) subLabel = `${pct}%`;
        defaultAction = (hass) => {
          let nextPct = 25;
          if (pct >= 85) nextPct = 0;
          else if (pct >= 60) nextPct = 100;
          else if (pct >= 35) nextPct = 75;
          else if (pct >= 10) nextPct = 50;
          if (nextPct === 0) {
            hass?.callService('light', 'turn_off', { entity_id: targetEntity });
          } else {
            hass?.callService('light', 'turn_on', { entity_id: targetEntity, brightness_pct: nextPct });
          }
        };
        break;
      }
      case 'garage_toggle': {
        const isGarageOpen = stateObj?.state === 'open' || stateObj?.state === 'opening';
        subIsActive = isGarageOpen;
        if (!subIcon) subIcon = isGarageOpen ? 'mdi:garage-open' : 'mdi:garage';
        subTitle = isGarageOpen ? 'Close Garage' : 'Open Garage';
        defaultAction = (hass) => {
          hass?.callService('cover', 'toggle', { entity_id: targetEntity });
        };
        break;
      }
      case 'dim_up': {
        const subDomain = targetEntity.split('.')[0];
        if (subDomain === 'number' || subDomain === 'input_number') {
          const curVal = Number(stateObj?.state) || 0;
          const stepVal = Number(stateObj?.attributes?.step) || 1;
          const maxVal = Number(stateObj?.attributes?.max) || 100;
          const nextVal = Math.min(maxVal, curVal + stepVal);
          if (!subIcon) subIcon = 'mdi:plus-circle-outline';
          subTitle = `Value +${stepVal}`;
          if (!subLabel) subLabel = `+${stepVal}`;
          defaultAction = (hass) => {
            hass?.callService(subDomain, 'set_value', { entity_id: targetEntity, value: nextVal });
          };
        } else {
          const curB = stateObj?.attributes?.brightness ?? 0;
          const nextB = Math.min(255, curB + 26);
          if (!subIcon) subIcon = 'mdi:brightness-5';
          subTitle = 'Brightness +10%';
          if (!subLabel) subLabel = '+10%';
          defaultAction = (hass) => {
            hass?.callService('light', 'turn_on', { entity_id: targetEntity, brightness: nextB });
          };
        }
        break;
      }
      case 'dim_down': {
        const subDomain = targetEntity.split('.')[0];
        if (subDomain === 'number' || subDomain === 'input_number') {
          const curVal = Number(stateObj?.state) || 0;
          const stepVal = Number(stateObj?.attributes?.step) || 1;
          const minVal = Number(stateObj?.attributes?.min) || 0;
          const nextVal = Math.max(minVal, curVal - stepVal);
          if (!subIcon) subIcon = 'mdi:minus-circle-outline';
          subTitle = `Value -${stepVal}`;
          if (!subLabel) subLabel = `-${stepVal}`;
          defaultAction = (hass) => {
            hass?.callService(subDomain, 'set_value', { entity_id: targetEntity, value: nextVal });
          };
        } else {
          const curB = stateObj?.attributes?.brightness ?? 0;
          const nextB = Math.max(1, curB - 26);
          if (!subIcon) subIcon = 'mdi:brightness-4';
          subTitle = 'Brightness -10%';
          if (!subLabel) subLabel = '-10%';
          defaultAction = (hass) => {
            hass?.callService('light', 'turn_on', { entity_id: targetEntity, brightness: nextB });
          };
        }
        break;
      }
      case 'humidity_up': {
        const curH = Number(stateObj?.attributes?.humidity ?? stateObj?.attributes?.target_humidity ?? 50);
        const nextH = Math.min(100, curH + 5);
        if (!subIcon) subIcon = 'mdi:water-plus';
        subTitle = `Humidity +5% (${nextH}%)`;
        if (!subLabel) subLabel = '+5%';
        defaultAction = (hass) => {
          hass?.callService('humidifier', 'set_humidity', { entity_id: targetEntity, humidity: nextH });
        };
        break;
      }
      case 'humidity_down': {
        const curH = Number(stateObj?.attributes?.humidity ?? stateObj?.attributes?.target_humidity ?? 50);
        const nextH = Math.max(0, curH - 5);
        if (!subIcon) subIcon = 'mdi:water-minus';
        subTitle = `Humidity -5% (${nextH}%)`;
        if (!subLabel) subLabel = '-5%';
        defaultAction = (hass) => {
          hass?.callService('humidifier', 'set_humidity', { entity_id: targetEntity, humidity: nextH });
        };
        break;
      }
      case 'humidity_step_up': {
        const curH = Number(stateObj?.attributes?.humidity ?? stateObj?.attributes?.target_humidity ?? 50);
        const nextH = Math.min(100, curH + 1);
        if (!subIcon) subIcon = 'mdi:water-plus';
        subTitle = `Humidity +1% (${nextH}%)`;
        if (!subLabel) subLabel = '+1%';
        defaultAction = (hass) => {
          hass?.callService('humidifier', 'set_humidity', { entity_id: targetEntity, humidity: nextH });
        };
        break;
      }
      case 'humidity_step_down': {
        const curH = Number(stateObj?.attributes?.humidity ?? stateObj?.attributes?.target_humidity ?? 50);
        const nextH = Math.max(0, curH - 1);
        if (!subIcon) subIcon = 'mdi:water-minus';
        subTitle = `Humidity -1% (${nextH}%)`;
        if (!subLabel) subLabel = '-1%';
        defaultAction = (hass) => {
          hass?.callService('humidifier', 'set_humidity', { entity_id: targetEntity, humidity: nextH });
        };
        break;
      }
      case 'input_select': {
        const curOpt = stateObj?.state || '';
        const options: string[] = stateObj?.attributes?.options || [];
        const nextOpt = options.length > 0 ? (options[(options.indexOf(curOpt) + 1) % options.length] || options[0]) : curOpt;
        if (!subIcon) subIcon = 'mdi:form-dropdown';
        subTitle = `Option: ${curOpt} -> Next: ${nextOpt}`;
        if (!subLabel) subLabel = curOpt;
        defaultAction = (hass) => {
          const sDomain = targetEntity.split('.')[0] === 'select' ? 'select' : 'input_select';
          hass?.callService(sDomain, 'select_next', { entity_id: targetEntity });
        };
        break;
      }
      case 'temp_warm': {
        if (!subIcon) subIcon = 'mdi:weather-sunny';
        subTitle = 'Warm White (2700K)';
        if (!subLabel) subLabel = '2700K';
        defaultAction = (hass) => {
          hass?.callService('light', 'turn_on', { entity_id: targetEntity, color_temp_kelvin: 2700 });
        };
        break;
      }
      case 'temp_cool': {
        if (!subIcon) subIcon = 'mdi:weather-sunset-up';
        subTitle = 'Cool Daylight (6000K)';
        if (!subLabel) subLabel = '6000K';
        defaultAction = (hass) => {
          hass?.callService('light', 'turn_on', { entity_id: targetEntity, color_temp_kelvin: 6000 });
        };
        break;
      }
      case 'color_temp': {
        if (!subIcon) subIcon = 'mdi:palette-swatch-outline';
        subTitle = 'Color Temperature';
        if (!subLabel) subLabel = 'Temp';
        defaultAction = (hass) => {
          const curKelvin = stateObj?.attributes?.color_temp_kelvin || 3000;
          let nextKelvin = 2700;
          if (curKelvin < 3300) nextKelvin = 4000;
          else if (curKelvin < 5000) nextKelvin = 6000;
          else nextKelvin = 2700;
          hass?.callService('light', 'turn_on', { entity_id: targetEntity, color_temp_kelvin: nextKelvin });
        };
        break;
      }
      case 'button':
      default: {
        if (!subIcon) subIcon = stateObj?.attributes?.icon || 'mdi:checkbox-blank-circle';
        subTitle = customLabel || (stateObj?.attributes?.friendly_name ?? '');
        break;
      }
    }

    return {
      icon: subIcon,
      title: subTitle,
      label: subLabel,
      isActive: subIsActive,
      animClass: subAnimClass,
      defaultAction
    };
  }
}
