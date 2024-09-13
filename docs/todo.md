---
outline: deep
---

# Todo

记录一些计划做的任务，主要是需要添加的 API 方法。

- pascalCase
- merge

- sleep

```js
export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>(resolve =>

    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
```
