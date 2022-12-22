import { AllIterables, AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';
import { asyncDefaultSelector } from '../../utils';

/**
 * Returns the sequence that is the difference set between the current sequence and the specified sequence.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1, 2, 3, 6, 6]).pipe(
 *   differenceAsync([2,3,4,5])
 * ).toArrayAsync();
 * //result1: [1,6]
 *
 * const result2 = await fromAsAsync([1, 2, 3, 6, 6]).pipe(
 *   differenceAsync([2,3,4,5], async i => i, false)
 * ).toArrayAsync();
 * //result2: [1,6,6]
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
 * const result3 = await fromAsAsync(source).pipe(
 *   differenceAsync(
 *     target,
 *     async i => i.groupKey,
 *     true,
 *     async one => one.mainKey + one.subKey
 *   )
 * ).toArrayAsync();
 *
 * // result3: [
 * //   {"groupKey":{"mainKey":2,"subKey":"b"},"value":"test2"},
 * //   {"groupKey":{"mainKey":1,"subKey":"c"},"value":"test4"}
 * // ]
 * ```
 *
 * For more information on *keySelector* and *comparableValueForKey*, please refer to [Equality Strategy](/#equality-strategy).
 *
 * The implementation of *asyncDefaultSelector* is as follows.
 * ```typescript
 * export const asyncDefaultSelector = (target: any): any => Promise.resolve(target);
 * ```
 *
 * @param target Sequence to be removed.
 * @param keySelector Function to return the object used to check Equality..
 * @param removeDuplicate If *removeDuplicate* is set to true, duplicates will be removed; default is true.
 * @param comparableValueForKey This function returns an object that is unique to the key selected by *keySelector*.
 * It is recommended to return a string or number.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TKey key type.
 * @typeParam TComparableValue The type of the return value returned by *comparableValueForKey*.
 * @category Async Operators
 */
export const differenceAsync = <T, TComparableValue, TKey = T>(
  target: AllIterables<T>,
  keySelector: (one: T) => Promise<TKey> = asyncDefaultSelector,
  removeDuplicate = true,
  comparableValueForKey?: (key: TKey) => Promise<TComparableValue>
): AsyncOperator<T> =>
  async function* differenceAsync(source: AsyncSeq<T>): AsyncGen<T> {
    const appeared: Set<TKey | TComparableValue> = new Set();
    const createKeyValue = async (i: T) => (comparableValueForKey ? comparableValueForKey(await keySelector(i)) : keySelector(i));

    for await (const i of target) {
      const keyValue = await createKeyValue(i);
      if (!appeared.has(keyValue)) {
        appeared.add(keyValue);
      }
    }

    for await (const i of source) {
      const key = await createKeyValue(i);
      if (!appeared.has(key)) {
        yield i;
        if (removeDuplicate) appeared.add(key);
      }
    }
  };
