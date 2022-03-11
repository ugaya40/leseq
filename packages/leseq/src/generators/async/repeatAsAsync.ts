import { AsyncGen, AsyncSeq } from '../../asyncSeq';

async function* repeatAsAsyncInternal<T>(target: T, count: number): AsyncGen<T> {
  let currentCount = 0;
  while (currentCount < count) {
    yield target;
    currentCount++;
  }
}

/**
 * Generates a sequence in which the specified value is repeated a specified number of times.
 *
 * ```typescript
 * const result = await repeatAsASync(5,3).toArrayAsync();
 * //result: [5,5,5]
 * ```
 *
 * @param target Repeating Element.
 * @param count Number of pieces to be generated.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Async Generators
 *
 */
export function repeatAsASync<T>(target: T, count: number): AsyncSeq<T> {
  return new AsyncSeq(repeatAsAsyncInternal(target, count));
}
