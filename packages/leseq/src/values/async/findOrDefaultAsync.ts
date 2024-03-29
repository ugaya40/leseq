import { AsyncSeq, AsyncSeqToValue } from '../../AsyncSeq';

/**
 * Returns the first element that satisfies the condition. If no element is found that satisfies the condition, it returns the specified default value.
 *
 * ```typescript
 * const result = await fromAsAsync([1,3,5,7]).valueAsync(
 *   findOrDefaultAsync(async i => i % 2 == 0, 9999)
 * );
 *
 * //result: 9999
 * ```
 *
 * @param predicate Condition.
 * @param defaultValue Default value.
 * @typeParam T Source element type.
 * @returns The first element that matches the condition, or the default value.
 * @category Async Values
 */
export const findOrDefaultAsync = <T>(
  predicate: (arg: T, index: number) => Promise<boolean> | boolean = () => true,
  defaultValue: T | undefined = undefined
): AsyncSeqToValue<T, T | undefined> =>
  async function findOrDefaultAsync(seq: AsyncSeq<T>): Promise<T | undefined> {
    let count = 0;
    for await (const i of seq) {
      if (await predicate(i, count)) {
        return i;
      }
      count++;
    }
    return defaultValue;
  };
