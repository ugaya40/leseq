import { async, finalize, from, mapAsync, reverse, share, tap, tapAsync } from '../src';
import { abortableSleep, performanceAsync } from './testUtil';

test('to: simple asyncSeq', async () => {
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

test('to: simple share 1', () => {
  const seq = from([1, 2]).to(share());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  for (const one of seq) {
    output1.push(one);
    break;
  }

  for (const one of seq) {
    output2.push(one);
    break;
  }

  for (const one of seq) {
    output3.push(one);
  }

  seq.close();

  for (const one of seq) {
    output4.push(one);
  }

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: simple share 2', () => {
  const seq = from([1, 2])
    .pipe(tap(() => {}))
    .to(share());
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];

  for (const one of seq) {
    output1.push(one);
    break;
  }

  for (const one of seq) {
    output2.push(one);
    break;
  }

  for (const one of seq) {
    output3.push(one);
  }

  seq.close();

  for (const one of seq) {
    output4.push(one);
  }

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: simple share 3', () => {
  const seq = from([1, 2])
    .to(share())
    .pipe(tap(() => {}));
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];

  for (const one of seq) {
    output1.push(one);
    break;
  }

  for (const one of seq) {
    output2.push(one);
    break;
  }

  for (const one of seq) {
    output3.push(one);
  }

  for (const one of seq) {
    output4.push(one);
  }

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([]);
});

test('to: share with finalize 1', () => {
  let finalized = false;
  const seq = from([1, 2])
    .pipe(
      finalize(() => {
        finalized = true;
      })
    )
    .to(share());

  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];

  for (const one of seq) {
    output1.push(one);
    break;
  }
  expect(finalized).toBe(false);

  for (const one of seq) {
    output2.push(one);
    break;
  }
  expect(finalized).toBe(false);

  for (const one of seq) {
    output3.push(one);
  }
  expect(finalized).toBe(true);

  seq.close();
  finalized = false;

  for (const one of seq) {
    expect(finalized).toBe(false);
    output4.push(one);
  }

  expect(finalized).toBe(true);

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: share with finalize 2', () => {
  let finalized = false;
  const shareSeq = from([1, 2]).to(share());
  const seq = shareSeq.pipe(
    finalize(() => {
      finalized = true;
    })
  );
  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  const output4: number[] = [];
  for (const one of seq) {
    output1.push(one);
    break;
  }
  expect(finalized).toBe(true);
  finalized = false;

  for (const one of seq) {
    output2.push(one);
    break;
  }
  expect(finalized).toBe(true);
  finalized = false;

  for (const one of seq) {
    output3.push(one);
  }
  expect(finalized).toBe(true);
  finalized = false;

  shareSeq.close();
  expect(finalized).toBe(false);

  for (const one of seq) {
    expect(finalized).toBe(false);
    output4.push(one);
  }
  expect(finalized).toBe(true);

  expect(output1).toEqual([1]);
  expect(output2).toEqual([2]);
  expect(output3).toEqual([]);
  expect(output4).toEqual([1, 2]);
});

test('to: share with finalize 3', () => {
  let finalized = false;
  const seq = from([1, 2])
    .pipe(
      finalize(() => {
        finalized = true;
      })
    )
    .to(share());

  const output1: number[] = [];
  const output2: number[] = [];
  const output3: number[] = [];
  for (const one of seq) {
    output1.push(one);
    break;
  }
  expect(finalized).toBe(false);

  seq.close();
  expect(finalized).toBe(true);
  finalized = false;

  for (const one of seq) {
    output2.push(one);
    break;
  }
  expect(finalized).toBe(false);

  for (const one of seq) {
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
