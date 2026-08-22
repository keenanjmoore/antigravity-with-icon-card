/**
 * DateTime Formatter & Relative Time Engine for Antigravity Cards
 * Features fast LRU date parsing, relative time calculation, and duration formatting.
 */

const DATE_PARSE_CACHE = new Map<string, Date>();
const DATE_PARSE_CACHE_MAX = 128;

export class DateTimeFormatter {
  /**
   * Safely parse a date string or timestamp into a Date object with LRU caching.
   */
  public static parseDate(ts: string | number | undefined | null): Date | null {
    if (!ts) return null;
    if (typeof ts === 'number') {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? null : d;
    }
    const trimmed = ts.trim();
    if (!trimmed) return null;

    const cached = DATE_PARSE_CACHE.get(trimmed);
    if (cached) return cached;

    const d = new Date(trimmed);
    if (isNaN(d.getTime())) return null;

    if (DATE_PARSE_CACHE.size >= DATE_PARSE_CACHE_MAX) {
      const oldest = DATE_PARSE_CACHE.keys().next().value;
      if (oldest !== undefined) DATE_PARSE_CACHE.delete(oldest);
    }
    DATE_PARSE_CACHE.set(trimmed, d);
    return d;
  }

  /**
   * Format a timestamp into an intuitive human-readable relative string (e.g., "5m ago", "2h ago", "just now").
   */
  public static formatRelativeTime(ts: string | number | undefined | null): string {
    const d = this.parseDate(ts);
    if (!d) return '';

    const now = Date.now();
    const diffSec = Math.max(0, Math.floor((now - d.getTime()) / 1000));

    if (diffSec < 10) return 'just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears}y ago`;
  }

  /**
   * Format a duration in seconds into a friendly badge string (e.g. "12m left", "45s left").
   */
  public static formatDurationRemaining(seconds: number): string {
    if (isNaN(seconds) || seconds <= 0) return '0s left';
    if (seconds < 60) return `${Math.round(seconds)}s left`;
    const mins = Math.ceil(seconds / 60);
    if (mins < 60) return `${mins}m left`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins > 0 ? `${hrs}h ${remMins}m left` : `${hrs}h left`;
  }
}
