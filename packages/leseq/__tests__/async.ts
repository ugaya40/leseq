import { from, mapAsync, reverse, tapAsync } from "../src";

const abortableSleep = (ms: number, signal?: AbortSignal) => new Promise<void>(resolve => {
  if(signal != null) {
    if(signal.aborted) resolve();
    const listener = () => {
      signal.removeEventListener('abort',listener);
      resolve();
    }
    signal.addEventListener('abort',listener);
  }
  setTimeout(resolve,ms)
});

test('async operator: simple', async () => {
  const startTime = performance.now();

  const output = await from([1, 2, 3, 4, 5]).pipe(reverse()).toAsyncSeq().pipe(
    tapAsync(async i => await abortableSleep(250)),
    mapAsync(async i => {
      await abortableSleep(250);
      return i * i;
    })
  ).toArrayAsync();

  const endtime = performance.now();

  expect(output).toEqual([25,16,9,4,1]);
  const time = endtime - startTime;
  expect(time > 2500 && time < 3500).toBe(true);
});

test('async operator: simple aborted 1', async () => {
  const controller = new AbortController();
  controller.abort();
  const signal = controller.signal;

  const startTime = performance.now();

  const output = await from([1, 2, 3, 4, 5]).pipe(reverse()).toAsyncSeq().pipe(
    tapAsync(async i => await abortableSleep(250, signal)),
    mapAsync(async i => {
      await abortableSleep(250, signal);
      return i * i;
    })
  ).toArrayAsync();

  const endtime = performance.now();

  expect(output).toEqual([25,16,9,4,1]);
  const time = endtime - startTime;
  expect(time < 2500 ).toBe(true);
});

test('async operator: simple aborted 2', async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const startTime = performance.now();

  setTimeout(() => controller.abort(), 1000);

  const output = await from([1, 2, 3, 4, 5]).pipe(reverse()).toAsyncSeq().pipe(
    tapAsync(async i => await abortableSleep(250, signal)),
    mapAsync(async i => {
      await abortableSleep(250, signal);
      return i * i;
    })
  ).toArrayAsync();

  const endtime = performance.now();
  
  expect(output).toEqual([25,16,9,4,1]);
  const time = endtime - startTime;
  expect(time > 1000 && time < 2500 ).toBe(true);
});