import { AsyncSeq } from '../../asyncSeq';

/**
 * Generates a sequence from a single value.
 *
 * ```typescript
 * const result = await fromValueAsAsync(1).toArrayAsync();
 * //result: [1]
 * ```
 *
 * @param source element.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Async Generators
 */
export function fromValueAsAsync<T>(element: T): AsyncSeq<T> {
  return new AsyncSeq([element]);
}
