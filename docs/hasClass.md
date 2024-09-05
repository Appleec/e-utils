---
outline: deep
---

# hasClass

Determine whether a `DOM` element has a `class` attribute.

## 版本

0.2.0

## 使用

- 语法

```js
hasClass(element, className) -> {boolean}
```

- 参数

| Name      | Type        | Description  |
|-----------|-------------|--------------|
| element   | HTMLElement | DOM element. |
| className | string      |              |

- 返回值

True if element has class attribute, otherwise false.

## 示例

```js
var _wrapper = document.querySelector('.wrapper');

hasClass(_wrapper, 'wrapper');
// => true
```
