import { Seq } from '../Seq';

/**
 * Returns whether or not any element of the sequence satisfies the specified condition.
 *
 * ```typescript
 * const result1 = from([1,3,5,6,7]).value(some(i => i % 2 == 0));
 * //result1: true
 *
 * const result2 = from([1,3,5,7]).value(some(i => i % 2 == 0));
 * //result2: false
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns
 * @category Values
 */
export const some = <T>(predicate: (arg: T, index: number) => boolean = () => true) =>
  function some(seq: Seq<T>): boolean {
    let count = 0;
    for (const i of seq) {
      if (predicate(i, count)) {
        return true;
      }
      count++;
    }
    return false;
  };
