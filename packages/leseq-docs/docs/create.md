---
id: "create"
title: "Create Original Functions"
sidebar_label: "Create Original Functions"
sidebar_position: 0.5
custom_edit_url: null
hide_title: true
---

## Create Original Functions

### Create Generator Functions

The synchronous version of **Generator** returns [Seq<T\>](/seq/#seqt-object/). The asynchronous version returns [AsyncSeq<T\>](/seq/#asyncseqt-object).

The simplest **Generator** is [from](/api/generators/#from). It is also very easy to reimplement.

```typescript
function fromOriginal<T>(source: Iterable<T>): Seq<T> {
  return new Seq(source);
}

const result1 = fromOriginal([1,2,3,4,5]).pipe(filter(i => i % 2 == 0)).toArray();

//result1: [2,4]


//async version
function fromAsAsyncOriginal<T>(source: Iterable<T> | AsyncIterable<T>): AsyncSeq<T> {
  return new AsyncSeq(source);
}

const result2 = await fromAsAsyncOriginal([1,2,3,4,5]).pipe(
  filterAsync(async i => i % 2 == 0)
).toArrayAsync();

//result2: [2,4]
```
The constructor of [AsyncSeq<T\>](/seq/#asyncseqt-object) accepts an [Iterable<T\>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) or [AsyncIterable<T\>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) object.

The constructor of [Seq<T\>](/seq/) accepts an [Iterable<T\>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) object. Therefore, such an implementation is also possible.

```typescript
function* rangeInternal(start: number, count: number): Gen<number> {
  let currentCount = 0;
  while (currentCount < count) {
    yield start++;
    currentCount++;
  }
}

function rangeOriginal(start: number, count: number): Seq<number> {
  return new Seq(rangeInternal(start, count));
}

const result = rangeOriginal(1,10).pipe(filter(i => i % 2 == 0)).toArray();

//result: [2,4,6,8,10]
```
We used the [function* declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

### Create Operator Functions

The synchronous version of **Operator** returns **Operator<T, TResult\>** type function. The asynchronous version returns **AsyncOperator<T, TResult\>** type function.

**Operator<T, TResult\>**/**AsyncOperator<T, TResult\>** is a [function* declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).  that takes the current sequence as an argument. **T** is the type of the elements of the current sequence, and **TResult** is the type returned by the yield of the [function* declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

**It is also recommended that the Generator function always be named**, since the name of the Generator function will appear in the stack trace, which is related to debuggability.

```typescript
const mapOriginal = <T, TResult>(func: (arg: T) => TResult): Operator<T, TResult> =>
  function* mapOriginal(source: Seq<T>): Gen<TResult> {
    for (const i of source) {
      const result = func(i);
      yield result;
    }
  };

const result1 = fromOriginal([1,2,3,4,5]).pipe(mapOriginal(i => i * i)).toArray();

//result1: [1,4,9,16,25]

//async version
const mapAsyncOriginal = <T, TResult>(func: (arg: T) => Promise<TResult>): AsyncOperator<T, TResult> =>
  async function* mapAsyncOriginal(source: AsyncSeq<T>): AsyncGen<TResult> {
    for await (const i of source) {
      const result = await func(i);
      yield result;
    }
  };

const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve,milliseconds));

const result2 = await fromAsAsyncOriginal([1,2,3,4,5]).pipe(
  mapAsyncOriginal(async i => {
    await sleep(1000);
    return i * i;
  }),
).toArrayAsync();

//5 seconds later... result2: [1,4,9,16,25]
```

If you want to create an operator easily by combining existing operators, you can do the following.
```typescript
const prefix = <T>(prefix: string): Operator<T,string> => 
  function* test(source: Seq<T>): Gen<string> {
    yield* source.pipe(
      map(i => `${prefix}:${new String(i)}`)
    )
  }

const result = from([1, 2, 3, 4, 5, 6, 7])
  .pipe(
    prefix('test'),
    take(3)
  ).toArray();

//result: ["test:1", "test:2", "test:3"]
```

### Create Value Functions

The synchronous version of **Value** returns **SeqToValue<T, TResult\>** type function. The asynchronous version returns **AsyncSeqToValue<T, TResult\>** type function.

**SeqToValue<T, TResult\>**/**AsyncSeqToValue<T, TResult\>** takes the current sequence as an argument and returns an arbitrary value, where **T** is the type of the element in the current sequence and **TResult** is the type of the value to be returned.

```typescript
const findOriginal =
  <T>(predicate: (arg: T) => boolean = () => true): SeqToValue<T,T> =>
  (seq: Seq<T>): T => {
    for (const i of seq) {
      if (predicate(i)) {
        return i;
      }
    }
    throw RangeError(`No elements matching the condition were found.`);
  };

const result1 = fromOriginal([1,2,3,4,5]).pipe(mapOriginal(i => i * i)).value(findOriginal(i => i > 10));

//result1: 16

//async version
const findAsyncOriginal =
  <T>(predicate: (arg: T) => Promise<boolean> = () => Promise.resolve(true)): AsyncSeqToValue<T, T> =>
  async (seq: AsyncSeq<T>): Promise<T> => {
    for await (const i of seq) {
      if (await predicate(i)) {
        return i;
      }
    }
    throw RangeError(`No elements matching the condition were found.`);
  };

const result2 = await fromAsAsyncOriginal([1,2,3,4,5]).pipe(
  mapAsyncOriginal(async i => {
    await sleep(1000);
    return i * i;
  }),
).valueAsync(
  findAsyncOriginal(async i => {
    await sleep(1000);
    return i > 10
  })
);

//8 seconds later... result2: 16
```


