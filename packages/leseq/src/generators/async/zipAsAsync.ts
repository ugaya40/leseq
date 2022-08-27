import { AllIterables, AsyncSeq } from '../../AsyncSeq';
import { AsyncZipIterable } from '../../utils/AsyncZipIterable';

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = await zipAsAsync([1,2,3],['a','b']).toArrayAsync();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await zipAsAsync([1,2,3],['a','b'],[true,false,true]).toArrayAsync();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @param source3 Third iterable.
 * @param source4 Fourth iterable.
 * @param source5 Fifth iterable.
 * @returns [T1,T2,T3,T4,T5] sequence.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @typeParam T3 Third element type.
 * @typeParam T4 Fourth element type.
 * @typeParam T5 Fifth element type.
 * @category Async Generators
 */
export function zipAsAsync<T1, T2, T3, T4, T5>(
  source1: AllIterables<T1>,
  source2: AllIterables<T2>,
  source3: AllIterables<T3>,
  source4: AllIterables<T4>,
  source5: AllIterables<T5>
): AsyncSeq<[T1, T2, T3, T4, T5]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = await zipAsAsync([1,2,3],['a','b']).toArrayAsync();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await zipAsAsync([1,2,3],['a','b'],[true,false,true]).toArrayAsync();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @param source3 Third iterable.
 * @param source4 Fourth iterable.
 * @returns [T1,T2,T3,T4] sequence.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @typeParam T3 Third element type.
 * @typeParam T4 Fourth element type.
 * @category Async Generators
 */
export function zipAsAsync<T1, T2, T3, T4>(
  source1: AllIterables<T1>,
  source2: AllIterables<T2>,
  source3: AllIterables<T3>,
  source4: AllIterables<T4>
): AsyncSeq<[T1, T2, T3, T4]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = await zipAsAsync([1,2,3],['a','b']).toArrayAsync();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await zipAsAsync([1,2,3],['a','b'],[true,false,true]).toArrayAsync();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @param source3 Third iterable.
 * @returns [T1,T2,T3] sequence.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @typeParam T3 Third element type.
 * @category Async Generators
 */
export function zipAsAsync<T1, T2, T3>(source1: AllIterables<T1>, source2: AllIterables<T2>, source3: AllIterables<T3>): AsyncSeq<[T1, T2, T3]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = await zipAsAsync([1,2,3],['a','b']).toArrayAsync();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await zipAsAsync([1,2,3],['a','b'],[true,false,true]).toArrayAsync();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @returns [T1,T2] sequence.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @category Async Generators
 */
export function zipAsAsync<T1, T2>(source1: AllIterables<T1>, source2: AllIterables<T2>): AsyncSeq<[T1, T2]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = await zipAsAsync([1,2,3],['a','b']).toArrayAsync();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = await zipAsAsync([1,2,3],['a','b'],[true,false,true]).toArrayAsync();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param sources Sequences.
 * @returns [T] sequence.
 * @typeParam T Element type.
 * @category Async Generators
 */
export function zipAsAsync<T>(...sources: AllIterables<T>[]): AsyncSeq<T[]>;

export function zipAsAsync(...sources: AllIterables<unknown>[]): AsyncSeq<unknown> {
  return new AsyncSeq(new AsyncZipIterable(sources));
}
