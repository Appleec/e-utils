---
outline: deep
---

# isNumber

## 版本

0.1.1

## 使用

- 语法

```js
isNumber(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is a boolean, else `false`.

## 示例

```js
_.isNumber(3)
// => true

_.isNumber(Number.MIN_VALUE)
// => true

_.isNumber(Infinity)
// => true

_.isNumber('3')
// => false
```
