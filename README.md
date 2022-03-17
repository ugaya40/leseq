[![npm version](https://badge.fury.io/js/leseq.svg)](https://badge.fury.io/js/leseq)

Lazy evaluation list with high tree-shaking affinity and easy customization.

# Features
- 🎁 **Lazy Evaluation**: The collection is enumerated only as far as it needs to be, and never more than once.
- 🎄 **Tree-Shakeable**: Only the features you use will be bundled.
- 👻 **Async Iterator Support**: *Iterable* can also be seamlessly treated as *Async Iterator*.
- 📎 **Easy-Customization**: You can easily create the functions you need by yourself. [In this way.](https://ugaya40.github.io/leseq/create/)
- 🗂 **Rxjs-like Syntax**: To achieve tree-shaking, we use an [rxjs](https://rxjs.dev/)-like syntax.
- ✅ **Simple Equality Strategy**: It uses a simple [Equality Strategy](https://ugaya40.github.io/leseq/equality/).
- 💯 **All Typed**: The whole thing is written in TypeScript, which also provides completion for type conversion between operators.
- 💨 **No dependencies**

```typescript
import {from, map, take} from 'leseq';

const result1 = from([1,2,3,4,5]).pipe(
  map(i => i * i),
  take(3)
).toArray();

//result1: [1,4,9]
```
This is the result of [bundle visualizer](https://github.com/btd/rollup-plugin-visualizer) in the example above (1.21KB gzipped).

<img src="https://user-images.githubusercontent.com/1430166/158516201-cd001af0-1177-49ad-a59d-c3079f8a88f7.png" width="350px"></img>

# Resource
- ### [Demo(StackBlitz)](https://stackblitz.com/edit/typescript-vygaa6?devtoolsheight=33&file=index.ts)

- ### [Docs](https://ugaya40.github.io/leseq/)

# Getting Started
```
npm install leseq
```
If you are using Async Iterable and *"target "* in **tsconfig.json** is smaller than **"es2018"**, you must add **"ES2018.AsyncGenerator "** in **tsconfig.json/lib** and **"ES2018.AsyncIterable "** or the type will not display properly.
```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["DOM", "ES6", "ES2018.AsyncGenerator", "ES2018.AsyncIterable"]
  }
}

```
## Iterable
```typescript
import {from, map, take, find, range, reverse, filter} from 'leseq';

const result1 = from([1,2,3,4,5]).pipe(
  map(i => i * i),
  take(3)
)

for (const one of result1) {
  console.log(one)
}

//result: 1
//result: 4
//result: 9

const result2 = from([1,2,3,4,5]).pipe(
  filter(i => i % 2 == 0)
).value(
  find(i => i > 2)
);

//result2: 4

//lazy
const result3 = range(1, 10000000).pipe(
  take(3),
  reverse(),
  map((i) => i * i)
).toArray();

//result3: [9,4,1]
```
## Async Iterable
```typescript
import {from, mapAsync, filterAsync, fromAsAsync, findAsync, toAsync} from 'leseq';

const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve,milliseconds));

//from iterable to async iterable.
const result1 = await from([1,2,3,4,5]).value(toAsync()).pipe(
  mapAsync(async i => {
    await sleep(1000);
    return i * i;
  }),
  filterAsync(async i => i % 2 == 0)
).toArrayAsync();

//5 seconds later... result1: [4,16]

const result2 = await fromAsAsync([1,2,3,4,5]).pipe(
  mapAsync(async i => {
    await sleep(1000);
    return i * i;
  }),
  filterAsync(async i => i % 2 == 0)
).valueAsync(findAsync());

//2 seconds later... result2: 4

const result3 = await fromConcatAsAsync([1,2],[3,4]).pipe(
  mapAsync(async i => {
    await sleep(1000);
    return i * i;
  }),
);

for await (const one of result3) {
  console.log(one);
}

//1 seconds later... result: 1
//2 seconds later... result: 4
//3 seconds later... result: 9
//4 seconds later... result: 16
```
# Usage

You can generate a sequence(Seq&lt;T&gt;/AsyncSeq&lt;T&gt; object) with **Generator**, perform transformations and other operations with any number of **Operators**, and convert it to a value with **Value**.

```typescript
// sync iterator
SyncSource = 
  Generators(ex: from, fromConcat, ..etc) | 
  SyncSource.pipe(
    ...SyncOperators(ex: map, filter, ...etc)
  );

value = SyncSource.value(SyncValues(ex: find,some, ...etc));

// async iterator
AsyncSource = 
  AsyncGenerators(ex: fromAsAsync, fromConcatAsAsync, ...etc) |
  SyncSource.value(toAsync()) | // iterable to async iterable.
  AsyncSource.pipe(
    ...AsyncOperators(ex: mapAsync, filterAsync, ...etc)
  );

value = await AsyncSource.valueAsync(AsyncValues(ex: findAsync,someAsync, ...etc));
```

Since lazy evaluation is employed, the process is not executed when **pipe()** is called, but only when **value(valueAsync)**, **toArray(toArrayAsync)**, or **forEach(forEachAsync)** is called.

> Changes from "Iterable" or Seq<T\> to "Async Iterable" can be made at any time with **.value(toAsync())**.
but **Once the chain is changed to "Async Iterable" by **.value(toAsync())** or other means, only the asynchronous version of Operator/Value can be used in the same chain thereafter.** This is because, in principle, it is impossible to change from an "Async Iterable" to "Iterable".

The predefined **Generators/Operators/Values** are as follows. And all of them have asynchronous versions(*xxxAsAsync* or *xxxAsync*).

If the function you want to use does not exist, you can also define your own Operator/Value function [in this way](https://ugaya40.github.io/leseq/create/).

## Predefined Generators
| Generator | Description |
| --- | --- |
| [from](https://ugaya40.github.io/leseq/api/generators/#from) | Generates a sequence from an iterable object. (async version: [fromAsAsync](https://ugaya40.github.io/leseq/api/generators/#fromasasync) )  | (async version: [fromAsAsync](https://ugaya40.github.io/leseq/api/generators/#fromasasync) )  | |
| [fromConcat](https://ugaya40.github.io/leseq/api/generators/#fromconcat) | Generates a concatenated sequence of multiple iterable objects. (async version: [fromConcatAsAsync](https://ugaya40.github.io/leseq/api/generators/#fromconcatasasync) )  | (async version: [fromConcatAsAsync](https://ugaya40.github.io/leseq/api/generators/#fromconcatasasync) )  | |
| [fromValue](https://ugaya40.github.io/leseq/api/generators/#fromvalue) | Generates a sequence from a single value. (async version: [fromValueAsAsync](https://ugaya40.github.io/leseq/api/generators/#fromvalueasasync) )  | (async version: [fromValueAsAsync](https://ugaya40.github.io/leseq/api/generators/#fromvalueasasync) )  | |
| [range](https://ugaya40.github.io/leseq/api/generators/#range) | Generates a sequential number sequence. (async version: [rangeAsAsync](https://ugaya40.github.io/leseq/api/generators/#rangeasasync) )  | (async version: [rangeAsAsync](https://ugaya40.github.io/leseq/api/generators/#rangeasasync) )  | |
| [repeat](https://ugaya40.github.io/leseq/api/generators/#repeat) | Generates a sequence in which the specified value is repeated a specified number of times. (async version: [repeatAsAsync](https://ugaya40.github.io/leseq/api/generators/#repeatasasync) )  | (async version: [repeatAsAsync](https://ugaya40.github.io/leseq/api/generators/#repeatasasync) )  | |



## Predefined Operators
It is used within the pipe method of the Seq&lt;T&gt; object. Any number of operators can be connected.

| Operator | Description |
| --- | --- |
| [chunk](https://ugaya40.github.io/leseq/api/operators/#chunk) | Returns a sequence divided into array of the specified size. (async version: [chunkAsync](https://ugaya40.github.io/leseq/api/operators/#chunkasync) )  | |
| [concat](https://ugaya40.github.io/leseq/api/operators/#concat) | Returns a sequence in which the current sequence and the specified sequence are concatenated. (async version: [concatAsync](https://ugaya40.github.io/leseq/api/operators/#concatasync) )  | |
| [concatValue](https://ugaya40.github.io/leseq/api/operators/#concatvalue) | Returns the sequence to which the specified value is added. (async version: [concatValueAsync](https://ugaya40.github.io/leseq/api/operators/#concatvalueasync) )  | |
| [difference](https://ugaya40.github.io/leseq/api/operators/#difference) | Returns the sequence that is the difference set between the current sequence and the specified sequence. (async version: [differenceAsync](https://ugaya40.github.io/leseq/api/operators/#differenceasync) )  | |
| [filter](https://ugaya40.github.io/leseq/api/operators/#filter) | Returns a sequence that has been filtered by the specified condition. (async version: [filterAsync](https://ugaya40.github.io/leseq/api/operators/#filterasync) )  | |
| [flatten](https://ugaya40.github.io/leseq/api/operators/#flatten) | Returns a flattened sequence. (async version: [flattenAsync](https://ugaya40.github.io/leseq/api/operators/#flattenasync) )  | |
| [groupBy](https://ugaya40.github.io/leseq/api/operators/#groupby) | Returns a sequence grouped by a specified key. (async version: [groupByAsync](https://ugaya40.github.io/leseq/api/operators/#groupbyasync) )  | |
| [intersect](https://ugaya40.github.io/leseq/api/operators/#intersect) | Returns a sequence that is the product set of the current sequence and the specified sequence. (async version: [intersectAsync](https://ugaya40.github.io/leseq/api/operators/#intersectasync) )  | |
| [map](https://ugaya40.github.io/leseq/api/operators/#map) | Returns the sequence in which each element has been transformed by the specified transformation function. (async version: [mapAsync](https://ugaya40.github.io/leseq/api/operators/#mapasync) )  | |
| [orderBy](https://ugaya40.github.io/leseq/api/operators/#orderby) | Returns a sequence sorted by a specified key. (async version: [orderByAsync](https://ugaya40.github.io/leseq/api/operators/#orderbyasync) )  | |
| [reverse](https://ugaya40.github.io/leseq/api/operators/#reverse) | Returns a sequence in reverse order of the current sequence. (async version: [reverseAsync](https://ugaya40.github.io/leseq/api/operators/#reverseasync) )  | |
| [scan](https://ugaya40.github.io/leseq/api/operators/#scan) | Returns the resulting sequence after applying the aggregate function to the elements of the current sequence. (async version: [scanAsync](https://ugaya40.github.io/leseq/api/operators/#scanasync) )  | |
| [skip](https://ugaya40.github.io/leseq/api/operators/#skip) | Returns the sequence with the specified number of skips. (async version: [skipAsync](https://ugaya40.github.io/leseq/api/operators/#skipasync) )  | |
| [skipWhile](https://ugaya40.github.io/leseq/api/operators/#skipwhile) | Returns the sequence of elements skipped while matching the condition. (async version: [skipWhileAsync](https://ugaya40.github.io/leseq/api/operators/#skipwhileasync) )  | |
| [take](https://ugaya40.github.io/leseq/api/operators/#take) | Returns a sequence that enumerates the specified number of items. (async version: [takeAsync](https://ugaya40.github.io/leseq/api/operators/#takeasync) )  | |
| [takeWhile](https://ugaya40.github.io/leseq/api/operators/#takewhile) | Returns a sequence to be enumerated only while the condition is matched. (async version: [takeWhileAsync](https://ugaya40.github.io/leseq/api/operators/#takewhileasync) )  | |
| [tap](https://ugaya40.github.io/leseq/api/operators/#tap) | Run side effects. (async version: [tapAsync](https://ugaya40.github.io/leseq/api/operators/#tapasync) )  | |
| [union](https://ugaya40.github.io/leseq/api/operators/#union) | Returns a sequence that is the union set of the current sequence and the specified sequence. (async version: [unionAsync](https://ugaya40.github.io/leseq/api/operators/#unionasync) )  | |
| [uniq](https://ugaya40.github.io/leseq/api/operators/#uniq) | Returns a deduplicated sequence. (async version: [uniqAsync](https://ugaya40.github.io/leseq/api/operators/#uniqasync) )  | |


## Predefined Values
Generates a value from a sequence. Used in the value method of the Seq&lt;T&gt; object.

| Value | Description |
| --- | --- |
| [toAsync](https://ugaya40.github.io/leseq/api/values/#toasync) | Converts the current sequence to AsyncSeq<T\> and returns it.  | |
| [every](https://ugaya40.github.io/leseq/api/values/#every) | Returns whether or not all elements of a sequence meet the specified conditions. (async version: [everyAsync](https://ugaya40.github.io/leseq/api/values/#everyasync) )  | |
| [find](https://ugaya40.github.io/leseq/api/values/#find) | Returns the first element that satisfies the condition. If no element satisfying the condition is found, an error is thrown. (async version: [findAsync](https://ugaya40.github.io/leseq/api/values/#findasync) )  | |
| [findOrDefault](https://ugaya40.github.io/leseq/api/values/#findordefault) | Returns the first element that satisfies the condition. If no element is found that satisfies the condition, it returns the specified default value. (async version: [findOrDefaultAsync](https://ugaya40.github.io/leseq/api/values/#findordefaultasync) )  | |
| [reduce](https://ugaya40.github.io/leseq/api/values/#reduce) | Returns the result of applying the aggregate function to the elements of the current sequence. (async version: [reduceAsync](https://ugaya40.github.io/leseq/api/values/#reduceasync) )  | |
| [some](https://ugaya40.github.io/leseq/api/values/#some) | Returns whether or not any element of the sequence satisfies the specified condition. (async version: [someAsync](https://ugaya40.github.io/leseq/api/values/#someasync) )  | |

