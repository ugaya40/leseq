import { Gen, Seq } from '../seq';

export const skip = <T>(count: number) =>
  function* (source: Seq<T>): Gen<T> {
    let current = 0;
    for (const i of source) {
      if (current >= count) {
        yield i;
      }
      current++;
    }
  };
