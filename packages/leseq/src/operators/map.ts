import { Gen, Seq } from '../seq';

export const map = <T, TResult>(func: (arg: T, index: number) => TResult) =>
  function* (source: Seq<T>): Gen<TResult> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      yield result;
      count++;
    }
  };
