import { AsyncGen, AsyncSeq } from '../../asyncSeq';

async function* rangeAsAsyncInternal(start: number, count: number): AsyncGen<number> {
  let currentCount = 0;
  while (currentCount < count) {
    yield start++;
    currentCount++;
  }
}

export function rangeAsAsync(start: number, count: number): AsyncSeq<number> {
  return new AsyncSeq(rangeAsAsyncInternal(start, count));
}
