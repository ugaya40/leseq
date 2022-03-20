import {AsyncGen, AsyncOperator, AsyncSeq} from "../../asyncSeq";

/**
 * Returns the sequence in which each element has been transformed by the specified transformation function.
 * However, null or undefined elements are excluded from the sequence.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, null, 4, undefined]).pipe(
 *   mapNotNull(i => i?.toString())
 * ).toArrayAsync();
 * //result: ["1", "2", "4"]
 * ```
 *
 * @param func Transform function.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @typeParam TResult Transformed element type.
 * @category Operators
 */
export const mapNotNullAsync = <T, TResult>(func: (arg: T, index: number) => Promise<TResult>): AsyncOperator<T, NonNullable<TResult>> =>
  async function* mapNotNullAsync(source: AsyncSeq<T>): AsyncGen<NonNullable<TResult>> {
    let count = 0;
    for await (const i of source) {
      const result = await func(i, count);
      if (result !== null && result !== undefined) {
        yield result!!;
      }

      count++;
    }
  };
