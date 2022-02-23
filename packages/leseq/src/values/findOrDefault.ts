import { Seq } from '../seq';

/**
 * Returns the first element that satisfies the condition. If no element is found that satisfies the condition, it returns the specified default value.
 *
 * ```typescript
 * const result = from([1,3,5,7]).value(findOrDefault(i => i % 2 == 0, 9999));
 *
 * //result: 9999
 * ```
 *
 * @param predicate Condition.
 * @param defaultValue Default value.
 * @typeParam T Source element type.
 * @returns The first element that matches the condition, or the default value.
 * @category Values
 */

export const findOrDefault =
  <T>(predicate: (arg: T, index: number) => boolean = () => true, defaultValue: T | undefined = undefined) =>
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
