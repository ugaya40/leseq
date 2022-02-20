import { Gen, Seq } from '../seq';

function* repeatInternal<T>(target: T, count: number): Gen<T> {
  let currentCount = 0;
  while (currentCount < count) {
    yield target;
    currentCount++;
  }
}

export function repeat<T>(target: T, count: number): Seq<T> {
  return new Seq(repeatInternal(target, count));
}
