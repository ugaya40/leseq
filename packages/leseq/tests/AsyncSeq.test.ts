import { fromAsAsync } from "../src";

test('AsyncSeq generates readonly array', async () => {
  const readOnlyOutput = await fromAsAsync([1, 2, 3, 4]).toArrayAsync();

  // @ts-expect-error Property 'push' does not exist on type 'readonly number[]'.
  readOnlyOutput.push(99);

  expect(readOnlyOutput).toEqual([1, 2, 3, 4, 99]);
});

test('AsyncSeq generates array', async () => {
  const readOnlyOutput = await fromAsAsync([1, 2, 3, 4]).toMutableArrayAsync();

  readOnlyOutput.push(99);

  expect(readOnlyOutput).toEqual([1, 2, 3, 4, 99]);
});
