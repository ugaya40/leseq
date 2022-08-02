import { AsyncSeq, Iterables } from '../../asyncSeq';
/**
 * Generates a sequence from an iterable/async iterable object.
 *
 * ```typescript
 * const result = await fromAsAsync([1,2,3]).toArrayAsync();
 * //result: [1,2,3]
 * ```
 *
 * @param source Enumerable source.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Async Generators
 */
export function fromAsAsync<T>(source: Iterables<T>): AsyncSeq<T> {
  return new AsyncSeq(source);
}
