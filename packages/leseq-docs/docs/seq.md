---
id: "seq"
title: "Seq<T> Object"
sidebar_label: "Seq<T> Object"
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

Since lazy evaluation is employed, the process is not executed when **pipe()** is called, but only when **value()**, **toArray()**, or **forEach()** is called.