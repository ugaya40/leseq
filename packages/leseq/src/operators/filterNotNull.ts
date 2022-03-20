import { Gen, Operator, Seq } from '../seq';

/**
 * Returns a sequence that excludes null and undefined from the current sequence.
 *
 * ```typescript
 * const result = from([1, 2, null, undefined, 5]).pipe(filterNotNull()).toArray();
 * //result: [1,2,5]
 * ```
 *
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const filterNotNull = <T>(): Operator<T, NonNullable<T>> =>
  function* filterNotNull(source: Seq<T>): Gen<NonNullable<T>> {
    for (const i of source) {
      if (i !== null && i !== undefined) {
        yield i!!;
      }
    }
  };
