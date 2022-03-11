import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Returns the sequence in which each element has been transformed by the specified transformation function.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   mapAsync(async i => i * i)
 * ).toArrayAsync();
 * //result: [1,4,9,16,25]
 * ```
 *
 * @param func Transform function.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TResult Transformed element type.
 * @category Async Operators
 */
export const mapAsync = <T, TResult>(func: (arg: T, index: number) => Promise<TResult>): AsyncOperator<T, TResult> =>
  async function* (source: AsyncSeq<T>): AsyncGen<TResult> {
    let count = 0;
    for await (const i of source) {
      const result = await func(i, count);
      yield result;
      count++;
    }
  };
