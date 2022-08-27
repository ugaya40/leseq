import { AsyncSeq, AllIterables } from '../../AsyncSeq';
import { AsyncDeferIterable } from '../../utils/AsyncDeferIterable';
import { PromiseIterable } from '../../utils/PromiseIterable';

/**
 * Generates a sequence whose values are the result of a single Promise or multiple Promises executed sequentially.
 *
 * ```typescript
 * const sleepAndRandom = (ms: number) => new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 100)),ms));
 *
 * const result1 = await deferFromPromise(async () => await sleepAndRandom(1000)).pipe(repeatAsync(3)).toArrayAsync();
 * //3 seconds later...result1: [72,14,91]
 * //sleepAndRandom is executed every time.
 * ```
 *
 * @param sourceFactory Function that returns Promise or multiple enumerable Promises.
 * @returns A sequence in which the generation of sources is delayed until the actual enumeration begins.
 * @typeParam T Source element type.
 * @category Async Generators
 *
 */

//コメントまだだよ
export function deferFromPromise<T>(sourceFactory: () => Promise<T> | AllIterables<Promise<T>>): AsyncSeq<T> {
  return new AsyncSeq(
    new PromiseIterable(
      new AsyncDeferIterable(() => {
        const result = sourceFactory();
        if (Symbol.iterator in result || Symbol.asyncIterator in result) {
          return result as AllIterables<Promise<T>>;
        } else {
          return [result as Promise<T>];
        }
      })
    )
  );
}
