import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

export const findOrDefaultAsync =
  <T>(
    predicate: (arg: T, index: number) => Promise<boolean> = () => Promise.resolve(true),
    defaultValue: T | undefined = undefined
  ): AsyncSeqToValue<T, T | undefined> =>
  async (seq: AsyncSeq<T>): Promise<T | undefined> => {
    let count = 0;
    for await (const i of seq) {
      if (await predicate(i, count)) {
        return i;
      }
      count++;
    }
    return defaultValue;
  };
