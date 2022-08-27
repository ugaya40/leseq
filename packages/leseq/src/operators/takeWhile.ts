import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns a sequence to be enumerated only while the condition is matched.
 *
 * ```typescript
 * const result = range(1,10).pipe(
 *   takeWhile(i => i < 5)
 * ).toArray()
 *
 * //result: [1,2,3,4]
 * ```
 *
 * @param predicate Condition.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Operators
 */
export const takeWhile = <T>(predicate: (arg: T) => boolean): Operator<T> =>
  function* takeWhile(source: Seq<T>): Gen<T> {
    for (const i of source) {
      if (predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  };
