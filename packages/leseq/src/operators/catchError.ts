import { Gen, Operator, Seq } from '../Seq';

/**
 * If the original iterable sequence raises an exception, the specified action is performed, terminating the enumeration or enumerating an alternate sequence.
 *
 * ```typescript
 * const result = from([1,2,3]).pipe(
 *   tap(i => {
 *     if(i === 2) throw new Error('test');
 *   }),
 *   catchError((e) => {
 *     if(e instanceof Error) {
 *       console.log(`error occurred: ${e.message}`)
 *     }
 *   })
 * ).toArray();
 *
 * //result: [1]
 * //console: error occurred: test
 * ```
 *
 *
 * ```typescript
 * const result = from([1,2,3]).pipe(
 *   tap(i => {
 *     if(i === 2) throw new Error();
 *   }),
 *   catchError(() => [4,5,6])
 * ).toArray();
 *
 * //result: [1,4,5,6]
 * ```
 *
 * **with nested & finalize**
 * ```typescript
 *
 * const alternative = from([4,5,6]).pipe(
 *   tap(i => {
 *     if(i === 5) throw new Error();
 *   }),
 *   catchError(() => [7,8,9]),
 *   finalize(() => console.log('seq 2 finished')),
 * )
 *
 * const result = from([1,2,3]).pipe(
 *   tap(i => {
 *     if(i === 2) throw new Error();
 *   }),
 *   catchError(() => alternative),
 *   finalize(() => console.log('seq 1 finished'))
 * ).toArray();
 *
 * //result: [1,4,7,8,9]
 * //console: seq 2 finished
 * //console: seq 1 finished
 * ```
 *
 * **different type**
 * ```typescript
 * const output = from([1,2,3]).pipe(
 *   tap(i => {
 *     if(i === 2) throw new Error();
 *   }),
 *   catchError(() => ['a', 'b', 'c'])
 * ).toArray();
 *
 * // type output : (number | string)[]
 * // output : [1, 'a', 'b', 'c']
 * ```
 *
 * @param action finalize action. Returns void or an alternative Iterable.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TAlternative alternative iterable element type.
 * @category Operators
 */
export const catchError = <T, TAlternative = T>(
  action: ((error: unknown) => void) | ((error: unknown) => Iterable<TAlternative>)
): Operator<T, T | TAlternative> =>
  function* catchError(source: Seq<T>): Gen<T | TAlternative> {
    try {
      yield* source;
    } catch (e: unknown) {
      const result = action(e);
      if (result != null) {
        yield* result;
      } else {
        return;
      }
    }
  };
