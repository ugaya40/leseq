import { concat, concatValue, skip, skipWhile, filter, flatten, from, map, orderBy, take, takeWhile, tap, uniq, groupBy, chunk, scan, union, difference, intersect, reverse } from '../src';

test('sec generates readonly array', () => {
  const readOnlyOutput = from([1, 2, 3, 4]).toReadonlyArray();

  // @ts-expect-error Property 'push' does not exist on type 'readonly number[]'.
  readOnlyOutput.push(99);

  expect(readOnlyOutput).toEqual([1, 2, 3, 4, 99]);
});

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

test('operator: simple uniq 1', () => {
  const output = from([1, 1, 2, 3, 2, 1, 3])
    .pipe(uniq())
    .toArray();
  expect(output).toEqual([1, 2, 3]);
});

test('operator: simple uniq 2', () => {
  const output = from([1, 1, 2, 3, 2, 1, 3])
    .pipe(uniq(i => i))
    .toArray();
  expect(output).toEqual([1, 2, 3]);
});

test('operator: uniq value equality 1',() => {
  const source = [
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
    {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
    {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
  ]

  const output = from(source).pipe(uniq(one => one.groupKey),).toArray();

  expect(output).toEqual([
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
    {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
    {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
  ]);
});

test('operator: simple uniq value equality 2',() => {

  const source = [
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
    {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
    {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
  ]

  const comparableValueForKey = (key: {mainKey: number, subKey: string}) => key.mainKey + key.subKey;

  const output = from(source).pipe(uniq(one => one.groupKey,comparableValueForKey)).toArray();

  expect(output).toEqual([
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
    {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
    {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
  ]);
});

test('operator: simple chunk', () => {
  const output = from([1, 2, 3, 4, 5, 6, 7]).pipe(chunk(2)).toArray();
  expect(output).toEqual([[1, 2],[3,4],[5,6],[7]]);
});

test('operator: simple scan', () => {
  const indexes: number[] = [];
  const output = from([1, 2, 3, 4, 5]).pipe(
    scan(100, (acc, i, index) => {
      indexes.push(index);
      return acc + i;
    })
  ).toArray();
  expect(indexes).toEqual([0, 1, 2, 3, 4]);
  expect(output).toEqual([101, 103, 106, 110, 115]);
});

test('operator: simple groupBy',() => {
  const source = [
    {groupKey: 1, value: "test1"},
    {groupKey: 3, value: "test2"},
    {groupKey: 1, value: "test3"},
    {groupKey: 1, value: "test4"},
    {groupKey: 3, value: "test5"},
    {groupKey: 2, value: "test6"}
  ]

  const output = from(source).pipe(groupBy(one => one.groupKey),).toArray();

  expect(output).toEqual([
    {key: 1, values: [{groupKey: 1, value: "test1"}, {groupKey: 1, value: "test3"}, {groupKey: 1, value: "test4"}]},
    {key: 3, values: [{groupKey: 3, value: "test2"}, {groupKey: 3, value: "test5"}]},
    {key: 2, values: [{groupKey: 2, value: "test6"}]}
  ]);
});

test('operator: groupBy value equality 1',() => {

  const source = [
    {groupKey: {groupKey: 1}, value: "test1"},
    {groupKey: {groupKey: 2}, value: "test2"},
    {groupKey: {groupKey: 1}, value: "test3"},
    {groupKey: {groupKey: 1}, value: "test4"},
  ]

  const output = from(source).pipe(groupBy(one => one.groupKey,i => i,k => k.groupKey),).toArray();

  expect(output).toEqual([
    {key: {groupKey: 1}, values: [{groupKey: {groupKey: 1}, value: "test1"}, {groupKey: {groupKey: 1}, value: "test3"},{groupKey: {groupKey: 1}, value: "test4"}]},
    {key: {groupKey: 2}, values: [{groupKey: {groupKey: 2}, value: "test2"}]}
  ]);
});

test('operator: simple union', () => {
  const output = from([1, 2, 3]).pipe(union([2,3,4,5])).toArray();
  expect(output).toEqual([1,2,3,4,5]);
});

test('operator: simple difference', () => {
  const output = from([1, 2, 3, 6]).pipe(difference([2,3,4,5])).toArray();
  expect(output).toEqual([1,6]);
});

test('operator: difference removeDuplicate', () => {
  const output = from([1, 2, 3, 6, 6]).pipe(difference([2,3,4,5],i => i, false)).toArray();
  expect(output).toEqual([1,6,6]);
});

test('operator: simple intersect', () => {
  const output = from([1, 2, 3]).pipe(intersect([2,3,4,5])).toArray();
  expect(output).toEqual([2,3]);
});

test('operator: simple reverse', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(reverse()).toArray();
  expect(output).toEqual([5,4,3,2,1]);
});
