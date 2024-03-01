# 执行一次函数

实现一个once函数，传入函数参数只执行一次

```js

function once(fn) {
  let flag = true;
  return function() {
    if (flag) {
      fn.apply(null, arguments)
      flag = false
    }
    return undefined
  }
}

```