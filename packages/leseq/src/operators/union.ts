import { Gen, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

export const union = <T, TComparableValue, TKey = T>(
  target: Iterable<T>,
  keySelector: (one: T) => TKey = defaultSelector,
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

    for (const i of target) {
      const key = keySelector(i);
      if (!appeared.has(key)) {
        yield i;
        appeared.add(key);
      }
    }
  };
