import { Seq } from '../Seq';

/**
 * Generates a sequence from a single value.
 *
 * ```typescript
 * const result = fromValue(1).toArray();
 * //result: [1]
 * ```
 *
 * @param source element.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function fromValue<T>(element: T): Seq<T> {
  return new Seq([element]);
}
