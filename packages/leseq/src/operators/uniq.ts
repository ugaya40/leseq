import { Gen, Seq } from '../seq';

export const uniq = <T>(keySector: (source: T) => any) =>
  function* (source: Seq<T>): Gen<T> {
    const appeared: T[] = [];
    for (const i of source) {
      if (appeared.indexOf(keySector(i)) === -1) {
        appeared.push(keySector(i));
        yield i;
      }
    }
  };
