import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const mapAsync = <T, TResult>(func: (arg: T, index: number) => Promise<TResult>): AsyncOperator<T, TResult> =>
  async function* (source: AsyncSeq<T>): AsyncGen<TResult> {
    let count = 0;
    for await (const i of source) {
      const result = await func(i, count);
      yield result;
      count++;
    }
  };
