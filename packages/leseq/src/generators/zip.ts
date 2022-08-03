import { Seq } from '../seq';
import { ZipIterable } from '../utils/zipIterable';

export function zip<T1, T2, T3, T4, T5>(
  source1: Iterable<T1>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): Seq<[T1, T2, T3, T4, T5]>;
export function zip<T1, T2, T3, T4>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>): Seq<[T1, T2, T3, T4]>;
export function zip<T1, T2, T3>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>): Seq<[T1, T2, T3]>;
export function zip<T1, T2>(source1: Iterable<T1>, source2: Iterable<T2>): Seq<[T1, T2]>;
export function zip<T>(...sources: Iterable<T>[]): Seq<T[]>;
export function zip(...sources: Iterable<unknown>[]): Seq<unknown> {
  return new Seq(new ZipIterable(sources));
}
