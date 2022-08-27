import { Gen, Seq } from '../Seq';

function* fromConcatInternal<T>(args: Iterable<T>[]): Gen<T> {
  for (const one of args) {
    yield* one;
  }
}

/**
 * Generates a concatenated sequence of multiple iterable objects.
 *
 * ```typescript
 * const result = fromConcat([1,2],[3,4,5]).toArray();
 * //result: [1,2,3,4,5]
 * ```
 *
 * @param args Enumerable sources.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function fromConcat<T>(...args: Iterable<T>[]): Seq<T> {
  return new Seq(fromConcatInternal(args));
}
