import { AsyncSeq, Iterables } from '../../asyncSeq';
import { AsyncZipIterable } from '../../utils/asyncZipIterable';

export function zipAsAsync<T1, T2, T3, T4, T5>(
  source1: Iterables<T1>,
  source2: Iterables<T2>,
  source3: Iterables<T3>,
  source4: Iterables<T4>,
  source5: Iterables<T5>
): AsyncSeq<[T1, T2, T3, T4, T5]>;
export function zipAsAsync<T1, T2, T3, T4>(
  source1: Iterables<T1>,
  source2: Iterables<T2>,
  source3: Iterables<T3>,
  source4: Iterables<T4>
): AsyncSeq<[T1, T2, T3, T4]>;
export function zipAsAsync<T1, T2, T3>(source1: Iterables<T1>, source2: Iterables<T2>, source3: Iterables<T3>): AsyncSeq<[T1, T2, T3]>;
export function zipAsAsync<T1, T2>(source1: Iterables<T1>, source2: Iterables<T2>): AsyncSeq<[T1, T2]>;
export function zipAsAsync<T>(...sources: Iterables<T>[]): AsyncSeq<T[]>;
export function zipAsAsync(...sources: Iterables<unknown>[]): AsyncSeq<unknown> {
  return new AsyncSeq(new AsyncZipIterable(sources));
}
