import { Gen, Operator, Seq } from '../Seq';

export function filter<T, TResult extends T>(predicate: (arg: T, index: number) => arg is TResult): Operator<T,TResult>;
export function filter<T>(predicate: (arg: T, index: number) => boolean): Operator<T>;

/**
 * Returns a sequence that has been filtered by the specified condition.
 *
 * ```typescript
 * const result = from([1, 2, 3, 4, 5]).pipe(filter(i => i % 2 == 0)).toArray();
 * //result: [2,4]
 * ```
 * 
 * **with User Defined Type Guard**
 * ```typescript
 * const result = from([1,'a',2,'b'])
 *   .pipe(
 *     filter<number | string, string>((i): i is string => typeof i === 'string')
 *   )
 *   .toMutableArray();
 * //result: ['a','b']
 * //result type is string[]
 * ```
 * 
 * @param predicate Conditional functions for filtering.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export function filter<T>(predicate: (arg: T, index: number) => boolean): Operator<T> {
  return function* filter(source: Seq<T>): Gen<T> {
    let count = 0;
    for (const i of source) {
      if (predicate(i, count)) {
        yield i;
      }
      count++;
    }
  }
}
