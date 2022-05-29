import { AsyncSeq, AsyncSeqConverter } from '../../asyncSeq';

/**
 * Converts the current sequence to SharedAsyncSeq<T\> and returns it;
 * in a SharedAsyncSeq<T\>, `async iterator` is shared until `close` method is called.
 *
 * ```typescript
 * const shared = fromAsAsync([1, 2]).to(sharedAsyncSeq());
 *
 * for await (const one of shared) {
 *   console.log(one);
 *   break;
 * }
 * //console: 1
 *
 * for await (const one of shared) {
 *   console.log(one);
 *   break;
 * }
 * //console: 2
 *
 * for await (const one of shared) {
 *   console.log(one);
 *   break;
 * }
 * //console: no output
 *
 * shared.close();
 *
 * for await (const one of shared) {
 *   console.log(one);
 * }
 * //console: 1
 * //console: 2
 *
 * ```
 *
 * :::caution
 * Care should be taken when using with [finalizeAsync](/api/operators/#finalizeasync). See [sharedseq](/api/to/#sharedseq) for details.
 * :::
 *
 *
 * @typeParam T Source element type.
 * @returns SharedAsyncSeq<T\>
 * @category Async To
 */
export const sharedAsyncSeq = <T>(): AsyncSeqConverter<T, SharedAsyncSeq<T>> =>
  function sharedAsyncSeq(seq: AsyncSeq<T>): SharedAsyncSeq<T> {
    return new SharedAsyncSeq(seq);
  };

class SharedAsyncSeq<T> extends AsyncSeq<T> {
  #asyncIterator: AsyncIterator<T> | undefined;

  [Symbol.asyncIterator](): AsyncIterator<T> {
    if (this.#asyncIterator == null) {
      this.#asyncIterator = super[Symbol.asyncIterator]();
    }
    return {
      next: (args: any) => this.#asyncIterator!.next(args),
    };
  }

  close(): void {
    if (this.#asyncIterator != null && this.#asyncIterator.return != null) this.#asyncIterator.return();
    this.#asyncIterator = undefined;
  }
}
