---
outline: deep
---

# toUpper

## 版本

0.1.2

## 使用

- 语法

```js
toUpper(value) -> {string}
```

- 参数

| Name    | Type  | Default | Description                |
|---------|-------|---------|----------------------------|
| value   | *     |         | The value to convert       |

- 返回值

Returns the converted string.

## 示例

```js
_.toUpper('--foo-bar--');
// => '--FOO-BAR--'

_.toUpper('fooBar');
// => 'FOOBAR'

_.toUpper('__foo_bar__');
// => '__FOO_BAR__'
```
