import { Seq } from '../seq';

export const toArray =
  <T>() =>
  (seq: Seq<T>): T[] => {
    return [...seq];
  };
