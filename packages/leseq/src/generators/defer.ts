import { Seq } from '../Seq';
import { DeferIterable } from '../utils/DeferIterable';

/**
 * Generates a sequence that delays the generation of sources until the actual enumeration is performed.
 *
 * ```typescript
 * const result1 = defer(() => [Math.floor(Math.random() * 100)]).pipe(repeat(3)).toArray();
 * //result1: [72,14,91]
 * //Math.random() is executed every time.
 *
 * const result2 = from([Math.floor(Math.random() * 100)]).pipe(repeat(3)).toArray();
 * //result2: [33,33,33]
 * //Math.random() has only been executed once.
 * ```
 *
 * @param sourceFactory Function to generate source.
 * @returns A sequence in which the generation of sources is delayed until the actual enumeration begins.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function defer<T>(sourceFactory: () => Iterable<T>): Seq<T> {
  return new Seq(new DeferIterable(sourceFactory));
}
