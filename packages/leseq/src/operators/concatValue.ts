import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns the sequence to which the specified value is added.
 *
 * ```typescript
 * const result = from([1, 2]).pipe(concatValue(3)).toArray();
 * //result: [1,2,3]
 * ```
 *
 * @param target Element you want to add to the sequence.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const concatValue = <T>(target: T): Operator<T> =>
  function* concatValue(source: Seq<T>): Gen<T> {
    yield* source;
    yield target;
  };
