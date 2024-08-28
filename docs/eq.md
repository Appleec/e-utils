---
outline: deep
---

# eq

Performs a
[`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
comparison between two values to determine if they are equivalent.

## 版本

0.1.3

## 使用

- 语法

```js
eq(value, other) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description                |
|---------|-------|---------|----------------------------|
| value   | *     |         | The value to compare       |
| other   | *     |         | The other value to compare |

- 返回值

Returns `true` if the values are equivalent, else `false`.

## 示例

```js
const object = { 'a': 1 }
const other = { 'a': 1 }

_.eq(object, object)
// => true

_.eq(object, other)
// => false

_.eq('a', 'a')
// => true

_.eq('a', Object('a'))
// => false

_.eq(NaN, NaN)
// => true
```
