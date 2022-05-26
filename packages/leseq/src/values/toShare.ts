import { Seq } from '../seq';

export const toShare = <T>() =>
  function toShare(seq: Seq<T>): SharedSeq<T> {
    return new SharedSeq(seq);
  };

class SharedSeq<T> extends Seq<T> {
  #iterator: Iterator<T> | undefined;

  [Symbol.iterator](): Iterator<T> {
    if(this.#iterator == null) {
      this.#iterator = super[Symbol.iterator]();
    }
    return {
      next: (args: any) => this.#iterator!.next(args)
    };
  }

  reset(): void {
    if(this.#iterator != null && this.#iterator.return != null) this.#iterator.return();
    this.#iterator = undefined;
  }
}
