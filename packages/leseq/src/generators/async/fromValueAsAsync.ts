import { AsyncSeq } from '../../asyncSeq';

export function fromValueAsAsync<T>(element: T): AsyncSeq<T> {
  return new AsyncSeq([element]);
}
