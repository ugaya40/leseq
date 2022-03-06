import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const takeWhileAsync = <T>(predicate: (arg: T) => Promise<boolean>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    for await (const i of source) {
      if (await predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  };
