import { Gen, Seq } from '../seq';

export const concat = <T>(target: Iterable<T>) =>
  function* (source: Seq<T>): Gen<T> {
    yield* source;
    yield* target;
  };
