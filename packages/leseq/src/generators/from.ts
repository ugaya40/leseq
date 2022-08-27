import { Seq } from '../Seq';
/**
 * Generates a sequence from an iterable object.
 *
 * ```typescript
 * const result = from([1,2,3]).toArray();
 * //result: [1,2,3]
 * ```
 *
 * @param source Enumerable source.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function from<T>(source: Iterable<T>): Seq<T> {
  return new Seq(source);
}
