import { Gen, Operator, Seq } from '../Seq';
import { defaultSelector } from '../utils';

/**
 * Returns a deduplicated sequence.
 *
 * ```typescript
 * const result1 = from([1,1,3,2,4,4,4,1,5]).pipe(uniq()).toArray();
 * //result1: [1,3,2,4,5]
 *
 * const source = [
 *  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
 *  {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
 *  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
 *  {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
 * ];
 *
 * const result2 = from(source).pipe(
 *   uniq(
 *     i => i.groupKey,
 *     one => one.mainKey + one.subKey
 *   )
 * ).toArray();
 *
 * // result2: [
 * //   {"groupKey":{"mainKey":1,"subKey":"a"},"value":"test1"},
 * //   {"groupKey":{"mainKey":2,"subKey":"b"},"value":"test2"},
 * //   {"groupKey":{"mainKey":1,"subKey":"c"},"value":"test4"},
 * // ]
 * ```
 * 
 * For more information on *keySelector* and *comparableValueForKey*, please refer to [Equality Strategy](/#equality-strategy).
 * 
 * The implementation of *defaultSelector* is as follows.
 * ```typescript
 * export const defaultSelector = (target: any): any => target;
 * ```
 * 
 * @param keySelector Function to return the object used to check Equality.
 * @param comparableValueForKey This function returns an object that is unique to the key selected by *keySelector*.
 * It is recommended to return a string or number.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TKey key type.
 * @typeParam TComparableValue The type of the return value returned by *comparableValueForKey*.
 * @category Operators
 */
export const uniq = <T, TComparableValue, TKey = T>(
  keySelector: (target: T) => TKey = defaultSelector,
  comparableValueForKey?: (key: TKey) => TComparableValue
): Operator<T> =>
  function* uniq(source: Seq<T>): Gen<T> {
    const appeared: Set<TKey | TComparableValue> = new Set();
    const createKeyValue = (i: T) => (comparableValueForKey ? comparableValueForKey(keySelector(i)) : keySelector(i));
    for (const i of source) {
      const keyValue = createKeyValue(i);
      if (!appeared.has(keyValue)) {
        yield i;
        appeared.add(keyValue);
      }
    }
  };
