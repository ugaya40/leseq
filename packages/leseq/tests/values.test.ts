import { every, find, findOrDefault, from, reduce, some } from '../src';

test('operator: every true case', () => {
  const output = from([1, 2, 3, 4, 5]).value(every(i => i < 6));
  expect(output).toBe(true);
});

test('operator: every false case', () => {
  const output = from([1, 2, 3, 4, 5]).value(every(i => i < 5));
  expect(output).toBe(false);
});

test('operator: simple find', () => {
  const output = from([1, 2, 3, 4, 5]).value(find(i => i % 2 == 0));
  expect(output).toBe(2);
});

test('operator: find index', () => {
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

test('operator: find throw error', () => {
  expect(() => from([1, 2, 3, 4, 5]).value(find(i => i > 10))).toThrowError(`No elements matching the condition were found.`);
});

test('operator: simple findOrDefault', () => {
  const output = from([1, 2, 3, 4, 5]).value(findOrDefault(i => i % 2 == 0));
  expect(output).toBe(2);
});

test('operator: findOrDefault index', () => {
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

test('operator: findOrDefault default case1', () => {
  const output = from([1, 2, 3, 4, 5]).value(findOrDefault(i => i > 10));
  expect(output).toBe(undefined);
});

test('operator: findOrDefault default case2', () => {
  const output = from([1, 2, 3, 4, 5]).value(findOrDefault(i => i > 10, 9999));
  expect(output).toBe(9999);
});

test('operator: simple reduce', () => {
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

test('operator: some true case', () => {
  const output = from([1, 2, 3, 4, 5]).value(some(i => i == 5));
  expect(output).toBe(true);
});

test('operator: some false case', () => {
  const output = from([1, 2, 3, 4, 5]).value(some(i => i > 10));
  expect(output).toBe(false);
});
