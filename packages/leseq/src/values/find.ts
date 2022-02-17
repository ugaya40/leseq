import { Seq } from '../seq';

export const find =
  <T>(predicate: (arg: T, index: number) => boolean = () => true) =>
  (seq: Seq<T>): T => {
    let count = 0;
    for (const i of seq) {
      if (predicate(i, count)) {
        return i;
      }
      count++;
    }
    throw RangeError(`No elements matching the condition were found.`);
  };
