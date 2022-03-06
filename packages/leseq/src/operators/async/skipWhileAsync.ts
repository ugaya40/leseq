import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const skipWhileAsync = <T>(predicate: (arg: T) => Promise<boolean>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    let skipCompleted = false;
    for await (const i of source) {
      if (skipCompleted) {
        yield i;
      } else if (!(await predicate(i))) {
        skipCompleted = true;
        yield i;
      }
    }
  };
