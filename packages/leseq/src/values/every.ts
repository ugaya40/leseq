import { Seq, SeqToValue } from '../Seq';

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
export const every = <T>(predicate: (arg: T, index: number) => boolean): SeqToValue<T, boolean> =>
  function every(seq: Seq<T>): boolean {
    let count = 0;
    for (const i of seq) {
      if (!predicate(i, count)) {
        return false;
      }
      count++;
    }
    return true;
  };
