import { AsyncSeq } from '../../asyncSeq';
import { AsyncDeferIterable } from '../../utils/AsyncDeferIterable';

/**
 * Generates a sequence that delays the generation of the source until the actual enumeration is performed. the source in deferValue consists of a single value.
 *
 * ```typescript
 * const result = await deferValueAsAsync(() => Math.floor(Math.random() * 100)).pipe(repeatAsync(3)).toArrayAsync();
 * //result: [72,14,91]
 * //Math.random() is executed every time.
 *
 * const result = await fromValueAsAsync(Math.floor(Math.random() * 100)).pipe(repeatAsync(3)).toArrayAsync();
 * //result: [33,33,33]
 * //Math.random() has only been executed once.
 * ```
 *
 * @param sourceFactory Function to generate a single value.
 * @returns A sequence in which the generation of sources is delayed until the actual enumeration begins.
 * @typeParam T Source element type.
 * @category Async Generators
 *
 */
export function deferValueAsAsync<T>(sourceFactory: () => T): AsyncSeq<T> {
  return new AsyncSeq(new AsyncDeferIterable(() => [sourceFactory()]));
}
