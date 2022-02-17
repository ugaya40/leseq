import { concat, concatValue, skip, skipWhile, filter, flatten, from, map, orderBy, take, takeWhile, tap, uniq } from '../src';

test('operator: simple concat', () => {
  const output = from([1, 2, 3, 4, 5])
    .pipe(concat([6, 7]))
    .toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('operator: simple concatValue', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(concatValue(6)).toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('operator: simple skip', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(skip(2)).toArray();
  expect(output).toEqual([3, 4, 5]);
});

test('operator: skip over count', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(skip(10)).toArray();
  expect(output).toEqual([]);
});

test('operator: simple skipWhile', () => {
  const output = from([2, 4, 5, 6, 7, 8])
    .pipe(skipWhile(i => i % 2 == 0))
    .toArray();
  expect(output).toEqual([5, 6, 7, 8]);
});

test('operator: simple filter', () => {
  const output = from([2, 4, 5, 6, 7, 8])
    .pipe(filter(i => i % 2 == 0))
    .toArray();
  expect(output).toEqual([2, 4, 6, 8]);
});

test('operator: filter index', () => {
  const indexes: number[] = [];
  const output = from([2, 4, 5, 6, 7, 8])
    .pipe(
      filter((i, index) => {
        indexes.push(index);
        return i % 2 == 0;
      })
    )
    .toArray();
  expect(output).toEqual([2, 4, 6, 8]);
  expect(indexes).toEqual([0, 1, 2, 3, 4, 5]);
});

test('operator: simple flatten', () => {
  const output = from([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
    .pipe(flatten(i => i))
    .toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('operator: flatten index', () => {
  const indexes: number[] = [];
  const output = from([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
    .pipe(
      flatten((i, index) => {
        indexes.push(index);
        return i;
      })
    )
    .toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
  expect(indexes).toEqual([0, 1, 2]);
});

test('operator: simple map', () => {
  const output = from([1, 2, 3])
    .pipe(map(i => i * i))
    .toArray();
  expect(output).toEqual([1, 4, 9]);
});

test('operator: map index', () => {
  const indexes: number[] = [];
  const output = from([1, 2, 3])
    .pipe(
      map((i, index) => {
        indexes.push(index);
        return i * i;
      })
    )
    .toArray();
  expect(output).toEqual([1, 4, 9]);
  expect(indexes).toEqual([0, 1, 2]);
});

test('operator: orderBy asc', () => {
  const output = from([6, 3, 2, 1, 4, 5])
    .pipe(orderBy(i => i))
    .toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('operator: orderBy desc', () => {
  const output = from([6, 3, 2, 1, 4, 5])
    .pipe(orderBy(i => i, 'desc'))
    .toArray();
  expect(output).toEqual([6, 5, 4, 3, 2, 1]);
});

test('operator: orderBy keySelector', () => {
  const output = from([
    [3, 9],
    [2, 1],
    [4, 0],
  ])
    .pipe(orderBy(i => Math.max(...i)))
    .toArray();
  expect(output).toEqual([
    [2, 1],
    [4, 0],
    [3, 9],
  ]);
});

test('operator: orderBy compareFunction1', () => {
  const output = from([1, 2, 3, 4, 5, 6])
    .pipe(
      orderBy(
        i => i,
        'asc',
        (a, b) => {
          if (a < b) return 1;
          if (a > b) return -1;
          return 0;
        }
      )
    )
    .toArray();
  expect(output).toEqual([6, 5, 4, 3, 2, 1]);
});

test('operator: orderBy compareFunction2', () => {
  const originalCompareFunction = (a: number, b:number) => {
    if(a % 2 < b % 2) return - 1;
    if(a % 2 > b % 2) return 1;
    return 0;
  }
  
  const output = from([4,1,5,3,2]).pipe(
    orderBy(i => i, 'asc', originalCompareFunction)
  ).toArray();
  expect(output).toEqual([4,2,1,5,3]);
});

test('operator: simple take', () => {
  const output = from([1, 2, 3, 4, 5, 6]).pipe(take(2)).toArray();
  expect(output).toEqual([1, 2]);
});

test('operator: take over count', () => {
  const output = from([1, 2, 3, 4, 5, 6]).pipe(take(10)).toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('operator: simple takeWhile', () => {
  const output = from([2, 4, 5, 6, 7, 8])
    .pipe(takeWhile(i => i % 2 == 0))
    .toArray();
  expect(output).toEqual([2, 4]);
});

test('operator: simple tap', () => {
  const sideEffects: number[] = [];
  const output = from([1, 2, 3])
    .pipe(tap(i => sideEffects.push(i * i)))
    .toArray();
  expect(output).toEqual([1, 2, 3]);
  expect(sideEffects).toEqual([1, 4, 9]);
});

test('operator: tap index', () => {
  const indexes: number[] = [];
  const sideEffects: number[] = [];
  const output = from([1, 2, 3])
    .pipe(
      tap((i, index) => {
        indexes.push(index);
        sideEffects.push(i * i);
      })
    )
    .toArray();
  expect(output).toEqual([1, 2, 3]);
  expect(indexes).toEqual([0, 1, 2]);
  expect(sideEffects).toEqual([1, 4, 9]);
});

test('operator: simple uniq', () => {
  const output = from([1, 1, 2, 3, 2, 1, 3])
    .pipe(uniq(i => i))
    .toArray();
  expect(output).toEqual([1, 2, 3]);
});
