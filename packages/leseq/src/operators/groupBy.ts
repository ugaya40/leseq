import { Gen, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

export const groupBy = <T, TKey, TValue = T>(keySelector: (target: T) => TKey, elementSelector: (target: T) => TValue = defaultSelector) =>
  function* (source: Seq<T>): Gen<{key: TKey, values: TValue[]}> {
    const resultMap = new Map<TKey,TValue[]>();
    for(const one of source){
      const key = keySelector(one);
      const values = resultMap.get(key) ?? [];
      values.push(elementSelector(one));
      resultMap.set(key,values);
    }
    
    for(const one of resultMap.entries()) {
      yield {
        key: one[0],
        values: one[1]
      }
    }
  };
