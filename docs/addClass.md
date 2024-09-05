---
outline: deep
---

# addClass

`DOM` element adds a new `class`.

## 版本

0.2.0

## 使用

- 语法

```js
addClass(element, className) -> {void}
```

- 参数

| Name      | Type        | Description  |
|-----------|-------------|--------------|
| element   | HTMLElement | DOM element. |
| className | string      |              |

- 返回值

No return value.

## 示例

```js
var el = "<div></div>"

addClass(el, 'test')
// => "<div class='test'></div>"
```
