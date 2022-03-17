import { Gen, Operator, Seq } from '../seq';

/**
 * Returns the resulting sequence after applying the aggregate function to the elements of the current sequence.
 * The difference from [reduce()](/api/values/#reduce) is that each time the aggregate function is applied, the intermediate steps are also enumerated.
 *
 * ```typescript
 * const output = from([1, 2, 3, 4, 5]).pipe(
 *   scan(100, (acc, i) => acc + i)
 * ).toArray();
 *
 * //result: [101, 103, 106, 110, 115]
 * ```
 *
 * @param seed This is the initial value for aggregation.
 * @param func Aggregate function.
 * @typeParam T Source element type.
 * @typeParam TAccumulate The type returned by the aggregate function.
 * @returns Operator function.
 * @category Operators
 */
export const scan = <T, TAccumulate>(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => TAccumulate): Operator<T, TAccumulate> =>
  function* scan(source: Seq<T>): Gen<TAccumulate> {
    let count = 0;
    let nextAccumulate = seed;
    for (const i of source) {
      nextAccumulate = func(nextAccumulate, i, count);
      yield nextAccumulate;
      count++;
    }
  };
