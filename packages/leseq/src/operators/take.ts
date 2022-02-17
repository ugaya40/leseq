import { Gen, Seq } from '../seq';

export const take = <T>(count: number) =>
  function* (source: Seq<T>): Gen<T> {
    if (count <= 0) return;
    let current = 0;
    for (const i of source) {
      yield i;
      current++;
      if (current == count) return;
    }
  };
