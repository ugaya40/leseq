import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

export const someAsync =
  <T>(predicate: (arg: T) => Promise<boolean> = () => Promise.resolve(true)): AsyncSeqToValue<T, boolean> =>
  async (seq: AsyncSeq<T>): Promise<boolean> => {
    for await (const i of seq) {
      if (await predicate(i)) {
        return true;
      }
    }
    return false;
  };
