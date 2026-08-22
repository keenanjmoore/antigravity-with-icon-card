/**
 * Configuration Validator & Runtime Type Guards for Antigravity Cards
 * Validates configuration schema, catches broken parameters, and displays helpful error banners.
 */

import { ActionConfig } from 'custom-card-helpers';
import { RGBTuple } from './types';

export class ConfigValidator {
  /**
   * Validate that the card configuration conforms to required Home Assistant schema.
   */
  public static validate(config: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config || typeof config !== 'object') {
      return { isValid: false, errors: ['Configuration must be a valid object.'] };
    }

    if (!config.type) {
      errors.push('Missing "type" property in card configuration.');
    }

    if (config.entity && typeof config.entity !== 'string') {
      errors.push('The "entity" property must be a valid entity ID string (e.g. "light.living_room").');
    }

    if (config.fade_stage_1_duration !== undefined && typeof config.fade_stage_1_duration !== 'number') {
      errors.push('fade_stage_1_duration must be a number in seconds.');
    }

    if (config.fade_stage_2_duration !== undefined && typeof config.fade_stage_2_duration !== 'number') {
      errors.push('fade_stage_2_duration must be a number in seconds.');
    }

    if (config.fade_stage_3_duration !== undefined && typeof config.fade_stage_3_duration !== 'number') {
      errors.push('fade_stage_3_duration must be a number in seconds.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Type guard for ActionConfig.
   */
  public static isActionConfig(obj: any): obj is ActionConfig {
    return obj !== null && typeof obj === 'object' && typeof obj.action === 'string';
  }

  /**
   * Type guard for RGBTuple.
   */
  public static isRGBTuple(val: any): val is RGBTuple {
    return (
      Array.isArray(val) &&
      val.length === 3 &&
      typeof val[0] === 'number' &&
      typeof val[1] === 'number' &&
      typeof val[2] === 'number'
    );
  }
}
