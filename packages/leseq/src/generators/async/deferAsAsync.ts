import { AsyncSeq, AllIterables } from '../../AsyncSeq';
import { AsyncDeferIterable } from '../../utils/AsyncDeferIterable';

/**
 * Generates a sequence that delays the generation of sources until the actual enumeration is performed.
 *
 * ```typescript
 * const result1 = await deferAsAsync(() => [Math.floor(Math.random() * 100)]).pipe(repeatAsync(3)).toArrayAsync();
 * //result1: [72,14,91]
 * //Math.random() is executed every time.
 *
 * const result2 = await fromAsAsync([Math.floor(Math.random() * 100)]).pipe(repeatAsync(3)).toArrayAsync();
 * //result2: [33,33,33]
 * //Math.random() has only been executed once.
 * ```
 *
 * @param sourceFactory Function to generate source.
 * @returns A sequence in which the generation of sources is delayed until the actual enumeration begins.
 * @typeParam T Source element type.
 * @category Async Generators
 *
 */
export function deferAsAsync<T>(sourceFactory: () => AllIterables<T>): AsyncSeq<T> {
  return new AsyncSeq(new AsyncDeferIterable(sourceFactory));
}
