import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Invokes a specified action after the source iterable sequence terminates gracefully or exceptionally.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   takeAsync(3),
 *   finalizeAsync(async () => console.log('finalized'))
 * ).toArrayAsync();
 *
 * //result: [1,2,3]
 * //console: finalized
 * ```
 *
 * ```typescript
 * const source = fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   takeAsync(3),
 *   finalizeAsync(async () => console.log('finalized'))
 * );
 *
 * for await (const one of source) {
 *   console.log(one)
 * }
 *
 * //console: 1
 * //console: 2
 * //console: 3
 * //console: finalized
 * ```
 *
 * **break**
 * ```typescript
 * const source = fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   takeAsync(3),
 *   finalizeAsync(async () => console.log('finalized'))
 * );
 *
 * for await (const one of source) {
 *   console.log(one)
 *   if(one == 2) break;
 * }
 *
 * //console: 1
 * //console: 2
 * //console: finalized
 * ```
 *
 * **value**
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   takeAsync(3),
 *   finalizeAsync(async () => console.log('finalized'))
 * ).valueAsync(findAsync(async i => i == 2));
 *
 * //result: 2
 * //console: finalized
 * ```
 *
 * **error**
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   takeAsync(3),
 *   tapAsync(async () => {throw new Error('test')}),
 *   finalizeAsync(async () => console.log('finalized'))
 * ).toArrayAsync();
 *
 * //console: finalized
 * ```
 *
 * @param action finalize action.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export const finalizeAsync = <T>(action: () => Promise<void>): AsyncOperator<T> =>
  async function* finalizeAsync(source: AsyncSeq<T>): AsyncGen<T> {
    try {
      yield* source;
    } finally {
      await action();
    }
  };
