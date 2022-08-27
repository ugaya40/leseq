import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Returns a sequence to be enumerated only while the condition is matched.
 *
 * ```typescript
 * const result = await rangeAsAsync(1,10).pipe(
 *   takeWhileAsync(async i => i < 5)
 * ).toArrayAsync()
 *
 * //result: [1,2,3,4]
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Async Operators
 */
export const takeWhileAsync = <T>(predicate: (arg: T) => Promise<boolean>): AsyncOperator<T> =>
  async function* takeWhileAsync(source: AsyncSeq<T>): AsyncGen<T> {
    for await (const i of source) {
      if (await predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  };
