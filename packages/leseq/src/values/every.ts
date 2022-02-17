import { Seq } from '../seq';

export const every =
  <T>(predicate: (arg: T) => boolean) =>
  (seq: Seq<T>): boolean => {
    for (const i of seq) {
      if (!predicate(i)) {
        return false;
      }
    }
    return true;
  };
