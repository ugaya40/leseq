---
id: "equality"
title: "Equality Strategy"
sidebar_label: "Equality Strategy"
sidebar_position: 0.5
custom_edit_url: null
hide_title: true
---

## Equality Strategy

Some Operators, such as [uniq](/api/operators/#uniq), [groupBy](/api/operators/#groupby), [union](/api/operators/#union), etc., can take **keySelector** and **comparableValueForKey** as arguments. If the key is a string or a number, there is nothing to worry about, but if the key is an object, you need to be careful.

If the key is an object, it will be processed using the so-called *"reference equality"* of the object unless **comparableValueForKey** argument is specified at the same time.

```typescript
const source = [
  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
  {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
  {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
]

const result = from(source).pipe(groupBy(one => one.groupKey)).toArray();

/*
unwanted result ×
result: [
  {key: {mainKey: 1, subKey: 'a'}, values: [
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"}
  ]},
  {key: {mainKey: 2, subKey: 'b'}, values: [
    {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"}
  ]},
  {key: {mainKey: 1, subKey: 'a'}, values: [
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"}
  ]},
  {key: {mainKey: 1, subKey: 'c'}, values: [
    {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"}
  ]}
]
*/
```

If key is an object and you want to process it using the so-called *"value equality"* of key, specify **comparableValueForKey** and make sure that **comparableValueForKey** returns the same value for all objects that can be considered structurally unique to the extent necessary.  (In many cases, using hash function is excessive.)

```typescript
const comparableValueForKey = (key: {mainKey: number, subKey: string}) => key.mainKey + key.subKey;

const source = [
  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
  {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"},
  {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"},
  {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"},
]

const result = from(source).pipe(uniq(one => one.groupKey,i => i, comparableValueForKey)).toArray();

/*
as expected 〇
result: [
  {key: {mainKey: 1, subKey: 'a'}, values: [
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test1"},
    {groupKey: {mainKey: 1, subKey: 'a'}, value: "test3"}
  ]},
  {key: {mainKey: 2, subKey: 'b'}, values: [
    {groupKey: {mainKey: 2, subKey: 'b'}, value: "test2"}
  ]},
  {key: {mainKey: 1, subKey: 'c'}, values: [
    {groupKey: {mainKey: 1, subKey: 'c'}, value: "test4"}
  ]},
]
*/
```