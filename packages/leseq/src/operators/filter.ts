import { Gen, Seq } from '../seq';

export const filter = <T>(predicate: (arg: T, index: number) => boolean) =>
  function* (source: Seq<T>): Gen<T> {
    let count = 0;
    for (const i of source) {
      if (predicate(i, count)) {
        yield i;
      }
      count++;
    }
  };
