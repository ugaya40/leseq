import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const skipAsync = <T>(count: number): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    let current = 0;
    for await (const i of source) {
      if (current >= count) {
        yield i;
      }
      current++;
    }
  };
