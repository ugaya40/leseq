import {from, map, take, find,filter} from 'leseq';

export const result1 = from([1,2,3,4,5]).pipe(
  map(i => i * i),
  take(3)
).toArray();

//result1: [1,4,9]

export const result2 = from([1,2,3,4,5]).pipe(
  filter(i => i % 2 == 0)
).value(
  find(i => i > 2)
);

//result2: 4