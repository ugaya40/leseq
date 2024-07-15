import { catchError, chunk, chunkByAccumulation, concat, concatValue, difference, every, filter, finalize, find, flatten, from, fromValue, groupBy, intersect, map, orderBy, repeat, reverse, scan, skip, skipWhile, take, takeWhile, tap, union, uniq, zipWith } from '../src';

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

test('operator: filter with User Defined Type Guard', () => {
  const output = from([1,'a',2,'b'])
    .pipe(
      filter<number | string, string>((i): i is string => typeof i === 'string')
    )
    .toArray();
  expect(output).toEqual(['a','b']);
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

test('operator: orderBy is not mutate operation', () => {
  const source = [6, 3, 2, 1, 4, 5];
  const sourceCopy = source.slice();

  const output = from(source)
    .pipe(orderBy(i => i))
    .toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
  expect(source).toEqual(sourceCopy);
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

test('operator: simple chunk just end', () => {
  const output = from([1, 2, 3, 4, 5, 6, 7, 8]).pipe(chunk(2)).toArray();
  expect(output).toEqual([[1, 2],[3,4],[5,6],[7,8]]);
});

test('operator: simple chunkByAccumulation', () => {
  const output = from([1, 2, 3, 4, 5, 6, 7]).pipe(
    chunkByAccumulation(0, (acc, i) => {
      return acc + i;
    }, acc => acc % 2 !== 0)
  ).toArray();
  expect(output).toEqual([[1, 2],[3,4],[5,6],[7]]);
});

test('operator: chunkByAccumulation no result', () => {
  const output = from([1, 2, 3, 4, 5, 6, 7]).pipe(
    chunkByAccumulation(0, (acc, i) => {
      return acc + i;
    }, acc => acc > 10)
  ).toArray();
  expect(output).toEqual([]);
});

test('operator: chunkByAccumulation abort', () => {
  const output = from([1, 2, 3, 4, 5, 6, 7]).pipe(
    chunkByAccumulation(0, (acc, i) => {
      return acc + i;
    }, acc => acc < 4)
  ).toArray();
  expect(output).toEqual([[1,2],[3]]);
});

test('operator: chunkByAccumulation just end', () => {
  const output = from([1, 2, 3, 4, 5, 6, 7, 8]).pipe(
    chunkByAccumulation(0, (acc, i) => {
      return acc + i;
    }, acc => acc % 2 !== 0)
  ).toArray();
  expect(output).toEqual([[1, 2],[3,4],[5,6],[7,8]]);
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

test('operator: simple finalize for syntax 1', () => {
  const output: number[] = [];
  let finalized = false;
  const source = from([1, 2, 3, 4, 5]).pipe(
    finalize(() => finalized = true)
  );
  for(const one of source) {
    output.push(one);
  }
  expect(output).toEqual([1,2,3,4,5]);
  expect(finalized).toBe(true);
});

test('operator: simple finalize for syntax 2', () => {
  const output: number[] = [];
  let finalized = false;
  const source = from([1, 2, 3, 4, 5]).pipe(
    take(3),
    finalize(() => finalized = true)
  );
  for(const one of source) {
    output.push(one);
  }
  expect(output).toEqual([1,2,3]);
  expect(finalized).toBe(true);
});

test('operator: simple finalize break', () => {
  const output: number[] = [];
  let finalized = false;
  const source = from([1, 2, 3, 4, 5]).pipe(
    take(4),
    finalize(() => finalized = true)
  );
  for(const one of source) {
    output.push(one);
    if(one == 2) break;
  }
  expect(output).toEqual([1,2]);
  expect(finalized).toBe(true);
});

test('operator: simple finalize toArray', () => {
  let finalized = false;

  const output = from([1, 2, 3, 4, 5]).pipe(
    take(4),
    finalize(() => finalized = true)
  ).toArray();
  
  expect(output).toEqual([1,2,3,4]);
  expect(finalized).toBe(true);
});

test('operator: simple finalize value 1', () => {
  let finalized = false;

  const output = from([1, 2, 3, 4, 5]).pipe(
    take(4),
    finalize(() => finalized = true)
  ).value(find(i => i == 3));
  
  expect(output).toBe(3);
  expect(finalized).toBe(true);
});

test('operator: simple finalize value 2', () => {
  let finalized = false;

  const output = from([1, 2, 3, 4, 5]).pipe(
    take(4),
    finalize(() => finalized = true)
  ).value(every(i => i < 10));
  
  expect(output).toBe(true);
  expect(finalized).toBe(true);
});

test('operator: simple finalize error 1', () => {
  let finalized = false;

  const output = from([1, 2, 3, 4, 5]).pipe(
    tap(() => {throw new Error('test')}),
    take(4),
    finalize(() => finalized = true)
  );
  expect(() => output.toArray()).toThrow();
  expect(finalized).toBe(true);
});

test('operator: simple finalize error 2', () => {
  let finalized = false;

  const output = from([1, 2, 3, 4, 5]).pipe(
    take(4),
    finalize(() => finalized = true),
    tap(() => {throw new Error('test')}),
  );
  expect(() => output.toArray()).toThrow();
  expect(finalized).toBe(true);
});

test('operator: simple finalize error 3', () => {
  const finalized: true[] = [];

  const output = from([1, 2, 3, 4, 5]).pipe(
    take(4),
    finalize(() => finalized.push(true)),
    tap(() => {throw new Error('test')}),
    finalize(() => finalized.push(true)),
  );
  expect(() => output.toArray()).toThrow();
  expect(finalized).toEqual([true, true]);
});

test('operator: simple zipWith 1', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(
    zipWith([11,12,13],[101,102,103,104]),
  ).toArray();
  expect(output).toEqual([[1,11,101],[2,12,102],[3,13,103]]);
});

test('operator: simple zipWith 2', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(
    zipWith([],[101,102,103,104]),
  ).toArray();
  expect(output).toEqual([]);
});

test('operator: simple zipWith 3', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(
    zipWith([]),
  ).toArray();
  expect(output).toEqual([]);
});

test('operator: simple zipWith 4', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(
    zipWith(),
  ).toArray();
  expect(output).toEqual([]);
});

test('operator: simple zipWith 5', () => {
  const output = from([1, 2, 3, 4, 5]).pipe(
    zipWith(["a","b","c"],[true,false,true,false]),
  ).toArray();
  expect(output).toEqual([[1,"a",true],[2,"b",false],[3,"c",true]]);
});

test('operator: finalize zipWith 1', () => {
  const finalized: true[] = [];

  const output = from([1,2,3,4]).pipe(
    finalize(() => finalized.push(true)),
    zipWith(
      from([11,12,13]).pipe(finalize(() => finalized.push(true))),
      from([101,102,103,104]).pipe(finalize(() => finalized.push(true))),
    )
  ).pipe(
    finalize(() => finalized.push(true))
  ).toArray();

  expect(output).toEqual([[1,11,101],[2,12,102],[3,13,103]]);
  expect(finalized.length).toEqual(4);
});

test('operator: finalize zipWith 2', () => {
  const finalized: true[] = [];

  const output = from([1,2,3,4]).pipe(
    finalize(() => finalized.push(true)),
    zipWith(
      from([11,12,13]).pipe(finalize(() => finalized.push(true))),
      from([101,102,103,104]).pipe(finalize(() => finalized.push(true))),
    )
  ).pipe(
    take(1),
    finalize(() => finalized.push(true))
  ).toArray();

  expect(output).toEqual([[1,11,101]]);
  expect(finalized.length).toEqual(4);
});

test('operator: simple repeat 1', () => {
  const output = fromValue(100).pipe(repeat(3)).toArray();
  expect(output).toEqual([100, 100, 100]);
});

test('operator: simple repeat 2', () => {
  const output = from([1,2,3]).pipe(repeat(3)).toArray();
  expect(output).toEqual([1,2,3,1,2,3,1,2,3]);
});

test('operator: simple catchError 1', () => {
  let caught  = false;
  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error();
    }),
    catchError((e) => {
      caught = true;
    })
  ).toArray();

  expect(output).toEqual([1]);
  expect(caught).toBe(true);
});

test('operator: simple catchError 2', () => {
  let caught  = false;
  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error();
    }),
    catchError(() => {
      caught = true;
      return [4,5,6]
    })
  ).toArray();
  expect(output).toEqual([1,4,5,6]);
  expect(caught).toBe(true);
});

test('operator: simple catchError 3', () => {
  let caught  = false;
  let errorMessage = '';
  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error('error occurred');
    }),
    catchError((e) => {
      caught = true;
      if(e instanceof Error){
        errorMessage = e.message;
      }
      return [4,5,6]
    })
  ).toArray();
  expect(output).toEqual([1,4,5,6]);
  expect(caught).toBe(true);
  expect(errorMessage).toBe('error occurred');
});

test('operator: simple catchError different type', () => {
  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error();
    }),
    catchError(() => ['a', 'b', 'c'])
  ).toArray();
  expect(output).toEqual([1, 'a', 'b', 'c']);
});

test('operator: finalize catchError 1', () => {
  let caught  = false;
  let finalized = false;
  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error();
    }),
    catchError(() => {caught = true;}),
    finalize(() => {finalized = true;})
  ).toArray();
  expect(output).toEqual([1]);
  expect(caught).toBe(true);
  expect(finalized).toBe(true);
});

test('operator: finalize catchError 2', () => {
  let caught  = false;
  let mainFinalized = false;
  let alternativeFinalized = false;
  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error();
    }),
    catchError(() => {
      caught = true;
      return from([4,5,6]).pipe(finalize(() =>{alternativeFinalized = true}))
    }),
    finalize(() => {mainFinalized = true;})
  ).toArray();
  expect(output).toEqual([1,4,5,6]);
  expect(caught).toBe(true);
  expect(mainFinalized).toBe(true);
  expect(alternativeFinalized).toBe(true);
});

test('operator: nested catchError', () => {
  let mainFinalized = false;
  let alternative1Finalized = false;
  let alternative2Finalized = false;
  let alternative3Finalized = false;
  const alternative2 = from([7,8,9]).pipe(
    tap(i => {
      if(i === 8) throw new Error();
    }),
    catchError(() => from([10,11,12]).pipe(finalize(() => {alternative3Finalized = true}))),
    finalize(() => {alternative2Finalized = true})
  );

  const alternative1 = from([4,5,6]).pipe(
    tap(i => {
      if(i === 5) throw new Error();
    }),
    catchError(() => alternative2),
    finalize(() => {alternative1Finalized = true})
  );

  const output = from([1,2,3]).pipe(
    tap(i => {
      if(i === 2) throw new Error();
    }),
    catchError(() => alternative1),
    finalize(() => {mainFinalized = true})
  ).toArray();

  expect(output).toEqual([1,4,7,10,11,12]);
  expect(mainFinalized).toBe(true);
  expect(alternative1Finalized).toBe(true);
  expect(alternative2Finalized).toBe(true);
  expect(alternative3Finalized).toBe(true);
});
