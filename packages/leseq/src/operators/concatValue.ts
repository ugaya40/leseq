import { Gen, Seq } from '../seq';

export const concatValue = <T>(target: T) =>
  function* (source: Seq<T>): Gen<T> {
    yield* source;
    yield target;
  };
