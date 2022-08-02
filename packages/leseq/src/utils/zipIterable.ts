const doneResult = { value: undefined, done: true };

const returnOneResult = <T>(value: T) => ({ value, done: false });

const returnDoneAll = (iterators: Iterator<unknown>[]) => {
  iterators.forEach(iterator => {
    if (iterator.return != null) iterator.return();
  });
  return doneResult;
};

export class ZipIterable implements Iterable<unknown> {
  constructor(private sources: Iterable<unknown>[]) {}

  [Symbol.iterator](): Iterator<unknown, any, undefined> {
    const iterators = this.sources.map(source => source[Symbol.iterator]());

    return {
      next: () => {
        if (iterators.length == 0) return doneResult;

        const results = Array<unknown>(iterators.length);
        for (let i = 0; i < iterators.length; i++) {
          const iteratorResult = iterators[i].next();
          if (!iteratorResult.done) {
            results[i] = iteratorResult.value;
          } else {
            return returnDoneAll(iterators);
          }
        }
        return returnOneResult(results);
      },
      return: () => {
        return returnDoneAll(iterators);
      },
    };
  }
}
