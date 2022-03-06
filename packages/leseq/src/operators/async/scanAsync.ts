import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const scanAsync = <T, TAccumulate>(
  seed: TAccumulate,
  func: (previous: TAccumulate, current: T, index: number) => Promise<TAccumulate>
): AsyncOperator<T, TAccumulate> =>
  async function* (source: AsyncSeq<T>): AsyncGen<TAccumulate> {
    let count = 0;
    let nextAccumulate = seed;
    for await (const i of source) {
      nextAccumulate = await func(nextAccumulate, i, count);
      yield nextAccumulate;
      count++;
    }
  };
