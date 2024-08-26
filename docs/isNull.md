---
outline: deep
---

# isNull

## 版本

0.1.0

## 使用

### 语法

```js
isNull(value) -> {boolean}
```

Checks if `value` is `null`.

### 参数

| Name | Type     | Description     |
|-----| -------- | -------- |
| value    | * | The value to check. |


### 返回值

Returns `true` if `value` is nullish, else `false`.

## 示例

```js
_.isNull(null)
// => true

_.isNull(void 0)
// => false
```
