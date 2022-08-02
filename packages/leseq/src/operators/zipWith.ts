import { Gen, Operator, Seq } from '../seq';
import { ZipIterable } from '../utils/zipIterable';

export function zipWith<T, T1, T2, T3, T4, T5>(
  source1: Iterable<T1>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): Operator<T, [T, T1, T2, T3, T4, T5]>;
export function zipWith<T, T1, T2, T3, T4>(
  source1: Iterable<T1>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): Operator<T, [T, T1, T2, T3, T4]>;
export function zipWith<T, T1, T2, T3>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>): Operator<T, [T, T1, T2, T3]>;
export function zipWith<T, T1, T2>(source1: Iterable<T1>, source2: Iterable<T2>): Operator<T, [T, T1, T2]>;
export function zipWith<T, T1>(...source1: Iterable<T1>[]): Operator<T, [T, ...T1[]]>;
export function zipWith<T>(...sources: Iterable<unknown>[]): Operator<T, unknown> {
  return function* zipWith<T>(source: Seq<T>): Gen<unknown> {
    if (sources.length == 0) {
      yield* new ZipIterable([source, []]);
    } else {
      yield* new ZipIterable([source, ...sources]);
    }
  };
}
