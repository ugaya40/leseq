import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const flattenAsync = <T, TResult>(func: (arg: T, index: number) => Promise<AsyncIterable<TResult> | Iterable<TResult>>): AsyncOperator<T, TResult> =>
  async function* (source: AsyncSeq<T>): AsyncGen<TResult> {
    let count = 0;
    for await (const i of source) {
      const result = await func(i, count);
      yield* result;
      count++;
    }
  };
