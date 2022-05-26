import { AsyncSeq } from '../../asyncSeq';

export const toShareAsync = <T>() =>
  function toShareAsync(seq: AsyncSeq<T>): SharedAsyncSeq<T> {
    return new SharedAsyncSeq(seq)
  };

class SharedAsyncSeq<T> extends AsyncSeq<T> {
  #asyncIterator: AsyncIterator<T> | undefined;

  [Symbol.asyncIterator](): AsyncIterator<T> {
    if(this.#asyncIterator == null)  {
      this.#asyncIterator = super[Symbol.asyncIterator]();
    }
    return {
      next: (args: any) => this.#asyncIterator!.next(args)
    };
  }

  reset(): void {
    if(this.#asyncIterator != null && this.#asyncIterator.return != null) this.#asyncIterator.return();
    this.#asyncIterator = undefined;
  }
}

