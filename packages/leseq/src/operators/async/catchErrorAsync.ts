import { AllIterables, AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * If the original iterable sequence raises an exception, the specified action is performed, terminating the enumeration or enumerating an alternate sequence.
 *
 * ```typescript
 * const result = await fromAsAsync([1,2,3]).pipe(
 *   tapAsync(async i => {
 *     if(i === 2) throw new Error('test');
 *   }),
 *   catchErrorAsync(async (e) => {
 *     if(e instanceof Error) {
 *       console.log(`error occurred: ${e.message}`)
 *     }
 *   })
 * ).toArrayAsync();
 *
 * //result: [1]
 * //console: error occurred: test
 * ```
 *
 *
 * ```typescript
 * const result = await fromAsAsync([1,2,3]).pipe(
 *   tapAsync(async i => {
 *     if(i === 2) throw new Error();
 *   }),
 *   catchErrorAsync(async () => [4,5,6])
 * ).toArrayAsync();
 *
 * //result: [1,4,5,6]
 * ```
 *
 * **with nested & finalize**
 * ```typescript
 *
 * const alternative = fromAsAsync([4,5,6]).pipe(
 *   tapAsync(async i => {
 *     if(i === 5) throw new Error();
 *   }),
 *   catchErrorAsync(async () => [7,8,9]),
 *   finalizeAsync(async () => console.log('seq 2 finished')),
 * )
 *
 * const result = await fromAsAsync([1,2,3]).pipe(
 *   tapAsync(async i => {
 *     if(i === 2) throw new Error();
 *   }),
 *   catchErrorAsync(async () => alternative),
 *   finalizeAsync(async () => console.log('seq 1 finished'))
 * ).toArrayAsync();
 *
 * //result: [1,4,7,8,9]
 * //console: seq 2 finished
 * //console: seq 1 finished
 * ```
 *
 * **different type**
 * ```typescript
 * const output = await fromAsAsync([1,2,3]).pipe(
 *   tapAsync(async i => {
 *     if(i === 2) throw new Error();
 *   }),
 *   catchErrorAsync(async () => ['a', 'b', 'c'])
 * ).toArrayAsync();
 *
 * // type output : (number | string)[]
 * // output : [1, 'a', 'b', 'c']
 * ```
 *
 * @param action finalize action. Returns void or an alternative Iterable.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TAlternative alternative iterable element type.
 * @category Async Operators
 */
export const catchErrorAsync = <T, TAlternative = T>(
  action: ((error: unknown) => Promise<void>) | ((error: unknown) => Promise<AllIterables<TAlternative>>)
): AsyncOperator<T, T | TAlternative> =>
  async function* catchErrorAsync(source: AsyncSeq<T>): AsyncGen<T | TAlternative> {
    try {
      yield* source;
    } catch (e: unknown) {
      const result = await action(e);
      if (result != null) {
        yield* result;
      } else {
        return;
      }
    }
  };
