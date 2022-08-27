import { AsyncSeq, AsyncSeqToValue } from '../../AsyncSeq';

/**
 * Returns whether or not all elements of a sequence meet the specified conditions.
 *
 * ```typescript
 * const result1 = await fromAsAsync([2,4,6]).valueAsync(
 *   everyAsync(async i => i % 2 == 0)
 * );
 * //result1: true
 *
 * const result2 = await fromAsAsync([2,4,6,7]).valueAsync(
 *   everyAsync(async i => i % 2 == 0)
 * );
 * //result2: false
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns
 * @category Async Values
 */
export const everyAsync = <T>(predicate: (arg: T) => Promise<boolean>): AsyncSeqToValue<T, boolean> =>
  async function everyAsync(seq: AsyncSeq<T>): Promise<boolean> {
    for await (const i of seq) {
      if (!(await predicate(i))) {
        return false;
      }
    }
    return true;
  };
