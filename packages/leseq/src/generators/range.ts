import { Gen, Seq } from '../seq';

function* rangeInternal(start: number, count: number): Gen<number> {
  let currentCount = 0;
  while (currentCount < count) {
    yield start++;
    currentCount++;
  }
}

/**
 * Generates a sequential number sequence.
 *
 * ```typescript
 * const result = range(5,10).toArray();
 * //result: [5,6,7,8,9,10,11,12,13,14]
 * ```
 *
 * @param start Starting number of sequential numbers.
 * @param count Number of pieces to be generated.
 * @returns Sequence.
 * @category Generators
 *
 */
export function range(start: number, count: number): Seq<number> {
  return new Seq(rangeInternal(start, count));
}
