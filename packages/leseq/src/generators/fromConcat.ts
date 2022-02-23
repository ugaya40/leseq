import { from } from './from';
import { Seq } from '../seq';
import { concat } from '../operators/concat';
import { map } from '../operators/map';
import { reduce } from '../values/reduce';

/**
 * Generates a concatenated sequence of multiple iterable objects.
 *
 * ```typescript
 * const result = fromConcat([1,2],[3,4,5]).toArray();
 * //result: [1,2,3,4,5]
 * ```
 *
 * @param args Enumerable sources.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Generators
 *
 */
export function fromConcat<T>(...args: Iterable<T>[]): Seq<T> {
  return from(args)
    .pipe(map(source => (source instanceof Seq ? source : from(source)) as Seq<T>))
    .value(reduce(from<T>([]), (result, current) => result.pipe(concat(current))));
}
