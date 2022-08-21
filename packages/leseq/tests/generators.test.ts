import { from, fromValue, fromConcat, range, zip, finalize,take } from '../src';

test('generator: simple from', () => {
  const output = from([1, 2, 3, 4, 5]).toArray();
  expect(output).toEqual([1, 2, 3, 4, 5]);
});

test('generator: simple fromValue', () => {
  const output = fromValue(1).toArray();
  expect(output).toEqual([1]);
});

test('generator: simple fromConcat', () => {
  const output = fromConcat([1, 2], [3, 4], [5, 6]).toArray();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('generator: simple range', () => {
  const output = range(100, 3).toArray();
  expect(output).toEqual([100, 101, 102]);
});

test('generator: simple zip 1', () => {
  const output = zip([1,2,3,4],[11,12,13],[101,102,103,104]).toArray();
  expect(output).toEqual([[1,11,101],[2,12,102],[3,13,103]]);
});


test('generator: simple zip 2', () => {
  const output = zip([],[11,12,13],[101,102,103,104]).toArray();
  expect(output).toEqual([]);
});

test('generator: simple zip 3', () => {
  const output = zip().toArray();
  expect(output).toEqual([]);
});

test('generator: simple zip 4', () => {
  const output = zip([1,2,3,4]).toArray();
  expect(output).toEqual([[1],[2],[3],[4]]);
});

test('generator: simple zip 5', () => {
  const output = zip([1,2,3,4],["a","b","c"],[true,false,true,false]).toArray();
  expect(output).toEqual([[1,"a",true],[2,"b",false],[3,"c",true]]);
});

test('generator: finalize zip 1', () => {
  const finalized: true[] = [];

  const output = zip(
    from([1,2,3,4]).pipe(finalize(() => finalized.push(true))),
    from([11,12,13]).pipe(finalize(() => finalized.push(true))),
    from([101,102,103,104]).pipe(finalize(() => finalized.push(true))),
  ).pipe(
    finalize(() => finalized.push(true))
  ).toArray();

  expect(output).toEqual([[1,11,101],[2,12,102],[3,13,103]]);
  expect(finalized.length).toEqual(4);
});

test('generator: finalize zip 2', () => {
  const finalized: true[] = [];

  const output = zip(
    from([1,2,3,4]).pipe(finalize(() => finalized.push(true))),
    from([11,12,13]).pipe(finalize(() => finalized.push(true))),
    from([101,102,103,104]).pipe(finalize(() => finalized.push(true))),
  ).pipe(
    take(1),
    finalize(() => finalized.push(true))
  ).toArray();

  expect(output).toEqual([[1,11,101]]);
  expect(finalized.length).toEqual(4);
});
