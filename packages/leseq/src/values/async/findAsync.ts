import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

export const findAsync =
  <T>(predicate: (arg: T, index: number) => Promise<boolean> = () => Promise.resolve(true)): AsyncSeqToValue<T, T> =>
  async (seq: AsyncSeq<T>): Promise<T> => {
    let count = 0;
    for await (const i of seq) {
      if (await predicate(i, count)) {
        return i;
      }
      count++;
    }
    throw RangeError(`No elements matching the condition were found.`);
  };
