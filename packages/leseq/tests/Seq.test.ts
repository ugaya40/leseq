import { from } from "../src";

test('sec generates readonly array', () => {
  const readOnlyOutput = from([1, 2, 3, 4]).toArray();

  // @ts-expect-error Property 'push' does not exist on type 'readonly number[]'.
  readOnlyOutput.push(99);

  expect(readOnlyOutput).toEqual([1, 2, 3, 4, 99]);
});

test('sec generates array', () => {
  const readOnlyOutput = from([1, 2, 3, 4]).toMutableArray();

  readOnlyOutput.push(99);

  expect(readOnlyOutput).toEqual([1, 2, 3, 4, 99]);
});
