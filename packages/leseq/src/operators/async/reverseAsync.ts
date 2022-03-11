import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Returns a sequence in reverse order of the current sequence.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   reverseAsync()
 * ).toArrayAsync();
 * //result: [5,4,3,2,1]
 * ```
 *
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export const reverseAsync = <T>(): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    const sourceArray = await source.toArrayAsync();
    const length = sourceArray.length;
    for (let i = 0; i < length; i++) {
      yield sourceArray[length - i - 1];
    }
  };
