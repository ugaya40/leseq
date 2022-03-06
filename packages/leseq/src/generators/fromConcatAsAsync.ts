import { AsyncGen, AsyncSeq } from '../asyncSeq';

async function* fromConcatAsAsyncInternal<T>(args: (Iterable<T> | AsyncIterable<T>)[]): AsyncGen<T> {
  for (const one of args) {
    yield* one;
  }
}

export function fromConcatAsAsync<T>(...args: (Iterable<T> | AsyncIterable<T>)[]): AsyncSeq<T> {
  return new AsyncSeq(fromConcatAsAsyncInternal(args));
}
