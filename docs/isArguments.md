---
outline: deep
---

# isArguments

Checks if `value` is likely an `arguments` object.

## 版本

0.1.3

## 使用

- 语法

```js
isArguments(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is an `arguments` object, else `false`.

## 示例

```js
_.isArguments(function() { return arguments }())
// => true

_.isArguments([1, 2, 3])
// => false
```
