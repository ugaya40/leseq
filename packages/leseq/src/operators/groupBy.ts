import { Gen, Operator, Seq } from '../seq';
import { defaultSelector } from '../utils';

/**
 * Returns a sequence grouped by a specified key.
 *
 * ```typescript
 * const source1 = [
 *   {groupKey: 1, value: "test1"},
 *   {groupKey: 3, value: "test2"},
 *   {groupKey: 1, value: "test3"},
 *   {groupKey: 1, value: "test4"},
 *   {groupKey: 3, value: "test5"},
 *   {groupKey: 2, value: "test6"}
 * ]
 *
 * const result1 = from(source1).pipe(groupBy(one => one.groupKey),).toArray();
 *
 *
 * // result1: [
 * //   {key: 1, values: [
 * //     {groupKey: 1, value: "test1"},
 * //     {groupKey: 1, value: "test3"},
 * //     {groupKey: 1, value: "test4"}
 * //   ]},
 * //   {key: 3, values: [
 * //     {groupKey: 3, value: "test2"},
 * //     {groupKey: 3, value: "test5"}
 * //   ]},
 * //   {key: 2, values: [
 * //     {groupKey: 2, value: "test6"}
 * //   ]}
 * // ]
 *
 * const source2 = [
 *   {groupKey: {key: 1}, value: "test1"},
 *   {groupKey: {key: 2}, value: "test2"},
 *   {groupKey: {key: 1}, value: "test3"},
 *   {groupKey: {key: 1}, value: "test4"},
 * ]
 *
 * const result2 = from(source2).pipe(groupBy(one => one.groupKey,one => one.value,k => k.key),).toArray();
 *
 * // result2: [
 * //   {key: {key: 1}, values: ["test1","test3","test4"]},
 * //   {key: {key: 2}, values: ["test2"]}
 * // ];
 * ```
 *
 * @param target Sequence to be removed.
 * @param keySelector Function to return the object used to check Equality..
 * @param elementSelector Function to return the object to be enumerated in the Value property of the grouped result.
 * @param comparableValueForKey This function returns an object that is unique to the key selected by *keySelector*.
 * It is recommended to return a string or number.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TValue The type that will be enumerated in the Value property of the grouped result.
 * @typeParam TKey key type.
 * @typeParam TComparableValue The type of the return value returned by *comparableValueForKey*.
 *
 * @remarks For more information on *keySelector* and *comparableValueForKey*, please refer to [Equality Strategy](/#equality-strategy).
 * @remarks The implementation of *defaultSelector* is as follows.
 * ```typescript
 * export const defaultSelector = (target: any): any => target;
 * ```
 *
 * @category Operators
 */
export const groupBy = <T, TComparableValue, TKey = T, TValue = T>(
  keySelector: (target: T) => TKey,
  elementSelector: (target: T) => TValue = defaultSelector,
  comparableValueForKey?: (key: TKey) => TComparableValue
): Operator<T, { key: TKey; values: readonly TValue[] }> =>
  function* groupBy(source: Seq<T>): Gen<{ key: TKey; values: readonly TValue[] }> {
    const resultMap = new Map<TComparableValue | TKey, { key: TKey; values: TValue[] }>();
    const createKeyValue = (i: T) => (comparableValueForKey ? comparableValueForKey(keySelector(i)) : keySelector(i));
    for (const one of source) {
      const keyValue = createKeyValue(one);
      const info = resultMap.get(keyValue) ?? { key: keySelector(one), values: [] };
      info.values.push(elementSelector(one));
      resultMap.set(keyValue, info);
    }

    for (const one of resultMap.entries()) {
      yield {
        key: one[1].key,
        values: one[1].values,
      };
    }
  };
