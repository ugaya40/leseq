import { bench, describe } from 'vitest';
import { flatten, from, map } from '../src';

const createArr = <T>(length: number, createElement: () => T): T[] => Array.from({ length: length }, createElement);

const min = (arr: number[]) => arr.reduce((cur, next) => Math.min(cur, next));
const max = (arr: number[]) => arr.reduce((cur, next) => Math.max(cur, next));

const minMax = (seq: Iterable<number>) => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  for (const item of seq) {
    min = Math.min(item, min);
    max = Math.max(item, max);
  }

  return {
    min,
    max,
  };
};

const minMaxLeseq = (
  segments: {
    coordinates: number[][];
  }[]
) => {
  const points = from(segments).pipe(flatten(item => item.coordinates));
  const longsMinMax = points.pipe(map(item => item[0])).value(minMax);
  const latsMinMax = points.pipe(map(item => item[1])).value(minMax);

  return [
    [longsMinMax.max, latsMinMax.max],
    [longsMinMax.min, latsMinMax.min],
  ];
};

const minMaxMethods = (
  segments: {
    coordinates: number[][];
  }[]
) => {
  const points = segments.flatMap(segment => segment.coordinates);
  const longsMinMax = minMax(points.map(item => item[0]))
  const latsMinMax = minMax(points.map(item => item[1]))

  return [
    [longsMinMax.max, latsMinMax.max],
    [longsMinMax.min, latsMinMax.min],
  ];
};

const createSegments = (count: number) => createArr(count, () => ({ coordinates: createArr(10, () => [Math.random() * 100, Math.random() * 100]) }));

const dataSet = [10, 50, 100, 1_000, 10_000].reverse().map(item => ({ count: item.toString(), data: createSegments(item) }));

for (const { count, data } of dataSet) {
  describe(`array methods vs leseq ${count}`, () => {
    bench(
      `leseq`,
      () => {
        minMaxLeseq(data);
      },
      {
        time: 5_000,
      }
    );

    bench(
      'array methods',
      () => {
        minMaxMethods(data);
      },
      {
        time: 5_000,
      }
    );
  });
}
