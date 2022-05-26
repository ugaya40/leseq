import { every, find, findOrDefault, from, reduce, some, tap, toShare } from '../src';

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

test('value: simple share 1', () => {
  const seq = from([1, 2, 3]).value(toShare());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  const output5: number[] = [];
  for(const one of seq) {
    output1.push(one);
    break;
  }
  for(const one of seq) {
    output2.push(one);
    break;
  }
  for(const one of seq) {
    output3.push(one);
    break;
  }
  for(const one of seq) {
    output4.push(one);
  }
  seq.reset();
  for(const one of seq) {
    output5.push(one);
  }
  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([3]);
  expect(output4).toEqual([]);
  expect(output5).toEqual([1,2,3]);
});

test('value: simple share 2', () => {
  const seq = from([1, 2, 3]).pipe(tap(() =>{})).value(toShare());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  const output5: number[] = [];
  for(const one of seq) {
    output1.push(one);
    break;
  }
  for(const one of seq) {
    output2.push(one);
    break;
  }
  for(const one of seq) {
    output3.push(one);
    break;
  }
  for(const one of seq) {
    output4.push(one);
  }
  seq.reset();
  for(const one of seq) {
    output5.push(one);
  }
  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([3]);
  expect(output4).toEqual([]);
  expect(output5).toEqual([1,2,3]);
});
