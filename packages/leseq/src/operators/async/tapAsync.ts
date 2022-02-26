import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const tapAsync = <T>(func: (arg: T, index: number) => Promise<void>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    let count = 0;
    for await (const i of source) {
      await func(i, count);
      yield i;
      count++;
    }
  };
