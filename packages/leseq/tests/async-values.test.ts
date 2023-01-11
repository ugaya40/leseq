import { everyAsync, findAsync, findOrDefaultAsync, fromAsAsync, reduceAsync, someAsync } from '../src';

test('value: everyAsync true case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(everyAsync(i => i < 6));
  expect(output).toBe(true);
});

test('value: everyAsync false case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(everyAsync(async i => i < 5));
  expect(output).toBe(false);
});

test('value: everyAsync index', async () => {
  const expected = [0,1,2,3,4];
  const actual: number[] = []
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(everyAsync((i,index) => {
    actual.push(index);
    return i < 6
  }));
  expect(output).toBe(true);
  expect(actual).toEqual(expected);
});

test('value: simple findAsync', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findAsync(i => i % 2 == 0));
  expect(output).toBe(2);
});

test('value: findAsync index', async () => {
  const indexes: number[] = [];
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(
    findAsync(async (i, index) => {
      indexes.push(index);
      return i % 2 == 0;
    })
  );
  expect(output).toBe(2);
  expect(indexes).toEqual([0, 1]);
});

test('value: findAsync throw error', async () => {
  await expect(async () => await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findAsync(i => i > 10)))
    .rejects
    .toThrowError(`No elements matching the condition were found.`);
});

test('value: simple findOrDefaultAsync', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findOrDefaultAsync(i => i % 2 == 0));
  expect(output).toBe(2);
});

test('value: findOrDefaultAsync index', async () => {
  const indexes: number[] = [];
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(
    findOrDefaultAsync(async (i, index) => {
      indexes.push(index);
      return i % 2 == 0;
    })
  );
  expect(output).toBe(2);
  expect(indexes).toEqual([0, 1]);
});

test('value: findOrDefaultAsync default case1', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findOrDefaultAsync(i => i > 10));
  expect(output).toBe(undefined);
});

test('value: findOrDefaultAsync default case2', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findOrDefaultAsync(async i => i > 10, 9999));
  expect(output).toBe(9999);
});

test('value: simple reduceAsync', async () => {
  const indexes: number[] = [];
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(
    reduceAsync(100, async (acc, i, index) => {
      indexes.push(index);
      return acc + i;
    })
  );
  expect(indexes).toEqual([0, 1, 2, 3, 4]);
  expect(output).toBe(115);
});

test('value: someAsync true case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(someAsync(i => i == 5));
  expect(output).toBe(true);
});

test('value: someAsync false case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(someAsync(async i => i > 10));
  expect(output).toBe(false);
});

test('value: someAsync index', async () => {
  const expected = [0,1,2,3];
  const actual: number[] = []
  const output = await fromAsAsync([99, 98, 97, 1, 2]).valueAsync(someAsync((i,index) => {
    actual.push(index);
    return i < 5
  }));
  expect(output).toBe(true);
  expect(actual).toEqual(expected);
});
