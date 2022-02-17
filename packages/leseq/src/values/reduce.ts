import { Seq } from '../seq';

export const reduce =
  <T, TAccumulate>(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => TAccumulate) =>
  (seq: Seq<T>): TAccumulate => {
    let count = 0;
    let nextAccumulate = seed;
    for (const i of seq) {
      nextAccumulate = func(nextAccumulate, i, count);
      count++;
    }
    return nextAccumulate;
  };
