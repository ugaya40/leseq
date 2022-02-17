import { find, from, some, take, takeWhile } from '../src';

function createTestIterator(start: number, count: number) {
  const readed: number[] = [];
  const seq = {
    [Symbol.iterator]: () => {
      readed.splice(0);
      let current = start;
      return {
        next: () => {
          const result = {
            value: current == start + count ? Number.NaN : current,
            done: current == start + count,
          };
          if(current != start + count) readed.push(current);
          current++;
          return result;
        },
      };
    },
  };

  return { seq, readed };
}

test('operator: take lazyEvaluation', () => {
  const {seq,readed} = createTestIterator(1,10);
  
  from(seq).pipe(take(3)).toArray();
  expect(readed).toEqual([1, 2, 3]);
});

test('operator: takeWhile lazyEvaluation', () => {
  const {seq,readed} = createTestIterator(1,10);
  
  from(seq).pipe(takeWhile(i => i < 4)).toArray();
  expect(readed).toEqual([1, 2, 3, 4]);
});

test('value: find lazyEvaluation', () => {
  const {seq,readed} = createTestIterator(1,10);
  
  from(seq).value(find(i => i == 5));
  expect(readed).toEqual([1, 2, 3, 4, 5]);
});

test('value: findOrDefault lazyEvaluation', () => {
  const {seq,readed} = createTestIterator(1,10);
  
  from(seq).value(find(i => i == 5));
  expect(readed).toEqual([1, 2, 3, 4, 5]);
});

test('value: some lazyEvaluation', () => {
  const {seq,readed} = createTestIterator(1,10);
  
  from(seq).value(some(i => i == 5));
  expect(readed).toEqual([1, 2, 3, 4, 5]);
});


