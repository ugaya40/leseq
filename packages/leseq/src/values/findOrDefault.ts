import { Seq } from '../seq';

export const findOrDefault =
  <T>(predicate: (arg: T, index: number) => boolean, defaultValue: T | undefined = undefined) =>
  (seq: Seq<T>): T | undefined => {
    let count = 0;
    for (const i of seq) {
      if (predicate(i, count)) {
        return i;
      }
      count++;
    }
    return defaultValue;
  };
