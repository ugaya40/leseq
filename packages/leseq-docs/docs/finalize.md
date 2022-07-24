---
id: "finalize"
title: "Finalization, and Resource Management"
sidebar_label: "Finalization, and Resource Management"
sidebar_position: 0.5
custom_edit_url: null
hide_title: true
---

## Finalization, and Resource Management

In particular, the async iterator may have to allocate resources such as database connections and file handles at the start of iterator enumeration, and discard resources when enumeration is completed or abnormally terminated.
In other environments, this is called the `Dispose` pattern.

leseq uses [finalize](https://ugaya40.github.io/leseq/api/operators/#finalize)([finalizeAsync](https://ugaya40.github.io/leseq/api/operators/#finalizeasync)) operator to achieve this pattern.

```typescript
const source = fromAsAsync([1, 2, 3, 4, 5]).pipe(
  takeAsync(3),
  finalizeAsync(async () => console.log('finalized'))
);
 
for await (const one of source) {
  console.log(one)
}

//console: 1
//console: 2
//console: 3
//console: finalized
```

Finalize is always executed at the completion or abnormal end of an enumeration as long as the enumeration has started, whether it is a full enumeration in a for statement, a break in a for statement, toArray(), or outputting a value in [value functions](https://ugaya40.github.io/leseq/api/values/).

**break case**
```typescript
const source = fromAsAsync([1, 2, 3, 4, 5]).pipe(
  takeAsync(3),
  finalizeAsync(async () => console.log('finalized'))
);

for await (const one of source) {
  console.log(one)
  if(one == 2) break;
}

//console: 1
//console: 2
//console: finalized
```

**value case**
```typescript
const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
  takeAsync(3),
  finalizeAsync(async () => console.log('finalized'))
).valueAsync(findAsync(async i => i == 2));

//result: 2
//console: finalized
```

**error case**
```typescript
const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
  takeAsync(3),
  tapAsync(async () => {throw new Error('test')}),
  finalizeAsync(async () => console.log('finalized'))
).toArrayAsync();

//Error
//console: finalized
```
However, for those that do not actually enumerate at that time, such as [asyncSeq()](https://ugaya40.github.io/leseq/api/to/#asyncseq), finalize does not work either; if `asyncSeq()` starts enumerating, finalize will work at the end of enumeration or on an error.

```typescript
const source = from([1, 2, 3]).pipe(
  tap(() => {throw new Error('test')}),
  finalize(() => {console.log('finalized')}),
).to(asyncSeq());

//no output

for await(const one of source) {
  console.log(one);
}

//Error
//console: finalized
```

In addition, all finalizes work as expected even in such a compound case of iterable to async iterable and multiple finalizes.

```typescript
const output = await from([1, 2, 3, 4, 5]).pipe(
  tap(() => {throw new Error('test')}),
  finalize(() => {console.log('iterable finalized')}),
).to(asyncSeq()).pipe(
  takeAsync(4),
  finalizeAsync(async () => {console.log('async iterable finalized')}),
).toArrayAsync();

//Error
//console: iterable finalized
//console: async iterable finalized
```


