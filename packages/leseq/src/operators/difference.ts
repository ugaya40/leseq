import { Gen, Operator, Seq } from '../seq';
import { defaultSelector } from '../utils';

/**
 * Returns the sequence that is the difference set between the current sequence and the specified sequence.
 *
 * ```typescript
 * const result1 = from([1, 2, 3, 6, 6]).pipe(difference([2,3,4,5])).toArray();
 * //result1: [1,6]
 *
 * const result2 = from([1, 2, 3, 6, 6]).pipe(difference([2,3,4,5],i => i, false)).toArray();
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
 * const result3 = from(source).pipe(
 *   difference(
 *     target,
 *     i => i.groupKey,
 *     true,
 *     one => one.mainKey + one.subKey
 *   )
 * ).toArray();
 *
 * // result3: [
 * //   {"groupKey":{"mainKey":2,"subKey":"b"},"value":"test2"},
 * //   {"groupKey":{"mainKey":1,"subKey":"c"},"value":"test4"}
 * // ]
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
 *
 * @remarks For more information on *keySelector* and *comparableValueForKey*, please refer to [Equality Strategy](/#equality-strategy).
 *
 * @remarks The implementation of *defaultSelector* is as follows.
 * ```typescript
 * export const defaultSelector = (target: any): any => target;
 * ```
 *
 * @category Operators
 */
export const difference = <T, TComparableValue, TKey = T>(
  target: Iterable<T>,
  keySelector: (one: T) => TKey = defaultSelector,
  removeDuplicate = true,
  comparableValueForKey?: (key: TKey) => TComparableValue
): Operator<T> =>
  function* (source: Seq<T>): Gen<T> {
    const appeared: Set<TKey | TComparableValue> = new Set();
    const createKeyValue = (i: T) => (comparableValueForKey ? comparableValueForKey(keySelector(i)) : keySelector(i));

    for (const i of target) {
      const keyValue = createKeyValue(i);
      if (!appeared.has(keyValue)) {
        appeared.add(keyValue);
      }
    }

    for (const i of source) {
      const key = createKeyValue(i);
      if (!appeared.has(key)) {
        yield i;
        if (removeDuplicate) appeared.add(key);
      }
    }
  };
