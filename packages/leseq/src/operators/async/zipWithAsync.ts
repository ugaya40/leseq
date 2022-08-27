import { AllIterables, AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';
import { AsyncZipIterable } from '../../utils/AsyncZipIterable';

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'])
 * ).toArrayAsync();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'],[true,false,true])
 * ).toArrayAsync();
 *
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @param source3 Third iterable.
 * @param source4 Fourth iterable.
 * @param source5 Fifth iterable.
 * @returns [T,T1,T2,T3,T4,T5] sequence.
 * @typeParam T Source element type.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @typeParam T3 Third element type.
 * @typeParam T4 Fourth element type.
 * @typeParam T5 Fifth element type.
 * @category Async Operators
 */
export function zipWithAsync<T, T1, T2, T3, T4, T5>(
  source1: AllIterables<T1>,
  source2: AllIterables<T2>,
  source3: AllIterables<T3>,
  source4: AllIterables<T4>,
  source5: AllIterables<T5>
): AsyncOperator<T, [T, T1, T2, T3, T4, T5]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'])
 * ).toArrayAsync();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'],[true,false,true])
 * ).toArrayAsync();
 *
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @param source3 Third iterable.
 * @param source4 Fourth iterable.
 * @returns [T,T1,T2,T3,T4] sequence.
 * @typeParam T Source element type.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @typeParam T3 Third element type.
 * @typeParam T4 Fourth element type.
 * @category Async Operators
 */
export function zipWithAsync<T, T1, T2, T3, T4>(
  source1: AllIterables<T1>,
  source2: AllIterables<T2>,
  source3: AllIterables<T3>,
  source4: AllIterables<T4>
): AsyncOperator<T, [T, T1, T2, T3, T4]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'])
 * ).toArrayAsync();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'],[true,false,true])
 * ).toArrayAsync();
 *
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @param source3 Third iterable.
 * @returns [T,T1,T2,T3] sequence.
 * @typeParam T Source element type.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @typeParam T3 Third element type.
 * @category Async Operators
 */
export function zipWithAsync<T, T1, T2, T3>(source1: AllIterables<T1>, source2: AllIterables<T2>, source3: AllIterables<T3>): AsyncOperator<T, [T, T1, T2, T3]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'])
 * ).toArrayAsync();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'],[true,false,true])
 * ).toArrayAsync();
 *
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @returns [T,T1,T2] sequence.
 * @typeParam T Source element type.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @category Async Operators
 */
export function zipWithAsync<T, T1, T2>(source1: AllIterables<T1>, source2: AllIterables<T2>): AsyncOperator<T, [T, T1, T2]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'])
 * ).toArrayAsync();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await fromAsAsync([1,2,3]).pipe(
 *   zipWithAsync(['a','b'],[true,false,true])
 * ).toArrayAsync();
 *
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @returns [T,T1] sequence.
 * @typeParam T Source element type.
 * @typeParam T1 First element type.
 * @category Async Operators
 */
export function zipWithAsync<T, T1>(source1: AllIterables<T1>): AsyncOperator<T, [T, T1]>;

/** @ignore */
export function zipWithAsync<T, T1>(...source1: AllIterables<T1>[]): AsyncOperator<T, [T, ...T1[]]>;

export function zipWithAsync<T>(...sources: AllIterables<unknown>[]): AsyncOperator<T, unknown> {
  return async function* zipWithAsync<T>(source: AsyncSeq<T>): AsyncGen<unknown> {
    if (sources.length == 0) {
      yield* new AsyncZipIterable([source, []]);
    } else {
      yield* new AsyncZipIterable([source, ...sources]);
    }
  };
}
