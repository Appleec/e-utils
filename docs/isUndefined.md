---
outline: deep
---

# isUndefined

## 版本

0.1.1

## 使用

- 语法

```js
isUndefined(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is a boolean, else `false`.

## 示例

```js
_.isUndefined(void 0)
// => true

_.isUndefined(null)
// => false
```
