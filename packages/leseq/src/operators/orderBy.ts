import { Gen, Seq } from '../seq';
import { toArray } from '../values/toArray';

export type SortType = 'asc' | 'desc';

export const orderBy = <T, TKey>(keySelector: (arg: T) => TKey, sortType: SortType = 'asc', compareFunction?: (a: TKey, b: TKey) => number) =>
  function* (source: Seq<T>): Gen<T> {
    const sortFunction = compareFunction ?? defaultSortFunction;
    const sortedArray = source.value(toArray()).sort(createSortFunction(keySelector, sortType, sortFunction));

    yield* sortedArray;
  };

const createSortFunction =
  <T, TKey>(keySelector: (arg: T) => TKey, sortType: SortType, compareFunction: (a: TKey, b: TKey) => number) =>
  (a: T, b: T) => {
    const aKey = keySelector(a);
    const bKey = keySelector(b);
    return sortType === 'asc' ? compareFunction(aKey, bKey) : compareFunction(aKey, bKey) * -1;
  };

const defaultSortFunction = (a: any, b: any) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
