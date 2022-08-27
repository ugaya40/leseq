import { isAsyncIterable, AllIterables, toAsyncIterator } from '../AsyncSeq';
import { lazy } from './lazy';

export class AsyncDeferIterable<T> implements AsyncIterable<T> {
  constructor(private sourceFactory: () => AllIterables<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
    const source = lazy(this.sourceFactory);
    const sourceIterator = lazy(() =>
      isAsyncIterable(source.value) ? source.value[Symbol.asyncIterator]() : toAsyncIterator(source.value[Symbol.iterator]())
    );
    return {
      next: async (arg?: any) => await sourceIterator.value.next(arg),
      return:
        sourceIterator.value.return != null ? async (value?: any) => await sourceIterator.value.return!(value) : async (value?: any) => ({ value, done: true }),
    };
  }
}
