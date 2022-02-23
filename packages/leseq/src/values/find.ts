import { Seq, SeqToValue } from '../seq';

/**
 * Returns the first element that satisfies the condition. If no element satisfying the condition is found, an error is thrown.
 *
 * ```typescript
 * const result = from([1,2,3,4]).value(find(i => i % 2 == 0));
 *
 * //result: 2
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns The first element that matches the condition
 * @category Values
 */
export const find =
  <T>(predicate: (arg: T, index: number) => boolean = () => true): SeqToValue<T, T> =>
  (seq: Seq<T>): T => {
    let count = 0;
    for (const i of seq) {
      if (predicate(i, count)) {
        return i;
      }
      count++;
    }
    throw RangeError(`No elements matching the condition were found.`);
  };
