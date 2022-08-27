import { AsyncSeq } from '../AsyncSeq';
import { Seq, SeqConverter } from '../Seq';

/**
 * Converts the current sequence to AsyncSeq<T\> and returns it.
 * At this point, it is only converted to an asynchronous sequence; no actual enumeration is performed.
 *
 * ```typescript
 * const result = await from([1, 2, 3, 4, 5]).to(
 *   async()
 * ).valueAsync(
 *   findAsync(async i => i % 2 == 0)
 * );
 *
 * //result: 2
 * ```
 *
 * @typeParam T Source element type.
 * @returns AsyncSeq<T\>
 * @category To
 */
export const async = <T>(): SeqConverter<T, AsyncSeq<T>> =>
  function async(seq: Seq<T>): AsyncSeq<T> {
    return new AsyncSeq(seq);
  };
