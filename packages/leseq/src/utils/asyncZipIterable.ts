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

        /*
        Ideally zip should immediately terminate next() of the other iterators if any one of the multiple iterators is done. 
        Also, if it terminates next(), return() should be called immediately for finalize. 
        However, the iterator created using the generator function manages operations on the iterator with a queue, 
        so even if an iterator is prepared that makes it possible to ignore the result of next() and cancel next(), 
        it will eventually wait for next() to finish when return() is called. In other words, 
        if the generator function is used together, other next() cannot be canceled after all.

        It is possible to define an iterable for each operator without using a generator function, 
        but this is against the policy of leseq, so it is not adopted.
        */
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
