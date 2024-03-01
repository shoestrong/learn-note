# 扁平化对象

> 实现一个对象的 flatten 方法

```
//  flatten(obj) 结果返回如下
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }
```
``` js
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 
function isObj(obj) {
  return typeof obj === 'object' && obj !== null
}

function flatten(obj) {
  if (!isObj(obj)) return
  let ressult = {}

  let fn = (o, prefix) => {
    if (isObj(o)) {
      if (Array.isArray(o)) {
        o.forEach((item, index) => {
          fn(item, `${prefix}[${index}]`)
        })
      } else {
        for(var k in o) {
          fn(o[k], `${prefix}.${k}`)
        }
      }
    } else {
      ressult[prefix] = o
    }
  }
  fn(obj, '')
  return ressult
}
console.log(flatten(obj));
```
