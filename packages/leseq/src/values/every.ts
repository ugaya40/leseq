import { Seq } from '../seq';

export const every =
  <T>(predicate: (arg: T) => boolean = () => true) =>
  (seq: Seq<T>): boolean => {
    for (const i of seq) {
      if (!predicate(i)) {
        return false;
      }
    }
    return true;
  };
