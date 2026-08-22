import { describe, it, expect } from 'vitest';

// Streaming Compact Bucket Accumulator Logic for testing
interface CompactBucket {
  count: number;
  sum: number;
  min: number;
  max: number;
  first: number;
  last: number;
  values?: number[];
}

function calcMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function aggregatePoints(
  rawPoints: { x: number; y: number }[],
  startTimeMs: number,
  hours: number,
  pointsPerHour: number,
  func: string
) {
  const bucketMs = (3600 * 1000) / pointsPerHour;
  const numBuckets = Math.ceil((hours * 3600 * 1000) / bucketMs);
  const isMedian = func === 'median';

  const buckets: CompactBucket[] = [];
  for (let b = 0; b < numBuckets; b++) {
    buckets.push({ count: 0, sum: 0, min: Infinity, max: -Infinity, first: 0, last: 0 });
  }

  for (let i = 0; i < rawPoints.length; i++) {
    const p = rawPoints[i];
    const bIdx = Math.floor((p.x - startTimeMs) / bucketMs);
    if (bIdx >= 0 && bIdx < numBuckets) {
      const b = buckets[bIdx];
      if (b.count === 0) {
        b.count = 1;
        b.sum = p.y;
        b.min = p.y;
        b.max = p.y;
        b.first = p.y;
        b.last = p.y;
        if (isMedian) b.values = [p.y];
      } else {
        b.count++;
        b.sum += p.y;
        if (p.y < b.min) b.min = p.y;
        if (p.y > b.max) b.max = p.y;
        b.last = p.y;
        if (isMedian) b.values!.push(p.y);
      }
    }
  }

  const result: { x: number; y: number }[] = [];
  for (let b = 0; b < numBuckets; b++) {
    const bucket = buckets[b];
    if (bucket.count > 0) {
      let aggregatedVal = 0;
      if (func === 'min') aggregatedVal = bucket.min;
      else if (func === 'max') aggregatedVal = bucket.max;
      else if (func === 'median' && bucket.values) aggregatedVal = calcMedian(bucket.values);
      else if (func === 'sum') aggregatedVal = bucket.sum;
      else if (func === 'last') aggregatedVal = bucket.last;
      else if (func === 'first') aggregatedVal = bucket.first;
      else aggregatedVal = bucket.sum / bucket.count;

      result.push({ x: startTimeMs + b * bucketMs + bucketMs / 2, y: aggregatedVal });
    }
  }
  return result;
}

describe('Graph Compact Bucket Accumulator', () => {
  it('aggregates average correctly across buckets', () => {
    const now = 10000000;
    const rawPoints = [
      { x: now + 100, y: 10 },
      { x: now + 200, y: 20 },
      { x: now + 300, y: 30 },
    ];
    // All 3 points in bucket 0
    const points = aggregatePoints(rawPoints, now, 1, 1, 'avg');
    expect(points).toHaveLength(1);
    expect(points[0].y).toBe(20);
  });

  it('aggregates min, max, and last correctly', () => {
    const now = 10000000;
    const rawPoints = [
      { x: now + 100, y: 10 },
      { x: now + 200, y: 50 },
      { x: now + 300, y: 25 },
    ];
    expect(aggregatePoints(rawPoints, now, 1, 1, 'min')[0].y).toBe(10);
    expect(aggregatePoints(rawPoints, now, 1, 1, 'max')[0].y).toBe(50);
    expect(aggregatePoints(rawPoints, now, 1, 1, 'last')[0].y).toBe(25);
    expect(aggregatePoints(rawPoints, now, 1, 1, 'first')[0].y).toBe(10);
  });

  it('aggregates median correctly with on-demand array allocation', () => {
    const now = 10000000;
    const rawPoints = [
      { x: now + 100, y: 10 },
      { x: now + 200, y: 90 },
      { x: now + 300, y: 30 },
    ];
    expect(aggregatePoints(rawPoints, now, 1, 1, 'median')[0].y).toBe(30);
  });

  it('handles empty raw points safely', () => {
    const points = aggregatePoints([], 10000000, 1, 1, 'avg');
    expect(points).toHaveLength(0);
  });
});
