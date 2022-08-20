import { fromAsAsync, fromValueAsAsync, tapAsync, fromConcatAsAsync, rangeAsAsync, repeatAsAsync, zipAsAsync, finalizeAsync, takeAsync } from '../src';
import { abortableSleep, performanceAsync } from './testUtil';

test('generator: simple fromAsync', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).pipe(tapAsync(async () => await abortableSleep(20))).toArrayAsync();
  expect(output).toEqual([1, 2, 3, 4, 5]);
});

test('generator: simple fromValueAsync', async () => {
  const output = await fromValueAsAsync(1).pipe(tapAsync(async () => await abortableSleep(20))).toArrayAsync();
  expect(output).toEqual([1]);
});

test('generator: simple fromConcatAsync 1', async () => {
  const output = await fromConcatAsAsync([1, 2], [3, 4], [5, 6]).pipe(tapAsync(async () => await abortableSleep(20))).toArrayAsync();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('generator: simple fromConcatAsync 2', async () => {
  const asyncSource = fromAsAsync([3,4]).pipe(tapAsync(async () => await abortableSleep(20)));
  const output = await fromConcatAsAsync([1, 2], asyncSource, [5, 6]).toArrayAsync();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('generator: simple rangeAsync', async () => {
  const output = await rangeAsAsync(100, 3).pipe(tapAsync(async () => await abortableSleep(20))).toArrayAsync();
  expect(output).toEqual([100, 101, 102]);
});

test('generator: simple repeatAsync', async () => {
  const output = await repeatAsAsync(100, 3).pipe(tapAsync(async () => await abortableSleep(20))).toArrayAsync();
  expect(output).toEqual([100, 100, 100]);
});

test('generator: simple zipAsAsync 1', async () => {
  const [output,time] = await performanceAsync(async () =>
    await zipAsAsync(
      fromAsAsync([1,2,3,4,5]).pipe(tapAsync(async () => await abortableSleep(30))),
      fromAsAsync([11,12,13]).pipe(tapAsync(async () => await abortableSleep(20))),
      fromAsAsync([101,102,103,104,105]).pipe(tapAsync(async () => await abortableSleep(40)))
    ).toArrayAsync()
  );

  expect(output).toEqual([[1,11,101],[2,12,102],[3,13,103]]);
  expect(time > 160 && time < 200).toBe(true);
});

test('generator: simple zipAsAsync 2', async () => {
  const output = await zipAsAsync([],[11,12,13],[101,102,103,104]).toArrayAsync();
  expect(output).toEqual([]);
});

test('generator: simple zipAsAsync 3', async () => {
  const output = await zipAsAsync().toArrayAsync();
  expect(output).toEqual([]);
});

test('generator: simple zipAsAsync 4', async () => {
  const output = await zipAsAsync([1,2,3,4]).toArrayAsync();
  expect(output).toEqual([[1],[2],[3],[4]]);
});

test('generator: simple zipAsAsync 5', async() => {
  const output = await zipAsAsync([1,2,3,4],["a","b","c"],[true,false,true,false]).toArrayAsync();
  expect(output).toEqual([[1,"a",true],[2,"b",false],[3,"c",true]]);
});


test('generator: finalize zipAsAsync 1', async () => {
  const finalized: true[] = [];

  const output = await zipAsAsync(
    fromAsAsync([1,2,3,4]).pipe(finalizeAsync(async () => {finalized.push(true)})),
    fromAsAsync([11,12,13]).pipe(finalizeAsync(async () => {finalized.push(true)})),
    fromAsAsync([101,102,103,104]).pipe(finalizeAsync(async () => {finalized.push(true)})),
  ).pipe(
    finalizeAsync(async () => {finalized.push(true)})
  ).toArrayAsync();

  expect(output).toEqual([[1,11,101],[2,12,102],[3,13,103]]);
  expect(finalized.length).toEqual(4);
});

test('generator: finalize zipAsAsync 2', async () => {
  const finalized: true[] = [];

  const output = await zipAsAsync(
    fromAsAsync([1,2,3,4]).pipe(finalizeAsync(async () => {finalized.push(true)})),
    fromAsAsync([11,12,13]).pipe(finalizeAsync(async () => {finalized.push(true)})),
    fromAsAsync([101,102,103,104]).pipe(finalizeAsync(async () => {finalized.push(true)})),
  ).pipe(
    takeAsync(1),
    finalizeAsync(async () => {finalized.push(true)})
  ).toArrayAsync();

  expect(output).toEqual([[1,11,101]]);
  expect(finalized.length).toEqual(4);
});
