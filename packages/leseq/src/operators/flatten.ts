import { Gen, Seq } from '../seq';

export const flatten = <T, TResult>(func: (arg: T, index: number) => Iterable<TResult>) =>
  function* (source: Seq<T>): Gen<TResult> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      yield* result;
      count++;
    }
  };
