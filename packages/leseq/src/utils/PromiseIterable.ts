import { isAsyncIterable, AllIterables, toAsyncIterator } from '../AsyncSeq';

export class PromiseIterable<T> implements AsyncIterable<T> {
  constructor(private sources: AllIterables<Promise<T>>) {}

  [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
    const iterator = isAsyncIterable(this.sources) ? this.sources[Symbol.asyncIterator]() : toAsyncIterator(this.sources[Symbol.iterator]());

    return {
      next: async (arg?: any) => {
        const nextPromise = await iterator.next(arg);
        if (nextPromise.done) {
          return nextPromise;
        } else {
          const value = await nextPromise.value;
          return {
            value,
            done: false,
          };
        }
      },
      return: async (value?: any) => {
        if (iterator.return != null) await iterator.return!(value);
        return {
          value,
          done: true,
        };
      },
    };
  }
}
