---
outline: deep
---

# isFunction

Checks if `value` is classified as a `Function` object.

## 版本

0.1.1

## 使用

- 语法

```js
isFunction(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is a boolean, else `false`.

## 示例

```js
_.isFunction(class Any{})
// => true

_.isFunction(() => {})
// => true

_.isFunction(async () => {})
// => true

_.isFunction(function * Any() {})
// => true

_.isFunction(Math.round)
// => true

_.isFunction(/abc/)
// => false
```
