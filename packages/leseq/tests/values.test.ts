import { every, find, findOrDefault, from, reduce, sharedSeq, some, tap } from '../src';

test('value: every true case', () => {
  const output = from([1, 2, 3, 4, 5]).value(every(i => i < 6));
  expect(output).toBe(true);
});

test('value: every false case', () => {
  const output = from([1, 2, 3, 4, 5]).value(every(i => i < 5));
  expect(output).toBe(false);
});

test('value: simple find', () => {
  const output = from([1, 2, 3, 4, 5]).value(find(i => i % 2 == 0));
  expect(output).toBe(2);
});

test('value: find index', () => {
  const indexes: number[] = [];
  const output = from([1, 2, 3, 4, 5]).value(
    find((i, index) => {
      indexes.push(index);
      return i % 2 == 0;
    })
  );
  expect(output).toBe(2);
  expect(indexes).toEqual([0, 1]);
});

test('value: find throw error', () => {
  expect(() => from([1, 2, 3, 4, 5]).value(find(i => i > 10))).toThrowError(`No elements matching the condition were found.`);
});

test('value: simple findOrDefault', () => {
  const output = from([1, 2, 3, 4, 5]).value(findOrDefault(i => i % 2 == 0));
  expect(output).toBe(2);
});

test('value: findOrDefault index', () => {
  const indexes: number[] = [];
  const output = from([1, 2, 3, 4, 5]).value(
    findOrDefault((i, index) => {
      indexes.push(index);
      return i % 2 == 0;
    })
  );
  expect(output).toBe(2);
  expect(indexes).toEqual([0, 1]);
});

test('value: findOrDefault default case1', () => {
  const output = from([1, 2, 3, 4, 5]).value(findOrDefault(i => i > 10));
  expect(output).toBe(undefined);
});

test('value: findOrDefault default case2', () => {
  const output = from([1, 2, 3, 4, 5]).value(findOrDefault(i => i > 10, 9999));
  expect(output).toBe(9999);
});

test('value: simple reduce', () => {
  const indexes: number[] = [];
  const output = from([1, 2, 3, 4, 5]).value(
    reduce(100, (acc, i, index) => {
      indexes.push(index);
      return acc + i;
    })
  );
  expect(indexes).toEqual([0, 1, 2, 3, 4]);
  expect(output).toBe(115);
});

test('value: some true case', () => {
  const output = from([1, 2, 3, 4, 5]).value(some(i => i == 5));
  expect(output).toBe(true);
});

test('value: some false case', () => {
  const output = from([1, 2, 3, 4, 5]).value(some(i => i > 10));
  expect(output).toBe(false);
});