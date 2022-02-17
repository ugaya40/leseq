Lazy evaluation list with high tree-shaking affinity and easy customization.

# Features
- 🎁 **Lazy Evaluation**: The collection is enumerated only as far as it needs to be, and never more than once.
- 🎄 **Tree-Shakeable**: Only the features you use will be bundled.
- 📎 **Easy-customization**: You can easily create the functions you need by yourself.
- 🗂 **Rxjs-like syntax**: To achieve tree-shaking, we use an [rxjs](https://rxjs.dev/)-like syntax.
- 💨 **No dependencies**

# Getting Started
```
npm install leseq
```
```
import {from, map, take,find} from 'leseq';

const result1 = from([1,2,3,4,5]).pipe(
  map(i => i * i),
  take(3)
).toArray();

//result1: [1,4,9]

const result2 = from([1,2,3,4,5]).pipe(
  filter(i => i % 2 == 0)
).value(
  find(i => i > 2)
);

//result2: 4
```
Here are the results of the Bundle Analyzer for the above example. You can see that only functions you are using are bundled.(seq.js is core object.)

<img width="500" src="https://user-images.githubusercontent.com/1430166/154478759-126c874e-e33c-4f6e-a5f7-e4ba9c8e0211.png">

# Usage
You can generate a sequence(Seq&lt;T&gt; object) with **Generator**, perform transformations and other operations with any number of **Operators**, and convert it to a value with **Value**.
```
Generators(ex: from, fromConcat, ..etc).pipe(
  ...Operators(ex: map, filter, ...etc)
).value(Values(ex: toArray,find,some, ...etc))
```
The predefined Generators/Operators/Values are as follows.
If the function you want to use does not exist, you can also define your own Operator/Value function [in this way](#create-original-functions).
## Predefined Generators
Generate Seq&lt;T&gt; Object.
- **from&lt;T&gt;(source: Iterable&lt;T&gt;)**: Generates a sequence from an iterable object.
- **fromValue&lt;T&gt;(source: T)**: Generates a sequence from a single value.
- **fromConcat&lt;T&gt;(...args: (Iterable&lt;T&gt; | Seq&lt;T&gt;)[])**: Combines multiple iterable objects to generate a sequence.
```
const result = fromConcat([1,2],[3,4,5]).toArray();

//result: [1,2,3,4,5]
```
- **range(start: number, count: number)**: Generates a sequential number sequence.
```
const result = range(5,10).toArray();

//result: [5,6,7,8,9,10,11,12,13,14]
```

## Predefined Operators
It is used within the pipe method of the Seq&lt;T&gt; object. Any number of operators can be connected.
- **filter&lt;T&gt;(predicate: (arg: T, index: number) => boolean)**
- **map&lt;T,TResult&gt(func: (arg: T, index: number) => TResult)**
- **concat&lt;T&gt;(target: Iterable&lt;T&gt;)**: Connects target sequence.
- **concatValue&lt;T&gt;(target: T)**: Adds target value to the sequence.
```
const result = from([1,2]).pipe(
  concat([3,4]),
  concatValue(5)
)

//result: [1,2,3,4,5]
```
- **skip&lt;T&gt;(count: number)**: Skips the specified number of enumerations.
- **skipWhile&lt;T&gt;(predicate: (arg: T) => boolean)**: Skip enumeration while the specified condition is met.
```
const result1 = range(1,10).pipe(
  skip(3)
).toArray()

//result1: [4,5,6,7,8,9,10]

const result2 = range(1,10).pipe(
  skipWhile(i => i < 8)
).toArray()

//result2: [8,9,10]
```
- **take&lt;T&gt;(count: number)**: Enumerate the specified number of items.
- **takeWhile&lt;T&gt;(predicate: (arg: T) => boolean)**: Enumerate only while the specified condition is met.
```
const result1 = range(1,10).pipe(
  take(3)
).toArray()

//result1: [1,2,3]

const result2 = range(1,10).pipe(
  takeWhile(i => i < 5)
).toArray()

//result2: [1,2,3,4]
```
- **flatten&lt;T, TResult&gt;(func: (arg: T, index: number) => Iterable&lt;TResult&gt;)**: Flatten the sequence.
```
const result = from([[1,2],[3,4]]).pipe(
  flatten(i => i)
);

//result: [1,2,3,4]
```

- **tap&lt;T&gt;(func: (arg: T, index: number) => void)**: Perform side effect. Does not affect the value passed to subsequent
```
const result = from([1,2,3]).pipe(
  tap(i => console.log(i * i))
).toArray();

//result: [1,2,3]

//console:
// 1
// 4
// 9
```

- **uniq&lt;T&gt;(keySector: (source: T) => any)**: Eliminate duplicates.
```
const result = from([1,1,3,2,4,4,4,1,5]).pipe(
  uniq(i => i)
).toArray();

//result: [1,3,2,4,5]
```
- **orderBy&lt;T, TKey&gt;(keySelector: (arg: T) => TKey, sortType: ('asc' | 'desc') = 'asc', compareFunction?: (a: TKey, b: TKey) => number)**: Reorder the sequence.The default implementation of compareFunction is as follows.
```
const defaultSortFunction = (a: any, b: any) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
```
```
const result1 = from([4,1,2,5,3]).pipe(
  orderBy(i => i, 'asc')
).toArray();

//result1: [1,2,3,4,5]

const originalCompareFunction = (a: number, b:number) => {
  if(a % 2 < b % 2) return - 1;
  if(a % 2 > b % 2) return 1;
  return 0;
}

const result2 = from([4,1,5,3,2]).pipe(
  orderBy(i => i, 'asc', originalCompareFunction)
).toArray();

//result2: [4,2,1,5,3]
```

## Predefined Values
Generates a value from a sequence. Used in the value method of the Seq&lt;T&gt; object.
- **toArray&lt;T&gt;():T[]**: Returns the sequence as an array.
- **reduce&lt;T, TAccumulate&gt;(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => TAccumulate):TAccumulate**
- **every&lt;T&gt;(predicate: (arg: T) => boolean):boolean**: Returns whether or not all elements of a sequence meet the specified conditions.
```
const result1 = from([2,4,6]).value(every(i => i % 2 == 0));

//result1: true

const result2 = from([2,4,6,7]).value(every(i => i % 2 == 0));

//result2: false
```
- **some&lt;T&gt;(predicate: (arg: T) => boolean):boolean**: Returns whether any element of the sequence satisfies the specified condition.
```
const result1 = from([1,3,5,6,7]).value(some(i => i % 2 == 0));

//result1: true

const result2 = from([1,3,5,7]).value(some(i => i % 2 == 0));

//result2: false
```

- **find&lt;T&gt;(predicate: (arg: T, index: number) => boolean):T**: Returns the first item that satisfies the specified condition. Throws an error if not found.

- **findOrDefault&lt;T&gt;(predicate: (arg: T, index: number) => boolean, defaultValue: T | undefined = undefined): T | undefined**: Returns the first item that satisfies the specified condition. You can specify the item to be returned if it is not found.

```
const result1 = from([1,2,3,4]).value(find(i => i % 2 == 0));

//result1: 2

const result2 = from([1,3,5,7]).value(findOrDefault(i => i % 2 == 0, 9999));

//result2: 9999
```

# Create original functions
## Original Operator
```
import { Seq, type Gen } from 'leseq';

const mapOriginal = <T, TResult>(func: (arg: T, index: number) => TResult) =>
  function* (source: Seq<T>): Gen<TResult> {
    let count = 0;
    for (const i of source) {
      const result = func(i, count);
      yield result;
      count++;
    }
  };

const result = from([1,2,3]).pipe(
  mapOriginal(i => i * i)
).toArray();

//result: [1,4,9]
```

## Original Value
```
import { Seq } from 'leseq';

const everyOriginal =
  <T>(predicate: (arg: T) => boolean) =>
  (seq: Seq<T>): boolean => {
    for (const i of seq) {
      if (!predicate(i)) {
        return false;
      }
    }
    return true;
  };

const result = from([2,4,6]).value(everyOriginal(i => i % 2 == 0));

//result: true
```

