import { lazy } from './lazy';

export class DeferIterable<T> implements Iterable<T> {
  constructor(private sourceFactory: () => Iterable<T>) {}

  [Symbol.iterator](): Iterator<T, any, undefined> {
    const source = lazy(this.sourceFactory);
    const sourceIterator = lazy(() => source.value[Symbol.iterator]());
    return {
      next: (arg?: any) => sourceIterator.value.next(arg),
      return: sourceIterator.value.return != null ? (value?: any) => sourceIterator.value.return!(value) : (value?: any) => ({ value, done: true }),
    };
  }
}
