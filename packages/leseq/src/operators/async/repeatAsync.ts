import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Returns a sequence that repeats the source sequence a specified number of times.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3]).pipe(repeatAsync(3)).toArrayAsync();
 * //result: [1,2,3,1,2,3,1,2,3]
 * ```
 *
 * @param count If this argument is not specified or -1 is specified, it repeats indefinitely. If a natural number is specified, it repeats the specified number of times.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export const repeatAsync = <T>(count: number = -1): AsyncOperator<T, T> =>
  async function* repeatAsync(source: AsyncSeq<T>): AsyncGen<T> {
    if (count == -1) {
      while (true) {
        yield* source;
      }
    } else {
      for (let i = 0; i < count; i++) {
        yield* source;
      }
    }
  };
