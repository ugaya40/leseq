import { fromAsAsync, fromValueAsAsync, tapAsync, fromConcatAsAsync, rangeAsAsync, repeatAsASync } from '../src';
import { abortableSleep } from './testUtil';

test('generator: simple fromAsync', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).pipe(tapAsync(async () => abortableSleep(100))).toArrayAsync();
  expect(output).toEqual([1, 2, 3, 4, 5]);
});

test('generator: simple fromValueAsync', async () => {
  const output = await fromValueAsAsync(1).pipe(tapAsync(async () => abortableSleep(100))).toArrayAsync();
  expect(output).toEqual([1]);
});

test('generator: simple fromConcatAsync 1', async () => {
  const output = await fromConcatAsAsync([1, 2], [3, 4], [5, 6]).pipe(tapAsync(async () => abortableSleep(100))).toArrayAsync();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('generator: simple fromConcatAsync 2', async () => {
  const asyncSource = fromAsAsync([3,4]).pipe(tapAsync(async () => abortableSleep(100)));
  const output = await fromConcatAsAsync([1, 2], asyncSource, [5, 6]).toArrayAsync();
  expect(output).toEqual([1, 2, 3, 4, 5, 6]);
});

test('generator: simple rangeAsync', async () => {
  const output = await rangeAsAsync(100, 3).pipe(tapAsync(async () => abortableSleep(100))).toArrayAsync();
  expect(output).toEqual([100, 101, 102]);
});

test('generator: simple repeatAsync', async () => {
  const output = await repeatAsASync(100, 3).pipe(tapAsync(async () => abortableSleep(100))).toArrayAsync();
  expect(output).toEqual([100, 100, 100]);
});
