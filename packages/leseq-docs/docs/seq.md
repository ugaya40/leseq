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
| value | Takes only one **Value** and converts the sequence to a value. |
| forEach | Performs iterative processing on elements of a sequence. |
| toArray | Converts a sequence to an array. |
| toAsyncSeq | Convents a sequence to **AsyncSeq<T\>** |

Since lazy evaluation is employed, the process is not executed when **pipe()** is called, but only when **value()**, **toArray()**, or **forEach()** is called.

## AsyncSeq<T\> Object
Basically the same as Seq<T\>, but **valueAsync()**, **toArrayAsync()**, and **foreachAsync()** are async function. Also, only an asynchronous version of **Operators**/**Values**, which is passed to **pipe()/valueAsync()**, is allowed.

| method | Description |
| --- | --- |
| pipe | Takes an arbitrary number of **Operators** as arguments and converts the sequence. |
| valueAsync | Takes only one **Value** and converts the sequence to a value. |
| forEachAsync | Performs iterative processing on elements of a sequence. |
| toArrayAsync | Converts a sequence to an array. |
