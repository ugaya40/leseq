import { AsyncGen, AsyncSeq } from '../../asyncSeq';

async function* repeatAsAsyncInternal<T>(target: T, count: number): AsyncGen<T> {
  let currentCount = 0;
  while (currentCount < count) {
    yield target;
    currentCount++;
  }
}

export function repeatAsASync<T>(target: T, count: number): AsyncSeq<T> {
  return new AsyncSeq(repeatAsAsyncInternal(target, count));
}
