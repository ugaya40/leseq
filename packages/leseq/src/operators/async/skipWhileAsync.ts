import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Returns the sequence of elements skipped while matching the condition.
 *
 * ```typescript
 * const result = await rangeAsAsync(1,10).pipe(
 *   skipWhileAsync(async i => i < 8)
 * ).toArrayAsync()
 *
 * //result: [8,9,10]
 * ```
 *
 * @param predicate Condition to skip enumeration.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Async Operators
 */
export const skipWhileAsync = <T>(predicate: (arg: T) => Promise<boolean>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    let skipCompleted = false;
    for await (const i of source) {
      if (skipCompleted) {
        yield i;
      } else if (!(await predicate(i))) {
        skipCompleted = true;
        yield i;
      }
    }
  };
