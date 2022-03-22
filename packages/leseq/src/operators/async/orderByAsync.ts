import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { defaultCompareFunction, SortType } from '../../utils';

/**
 * Returns a sequence sorted by a specified key.
 *
 * Internally, it uses [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), and its function is basically the same as Array.sort(), except that it is given a *compareFunction* by default.
 *
 * ```typescript
 * const result1 = await fromAsAsync([4,1,2,5,3]).pipe(
 *   orderByAsync(i => i, 'asc')
 * ).toArrayAsync();
 *
 * //result1: [1,2,3,4,5]
 *
 * const originalCompareFunction = (a: number, b:number) => {
 *   if(a % 2 < b % 2) return - 1;
 *   if(a % 2 > b % 2) return 1;
 *   return 0;
 * }
 *
 * const result2 = await fromAsAsync([4,1,5,3,2]).pipe(
 *   orderByAsync(i => i, 'asc', originalCompareFunction)
 * ).toArrayAsync();
 *
 * //result2: [4,2,1,5,3]
 * ```
 *
 * Also, the implementation of the default *compareFunction* is as follows.
 *
 * ```typescript
 * const defaultSortFunction = (a: any, b: any) => {
 *   if (a < b) return -1;
 *   if (a > b) return 1;
 *   return 0;
 * };
 * ```
 *
 * @param keySelector Function to return sort key
 * @param sortType *'asc'* or *'desc'*
 * @param compareFunction See [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more information.
 * @typeParam T Source element type.
 * @typeParam TKey key type.
 * @returns Operator function.
 * @category Async Operators
 */
export const orderByAsync = <T, TKey>(
  keySelector: (arg: T) => TKey,
  sortType: SortType = 'asc',
  compareFunction: (a: TKey, b: TKey) => number = defaultCompareFunction
): AsyncOperator<T> =>
  async function* orderByAsync(source: AsyncSeq<T>): AsyncGen<T> {
    const array = await source.toMutableArrayAsync();
    const sortedArray = array.sort(createSortFunction(keySelector, sortType, compareFunction));
    yield* sortedArray;
  };

export const createSortFunction =
  <T, TKey>(keySelector: (arg: T) => TKey, sortType: SortType, compareFunction: (a: TKey, b: TKey) => number) =>
  (a: T, b: T) => {
    const aKey = keySelector(a);
    const bKey = keySelector(b);
    return sortType === 'asc' ? compareFunction(aKey, bKey) : compareFunction(aKey, bKey) * -1;
  };
