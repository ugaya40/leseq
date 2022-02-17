import { Gen, Seq } from '../seq';

export const takeWhile = <T>(predicate: (arg: T) => boolean) =>
  function* (source: Seq<T>): Gen<T> {
    for (const i of source) {
      if (predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  };
