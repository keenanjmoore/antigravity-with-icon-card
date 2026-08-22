/**
 * Info Formatter for Antigravity Cards
 * Handles state formatting, relative time calculation, localized unit formatting, and sensor attributes.
 */

import { html, TemplateResult } from 'lit';

const DATE_PARSE_CACHE = new Map<string, Date>();
const DATE_PARSE_CACHE_MAX = 200;

export class InfoFormatter {
  /**
   * Parse date strings, numbers, or Date instances safely with LRU caching.
   */
  public static parseDate(dateInput: string | Date | number | undefined): Date | null {
    if (!dateInput) return null;
    if (dateInput instanceof Date) return isNaN(dateInput.getTime()) ? null : dateInput;
    if (typeof dateInput === 'number') {
      const d = new Date(dateInput > 1e11 ? dateInput : dateInput * 1000);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof dateInput === 'string') {
      const cached = DATE_PARSE_CACHE.get(dateInput);
      if (cached) return cached;
      const parsedMs = Date.parse(dateInput);
      if (!isNaN(parsedMs)) {
        const res = new Date(parsedMs);
        if (DATE_PARSE_CACHE.size >= DATE_PARSE_CACHE_MAX) {
          const firstKey = DATE_PARSE_CACHE.keys().next().value;
          if (firstKey !== undefined) DATE_PARSE_CACHE.delete(firstKey);
        }
        DATE_PARSE_CACHE.set(dateInput, res);
        return res;
      }
      let clean = dateInput.trim();
      if (clean.includes(' ') && !clean.includes('T')) {
        clean = clean.replace(' ', 'T');
      }
      if (clean.includes('T') && !clean.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(clean) && !/[+-]\d{4}$/.test(clean)) {
        clean += 'Z';
      }
      const num = Number(clean);
      let d: Date;
      if (!isNaN(num) && clean !== '' && !clean.includes('T')) {
        d = new Date(num > 1e11 ? num : num * 1000);
      } else {
        d = new Date(clean);
      }
      const res = isNaN(d.getTime()) ? null : d;
      if (res) {
        if (DATE_PARSE_CACHE.size >= DATE_PARSE_CACHE_MAX) {
          const firstKey = DATE_PARSE_CACHE.keys().next().value;
          if (firstKey !== undefined) DATE_PARSE_CACHE.delete(firstKey);
        }
        DATE_PARSE_CACHE.set(dateInput, res);
      }
      return res;
    }
    return null;
  }

  /**
   * Format a past timestamp to relative time string (compact or human-friendly).
   */
  public static formatTimeAgo(dateInput: string | Date | number | undefined, compact = false, nowMs?: number): string {
    const date = this.parseDate(dateInput);
    if (!date) return "";

    const diffSec = Math.max(0, (((nowMs ?? Date.now()) - date.getTime()) / 1000) | 0);
    if (diffSec < 5) return compact ? "< 5s" : "just now";
    if (diffSec < 60) return compact ? `${diffSec}s` : `${diffSec} seconds ago`;
    const diffMin = (diffSec / 60) | 0;
    if (diffMin < 60) return compact ? `${diffMin}m` : `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
    const diffHours = (diffMin / 60) | 0;
    if (diffHours < 24) return `${diffHours}h${compact ? '' : ' ago'}`;
    const diffDays = (diffHours / 24) | 0;
    if (diffDays < 7) return `${diffDays}d${compact ? '' : ' ago'}`;
    const diffWeeks = (diffDays / 7) | 0;
    if (diffWeeks < 4) return `${diffWeeks}w${compact ? '' : ' ago'}`;
    const diffMonths = (diffDays / 30) | 0;
    if (diffMonths < 12) return `${diffMonths}mo${compact ? '' : ' ago'}`;
    const diffYears = (diffDays / 365) | 0;
    return `${diffYears}y${compact ? '' : ' ago'}`;
  }

  public static formatRelativeTime(dateInput: string | Date | number | undefined, nowMs?: number): string {
    return this.formatTimeAgo(dateInput, false, nowMs);
  }

  public static formatForDuration(dateInput: string | Date | number | undefined, nowMs?: number): string {
    return this.formatTimeAgo(dateInput, true, nowMs);
  }

  /**
   * Compute primary/secondary content string or TemplateResult for a given info type and stateObj.
   */
  public static getInfoContent(
    type: string | undefined,
    stateObj: any,
    config: any,
    hass: any
  ): string | TemplateResult {
    if (!stateObj) return "";
    const normType = (type || '').toLowerCase().replace(/_/g, '-');
    switch (normType) {
      case 'name': {
        const rawName = config?.name || stateObj.attributes?.friendly_name || config?.entity || "";
        return rawName;
      }
      case 'state': {
        const domain = (stateObj.entity_id || '').split('.')[0];

        // 1. Timer active / paused
        if (domain === 'timer') {
          if (stateObj.state === 'paused') {
            return `${stateObj.attributes?.remaining || 'Paused'} (Paused)`;
          }
          if (stateObj.state === 'active' && stateObj.attributes?.finishes_at) {
            const finishesAt = Date.parse(stateObj.attributes.finishes_at);
            if (!isNaN(finishesAt)) {
              const remSec = Math.max(0, Math.round((finishesAt - Date.now()) / 1000));
              const m = Math.floor(remSec / 60);
              const s = remSec % 60;
              const h = Math.floor(m / 60);
              const dispM = (m % 60).toString().padStart(2, '0');
              const dispS = s.toString().padStart(2, '0');
              return h > 0 ? `${h}:${dispM}:${dispS}` : `${dispM}:${dispS}`;
            }
          }
        }

        // 2. Binary Sensor Smart State Elapsed ("for xx min/hour/sec") & Safety Alerts
        if (domain === 'binary_sensor') {
          const devClass = stateObj.attributes?.device_class;
          if (devClass === 'tamper' && stateObj.state === 'on') return '⚠️ Tamper Detected';
          if (devClass === 'problem' && stateObj.state === 'on') return '⚠️ Problem Detected';
          if (devClass === 'smoke' && stateObj.state === 'on') return '🔥 Smoke Detected!';
          if (devClass === 'gas' && stateObj.state === 'on') return '⚠️ Gas Detected!';
          if (devClass === 'moisture' && stateObj.state === 'on') return '💧 Moisture Detected!';
          return this.formatForDuration(stateObj.last_changed);
        }

        // 3. Vacuum Domain Status
        if (domain === 'vacuum') {
          const vState = stateObj.state;
          let label = vState;
          if (vState === 'cleaning') label = '🧹 Cleaning';
          else if (vState === 'docked') label = '🏠 Docked';
          else if (vState === 'returning') label = '🔄 Returning';
          else if (vState === 'paused') label = '⏸️ Paused';
          else if (vState === 'error') label = '⚠️ Error';
          const bat = stateObj.attributes?.battery_level;
          return bat !== undefined ? `${label} • 🔋${bat}%` : label;
        }

        // 4. Weather Domain Status
        if (domain === 'weather') {
          const temp = stateObj.attributes?.temperature;
          const uom = hass?.config?.unit_system?.temperature || '°F';
          const cond = (stateObj.state || '').replace(/-/g, ' ');
          return temp !== undefined ? `${temp}${uom} • ${cond}` : cond;
        }

        // 5. Climate Domain Preset, Action & Dual Temperature Status
        if (domain === 'climate') {
          const mode = stateObj.state || '';
          const curTemp = stateObj.attributes?.current_temperature;
          const targetTemp = stateObj.attributes?.temperature ?? stateObj.attributes?.target_temp_high;
          const uom = stateObj.attributes?.unit_of_measurement || hass?.config?.unit_system?.temperature || '°';
          const preset = stateObj.attributes?.preset_mode;
          const act = stateObj.attributes?.hvac_action;
          const tempSummary = (curTemp !== undefined && targetTemp !== undefined) ? `${curTemp}${uom} → ${targetTemp}${uom}` : (targetTemp !== undefined ? `${targetTemp}${uom}` : '');
          const extras = [tempSummary, act, preset].filter(Boolean).join(' • ');
          return extras ? `${mode} (${extras})` : mode;
        }

        // 6. Fan Domain Status with Speed, Oscillation & Direction
        if (domain === 'fan') {
          const pct = stateObj.attributes?.percentage;
          const osc = stateObj.attributes?.oscillating ? '∿ Oscillating' : '';
          const dir = stateObj.attributes?.direction === 'reverse' ? '⟲ Reverse' : '';
          const details = [pct !== undefined ? `${pct}%` : stateObj.state, osc, dir].filter(Boolean).join(' • ');
          return details;
        }

        // 7. Alarm Control Panel Status
        if (domain === 'alarm_control_panel') {
          const aState = stateObj.state;
          if (aState === 'armed_home') return '🛡️ Armed Home';
          if (aState === 'armed_away') return '🛡️ Armed Away';
          if (aState === 'disarmed') return 'Disarmed';
          if (aState === 'triggered') return '⚠️ TRIGGERED';
          if (aState === 'pending') return '⏳ Arming Pending...';
          if (aState === 'arming') return '⏳ Arming...';
        }

        // 8. Lock Domain Status
        if (domain === 'lock') {
          if (stateObj.state === 'locked') return 'Locked';
          if (stateObj.state === 'unlocked') return 'Unlocked';
          if (stateObj.state === 'jammed') return 'Jammed (Alert!)';
          if (stateObj.state === 'locking') return 'Locking...';
          if (stateObj.state === 'unlocking') return 'Unlocking...';
        }

        // 9. Button / Input Button Status
        if (domain === 'button' || domain === 'input_button') {
          return 'Press to run';
        }

        // 10. Light Domain Status with Color Temp / Mode
        if (domain === 'light' && stateObj.state === 'on') {
          const b = stateObj.attributes?.brightness;
          const pct = b !== undefined ? Math.round((b / 255) * 100) : 100;
          if (stateObj.attributes?.color_temp_kelvin) {
            return `${pct}% • ${stateObj.attributes.color_temp_kelvin}K`;
          }
        }

        if (
          stateObj.attributes?.device_class === 'timestamp' ||
          stateObj.attributes?.device_class === 'date' ||
          (typeof stateObj.state === 'string' && (stateObj.state.includes('T') || stateObj.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(stateObj.state)))
        ) {
          const rel = this.formatRelativeTime(stateObj.state);
          if (rel) return rel;
        }

        // Numeric precision formatter for sensor entities
        if (stateObj.attributes?.display_precision !== undefined && !isNaN(Number(stateObj.state))) {
          const prec = Number(stateObj.attributes.display_precision);
          const formattedNum = Number(stateObj.state).toFixed(prec);
          const uom = stateObj.attributes?.unit_of_measurement ? ` ${stateObj.attributes.unit_of_measurement}` : '';
          return `${formattedNum}${uom}`;
        }

        if (typeof hass?.formatEntityState === 'function') {
          try {
            return hass.formatEntityState(stateObj);
          } catch {
            // fallback
          }
        }
        return `${stateObj.state} ${stateObj.attributes?.unit_of_measurement || ''}`.trim();
      }
      case 'last-changed':
      case 'last-changed-relative':
      case 'relative-time': {
        const timeVal = stateObj.attributes?.last_triggered || stateObj.last_changed;
        return this.formatForDuration(timeVal);
      }
      case 'last-updated':
      case 'last-updated-relative': {
        return this.formatForDuration(stateObj.last_updated);
      }
      case 'last-triggered': {
        const trig = stateObj.attributes?.last_triggered || stateObj.last_changed;
        return this.formatForDuration(trig);
      }
      case 'brightness': {
        const b = stateObj.attributes?.brightness;
        return b !== undefined ? `${Math.round((b / 255) * 100)}%` : "";
      }
      case 'temperature': {
        const t = stateObj.attributes?.temperature ?? stateObj.attributes?.current_temperature;
        const uom = stateObj.attributes?.unit_of_measurement || hass?.config?.unit_system?.temperature || '°C';
        return t !== undefined ? `${t} ${uom}` : "";
      }
      case 'humidity': {
        const h = stateObj.attributes?.humidity ?? stateObj.attributes?.current_humidity;
        const uom = stateObj.attributes?.unit_of_measurement || '%';
        return h !== undefined ? `${h}${uom.startsWith('%') ? uom : ` ${uom}`}` : "";
      }
      case 'battery': {
        const rawBat = stateObj.attributes?.battery_level ?? stateObj.attributes?.battery ?? (stateObj.attributes?.device_class === 'battery' ? stateObj.state : undefined);
        if (rawBat !== undefined) {
          const bat = Number(rawBat);
          if (!isNaN(bat)) {
            let batColor = '#4caf50';
            if (bat <= 20) batColor = '#f44336';
            else if (bat <= 50) batColor = '#ff9800';
            return html`<span style="color: ${batColor}; font-weight: bold;">${bat}%</span>`;
          }
          return `${rawBat}%`;
        }
        return "";
      }
      case 'none':
      default:
        return "";
    }
  }
}
