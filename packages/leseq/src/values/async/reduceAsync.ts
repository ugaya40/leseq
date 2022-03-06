import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

export const reduceAsync =
  <T, TAccumulate>(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => Promise<TAccumulate>): AsyncSeqToValue<T, TAccumulate> =>
  async (seq: AsyncSeq<T>): Promise<TAccumulate> => {
    let count = 0;
    let nextAccumulate = seed;
    for await (const i of seq) {
      nextAccumulate = await func(nextAccumulate, i, count);
      count++;
    }
    return nextAccumulate;
  };
