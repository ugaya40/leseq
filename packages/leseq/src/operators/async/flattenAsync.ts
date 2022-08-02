import { AsyncGen, AsyncOperator, AsyncSeq, Iterables } from '../../asyncSeq';

/**
 * Returns a flattened sequence.
 *
 * ```typescript
 * const result1 = await fromAsAsync([[1,2],[3,4]]).pipe(
 *   flattenAsync(async i => i)
 * ).toArrayAsync();
 *
 * //result1: [1,2,3,4]
 *
 * const result2 = await fromAsAsync([
 *    {values:[1,2]},
 *    {values:[3,4]}
 *  ]).pipe(
 *    flattenAsync(async i => i.values)
 *  ).toArrayAsync();
 *
 * //result2: [1,2,3,4]
 * ```
 *
 * @param func A function that takes an element of a sequence and returns it in an Iterable form.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TResult Result element type.
 * @category Async Operators
 */
export const flattenAsync = <T, TResult>(func: (arg: T, index: number) => Promise<Iterables<TResult>>): AsyncOperator<T, TResult> =>
  async function* flattenAsync(source: AsyncSeq<T>): AsyncGen<TResult> {
    let count = 0;
    for await (const i of source) {
      const result = await func(i, count);
      yield* result;
      count++;
    }
  };
