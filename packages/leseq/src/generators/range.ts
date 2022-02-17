import { Seq, Gen } from '../seq';

function* rangeInternal(start: number, count: number): Gen<number> {
  let currentCount = 0;
  while (currentCount < count) {
    yield start++;
    currentCount++;
  }
}

export function range(start: number, count: number): Seq<number> {
  return new Seq(rangeInternal(start, count));
}
