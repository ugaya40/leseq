import { Gen, Seq } from '../seq';

export const chunk = <T>(size: number) =>
  function* (source: Seq<T>): Gen<T[]> {
    let ch: T[] = [];
    for (const one of source) {
      ch.push(one);
      if (ch.length === size) {
        yield ch;
        ch = [];
      }
    }
    if (ch.length != 0) {
      yield ch;
    }
  };
