import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const takeAsync = <T>(count: number): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    if (count <= 0) return;
    let current = 0;
    for await (const i of source) {
      yield i;
      current++;
      if (current == count) return;
    }
  };
