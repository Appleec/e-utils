---
outline: deep
---

# isBoolean

## 版本

0.1.1

## 使用

- 语法

```js
isBoolean(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is a boolean, else `false`.

## 示例

```js
_.isBoolean(false)
// => true

_.isBoolean(null)
// => false
```
