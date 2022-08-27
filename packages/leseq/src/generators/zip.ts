import { Seq } from '../seq';
import { ZipIterable } from '../utils/ZipIterable';

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = zip([1,2,3],['a','b']).toArray();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = zip([1,2,3],['a','b'],[true,false,true]).toArray();
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
 * @category Generators
 */
export function zip<T1, T2, T3, T4, T5>(
  source1: Iterable<T1>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): Seq<[T1, T2, T3, T4, T5]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = zip([1,2,3],['a','b']).toArray();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = zip([1,2,3],['a','b'],[true,false,true]).toArray();
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
 * @category Generators
 */
export function zip<T1, T2, T3, T4>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>): Seq<[T1, T2, T3, T4]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = zip([1,2,3],['a','b']).toArray();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = zip([1,2,3],['a','b'],[true,false,true]).toArray();
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
 * @category Generators
 */
export function zip<T1, T2, T3>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>): Seq<[T1, T2, T3]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = zip([1,2,3],['a','b']).toArray();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = zip([1,2,3],['a','b'],[true,false,true]).toArray();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param source1 First iterable.
 * @param source2 Second iterable.
 * @returns [T1,T2] sequence.
 * @typeParam T1 First element type.
 * @typeParam T2 Second element type.
 * @category Generators
 */
export function zip<T1, T2>(source1: Iterable<T1>, source2: Iterable<T2>): Seq<[T1, T2]>;

/**
 * Generates a sequence of arrays made by concatenating the elements of multiple sequences one at a time.
 *
 * ```typescript
 * const result1 = zip([1,2,3],['a','b']).toArray();
 * //result1: [[1,'a'],[2,'b']]
 *
 * const result2 = zip([1,2,3],['a','b'],[true,false,true]).toArray();
 * //result2: [[1,'a',true],[2,'b',false]]
 * ```
 *
 * @param sources Sequences.
 * @returns [T] sequence.
 * @typeParam T Element type.
 * @category Generators
 */
export function zip<T>(...sources: Iterable<T>[]): Seq<T[]>;

export function zip(...sources: Iterable<unknown>[]): Seq<unknown> {
  return new Seq(new ZipIterable(sources));
}
