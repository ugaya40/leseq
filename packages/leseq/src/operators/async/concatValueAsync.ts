import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const concatValueAsync = <T>(target: T): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    yield* source;
    yield target;
  };
