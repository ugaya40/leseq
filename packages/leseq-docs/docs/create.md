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

**Generator** returns a [Seq<T\>](/seq/) object.

The simplest **Generator** is [from](/api/generators/#from). It is also very easy to reimplement.

```typescript
function fromOriginal<T>(source: Iterable<T>): Seq<T> {
  return new Seq(source);
}

const result = fromOriginal([1,2,3,4,5]).pipe(filter(i => i % 2 == 0)).toArray();

//result: [2,4]
```

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

**Operator** returns the **Operator<T, TResult\>** type function. 

**Operator<T, TResult\>** is a [function* declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).  that takes the current sequence as an argument. **T** is the type of the elements of the current sequence, and **TResult** is the type returned by the yield of the [function* declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

```typescript
const mapOriginal = <T, TResult>(func: (arg: T, index: number) => TResult): Operator<T, TResult> =>
  function* (source: Seq<T>): Gen<TResult> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      yield result;
      count++;
    }
  };

const result = fromOriginal([1,2,3,4,5]).pipe(mapOriginal(i => i * i)).toArray();

//result: [1,4,9,16,25]
```

### Create Value Functions

**Value** returns a function of type **SeqToValue<T, TResult\>**.

**SeqToValue<T, TResult\>** takes the current sequence as an argument and returns an arbitrary value, where **T** is the type of the element in the current sequence and **TResult** is the type of the value to be returned.

```typescript
const findOriginal =
  <T>(predicate: (arg: T, index: number) => boolean = () => true): SeqToValue<T,T> =>
  (seq: Seq<T>): T => {
    let count = 0;
    for (const i of seq) {
      if (predicate(i, count)) {
        return i;
      }
      count++;
    }
    throw RangeError(`No elements matching the condition were found.`);
  };

const result = fromOriginal([1,2,3,4,5]).pipe(mapOriginal(i => i * i)).value(findOriginal(i => i > 10));

//result: 16
```


