import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { asyncDefaultSelector } from '../../utils/asyncDefaultSelector';

export const unionAsync = <T, TComparableValue, TKey = T>(
  target: AsyncIterable<T> | Iterable<T>,
  keySelector: (one: T) => Promise<TKey> = asyncDefaultSelector,
  comparableValueForKey?: (key: TKey) => Promise<TComparableValue>
): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    const appeared: Set<TKey | TComparableValue> = new Set();
    const createKeyValue = async (i: T) => (comparableValueForKey ? comparableValueForKey(await keySelector(i)) : keySelector(i));
    for await (const i of source) {
      const keyValue = await createKeyValue(i);
      if (!appeared.has(keyValue)) {
        yield i;
        appeared.add(keyValue);
      }
    }

    for await (const i of target) {
      const key = await createKeyValue(i);
      if (!appeared.has(key)) {
        yield i;
        appeared.add(key);
      }
    }
  };
