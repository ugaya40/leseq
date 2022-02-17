import { Seq } from '../seq';

export function from<T>(source: Iterable<T>): Seq<T> {
  return new Seq(source);
}
