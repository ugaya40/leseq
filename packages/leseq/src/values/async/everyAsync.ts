import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

export const everyAsync =
  <T>(predicate: (arg: T) => Promise<boolean>): AsyncSeqToValue<T, boolean> =>
  async (seq: AsyncSeq<T>): Promise<boolean> => {
    for await (const i of seq) {
      if (!(await predicate(i))) {
        return false;
      }
    }
    return true;
  };
