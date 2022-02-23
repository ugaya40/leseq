import { Gen, Seq } from '../seq';

function* repeatInternal<T>(target: T, count: number): Gen<T> {
  let currentCount = 0;
  while (currentCount < count) {
    yield target;
    currentCount++;
  }
}

/**
 * Generates a sequence in which the specified value is repeated a specified number of times.
 *
 * ```typescript
 * const result = repeat(5,3).toArray();
 * //result: [5,5,5]
 * ```
 *
 * @param target Repeating Element.
 * @param count Number of pieces to be generated.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function repeat<T>(target: T, count: number): Seq<T> {
  return new Seq(repeatInternal(target, count));
}
