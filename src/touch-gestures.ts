/**
 * Touch Gestures & Pointer Interaction Manager for Antigravity Cards
 * Handles multi-touch filtering, velocity tracking, long-press holds, double-taps, and haptics.
 */

import { forwardHaptic } from 'custom-card-helpers';

export interface GestureCallbacks {
  onTap: (e: Event) => void;
  onHold?: (e: Event) => void;
  onDoubleTap?: (e: Event) => void;
}

export class TouchGestureManager {
  private _holdTimer: any = null;
  private _tapTimer: any = null;
  private _activePointerId: number | null = null;
  private _held = false;
  private _moved = false;
  private _canceled = false;
  private _startX = 0;
  private _startY = 0;
  private _pointerDownTime = 0;
  private _lastTapTime = 0;

  /**
   * Forward haptic feedback safely.
   */
  public static triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'selection' | 'warning' | 'failure' | 'success', enabled = true): void {
    if (!enabled) return;
    try {
      forwardHaptic(type);
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        if (type === 'light' || type === 'selection') navigator.vibrate(10);
        else if (type === 'medium') navigator.vibrate(25);
        else if (type === 'heavy') navigator.vibrate(45);
      }
    }
  }

  public handlePointerDown(e: PointerEvent, onHold?: () => void, holdDurationMs = 500): void {
    if (this._activePointerId !== null && this._activePointerId !== e.pointerId) {
      return; // Ignore secondary simultaneous multi-touch touches
    }
    this._activePointerId = e.pointerId;
    this._pointerDownTime = Date.now();
    this._held = false;
    this._moved = false;
    this._canceled = false;
    this._startX = e.clientX;
    this._startY = e.clientY;

    if (onHold) {
      this._holdTimer = setTimeout(() => {
        if (this._moved || this._canceled) return;
        this._held = true;
        this._holdTimer = null;
        if (this._tapTimer) {
          clearTimeout(this._tapTimer);
          this._tapTimer = null;
        }
        TouchGestureManager.triggerHaptic('heavy');
        onHold();
      }, holdDurationMs);
    }
  }

  public handlePointerMove(e: PointerEvent): void {
    if (this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const dx = e.clientX - this._startX;
    const dy = e.clientY - this._startY;
    const dist = Math.hypot(dx, dy);
    const dt = Math.max(1, Date.now() - this._pointerDownTime);
    const velocity = dist / dt;

    if (dist > 8 || velocity > 0.5) {
      this._moved = true;
      if (this._holdTimer) {
        clearTimeout(this._holdTimer);
        this._holdTimer = null;
      }
    }
  }

  public handlePointerUp(): void {
    this._activePointerId = null;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  public handlePointerCancel(): void {
    this._activePointerId = null;
    this._canceled = true;
    this._moved = true;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  public handleTap(e: Event, callbacks: GestureCallbacks, doubleTapThresholdMs = 280): void {
    if (this._held) {
      this._held = false;
      return;
    }
    if (this._moved || this._canceled) {
      this._moved = false;
      this._canceled = false;
      return;
    }

    const now = Date.now();
    if (callbacks.onDoubleTap && now - this._lastTapTime < doubleTapThresholdMs) {
      if (this._tapTimer) {
        clearTimeout(this._tapTimer);
        this._tapTimer = null;
      }
      this._lastTapTime = 0;
      TouchGestureManager.triggerHaptic('medium');
      callbacks.onDoubleTap(e);
      return;
    }

    this._lastTapTime = now;
    if (callbacks.onDoubleTap) {
      this._tapTimer = setTimeout(() => {
        this._tapTimer = null;
        callbacks.onTap(e);
      }, doubleTapThresholdMs);
    } else {
      callbacks.onTap(e);
    }
  }

  public reset(): void {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this._activePointerId = null;
  }
}
