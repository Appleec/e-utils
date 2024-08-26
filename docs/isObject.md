---
outline: deep
---

# isObject

## 版本

0.1.0

## 使用

### 语法

```js
isObject(value) -> {boolean}
```

Checks if `value` is the of `Object`. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))

### 参数

| Name     | Type         | Attributes    | Default | Description             |
|----------|--------------|---------------|---------|-------------------------|
| value    | *            |               |         | The value to check.     |


### 返回值

Returns `true` if `value` is an object, else `false`.

## 示例

```js
_.isObject({});
// => true

_.isObject([1, 2, 3]);
// => true

_.isObject(_.noop);
// => true

_.isObject(null);
// => false
```
