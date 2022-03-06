import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { asyncDefaultSelector } from '../../utils/asyncDefaultSelector';

export const differenceAsync = <T, TComparableValue, TKey = T>(
  target: AsyncIterable<T> | Iterable<T>,
  keySelector: (one: T) => Promise<TKey> = asyncDefaultSelector,
  removeDuplicate = true,
  comparableValueForKey?: (key: TKey) => Promise<TComparableValue>
): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
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
