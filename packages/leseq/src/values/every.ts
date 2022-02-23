import { Seq, SeqToValue } from '../seq';

/**
 * Returns whether or not all elements of a sequence meet the specified conditions.
 *
 * ```typescript
 * const result1 = from([2,4,6]).value(every(i => i % 2 == 0));
 * //result1: true
 *
 * const result2 = from([2,4,6,7]).value(every(i => i % 2 == 0));
 * //result2: false
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns
 * @category Values
 */
export const every =
  <T>(predicate: (arg: T) => boolean): SeqToValue<T, boolean> =>
  (seq: Seq<T>): boolean => {
    for (const i of seq) {
      if (!predicate(i)) {
        return false;
      }
    }
    return true;
  };
