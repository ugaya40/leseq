import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns a flattened sequence.
 *
 * ```typescript
 * const result1 = from([[1,2],[3,4]]).pipe(flatten(i => i)).toArray();
 *
 * //result1: [1,2,3,4]
 *
 * const result2 = from([
 *    {values:[1,2]},
 *    {values:[3,4]}
 *  ]).pipe(
 *    flatten(i => i.values)
 *  ).toArray();
 *
 * //result2: [1,2,3,4]
 * ```
 *
 * @param func A function that takes an element of a sequence and returns it in an Iterable form.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TResult Result element type.
 * @category Operators
 */
export const flatten = <T, TResult>(func: (arg: T, index: number) => Iterable<TResult>): Operator<T, TResult> =>
  function* flatten(source: Seq<T>): Gen<TResult> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      yield* result;
      count++;
    }
  };
