import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Returns the sequence to which the specified value is added.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2]).pipe(
 *   concatValueAsync(3)
 * ).toArrayAsync();
 * //result: [1,2,3]
 * ```
 *
 * @param target Element you want to add to the sequence.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export const concatValueAsync = <T>(target: T): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    yield* source;
    yield target;
  };
