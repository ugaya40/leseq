import { finalizeAsync, fromAsAsync, shareAsync, tapAsync } from '../src';

test('to: simple shareAsync 1', async () => {
  const seq = fromAsAsync([1, 2]).to(shareAsync());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
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
  }

  seq.close();

  for await (const one of seq) {
    output4.push(one);
  }

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: simple shareAsync 2', async () => {
  const seq = fromAsAsync([1, 2])
    .pipe(tapAsync(async () => {}))
    .to(shareAsync());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];

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
  }

  seq.close();

  for await (const one of seq) {
    output4.push(one);
  }

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: simple shareAsync 3', async () => {
  const seq = fromAsAsync([1, 2])
    .to(shareAsync())
    .pipe(tapAsync(async () => {}));
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];

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
  }

  for await (const one of seq) {
    output4.push(one);
  }

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([]);
});

test('to: shareAsync with finalize 1', async () => {
  let finalized = false;
  const seq = fromAsAsync([1, 2])
    .pipe(
      finalizeAsync(async () => {
        finalized = true;
      })
    )
    .to(shareAsync());

  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];

  for await (const one of seq) {
    output1.push(one);
    break;
  }
  expect(finalized).toBe(false);

  for await (const one of seq) {
    output2.push(one);
    break;
  }
  expect(finalized).toBe(false);

  for await (const one of seq) {
    output3.push(one);
  }
  expect(finalized).toBe(true);

  seq.close();
  finalized = false;

  for await (const one of seq) {
    expect(finalized).toBe(false);
    output4.push(one);
  }

  expect(finalized).toBe(true);

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: shareAsync with finalize 2', async () => {
  let finalized = false;
  const shareSeq = fromAsAsync([1, 2]).to(shareAsync());
  const seq = shareSeq.pipe(
    finalizeAsync(async () => {
      finalized = true;
    })
  );
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  for await (const one of seq) {
    output1.push(one);
    break;
  }
  expect(finalized).toBe(true);
  finalized = false;

  for await (const one of seq) {
    output2.push(one);
    break;
  }
  expect(finalized).toBe(true);
  finalized = false;

  for await (const one of seq) {
    output3.push(one);
  }
  expect(finalized).toBe(true);
  finalized = false;

  shareSeq.close();
  expect(finalized).toBe(false);

  for await (const one of seq) {
    expect(finalized).toBe(false);
    output4.push(one);
  }
  expect(finalized).toBe(true);

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: shareAsync with finalize 3', async () => {
  let finalized = false;
  const seq = fromAsAsync([1, 2])
    .pipe(
      finalizeAsync(async () => {
        finalized = true;
      })
    )
    .to(shareAsync());

  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  for await (const one of seq) {
    output1.push(one);
    break;
  }
  expect(finalized).toBe(false);

  const waitMicrotasks = () => new Promise<void>(queueMicrotask);
  seq.close();
  // it should not happen immidiatetly, because `finalizeAsync` uses await in finally,
  // so it will be executed as microtask
  await waitMicrotasks();
  expect(finalized).toBe(true);
  finalized = false;

  for await (const one of seq) {
    output2.push(one);
    break;
  }
  expect(finalized).toBe(false);

  for await (const one of seq) {
    output3.push(one);
  }
  expect(finalized).toBe(true);
  finalized = false;

  seq.close();
  expect(finalized).toBe(false);

  expect(output1).toEqual([1]);
  expect(output2).toEqual([1]);
  expect(output3).toEqual([2]);
});
