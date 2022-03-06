import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const concatAsync = <T>(target: AsyncIterable<T> | Iterable<T>): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    yield* source;
    yield* target;
  };
