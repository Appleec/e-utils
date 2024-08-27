---
outline: deep
---

# toString

## 版本

0.1.1

## 使用

- 语法

```js
toString(value) -> {string}
```

- 参数

| Name    | Type  | Default | Description                |
|---------|-------|---------|----------------------------|
| value   | *     |         | The value to convert       |

- 返回值

Returns the converted string.

## 示例

```js
_.toString(null)
// => ''

_.toString(-0)
// => '-0'

_.toString([1, 2, 3])
// => '1,2,3'
```
