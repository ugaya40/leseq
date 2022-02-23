import { Gen, Operator, Seq } from '../seq';

/**
 * Returns the sequence of elements skipped while matching the condition.
 * 
 * ```typescript
 * const result = range(1,10).pipe(
 *   skipWhile(i => i < 8)
 * ).toArray()
 * 
 * //result: [8,9,10]
 * ```
 * 
 * @param predicate Condition to skip enumeration.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Operators
 */
export const skipWhile = <T>(predicate: (arg: T) => boolean): Operator<T> =>
  function* (source: Seq<T>): Gen<T> {
    let skipCompleted = false;
    for (const i of source) {
      if (skipCompleted) {
        yield i;
      } else if (!predicate(i)) {
        skipCompleted = true;
        yield i;
      }
    }
  };
