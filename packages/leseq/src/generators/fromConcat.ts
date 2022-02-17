import { from } from './from';
import { Seq } from '../seq';
import { concat } from '../operators/concat';
import { map } from '../operators/map';
import { reduce } from '../values/reduce';

export function fromConcat<T>(...args: (Iterable<T> | Seq<T>)[]): Seq<T> {
  return from(args)
    .pipe(map(source => (source instanceof Seq ? source : from(source)) as Seq<T>))
    .value(reduce(from<T>([]), (result, current) => result.pipe(concat(current))));
}
