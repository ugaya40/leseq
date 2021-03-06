import { AsyncSeq } from '../asyncSeq';
import { Seq } from '../seq';

/**
 * @deprecated Use `Seq<T>.to(asyncSeq())` instead.
 *
 * Converts the current sequence to AsyncSeq<T\> and returns it.
 * At this point, it is only converted to an asynchronous sequence; no actual enumeration is performed.
 *
 * ```typescript
 * const result = await from([1, 2, 3, 4, 5]).value(
 *   toAsync()
 * ).valueAsync(
 *   findAsync(async i => i % 2 == 0)
 * );
 *
 * //result: 2
 * ```
 *
 * @typeParam T Source element type.
 * @returns AsyncSeq<T\>
 * @category Values
 */
export const toAsync = <T>() =>
  function toAsync(seq: Seq<T>): AsyncSeq<T> {
    return new AsyncSeq(seq);
  };
