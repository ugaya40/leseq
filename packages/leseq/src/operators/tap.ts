import { Gen, Operator, Seq } from '../Seq';

/**
 * Run side effects. The returning sequence is the same as the current one.
 *
 * ```typescript
 * const result = from([1,2,3]).pipe(
 *   tap(i => console.log(i * i))
 * ).toArray();
 *
 * //result: [1,2,3]
 *
 * //console:
 * // 1
 * // 4
 * // 9
 * ```
 *
 * @typeParam T Source element type.
 * @param func Side effects to perform
 * @returns Operator function.
 * @category Operators
 */
export const tap = <T>(func: (arg: T, index: number) => void): Operator<T> =>
  function* tap(source: Seq<T>): Gen<T> {
    let count = 0;
    for (const i of source) {
      func(i, count);
      yield i;
      count++;
    }
  };
