import { describe, it, expect } from 'vitest';
import { ConfigValidator } from '../src/config-validator';

describe('ConfigValidator', () => {
  it('validates a correct card configuration', () => {
    const res = ConfigValidator.validate({
      type: 'custom:antigravity-no-icon-card',
      entity: 'light.living_room',
      name: 'Living Room Light'
    });
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('rejects null or non-object configuration', () => {
    expect(ConfigValidator.validate(null).isValid).toBe(false);
    expect(ConfigValidator.validate(undefined).isValid).toBe(false);
    expect(ConfigValidator.validate('string' as any).isValid).toBe(false);
  });

  it('catches missing type or invalid entity string', () => {
    const missingType = ConfigValidator.validate({
      entity: 'light.kitchen'
    });
    expect(missingType.isValid).toBe(false);

    const badEntity = ConfigValidator.validate({
      type: 'custom:antigravity-no-icon-card',
      entity: 'invalid_no_dot'
    });
    expect(badEntity.isValid).toBe(false);
  });

  it('type guards validate ActionConfig and RGBTuple', () => {
    expect(ConfigValidator.isActionConfig({ action: 'toggle' })).toBe(true);
    expect(ConfigValidator.isActionConfig({ notAction: 123 })).toBe(false);

    expect(ConfigValidator.isRGBTuple([255, 128, 0])).toBe(true);
    expect(ConfigValidator.isRGBTuple([255, 128])).toBe(false);
    expect(ConfigValidator.isRGBTuple(['255', '128', '0'])).toBe(false);
  });
});
