import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { asyncDefaultSelector } from '../../utils';

/**
 * Returns a sequence that is the product set of the current sequence and the specified sequence.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1, 2, 3]).pipe(
 *   intersectAsync([2,3,4,5])
 * ).toArrayAsync();
 * //result1: [2,3]
 *
 * const source = [
 *  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
 *  {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
 *  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
 *  {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
 * ];
 *
 * const target = [
 *  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
 *  {groupKey: {mainKey: 2, subKey: 'e'}, value: "test2"},
 * ];
 *
 * const result2 = await fromAsAsync(source).pipe(
 *   intersectAsync(
 *     target,
 *     async i => i.groupKey,
 *     async one => one.mainKey + one.subKey
 *   )
 * ).toArrayAsync();
 *
 * // result2: [
 * //   {"groupKey":{"mainKey":1,"subKey":"a"},"value":"test1"}
 * // ]
 * ```
 *
 * @param target Sequence to be removed.
 * @param keySelector Function to return the object used to check Equality.
 * @param comparableValueForKey This function returns an object that is unique to the key selected by *keySelector*.
 * It is recommended to return a string or number.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TKey key type.
 * @typeParam TComparableValue The type of the return value returned by *comparableValueForKey*.
 *
 * @remarks For more information on *keySelector* and *comparableValueForKey*, please refer to [Equality Strategy](/#equality-strategy).
 * @remarks The implementation of *asyncDefaultSelector* is as follows.
 * ```typescript
 * export const asyncDefaultSelector = (target: any): any => Promise.resolve(target);
 * ```
 * @category Async Operators
 */
export const intersectAsync = <T, TComparableValue, TKey = T>(
  target: AsyncIterable<T> | Iterable<T>,
  keySelector: (one: T) => Promise<TKey> = asyncDefaultSelector,
  comparableValueForKey?: (key: TKey) => Promise<TComparableValue>
): AsyncOperator<T> =>
  async function* intersectAsync(source: AsyncSeq<T>): AsyncGen<T> {
    const appeared: Set<TKey | TComparableValue> = new Set();
    const returned: Set<TKey | TComparableValue> = new Set();
    const createKeyValue = async (i: T) => (comparableValueForKey ? comparableValueForKey(await keySelector(i)) : keySelector(i));

    for await (const i of target) {
      const keyValue = await createKeyValue(i);
      if (!appeared.has(keyValue)) {
        appeared.add(keyValue);
      }
    }

    for await (const i of source) {
      const keyValue = await createKeyValue(i);
      if (appeared.has(keyValue) && !returned.has(keyValue)) {
        yield i;
        returned.add(keyValue);
      }
    }
  };
