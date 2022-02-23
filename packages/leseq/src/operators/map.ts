import { Gen, Operator, Seq } from '../seq';

/**
 * Returns the sequence in which each element has been transformed by the specified transformation function.
 *
 * ```typescript
 * const result = from([1, 2, 3, 4, 5]).pipe(map(i => i * i)).toArray();
 * //result: [1,4,9,16,25]
 * ```
 *
 * @param func Transform function.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TResult Transformed element type.
 * @category Operators
 */
export const map = <T, TResult>(func: (arg: T, index: number) => TResult): Operator<T, TResult> =>
  function* (source: Seq<T>): Gen<TResult> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      yield result;
      count++;
    }
  };
