import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const reverseAsync = <T>(): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    const sourceArray = await source.toArrayAsync();
    const length = sourceArray.length;
    for (let i = 0; i < length; i++) {
      yield sourceArray[length - i - 1];
    }
  };
