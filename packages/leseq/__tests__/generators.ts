import { from, fromValue, fromConcat, range } from '../src';

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
