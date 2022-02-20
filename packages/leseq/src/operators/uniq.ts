import { Gen, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

export const uniq = <T, TComparableValue, TKey = T>(
  keySelector: (target: T) => TKey = defaultSelector,
  comparableValueForKey?: (key: TKey) => TComparableValue
) =>
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
  };
