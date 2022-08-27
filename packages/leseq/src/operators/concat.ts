import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns a sequence in which the current sequence and the specified sequence are concatenated.
 *
 * ```typescript
 * const result = from([1, 2]).pipe(concat([3,4])).toArray();
 * //result: [1,2,3,4]
 * ```
 *
 * @param target Sequence to be concatenated.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const concat = <T>(target: Iterable<T>): Operator<T> =>
  function* concat(source: Seq<T>): Gen<T> {
    yield* source;
    yield* target;
  };
