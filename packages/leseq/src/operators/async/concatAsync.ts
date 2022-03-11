import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Returns a sequence in which the current sequence and the specified sequence are concatenated.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2]).pipe(
 *   concat([3,4])
 * ).toArrayAsync();
 * //result: [1,2,3,4]
 * ```
 *
 * @param target Sequence to be concatenated.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export const concatAsync = <T>(target: AsyncIterable<T> | Iterable<T>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    yield* source;
    yield* target;
  };
