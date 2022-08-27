import { Seq } from '../seq';
import { DeferIterable } from '../utils/DeferIterable';

/**
 * Generates a sequence that delays the generation of the source until the actual enumeration is performed. the source in deferValue consists of a single value.
 *
 * ```typescript
 * const result1 = deferValue(() => Math.floor(Math.random() * 100)).pipe(repeat(3)).toArray();
 * //result1: [72,14,91]
 * //Math.random() is executed every time.
 *
 * const result2 = from(Math.floor(Math.random() * 100)).pipe(repeat(3)).toArray();
 * //result2: [33,33,33]
 * //Math.random() has only been executed once.
 * ```
 *
 * @param sourceFactory Function to generate a single value.
 * @returns A sequence in which the generation of sources is delayed until the actual enumeration begins.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function deferValue<T>(sourceFactory: () => T): Seq<T> {
  return new Seq(new DeferIterable(() => [sourceFactory()]));
}
