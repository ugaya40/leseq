import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';
import { asyncDefaultSelector } from '../../utils/asyncDefaultSelector';

export const uniqAsync = <T, TComparableValue, TKey = T>(
  keySelector: (target: T) => Promise<TKey> = asyncDefaultSelector,
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
  };
