import { Gen, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

export const union = <T,TKey = T>(target: Iterable<T>, keySector: (one: T) => TKey = defaultSelector) =>
  function* (source: Seq<T>): Gen<T> {
    const appeared: Set<TKey> = new Set();
    for (const i of source) {
      const key = keySector(i)
      if (!appeared.has(key)) {
        yield i;
        appeared.add(key);
      }
    }

    for(const i of target) {
      const key = keySector(i)
      if (!appeared.has(key)) {
        yield i;
        appeared.add(key);
      }
    }
  };
