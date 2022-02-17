import { Gen, Seq } from '../seq';

export const tap = <T>(func: (arg: T, index: number) => void) =>
  function* (source: Seq<T>): Gen<T> {
    let count = 0;
    for (const i of source) {
      func(i, count);
      yield i;
      count++;
    }
  };
