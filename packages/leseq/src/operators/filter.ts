import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns a sequence that has been filtered by the specified condition.
 *
 * ```typescript
 * const result = from([1, 2, 3, 4, 5]).pipe(filter(i => i % 2 == 0)).toArray();
 * //result: [2,4]
 * ```
 *
 * @param predicate Conditional functions for filtering.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const filter = <T>(predicate: (arg: T, index: number) => boolean): Operator<T> =>
  function* filter(source: Seq<T>): Gen<T> {
    let count = 0;
    for (const i of source) {
      if (predicate(i, count)) {
        yield i;
      }
      count++;
    }
  };
