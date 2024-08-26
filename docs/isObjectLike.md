---
outline: deep
---

# isObjectLike

Checks if `value` is object-like. A value is object-like if it's not `null`
and has a `typeof` result of "object".

## 版本

0.1.0

## 使用

### 语法

```js
isObjectLike(value) -> {boolean}
```

Checks if `value` is object-like. A value is object-like if it's not `null`, and has a `typeof` result of "object".

### 参数

| Name     | Type         | Attributes    | Default | Description             |
|----------|--------------|---------------|---------|-------------------------|
| value    | *            |               |         | The value to check.     |


### 返回值

Returns `true` if `value` is an object, else `false`.

## 示例

```js
_.isObjectLike({});
// => true

_.isObjectLike([1, 2, 3]);
// => true

_.isObjectLike(_.noop);
// => false

_.isObjectLike(null);
// => false
```
