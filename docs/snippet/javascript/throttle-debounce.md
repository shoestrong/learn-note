# 防抖与节流

#### 防抖

``` js
function debounce(fn, delay = 300) {
    let timer = null;　　
    return () => {
        if (timer)  clearTimeout(timer);　　
        timer = setTimeout(() => {
            fn.apply(this, arguments);   // 改变this指向为调用debounce所指的对象
        }, delay)　　
    }
}

window.addEventListener('scroll', debounce(() => {
  console.log('debounce')
}, 1000), true)

// 停止操作 才输出结果
```
#### 节流

```js
function throttle(fn, delay = 300) {　　
    let flag = true, timer = null;
    return () => {
        if (!flag) return
        flag = false
        timer = setTimeout(() => {
            fn()
            flag = true
        }, delay)
    }
}

window.addEventListener('scroll', throttle(() => {
  console.log('throttle')
}, 1000))

// 间隔性触发
```

