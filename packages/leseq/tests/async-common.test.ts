import { async, filterAsync, findAsync, from, fromAsAsync, mapAsync, reverse, tapAsync } from '../src';
import { abortableSleep, performanceAsync } from './testUtil';

test('async operator: simple', async () => {
  const [output, time] = await performanceAsync(
    async () =>
      await from([1, 2, 3, 4, 5])
        .pipe(reverse())
        .to(async())
        .pipe(
          tapAsync(async () => await abortableSleep(20)),
          mapAsync(async i => {
            await abortableSleep(20);
            return i * i;
          })
        )
        .toArrayAsync()
  );

  expect(output).toEqual([25, 16, 9, 4, 1]);
  expect(time > 200 && time < 400).toBe(true);
});

test('async operator: simple 2', async () => {
  const [output, time] = await performanceAsync(
    async () =>
      await fromAsAsync([1, 2, 3, 4, 5])
        .pipe(
          mapAsync(async i => {
            await abortableSleep(100);
            return i * i;
          }),
          filterAsync(async i => i % 2 == 0)
        )
        .valueAsync(findAsync())
  );

  expect(output).toEqual(4);
  expect(time > 200 && time < 300).toBe(true);
});

test('async operator: simple aborted 1', async () => {
  const controller = new AbortController();
  controller.abort();
  const signal = controller.signal;

  const [output, time] = await performanceAsync(
    async () =>
      await from([1, 2, 3, 4, 5])
        .pipe(reverse())
        .to(async())
        .pipe(
          tapAsync(async () => await abortableSleep(20, signal)),
          mapAsync(async i => {
            await abortableSleep(20, signal);
            return i * i;
          })
        )
        .toArrayAsync()
  );

  expect(output).toEqual([25, 16, 9, 4, 1]);
  expect(time < 20).toBe(true);
});

test('async operator: simple aborted 2', async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 100);

  const [output, time] = await performanceAsync(
    async () =>
      await from([1, 2, 3, 4, 5])
        .pipe(reverse())
        .to(async())
        .pipe(
          tapAsync(async i => await abortableSleep(20, signal)),
          mapAsync(async i => {
            await abortableSleep(20, signal);
            return i * i;
          })
        )
        .toArrayAsync()
  );

  expect(output).toEqual([25, 16, 9, 4, 1]);
  expect(time > 100 && time < 200).toBe(true);
});
