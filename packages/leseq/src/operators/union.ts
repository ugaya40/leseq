import { Gen, Operator, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

/**
 * Returns a sequence that is the union set of the current sequence and the specified sequence.
 *
 * ```typescript
 * const result1 = from([1, 2, 3]).pipe(union([2,3,4,5])).toArray();
 * //result1: [1,2,3,4,5]
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
 * const result2 = from(source).pipe(
 *   union(
 *     target,
 *     i => i.groupKey,
 *     one => one.mainKey + one.subKey
 *   )
 * ).toArray();
 *
 * // result2: [
 * //   {"groupKey":{"mainKey":1,"subKey":"a"},"value":"test1"},
 * //   {"groupKey":{"mainKey":2,"subKey":"b"},"value":"test2"},
 * //   {"groupKey":{"mainKey":1,"subKey":"c"},"value":"test4"},
 * //   {"groupKey":{"mainKey":2,"subKey":"e"},"value":"test2"}
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
 * @remarks The implementation of *defaultSelector* is as follows.
 * ```typescript
 * export const defaultSelector = (target: any): any => target;
 * ```
 * @category Operators
 */
export const union = <T, TComparableValue, TKey = T>(
  target: Iterable<T>,
  keySelector: (one: T) => TKey = defaultSelector,
  comparableValueForKey?: (key: TKey) => TComparableValue
): Operator<T> =>
  function* (source: Seq<T>): Gen<T> {
    const appeared: Set<TKey | TComparableValue> = new Set();
    const createKeyValue = (i: T) => (comparableValueForKey ? comparableValueForKey(keySelector(i)) : keySelector(i));
    for (const i of source) {
      const keyValue = createKeyValue(i);
      if (!appeared.has(keyValue)) {
        yield i;
        appeared.add(keyValue);
      }
    }

    for (const i of target) {
      const key = createKeyValue(i);
      if (!appeared.has(key)) {
        yield i;
        appeared.add(key);
      }
    }
  };
