import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { SortType } from '../../utils/sortUtil';

export const orderByAsync = <T, TKey>(
  keySelector: (arg: T) => TKey,
  sortType: SortType = 'asc',
  compareFunction: (a: TKey, b: TKey) => number = defaultCompareFunction
): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    const array = await source.toArrayAsync();
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

const defaultCompareFunction = (a: any, b: any) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
