import { Seq } from '../seq';

export const toArray =
  <T>() =>
  (seq: Seq<T>): T[] => {
    const result = [];
    for (const i of seq) {
      result.push(i);
    }
    return result;
  };
