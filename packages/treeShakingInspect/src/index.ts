import {from, map, range, find} from '../../leseq/dist';

export const test = range(1,100).pipe(
  map(i => i * i)
).value(
  find(i => i == 100)
);