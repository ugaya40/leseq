import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Run side effects. The returning sequence is the same as the current one.
 *
 * ```typescript
 * const result = fromAsAsync([1,2,3]).pipe(
 *   tapAsync(async i => console.log(i * i))
 * ).toArrayAsync();
 *
 * //result: [1,2,3]
 *
 * //console:
 * // 1
 * // 4
 * // 9
 * ```
 *
 * @typeParam T Source element type.
 * @param func Side effects to perform
 * @returns Operator function.
 * @category Async Operators
 */
export const tapAsync = <T>(func: (arg: T, index: number) => Promise<void>): AsyncOperator<T> =>
  async function* tapAsync(source: AsyncSeq<T>): AsyncGen<T> {
    let count = 0;
    for await (const i of source) {
      await func(i, count);
      yield i;
      count++;
    }
  };
