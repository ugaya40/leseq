import { Seq, SeqConverter } from '../Seq';

/**
 * Converts the current sequence to SharedSeq<T\> and returns it;
 * in a SharedSeq<T\>, `iterator` is share until `close` method is called.
 *
 * ```typescript
 * const shared = from([1, 2]).to(share());
 *
 * for(const one of shared) {
 *   console.log(one);
 *   break;
 * }
 * //console: 1
 *
 * for(const one of shared) {
 *   console.log(one);
 *   break;
 * }
 * //console: 2
 *
 * for(const one of shared) {
 *   console.log(one);
 *   break;
 * }
 * //console: no output
 *
 * shared.close();
 *
 * for(const one of shared) {
 *   console.log(one);
 * }
 * //console: 1
 * //console: 2
 *
 * ```
 *
 * :::caution
 *
 * When used with `finalize`, the behavior at break changes depending on whether `to(Shared)` is performed before or after `finalize`.
 *
 * If `finalize` is called before `to(share())` is called, `finalize` is not processed at break.
 * `finalize` is executed only when enumeration is complete or when `close` is explicitly called during enumeration.
 * (If enumeration has already been completed, `finalize` is not executed again even if `close` is called.)
 *
 * ```typescript
 *  const shared = from([1, 2]).pipe(
 *    finalize(() => console.log('finalize called.'))
 *  ).to(share());
 *
 *  for(const one of shared) {
 *    console.log(one);
 *    break;
 *  }
 *  //console: 1
 *
 *  for(const one of shared) {
 *    console.log(one);
 *    break;
 *  }
 *  //console: 2
 *  //console: finalize called.
 *
 *  share.close();
 *
 *  for(const one of shared) {
 *    console.log(one);
 *    break;
 *  }
 *  shared.close();
 *  //console: 1
 *  //console: finalize called.
 * ```
 *
 * If `to(share())` is called before `finalize` is called, `finalize` is also processed at break time.
 * ```typescript
 *  const shared = from([1, 2]).to(share());
 *  const seq = shared.pipe(
 *    finalize(() => console.log('finalize called.'))
 *  );
 *
 *  for(const one of seq) {
 *    console.log(one);
 *    break;
 *  }
 *  //console: 1
 *  //console: finalize called.
 *
 *  for(const one of seq) {
 *    console.log(one);
 *    break;
 *  }
 *  //console: 2
 *  //console: finalize called.
 *
 *  shared.close();
 *
 *  for(const one of seq) {
 *    console.log(one);
 *    break;
 *  }
 *  shared.close();
 *  //console: 1
 *  //console: finalize called.
 * ```
 * The difference in behavior is due to whether `finalize` or `to(share())` receives the notification on `for-break` first.
 *
 * Normally, the completion notification is sent to the loop target iterator at the time of `for-break`. (In reality, `iterator.return()` is called by the runtime.)
 * `finalize` iterator performs the finalize operation when it receives the completion notification or when the enumeration is complete.
 * Also, `to(share())` dares to ignore the notification at the time of `for-break`, which allows the iterator to be share by multiple loops.
 *
 * In the case of `to(share()).pipe(finalize)`, `finalize` iterator receives the notification at `for-break`.
 * `finalize` iterator executes the finalize process and forwards the received `for-break` notification to the child iterators including `to(share())`.`to(share())` iterator ignores the received `for-break` notification as usual and does not forward it to the child iterators.
 * So, although iterator is share by multiple loops, the finalize process is still executed at each `for-break`.
 *
 * In the case of `pipe(finalize).to(share())`, the notification on `for-break` is received by iterator of `to(share())`.
 * `to(share())` iterator ignores the notification on `for-break` and does not forward it to child iterators. In other words, the `for-break` notification is never forwarded to `finalize` iterator.
 * Therefore, in this case, the finalize process is not executed at `for-break` time.
 * :::
 *
 *
 * @typeParam T Source element type.
 * @returns SharedSeq<T\>
 * @category To
 */
export const share = <T>(): SeqConverter<T, SharedSeq<T>> =>
  function share(seq: Seq<T>): SharedSeq<T> {
    return new SharedSeq(seq);
  };

class SharedSeq<T> extends Seq<T> {
  #iterator: Iterator<T> | undefined;

  [Symbol.iterator](): Iterator<T> {
    if (this.#iterator == null) {
      this.#iterator = super[Symbol.iterator]();
    }
    return {
      next: (args: any) => this.#iterator!.next(args),
    };
  }

  close(): void {
    if (this.#iterator != null && this.#iterator.return != null) this.#iterator.return();
    this.#iterator = undefined;
  }
}
