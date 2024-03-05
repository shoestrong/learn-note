---
order: 2
---

# Proxy 与 Object.defineProperty

Proxy 性能比 Object.defineProperty 好么?

如果单纯从 JavaScript 的层面来说的话，无疑是 Object.defineProperty 的性能更好

但是如果是从 Vue3 响应式处理的角度上，毫无疑问是 Proxy 更优，因为响应式涉及到了对于对象的深度遍历，如果使用 Object.defineProperty 的话那么深度遍历很浪费性能，但是 Proxy 确不需要去深度遍历，它是惰性劫持的，在响应式的处理上，性能更佳

## 代码示例

```js:line-numbers
const target = {
  age: 0
}
// Proxy
const proxy = new Proxy(target, {
  get(e, prop,receiver) {
    return Reflect.get(e, prop, receiver)
  },
  set(e, prop, value) {
    return Reflect.set(e, prop, value)
  }
})
// DefineProperty
let age = 0
Object.defineProperty(target, 'age', {
  get() {
    return age
  },
  set(value) {
    age = value
  }
})

console.time('Proxy');
for (let i = 0; i < 10000; i++) {
  proxy.age = i
}
console.timeEnd('Proxy');

console.time('Object.defineProperty');
for (let i = 0; i < 10000; i++) {
  target.name = i
}
console.timeEnd('Object.defineProperty');
```

> Proxy: 3.0400390625 ms <br/> Object.defineProperty: 0.2470703125 ms

**在 Vue3 中对于数据的响应式处理时，使用 Proxy 去进行处理的话性能会更好，因为 Object.defineProperty 需要递归遍历对象去进行响应式处理，而 Proxy 不需要，且 Proxy 具有惰性处理的特点，所以性能更优**

## Proxy 的优势：

1. 功能更强大：Proxy提供了更多的拦截方法，可以拦截对象的更多操作，如读取属性、设置属性、删除属性、函数调用等。而Object.defineProperty只能拦截对象属性的读取和设置操作。
2. 拦截更全面：Proxy可以拦截整个对象，而Object.defineProperty只能对单个属性进行拦截。
3. 生成新对象：Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改;
4. 可撤销拦截：Proxy对象提供了一个revocable()方法，可以用于撤销代理的拦截操作。而Object.defineProperty一旦对属性进行了定义，就无法撤销。
5. 性能更好：在拦截大量属性或操作的情况下，Proxy通常比Object.defineProperty更快。Object.defineProperty 对于单个属性的操作，性能会比 Proxy 更好

## Object.defineProperty 的优势：

1. 兼容性更好：Object.defineProperty 是 ES5 的标准方法，因此在各个浏览器和环境中的支持情况较好。而 Proxy 是 ES6 的新特性，部分浏览器和环境可能不支持。
2. 性能更高：Object.defineProperty 对于单个属性的操作，性能会比 Proxy 更好。因为 Proxy 需要拦截对象的所有操作，而 Object.defineProperty 只需要定义单个属性的行为。
