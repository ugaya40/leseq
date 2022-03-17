import { Gen, Operator, Seq } from '../seq';

/**
 * Returns a sequence in reverse order of the current sequence.
 *
 * ```typescript
 * const result = from([1, 2, 3, 4, 5]).pipe(reverse()).toArray();
 * //result: [5,4,3,2,1]
 * ```
 *
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const reverse = <T>(): Operator<T> =>
  function* reverse(source: Seq<T>): Gen<T> {
    const sourceArray = [...source];
    const length = sourceArray.length;
    for (let i = 0; i < length; i++) {
      yield sourceArray[length - i - 1];
    }
  };
