/**
 * Memory Tracker & Telemetry Helper for Antigravity Cards
 * Monitors JS Heap allocations, prevents instance retention leaks with WeakRefs, and tracks lifecycle.
 */

export interface MemorySnapshot {
  usedJSHeapSizeMB?: number;
  totalJSHeapSizeMB?: number;
  jsHeapSizeLimitMB?: number;
  peakJSHeapSizeMB?: number;
  activeCardsCount: number;
  timestamp: number;
}

class MemoryTrackerService {
  private _activeCardInstances = new WeakSet<object>();
  private _activeCount = 0;
  private _peakMemoryMB = 0;
  private _isLogging = false;

  public registerCard(card: object): void {
    if (card && !this._activeCardInstances.has(card)) {
      this._activeCardInstances.add(card);
      this._activeCount++;
      this._updatePeakMemory();
    }
  }

  public unregisterCard(card: object): void {
    if (card && this._activeCardInstances.has(card)) {
      this._activeCardInstances.delete(card);
      this._activeCount = Math.max(0, this._activeCount - 1);
    }
  }

  public getActiveCardCount(): number {
    return this._activeCount;
  }

  private _updatePeakMemory(): void {
    const memory = (performance as any)?.memory;
    if (memory?.usedJSHeapSize) {
      const currentMB = Number((memory.usedJSHeapSize / (1024 * 1024)).toFixed(2));
      if (currentMB > this._peakMemoryMB) {
        this._peakMemoryMB = currentMB;
      }
    }
  }

  public getMemorySnapshot(): MemorySnapshot {
    this._updatePeakMemory();
    const memory = (performance as any)?.memory;
    const snapshot: MemorySnapshot = {
      activeCardsCount: this._activeCount,
      peakJSHeapSizeMB: this._peakMemoryMB > 0 ? this._peakMemoryMB : undefined,
      timestamp: Date.now(),
    };

    if (memory) {
      snapshot.usedJSHeapSizeMB = Number((memory.usedJSHeapSize / (1024 * 1024)).toFixed(2));
      snapshot.totalJSHeapSizeMB = Number((memory.totalJSHeapSize / (1024 * 1024)).toFixed(2));
      snapshot.jsHeapSizeLimitMB = Number((memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2));
    }

    return snapshot;
  }

  public enableDebugLogging(enabled = true): void {
    this._isLogging = enabled;
  }

  public logStatus(): void {
    if (!this._isLogging) return;
    const snapshot = this.getMemorySnapshot();
    if (snapshot.usedJSHeapSizeMB !== undefined) {
      console.info(
        `%c 🧠 ANTIGRAVITY MEMORY %c ${snapshot.usedJSHeapSizeMB}MB / ${snapshot.totalJSHeapSizeMB}MB (Peak: ${snapshot.peakJSHeapSizeMB ?? snapshot.usedJSHeapSizeMB}MB, Active Cards: ${snapshot.activeCardsCount}) `,
        'color: white; background: #00897b; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
        'color: #00897b; background: #e0f2f1; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;'
      );
    }
  }
}

export const memoryTracker = new MemoryTrackerService();
