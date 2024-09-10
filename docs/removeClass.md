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
removeClass(el, className) -> {void}
```

- 参数

| Name      | Type        | Description  |
|-----------|-------------|--------------|
| el        | HTMLElement | DOM element. |
| className | string      |              |

- 返回值

No return value.

## 示例

```js
// `<div class="wrapper test"></div>`
const el = document.querySelector('div');

removeClass(el, 'test');
// => <div class="wrapper "></div>
```
