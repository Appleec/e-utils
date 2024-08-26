---
outline: deep
---

# isNil

## 版本

0.1.0

## 使用

### 语法

```js
isNil(value) -> {boolean}
```

Checks if `value` is `null` or `undefined`.

### 参数

| Name | Type     | Description     |
|-----| -------- | -------- |
| value    | * | The value to check. |


### 返回值

Returns `true` if `value` is nullish, else `false`.

## 示例

```js
_.isNil(null);
// => true

_.isNil(void 0);
// => true

_.isNil(NaN);
// => false

_.isNil('');
// => false
```
