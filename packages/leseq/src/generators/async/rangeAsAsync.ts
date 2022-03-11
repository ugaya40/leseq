import { AsyncGen, AsyncSeq } from '../../asyncSeq';

async function* rangeAsAsyncInternal(start: number, count: number): AsyncGen<number> {
  let currentCount = 0;
  while (currentCount < count) {
    yield start++;
    currentCount++;
  }
}

/**
 * Generates a sequential number sequence.
 *
 * ```typescript
 * const result = await rangeAsAsync(5,10).toArrayAsync();
 * //result: [5,6,7,8,9,10,11,12,13,14]
 * ```
 *
 * @param start Starting number of sequential numbers.
 * @param count Number of pieces to be generated.
 * @returns Sequence.
 * @category Async Generators
 *
 */
export function rangeAsAsync(start: number, count: number): AsyncSeq<number> {
  return new AsyncSeq(rangeAsAsyncInternal(start, count));
}
