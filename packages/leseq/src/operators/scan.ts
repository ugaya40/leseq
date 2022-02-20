import { Gen, Seq } from '../seq';

export const scan = <T, TAccumulate>(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => TAccumulate) =>
  function* (seq: Seq<T>): Gen<TAccumulate> {
    let count = 0;
    let nextAccumulate = seed;
    for (const i of seq) {
      nextAccumulate = func(nextAccumulate, i, count);
      yield nextAccumulate;
      count++;
    }
  };
