import { AsyncSeq, AsyncSeqToValue } from '../../AsyncSeq';

/**
 * Returns whether or not any element of the sequence satisfies the specified condition.
 *
 * ```typescript
 * const result1 = await fromAsync([1,3,5,6,7]).valueAsync(
 *   someAsync(async i => i % 2 == 0)
 * );
 * //result1: true
 *
 * const result2 = await fromAsync([1,3,5,7]).valueAsync(
 *   someAsync(async i => i % 2 == 0)
 * );
 * //result2: false
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns
 * @category Async Values
 */
export const someAsync = <T>(predicate: (arg: T, index: number) => Promise<boolean> | boolean = () => true): AsyncSeqToValue<T, boolean> =>
  async function someAsync(seq: AsyncSeq<T>): Promise<boolean> {
    let count = 0;
    for await (const i of seq) {
      if (await predicate(i, count)) {
        return true;
      }
      count++;
    }
    return false;
  };
