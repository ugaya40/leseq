import { Gen, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

export const uniq = <T, Tkey = T>(keySector: (target: T) => Tkey = defaultSelector) =>
  function* (source: Seq<T>): Gen<T> {
    const appeared: Set<Tkey> = new Set();
    for (const i of source) {
      const key = keySector(i);
      if (!appeared.has(key)) {
        yield i;
        appeared.add(key);
      }
    }
  };
