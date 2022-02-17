import { Gen, Seq } from '../seq';

export const dropWhile = <T>(predicate: (arg: T) => boolean) =>
  function* (source: Seq<T>): Gen<T> {
    let skipCompleted = false;
    for (const i of source) {
      if (skipCompleted) {
        yield i;
      } else if (!predicate(i)) {
        skipCompleted = true;
        yield i;
      }
    }
  };
