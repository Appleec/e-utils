---
outline: deep
---

# isSymbol

## 版本

0.1.1

## 使用

### 语法

```js
isSymbol(value) -> {boolean}
```

### 参数

| Name    | Type  | Default | Description              |
|---------|-------|---------|--------------------------|
| value   | *     |         |                          |

### 返回值

Returns `true` if `value` is a symbol, else `false`.

## 示例

```js
_.isSymbol(Symbol.iterator);
// => true

_.isSymbol('abc');
// => false
```
