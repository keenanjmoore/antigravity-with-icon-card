/**
 * Configuration Validator & Runtime Type Guards for Antigravity Cards
 * Validates configuration schema, catches broken parameters, and provides debounced validation.
 */

import { ActionConfig } from 'custom-card-helpers';
import { RGBTuple } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ConfigValidator {
  private static _debounceTimer: any = null;

  /**
   * Validate that the card configuration conforms to required Home Assistant schema.
   */
  public static validate(config: any): ValidationResult {
    const errors: string[] = [];

    if (!config || typeof config !== 'object') {
      return { isValid: false, errors: ['Configuration must be a valid object.'] };
    }

    if (!config.type) {
      errors.push('Missing "type" property in card configuration.');
    }

    // Fix #5: Validate entity exists as a valid non-empty domain.entity string
    if ('entity' in config) {
      if (typeof config.entity !== 'string' || !config.entity.trim()) {
        errors.push('The "entity" property must be a valid non-empty string ID.');
      } else {
        const parts = config.entity.split('.');
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
          errors.push(`Entity ID "${config.entity}" must be in format "domain.entity_name" (e.g. "light.kitchen").`);
        }
      }
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
   * Debounced validation helper for editor input events.
   */
  public static debouncedValidate(config: any, delayMs = 300): Promise<ValidationResult> {
    return new Promise((resolve) => {
      if (this._debounceTimer) {
        clearTimeout(this._debounceTimer);
      }
      this._debounceTimer = setTimeout(() => {
        resolve(this.validate(config));
      }, delayMs);
    });
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
      typeof val[2] === 'number' &&
      !isNaN(val[0]) &&
      !isNaN(val[1]) &&
      !isNaN(val[2])
    );
  }
}
