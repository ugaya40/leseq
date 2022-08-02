import { AsyncGen, AsyncOperator, AsyncSeq, Iterables } from '../../asyncSeq';
import { AsyncZipIterable } from '../../utils/asyncZipIterable';

export function zipWithAsync<T, T1, T2, T3, T4, T5>(
  source1: Iterables<T1>,
  source2: Iterables<T2>,
  source3: Iterables<T3>,
  source4: Iterables<T4>,
  source5: Iterables<T5>
): AsyncOperator<T, [T, T1, T2, T3, T4, T5]>;
export function zipWithAsync<T, T1, T2, T3, T4>(
  source1: Iterables<T1>,
  source2: Iterables<T2>,
  source3: Iterables<T3>,
  source4: Iterables<T4>
): AsyncOperator<T, [T, T1, T2, T3, T4]>;
export function zipWithAsync<T, T1, T2, T3>(source1: Iterables<T1>, source2: Iterables<T2>, source3: Iterables<T3>): AsyncOperator<T, [T, T1, T2, T3]>;
export function zipWithAsync<T, T1, T2>(source1: Iterables<T1>, source2: Iterables<T2>): AsyncOperator<T, [T, T1, T2]>;
export function zipWithAsync<T, T1>(...source1: Iterables<T1>[]): AsyncOperator<T, [T, ...T1[]]>;
export function zipWithAsync<T>(...sources: Iterables<unknown>[]): AsyncOperator<T, unknown> {
  return async function* zipWithAsync<T>(source: AsyncSeq<T>): AsyncGen<unknown> {
    if (sources.length == 0) {
      yield* new AsyncZipIterable([source, []]);
    } else {
      yield* new AsyncZipIterable([source, ...sources]);
    }
  };
}
