import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const filterAsync = <T>(predicate: (arg: T, index: number) => Promise<boolean>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    let count = 0;
    for await (const i of source) {
      if (await predicate(i, count)) {
        yield i;
      }
      count++;
    }
  };
