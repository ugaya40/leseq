---
id: "seq"
title: "Seq<T>/AsyncSeq<T> Object"
sidebar_label: "Seq<T>/AsyncSeq<T> Object"
sidebar_position: 0.5
custom_edit_url: null
hide_title: true
---

## Seq<T\> Object
The Seq<T\> object is the core object; it is created by the **Generator** and is also the argument and return value of the **Operator**.

The Seq<T\> object has the following methods

| method | Description |
| --- | --- |
| pipe | Takes an arbitrary number of **Operators** as arguments and converts the sequence. |
| to | Take one **To** and convert it into a sequence with different characteristics. |
| value | Takes only one **Value** and converts the sequence to a value. |
| forEach | Performs iterative processing on elements of a sequence. |
| toArray | Converts a sequence to an readonly array.(Type of the return value is `readonly T[]`. The only difference from `toMutableArray()` is the return type.) |
| toMutableArray | Converts a sequence to an array. (Type of the return value is `T[]`. The only difference from `toArray()` is the return type.)|

Because it is a lazy list, it does not execute processing when **pipe()** is called, but only when **value()**, *toArray()**, or *forEach()** is called.

## AsyncSeq<T\> Object
It can be created by passing [asyncSeq()](https://ugaya40.github.io/leseq/api/to/#asyncseq) to **to()** of Seq<T\> or by using [Async Generators](https://ugaya40.github.io/leseq/api/generators/#async-generators).
Basically the same as Seq<T\>, but **valueAsync()**, **toArrayAsync()**, and **foreachAsync()** are async function. Also, only an asynchronous version of **Operators**/**to**/**Values**, which is passed to **pipe()/to()/valueAsync()**, is allowed.

| method | Description |
| --- | --- |
| pipe | Takes an arbitrary number of **Operators** as arguments and converts the sequence. |
| to | Take one **To** and convert it into a sequence with different characteristics. |
| valueAsync | Takes only one **Value** and converts the sequence to a value. |
| forEachAsync | Performs iterative processing on elements of a sequence. |
| toArrayAsync | Converts a sequence to an readonly array. (Type of the return value is `Promise<readonly T[]>`. The only difference from `toMutableArrayAsync()` is the return type.) |
| toMutableArrayAsync | Converts a sequence to an array. (Type of the return value is `Promise<T[]>`. The only difference from `toArrayAsync()` is the return type.) |
