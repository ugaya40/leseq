import { Gen, Seq } from '../seq';

export const reverse = <T>() =>
  function* (source: Seq<T>): Gen<T> {
    const sourceArray = [...source];
    const length = sourceArray.length;
    for (let i = 0; i < length; i++) {
      yield sourceArray[length - i - 1];
    }
  };
