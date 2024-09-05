---
outline: deep
---

# Todo

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
