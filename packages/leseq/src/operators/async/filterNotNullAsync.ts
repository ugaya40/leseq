import {AsyncGen, AsyncOperator, AsyncSeq} from "../../asyncSeq";

/**
 * Returns a sequence that excludes null and undefined from the current sequence.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, null, undefined, 5]).pipe(
 *   filterNotNull()
 * ).toArrayAsync();
 * //result: [1,2,5]
 * ```
 *
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const filterNotNullAsync = <T>(): AsyncOperator<T, NonNullable<T>> =>
  async function* filterNotNullAsync(source: AsyncSeq<T>): AsyncGen<NonNullable<T>> {
    for await (const i of source) {
      if (i !== null && i !== undefined) {
        yield i!!;
      }
    }
  };
