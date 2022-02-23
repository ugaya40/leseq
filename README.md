[![npm version](https://badge.fury.io/js/leseq.svg)](https://badge.fury.io/js/leseq)

Lazy evaluation list with high tree-shaking affinity and easy customization.

# Features
- 🎁 **Lazy Evaluation**: The collection is enumerated only as far as it needs to be, and never more than once.
- 🎄 **Tree-Shakeable**: Only the features you use will be bundled.
- 📎 **Easy-Customization**: You can easily create the functions you need by yourself. [In this way.](https://ugaya40.github.io/leseq/create/)
- 🗂 **Rxjs-like Syntax**: To achieve tree-shaking, we use an [rxjs](https://rxjs.dev/)-like syntax.
- ✅ **Simple Equality Strategy**: It uses a simple [Equality Strategy](https://ugaya40.github.io/leseq/equality/).
- 💯 **All Typed**: The whole thing is written in TypeScript, which also provides completion for type conversion between operators.
- 💨 **No dependencies**

# Resource
- ### [Demo(StackBlitz)](https://stackblitz.com/edit/typescript-vygaa6?file=index.ts)

- ### [Docs](https://ugaya40.github.io/leseq/)

# Getting Started
```
npm install leseq
```
```typescript
import {from, map, take, find} from 'leseq';

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

<img width="500" src="https://user-images.githubusercontent.com/1430166/155239748-9ff55488-93a6-4c4c-9131-c7f12e35cd6e.png"></img>

# Usage

You can generate a sequence(Seq&lt;T&gt; object) with **Generator**, perform transformations and other operations with any number of **Operators**, and convert it to a value with **Value**.

```typescript
Generators(ex: from, fromConcat, ..etc).pipe(
  ...Operators(ex: map, filter, ...etc)
).value(Values(ex: find,some, ...etc))
```

Since lazy evaluation is employed, the process is not executed when **pipe()** is called, but only when **value()**, **toArray()**, or **forEach()** is called.

The predefined **Generators/Operators/Values** are as follows.
If the function you want to use does not exist, you can also define your own Operator/Value function [in this way](https://ugaya40.github.io/leseq/create/).

## Predefined Generators
| Generator | Description |
| --- | --- |
| [from](https://ugaya40.github.io/leseq/api/generators/#from) | Generates a sequence from an iterable object. |
| [fromConcat](https://ugaya40.github.io/leseq/api/generators/#fromconcat) | Generates a concatenated sequence of multiple iterable objects. |
| [fromValue](https://ugaya40.github.io/leseq/api/generators/#fromvalue) | Generates a sequence from a single value. |
| [range](https://ugaya40.github.io/leseq/api/generators/#range) | Generates a sequential number sequence. |
| [repeat](https://ugaya40.github.io/leseq/api/generators/#repeat) | Generates a sequence in which the specified value is repeated a specified number of times. |

## Predefined Operators
It is used within the pipe method of the Seq&lt;T&gt; object. Any number of operators can be connected.

| Operator | Description |
| --- | --- |
| [chunk](https://ugaya40.github.io/leseq/api/operators/#chunk) | Returns a sequence divided into array of the specified size. |
| [concat](https://ugaya40.github.io/leseq/api/operators/#concat) | Returns a sequence in which the current sequence and the specified sequence are concatenated. |
| [concatValue](https://ugaya40.github.io/leseq/api/operators/#concatvalue) | Returns the sequence to which the specified value is added. |
| [difference](https://ugaya40.github.io/leseq/api/operators/#difference) | Returns the sequence that is the difference set between the current sequence and the specified sequence. |
| [filter](https://ugaya40.github.io/leseq/api/operators/#filter) | Returns a sequence that has been filtered by the specified condition. |
| [flatten](https://ugaya40.github.io/leseq/api/operators/#flatten) | Returns a flattened sequence. |
| [groupBy](https://ugaya40.github.io/leseq/api/operators/#groupby) | Returns a sequence grouped by a specified key. |
| [intersect](https://ugaya40.github.io/leseq/api/operators/#intersect) | Returns a sequence that is the product set of the current sequence and the specified sequence. |
| [map](https://ugaya40.github.io/leseq/api/operators/#map) | Returns the sequence in which each element has been transformed by the specified transformation function. |
| [orderBy](https://ugaya40.github.io/leseq/api/operators/#orderby) | Returns a sequence sorted by a specified key. |
| [reverse](https://ugaya40.github.io/leseq/api/operators/#reverse) | Returns a sequence in reverse order of the current sequence. |
| [scan](https://ugaya40.github.io/leseq/api/operators/#scan) | Returns the resulting sequence after applying the aggregate function to the elements of the current sequence. |
| [skip](https://ugaya40.github.io/leseq/api/operators/#skip) | Returns the sequence with the specified number of skips. |
| [skipWhile](https://ugaya40.github.io/leseq/api/operators/#skipwhile) | Returns the sequence of elements skipped while matching the condition. |
| [take](https://ugaya40.github.io/leseq/api/operators/#take) | Returns a sequence that enumerates the specified number of items. |
| [takeWhile](https://ugaya40.github.io/leseq/api/operators/#takewhile) | Returns a sequence to be enumerated only while the condition is matched. |
| [tap](https://ugaya40.github.io/leseq/api/operators/#tap) | Run side effects. |
| [union](https://ugaya40.github.io/leseq/api/operators/#union) | Returns a sequence that is the union set of the current sequence and the specified sequence. |
| [uniq](https://ugaya40.github.io/leseq/api/operators/#uniq) | Returns a deduplicated sequence. |


## Predefined Values
Generates a value from a sequence. Used in the value method of the Seq&lt;T&gt; object.

| Value | Description |
| --- | --- |
| [every](https://ugaya40.github.io/leseq/api/values/#every) | Returns whether or not all elements of a sequence meet the specified conditions. |
| [find](https://ugaya40.github.io/leseq/api/values/#find) | Returns the first element that satisfies the condition. If no element satisfying the condition is found, an error is thrown. |
| [findOrDefault](https://ugaya40.github.io/leseq/api/values/#findordefault) | Returns the first element that satisfies the condition. If no element is found that satisfies the condition, it returns the specified default value. |
| [reduce](https://ugaya40.github.io/leseq/api/values/#reduce) | Returns the result of applying the aggregate function to the elements of the current sequence. |
| [some](https://ugaya40.github.io/leseq/api/values/#some) | Returns whether or not any element of the sequence satisfies the specified condition. |

