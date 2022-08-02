import { isAsyncIterable, Iterables, toAsyncIterator } from '../asyncSeq';

const doneResult = { value: undefined, done: true };

const returnOneResult = <T>(value: T) => ({ value, done: false });

const returnDoneAllAsync = async (iterators: AsyncIterator<unknown>[]) => {
  const promises: Promise<unknown>[] = [];
  iterators.forEach(iterator => {
    if (iterator.return != null) promises.push(iterator.return());
  });
  await Promise.all(promises);
  return doneResult;
};

export class AsyncZipIterable implements AsyncIterable<unknown> {
  constructor(private sources: Iterables<unknown>[]) {}

  [Symbol.asyncIterator]() {
    const iterators = this.sources.map(source => {
      if (isAsyncIterable(source)) {
        return source[Symbol.asyncIterator]();
      } else {
        return toAsyncIterator(source[Symbol.iterator]());
      }
    });

    return {
      next: async () => {
        if (iterators.length == 0) return doneResult;

        const results = await Promise.all(iterators.map(i => i.next()));

        if (results.find(r => r.done) != null) {
          return returnDoneAllAsync(iterators);
        } else {
          return returnOneResult(results.map(r => r.value));
        }
      },
      return: () => {
        return returnDoneAllAsync(iterators);
      },
    };
  }
}
