import { Gen, Operator, Seq } from '../seq';

/**
 * Returns a sequence that repeats the source sequence a specified number of times.
 *
 * ```typescript
 * const result = from([1, 2, 3]).pipe(repeat(3)).toArray();
 * //result: [1,2,3,1,2,3,1,2,3]
 * ```
 *
 * @param count If this argument is not specified or -1 is specified, it repeats indefinitely. If a natural number is specified, it repeats the specified number of times.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const repeat = <T>(count: number = -1): Operator<T, T> =>
  function* repeat(source: Seq<T>): Gen<T> {
    if (count == -1) {
      while (true) {
        yield* source;
      }
    } else {
      for (let i = 0; i < count; i++) {
        yield* source;
      }
    }
  };
