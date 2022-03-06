import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { asyncDefaultSelector } from '../../utils/asyncDefaultSelector';

export const groupByAsync = <T, TComparableValue, TKey = T, TValue = T>(
  keySelector: (target: T) => Promise<TKey>,
  elementSelector: (target: T) => Promise<TValue> = asyncDefaultSelector,
  comparableValueForKey?: (key: TKey) => Promise<TComparableValue>
): AsyncOperator<T, { key: TKey; values: TValue[] }> =>
  async function* (source: AsyncSeq<T>): AsyncGen<{ key: TKey; values: TValue[] }> {
    const resultMap = new Map<TComparableValue | TKey, { key: TKey; values: TValue[] }>();
    const createKeyValue = async (i: T) => (comparableValueForKey ? comparableValueForKey(await keySelector(i)) : keySelector(i));

    for await (const one of source) {
      const keyValue = await createKeyValue(one);
      const info = resultMap.get(keyValue) ?? { key: await keySelector(one), values: [] };
      info.values.push(await elementSelector(one));
      resultMap.set(keyValue, info);
    }

    for (const one of resultMap.entries()) {
      yield {
        key: one[1].key,
        values: one[1].values,
      };
    }
  };
