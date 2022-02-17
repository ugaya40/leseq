import { Seq } from '../seq';

export const some =
  <T>(predicate: (arg: T) => boolean = () => true) =>
  (seq: Seq<T>): boolean => {
    for (const i of seq) {
      if (predicate(i)) {
        return true;
      }
    }
    return false;
  };
