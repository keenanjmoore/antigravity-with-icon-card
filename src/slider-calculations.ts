/**
 * Multi-Domain Slider Calculations & Boundary Engine for Antigravity Cards
 * Handles math, scaling, precision step snapping, and international boundary validation.
 */

export interface GenericSliderConfig {
  domain: string;
  label: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  currentPercent: number;
  serviceDomain: string;
  serviceName: string;
  serviceDataKey: string;
}

export class SliderCalculationsEngine {
  /**
   * Determine slider configuration parameters based on entity domain, state, and HA unit system with bounds validation.
   */
  public getSliderConfig(domain: string, stateObj: any, hass?: any): GenericSliderConfig | null {
    if (!stateObj) return null;

    switch (domain) {
      case 'light': {
        const curBrightness = stateObj.attributes?.brightness ?? 0;
        const pct = Math.round((curBrightness / 255) * 100);
        return {
          domain: 'light',
          label: 'Brightness',
          min: 0,
          max: 255,
          step: 1,
          currentValue: curBrightness,
          currentPercent: pct,
          serviceDomain: 'light',
          serviceName: 'turn_on',
          serviceDataKey: 'brightness',
        };
      }

      case 'fan': {
        const curPct = stateObj.attributes?.percentage ?? 0;
        const step = stateObj.attributes?.percentage_step ?? 1;
        return {
          domain: 'fan',
          label: 'Fan Speed',
          min: 0,
          max: 100,
          step: step > 0 ? step : 1,
          currentValue: curPct,
          currentPercent: curPct,
          serviceDomain: 'fan',
          serviceName: 'set_percentage',
          serviceDataKey: 'percentage',
        };
      }

      case 'cover': {
        const pos = stateObj.attributes?.current_position ?? (stateObj.state === 'open' ? 100 : 0);
        return {
          domain: 'cover',
          label: 'Position',
          min: 0,
          max: 100,
          step: 1,
          currentValue: pos,
          currentPercent: pos,
          serviceDomain: 'cover',
          serviceName: 'set_cover_position',
          serviceDataKey: 'position',
        };
      }

      case 'media_player': {
        const isMuted = stateObj.attributes?.is_volume_muted === true;
        const vol = isMuted ? 0 : (stateObj.attributes?.volume_level ?? 0);
        const pct = Math.round(vol * 100);
        return {
          domain: 'media_player',
          label: isMuted ? 'Muted' : 'Volume',
          min: 0,
          max: 1,
          step: 0.01,
          currentValue: vol,
          currentPercent: pct,
          serviceDomain: 'media_player',
          serviceName: 'volume_set',
          serviceDataKey: 'volume_level',
        };
      }

      case 'climate': {
        const unit = (
          stateObj.attributes?.unit_of_measurement ||
          stateObj.attributes?.temperature_unit ||
          hass?.config?.unit_system?.temperature ||
          '°F'
        ).toString().toUpperCase();

        const isFahrenheit = unit.includes('F');
        const defaultMin = isFahrenheit ? 50 : 15;
        const defaultMax = isFahrenheit ? 90 : 32;
        const defaultStep = isFahrenheit ? 1 : 0.5;

        let min = stateObj.attributes?.min_temp ?? defaultMin;
        let max = stateObj.attributes?.max_temp ?? defaultMax;
        const step = stateObj.attributes?.target_temp_step ?? stateObj.attributes?.target_temperature_step ?? defaultStep;

        if (min >= max) {
          max = min + (isFahrenheit ? 10 : 5);
        }

        const rawVal = stateObj.attributes?.temperature ?? stateObj.attributes?.target_temp_low ?? min;
        const val = this.clamp(rawVal, min, max);
        const range = max - min;
        const pct = range > 0 ? Math.max(0, Math.min(100, Math.round(((val - min) / range) * 100))) : 0;
        
        return {
          domain: 'climate',
          label: 'Temperature',
          min,
          max,
          step,
          currentValue: val,
          currentPercent: pct,
          serviceDomain: 'climate',
          serviceName: 'set_temperature',
          serviceDataKey: 'temperature',
        };
      }

      case 'humidifier': {
        const min = stateObj.attributes?.min_humidity ?? 0;
        const max = stateObj.attributes?.max_humidity ?? 100;
        const val = stateObj.attributes?.humidity ?? stateObj.attributes?.target_humidity ?? min;
        const range = max - min;
        const pct = range > 0 ? Math.round(((val - min) / range) * 100) : 0;
        return {
          domain: 'humidifier',
          label: 'Humidity',
          min,
          max,
          step: 1,
          currentValue: val,
          currentPercent: pct,
          serviceDomain: 'humidifier',
          serviceName: 'set_humidity',
          serviceDataKey: 'humidity',
        };
      }

      case 'number':
      case 'input_number': {
        const min = stateObj.attributes?.min ?? 0;
        const max = stateObj.attributes?.max ?? 100;
        const step = stateObj.attributes?.step ?? 1;
        const val = Number(stateObj.state) || 0;
        const range = max - min;
        const pct = range > 0 ? Math.round(((val - min) / range) * 100) : 0;
        return {
          domain,
          label: stateObj.attributes?.friendly_name ?? 'Value',
          min,
          max,
          step,
          currentValue: val,
          currentPercent: pct,
          serviceDomain: domain,
          serviceName: 'set_value',
          serviceDataKey: 'value',
        };
      }

      default:
        return null;
    }
  }

  /**
   * Clamp a value between min and max bounds.
   */
  public clamp(value: number, min: number, max: number): number {
    if (isNaN(value)) return min;
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Snap a numeric slider value to the configured step increment avoiding float errors.
   */
  public snapToStep(value: number, step: number, min: number): number {
    if (isNaN(value)) return min;
    if (step <= 0) return value;
    const steps = Math.round((value - min) / step);
    const result = min + steps * step;
    const stepStr = step.toString();
    const decimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
    return Number(result.toFixed(Math.min(decimals, 6)));
  }

  /**
   * Calculate 0-100 percentage from a value within [min, max] range.
   */
  public valueToPercent(value: number, min: number, max: number): number {
    const range = max - min;
    if (range <= 0 || isNaN(value)) return 0;
    return Math.max(0, Math.min(100, Math.round(((value - min) / range) * 100)));
  }

  /**
   * Calculate absolute value from 0-100 percentage within [min, max] range.
   */
  public percentToValue(percent: number, min: number, max: number): number {
    const range = max - min;
    if (isNaN(percent)) return min;
    return min + (Math.max(0, Math.min(100, percent)) / 100) * range;
  }
}

export const sliderCalculations = new SliderCalculationsEngine();
