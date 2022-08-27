import { Gen, Operator, Seq } from '../Seq';
import { ZipIterable } from '../utils/ZipIterable';

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = from([1,2,3]).pipe(
 *   zipWith(['a','b'])
 * ).toArray();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = from([1,2,3]).pipe(
 *   zipWith(['a','b'],[true,false,true])
 * ).toArray();
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
 * @category Operators
 */
export function zipWith<T, T1, T2, T3, T4, T5>(
  source1: Iterable<T1>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): Operator<T, [T, T1, T2, T3, T4, T5]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = from([1,2,3]).pipe(
 *   zipWith(['a','b'])
 * ).toArray();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = from([1,2,3]).pipe(
 *   zipWith(['a','b'],[true,false,true])
 * ).toArray();
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
 * @category Operators
 */
export function zipWith<T, T1, T2, T3, T4>(
  source1: Iterable<T1>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): Operator<T, [T, T1, T2, T3, T4]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = from([1,2,3]).pipe(
 *   zipWith(['a','b'])
 * ).toArray();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = from([1,2,3]).pipe(
 *   zipWith(['a','b'],[true,false,true])
 * ).toArray();
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
 * @category Operators
 */
export function zipWith<T, T1, T2, T3>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>): Operator<T, [T, T1, T2, T3]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = from([1,2,3]).pipe(
 *   zipWith(['a','b'])
 * ).toArray();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = from([1,2,3]).pipe(
 *   zipWith(['a','b'],[true,false,true])
 * ).toArray();
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
 * @category Operators
 */
export function zipWith<T, T1, T2>(source1: Iterable<T1>, source2: Iterable<T2>): Operator<T, [T, T1, T2]>;

/**
 * Returns a sequence of arrays consisting of the elements of the source array and the elements of the multiple sequences given as arguments, concatenated one by one.
 *
 * ```typescript
 * const result1 = from([1,2,3]).pipe(
 *   zipWith(['a','b'])
 * ).toArray();
 *
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = from([1,2,3]).pipe(
 *   zipWith(['a','b'],[true,false,true])
 * ).toArray();
 *
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @returns [T,T1] sequence.
 * @typeParam T Source element type.
 * @typeParam T1 First element type.
 * @category Operators
 */
export function zipWith<T, T1>(source1: Iterable<T1>): Operator<T, [T, T1]>;

/** @ignore */
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
