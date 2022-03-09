import { AsyncSeq } from '../../asyncSeq';

export function fromAsAsync<T>(source: Iterable<T> | AsyncIterable<T>): AsyncSeq<T> {
  return new AsyncSeq(source);
}
