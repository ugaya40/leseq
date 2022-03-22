import { Gen, Operator, Seq } from '../seq';

/**
 * Returns a sequence divided into array of the specified size.
 *
 * ```typescript
 * const result = from([1, 2, 3, 4, 5, 6, 7]).pipe(chunk(2)).toArray();
 * //result: [[1,2],[3,4],[5,6],[7]]
 * ```
 *
 * @param size Length of elements per array.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const chunk = <T>(size: number): Operator<T, readonly T[]> =>
  function* chunk(source: Seq<T>): Gen<readonly T[]> {
    let ch: T[] = [];
    for (const one of source) {
      ch.push(one);
      if (ch.length === size) {
        yield ch;
        ch = [];
      }
    }
    if (ch.length != 0) {
      yield ch;
    }
  };
