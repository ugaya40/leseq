import { Gen, Operator, Seq } from '../seq';

/**
 * Returns the sequence in which each element has been transformed by the specified transformation function.
 * However, null or undefined elements are excluded from the sequence.
 *
 * ```typescript
 * const result = from([1, 2, null, 4, undefined]).pipe(mapNotNull(i => i?.toString())).toArray();
 * //result: ["1", "2", "4"]
 * ```
 *
 * @param func Transform function.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TResult Transformed element type.
 * @category Operators
 */
export const mapNotNull = <T, TResult>(func: (arg: T, index: number) => TResult): Operator<T, NonNullable<TResult>> =>
  function* mapNotNull(source: Seq<T>): Gen<NonNullable<TResult>> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      if (result !== null && result !== undefined) {
        yield result!!;
      }

      count++;
    }
  };
