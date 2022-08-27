import { AsyncGen, AsyncSeq, AllIterables } from '../../AsyncSeq';

async function* fromConcatAsAsyncInternal<T>(args: (Iterable<T> | AsyncIterable<T>)[]): AsyncGen<T> {
  for (const one of args) {
    yield* one;
  }
}

/**
 * Generates a concatenated sequence of multiple iterable/async iterable objects.
 *
 * ```typescript
 * const result = await fromConcatAsAsync([1,2],[3,4,5]).toArrayAsync();
 * //result: [1,2,3,4,5]
 * ```
 *
 * @param args Enumerable sources.
 * @returns Sequence.
 * @typeParam T Source element type.
 * @category Async Generators
 */
export function fromConcatAsAsync<T>(...args: AllIterables<T>[]): AsyncSeq<T> {
  return new AsyncSeq(fromConcatAsAsyncInternal(args));
}
