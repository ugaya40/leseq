import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

export const chunkAsync = <T>(size: number): AsyncOperator<T, T[]> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T[]> {
    let ch: T[] = [];
    for await (const one of source) {
      ch.push(one);
      if (ch.length === size) {
        yield ch;
        ch = [];
      }
    }
    if (ch.length != 0) {
      yield ch;
    }
  };
