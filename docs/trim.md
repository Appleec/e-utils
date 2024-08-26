---
outline: deep
---

# trim

## 版本

0.1.0

## 使用

### 语法

```js
(static) trim(stropt) -> {string}
```

Removes leading and trailing whitespace or specified characters from string.


### 参数

| Name   | Type       | Attributes  | Default   | Description             |
|--------|------------|-------------|-----------|-------------------------|
| str    | string     | optional    | ''        | The string to trim.     |
| chars  | string     |             |           | The characters to trim. |


### 返回值

Returns the trimmed string.

## 示例

```js
_.trim('  abc  ');
// => 'abc'

_.trim('-_-abc-_-', '_-');
// => 'abc'

_.map(['  foo  ', '  bar  '], _.trim);
// => ['foo', 'bar']
```
