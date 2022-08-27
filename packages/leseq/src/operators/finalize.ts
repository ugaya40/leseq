import { Gen, Operator, Seq } from '../Seq';

/**
 * Invokes a specified action after the source iterable sequence terminates gracefully or exceptionally.
 *
 * ```typescript
 * const result = from([1, 2, 3, 4, 5]).pipe(
 *   take(3)
 *   finalize(() => console.log('finalized'))
 * ).toArray();
 *
 * //result: [1,2,3]
 * //console: finalized
 * ```
 *
 * ```typescript
 * const source = from([1, 2, 3, 4, 5]).pipe(
 *   take(3)
 *   finalize(() => console.log('finalized'))
 * );
 *
 * for(const one of source) {
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
 * const source = from([1, 2, 3, 4, 5]).pipe(
 *   take(3)
 *   finalize(() => console.log('finalized'))
 * );
 *
 * for(const one of source) {
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
 * const result = from([1, 2, 3, 4, 5]).pipe(
 *   take(3)
 *   finalize(() => console.log('finalized'))
 * ).value(find(i == 2));
 *
 * //result: 2
 * //console: finalized
 * ```
 *
 * **error**
 * ```typescript
 * const result = from([1, 2, 3, 4, 5]).pipe(
 *   take(3)
 *   tap(() => {throw new Error('test')})
 *   finalize(() => console.log('finalized'))
 * ).toArray();
 *
 * //console: finalized
 * ```
 *
 * @param action finalize action.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Operators
 */
export const finalize = <T>(action: () => void): Operator<T> =>
  function* finalize(source: Seq<T>): Gen<T> {
    try {
      yield* source;
    } finally {
      action();
    }
  };
