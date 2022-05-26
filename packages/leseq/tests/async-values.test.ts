import { every, everyAsync, find, findAsync, findOrDefault, findOrDefaultAsync, from, fromAsAsync, reduce, reduceAsync, some, someAsync, tapAsync, toShareAsync } from '../src';
import { abortableSleep } from './testUtil';

test('value: everyAsync true case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(everyAsync(async i => i < 6));
  expect(output).toBe(true);
});

test('value: everyAsync false case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(everyAsync(async i => i < 5));
  expect(output).toBe(false);
});

test('value: simple findAsync', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findAsync(async i => i % 2 == 0));
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
  await expect(async () => await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findAsync(async i => i > 10)))
    .rejects
    .toThrowError(`No elements matching the condition were found.`);
});

test('value: simple findOrDefaultAsync', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findOrDefaultAsync(async i => i % 2 == 0));
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
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(findOrDefaultAsync(async i => i > 10));
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
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(someAsync(async i => i == 5));
  expect(output).toBe(true);
});

test('value: someAsync false case', async () => {
  const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(someAsync(async i => i > 10));
  expect(output).toBe(false);
});

test('value: simple share 1', async () => {
  const seq = fromAsAsync([1, 2, 3]).valueAsync(toShareAsync());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  const output5: number[] = [];
  for await (const one of seq) {
    output1.push(one);
    break;
  }
  for await (const one of seq) {
    output2.push(one);
    break;
  }
  for await (const one of seq) {
    output3.push(one);
    break;
  }
  for await (const one of seq) {
    output4.push(one);
  }
  seq.reset();
  for await (const one of seq) {
    output5.push(one);
  }
  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([3]);
  expect(output4).toEqual([]);
  expect(output5).toEqual([1,2,3]);
});

test('value: simple share 2', async () => {
  const seq = fromAsAsync([1, 2, 3]).pipe(tapAsync(async i => await abortableSleep(20))).valueAsync(toShareAsync());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  const output5: number[] = [];
  for await (const one of seq) {
    output1.push(one);
    break;
  }
  for await (const one of seq) {
    output2.push(one);
    break;
  }
  for await (const one of seq) {
    output3.push(one);
    break;
  }
  for await (const one of seq) {
    output4.push(one);
  }
  seq.reset();
  for await (const one of seq) {
    output5.push(one);
  }
  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([3]);
  expect(output4).toEqual([]);
  expect(output5).toEqual([1,2,3]);
});
