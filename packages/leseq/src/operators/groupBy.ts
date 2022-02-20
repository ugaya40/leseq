import { Gen, Seq } from '../seq';
import { defaultSelector } from '../utils/defaultSelector';

export const groupBy = <T, TComparableValue, TKey = T, TValue = T>(keySelector: (target: T) => TKey, elementSelector: (target: T) => TValue = defaultSelector,  comparableValueForKey?: (key: TKey) => TComparableValue) =>
  function* (source: Seq<T>): Gen<{key: TKey, values: TValue[]}> {
    const resultMap = new Map<TComparableValue | TKey,{key: TKey,values: TValue[]}>();
    const createKeyValue = (i: T) => comparableValueForKey ? comparableValueForKey(keySelector(i)) : keySelector(i);
    for(const one of source){
      const keyValue = createKeyValue(one);
      const info = resultMap.get(keyValue) ?? {key: keySelector(one),values: []};
      info.values.push(elementSelector(one));
      resultMap.set(keyValue,info);
    }
    
    for(const one of resultMap.entries()) {
      yield {
        key: one[1].key,
        values: one[1].values
      }
    }
  };
