import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

/**
 * Returns the first element that satisfies the condition. If no element satisfying the condition is found, an error is thrown.
 *
 * ```typescript
 * const result = await fromAsAsync([1,2,3,4]).valueAsync(
 *   findAsync(async i => i % 2 == 0)
 * );
 *
 * //result: 2
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns The first element that matches the condition
 * @category Async Values
 */
export const findAsync =
  <T>(predicate: (arg: T, index: number) => Promise<boolean> = () => Promise.resolve(true)): AsyncSeqToValue<T, T> =>
  async (seq: AsyncSeq<T>): Promise<T> => {
    let count = 0;
    for await (const i of seq) {
      if (await predicate(i, count)) {
        return i;
      }
      count++;
    }
    throw RangeError(`No elements matching the condition were found.`);
  };
