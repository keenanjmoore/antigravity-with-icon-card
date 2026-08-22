/**
 * Power & Battery Helper for Antigravity Cards
 * Adapts animation fidelity, timer rates, and shader complexity based on battery status and power-saving preferences.
 */

export interface BatteryState {
  charging: boolean;
  level: number; // 0.0 to 1.0
  chargingTime: number;
  dischargingTime: number;
}

export class PowerHelperService {
  private _battery: any = null;
  private _isLowPower = false;
  private _listeners: Set<() => void> = new Set();
  private _onChargingChange: (() => void) | null = null;
  private _onLevelChange: (() => void) | null = null;
  private _onConnectionChange: (() => void) | null = null;

  constructor() {
    this._initBattery();
    this._initSaveDataListener();
  }

  private async _initBattery() {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      try {
        this._battery = await (navigator as any).getBattery();
        this._updatePowerState();

        this._onChargingChange = () => {
          this._updatePowerState();
          this._notifyListeners();
        };
        this._onLevelChange = () => {
          this._updatePowerState();
          this._notifyListeners();
        };

        this._battery.addEventListener('chargingchange', this._onChargingChange);
        this._battery.addEventListener('levelchange', this._onLevelChange);
      } catch {
        // Battery API restricted or unavailable
      }
    }
  }

  private _initSaveDataListener() {
    if (typeof navigator !== 'undefined' && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      if (conn.saveData) {
        this._isLowPower = true;
      }
      this._onConnectionChange = () => {
        if (conn.saveData) {
          this._isLowPower = true;
          this._notifyListeners();
        }
      };
      conn.addEventListener?.('change', this._onConnectionChange);
    }
  }

  private _updatePowerState() {
    if (!this._battery) return;
    // Low power when on battery and level < 20%
    const lowBatt = !this._battery.charging && this._battery.level < 0.20;
    const saveData = (navigator as any)?.connection?.saveData === true;
    this._isLowPower = lowBatt || saveData;
  }

  public addChangeListener(listener: () => void): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  public get listenerCount(): number {
    return this._listeners.size;
  }

  private _notifyListeners() {
    for (const listener of this._listeners) {
      try {
        listener();
      } catch (e) {
        console.error('Error in power listener:', e);
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('antigravity-power-change', {
        detail: { isLowPower: this._isLowPower }
      }));
    }
  }

  /**
   * Determine if power save mode should be active.
   * Considers hardware battery level, saveData headers, and HA helper state.
   */
  public isPowerSaveActive(hass?: any): boolean {
    if (hass?.states?.['input_boolean.antigravity_power_save']?.state === 'on') {
      return true;
    }
    return this._isLowPower;
  }

  /**
   * Get recommended animation throttle limit in ms.
   * Returns 16ms (~60fps) in normal mode, or 33ms (~30fps) in power-save mode.
   */
  public getTargetFrameIntervalMs(hass?: any): number {
    return this.isPowerSaveActive(hass) ? 33 : 16;
  }

  /**
   * For testing or manual override
   */
  public setMockLowPower(value: boolean) {
    this._isLowPower = value;
    this._notifyListeners();
  }

  /**
   * Cleanup global listeners upon teardown
   */
  public destroy() {
    if (this._battery) {
      if (this._onChargingChange) this._battery.removeEventListener('chargingchange', this._onChargingChange);
      if (this._onLevelChange) this._battery.removeEventListener('levelchange', this._onLevelChange);
    }
    if (typeof navigator !== 'undefined' && (navigator as any).connection && this._onConnectionChange) {
      (navigator as any).connection.removeEventListener?.('change', this._onConnectionChange);
    }
    this._listeners.clear();
  }
}

export const powerHelper = new PowerHelperService();
