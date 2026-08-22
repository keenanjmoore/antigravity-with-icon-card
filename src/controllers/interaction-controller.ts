/**
 * Interaction Controller for Antigravity Cards
 * Manages touch gestures, 8px touch slop, vertical scroll preservation, haptics, and tap/hold execution.
 */

import { forwardHaptic } from 'custom-card-helpers';

export class InteractionController {
  private _startX = 0;
  private _startY = 0;
  private _moved = false;
  private _canceled = false;
  private _holdTimer: any = null;

  public handlePointerDown(e: PointerEvent, onHold?: () => void, holdTimeout = 500) {
    this._startX = e.clientX;
    this._startY = e.clientY;
    this._moved = false;
    this._canceled = false;

    if (onHold) {
      if (this._holdTimer) clearTimeout(this._holdTimer);
      this._holdTimer = setTimeout(() => {
        if (!this._moved && !this._canceled) {
          onHold();
        }
      }, holdTimeout);
    }
  }

  public handlePointerMove(e: PointerEvent, touchSlop = 8): boolean {
    if (this._moved || this._canceled) return false;
    const dx = Math.abs(e.clientX - this._startX);
    const dy = Math.abs(e.clientY - this._startY);

    if (dx > touchSlop || dy > touchSlop) {
      this._moved = true;
      if (this._holdTimer) {
        clearTimeout(this._holdTimer);
        this._holdTimer = null;
      }
      return true; // Motion exceeded threshold
    }
    return false;
  }

  public handlePointerUp(): boolean {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    const isValidTap = !this._moved && !this._canceled;
    this._moved = false;
    this._canceled = false;
    return isValidTap;
  }

  public handlePointerCancel() {
    this._canceled = true;
    this._moved = true;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  public triggerHaptic(type = 'light') {
    try {
      forwardHaptic(type as any);
    } catch {
      // Haptics unavailable on non-touch platforms
    }
  }

  public cleanup() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }
}
