import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

export function filterAsync<T, TResult extends T>(predicate: (arg: T, index: number) => arg is TResult): AsyncOperator<T, TResult>;
export function filterAsync<T>(predicate: (arg: T, index: number) => Promise<boolean> | boolean): AsyncOperator<T>;

/**
 * Returns a sequence that has been filtered by the specified condition.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   filterAsync(async i => i % 2 == 0)
 * ).toArrayAsync();
 * //result: [2,4]
 * ```
 * 
 * **with User Defined Type Guard**
 * ```typescript
 * const result = await fromAsAsync([1,'a',2,'b'])
 *   .pipe(
 *     filterAsync<number | string, string>((i): i is string => typeof i === 'string')
 *   )
 *   .toMutableArrayAsync();
 * //result: ['a','b']
 * //result type is string[]
 * ```
 *
 * @param predicate Conditional functions for filtering.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export function filterAsync<T>(predicate: (arg: T, index: number) => Promise<boolean> | boolean): AsyncOperator<T> {
  return async function* filterAsync(source: AsyncSeq<T>): AsyncGen<T> {
    let count = 0;
    for await (const i of source) {
      if (await predicate(i, count)) {
        yield i;
      }
      count++;
    }
  }
}
