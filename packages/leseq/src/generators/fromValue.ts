import { Seq } from '../seq';

export function fromValue<T>(source: T): Seq<T> {
  return new Seq([source]);
}
