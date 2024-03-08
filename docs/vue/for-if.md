---
title: v-for 和 v-if 可以共存吗?
order: 1
---

# for 和 if 共存

v-for 和 v-if 可以共存吗?
- Vue2 中 不可以
- Vue3 中 可以

原因：
- Vue2 中 v-for 优先级比 v-if 高
- Vue3 中 v-if 优先级比 v-for 高

## Vue2

把 v-for 和 v-if 共存与一个标签上，Vue2 中肯定会警告

```vue:line-numbers
<div id="app">
  <div v-for="item in [1,2,3]" v-if="item !== 2">{{item}}</div>
</div>
```

通过 https://v2.template-explorer.vuejs.org/ 解析成最终的产物代码
```js:line-numbers {7,8}
function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, _l(([1, 2, 3]), function (item) {
      return (item !== 2) ? _c('div', [_v(_s(item))]) : _e()
    }), 0)
  }
}
```

上面标记部分，会先循环，然后在循环中去判断，判断为真则正常渲染，判断为假则执行 _e 函数，_e函数就是注释的意思，就是把判断为假的节点注释掉，也就是：

1. **先走 v-for 循环 3 次**
2. **在循环体中走 v-if 判断**
3. **判断 item !== 2 则正常渲染，item === 2 则把这个节点注释掉**

所以最终选出出来 1、3 两个节点

所以 Vue2 为什么会警告了？**因为其实我们只需要渲染2个节点，但是最终还是循环了3次，造成了性能浪费，也就是 v-for 优先级高于 v-if，共存时会造成性能浪费**

## Vue3

在 Vue3 中，v-for 和 v-if 却是可以共存的，为什么呢？

```vue:line-numbers
<template>
  <div v-for="item in [1,2,3]" v-if="item !== 2">{{item}}</div>
</template>
```

通过 https://play.vuejs.org/ 解析成最终的产物代码

```js:line-numbers {4-8}
const __sfc__ = {};
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode } from "vue"
function render(_ctx, _cache) {
  return (_ctx.item !== 2)
    ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, _renderList([1,2,3], (item) => {
        return _createElementVNode("div", null, _toDisplayString(item), 1 /* TEXT */)
      }), 64 /* STABLE_FRAGMENT */))
    : _createCommentVNode("v-if", true)
}
__sfc__.render = render
__sfc__.__file = "src/App.vue"
export default __sfc__
```

跟 Vue2 不同的是，Vue3 中是先走判断，然后再走循环的，结论：

1. **先走 v-if 判断**
2. **如果 item !== 2，就去走循环也就是 v-for**
3. **如果 item == 2，就执行 createCommandVNode，创建一个注释节点**

也就是在 Vue3 中，v-if 优先级是高于 v-for 的，真正循环的只有1、3这两个节点，这提高了性能

但是上述代码会给 item 找不到？

> Property 'item' does not exist on type '{ $: ComponentInternalInstance; $data: {}; $props: Partial<{}> & Omit<{} & VNodeProps & AllowedComponentProps & ComponentCustomProps & Readonly<...>, never>; ... 10 more ...; $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...ar...'.ts(2339)

这是因为在 v-for 和 v-if 共存的时候，Vue3 会在底层帮我们转换成

```vue:line-numbers
<template>
  <template v-if="item !== 2">
    <div v-for="item in [1,2,3]">{{item}}</div>
  </template>
</template>
```

这就能解释为什么 item 找不到了，**item是在外层的，所以报错说item 找不到**。

## 总结

总结就是不要让 v-if 和 v-for 共存在同一个标签中，遇到这种情况需要使用 computed 去计算，然后再去渲染

```vue:line-numbers
<template>
  <div v-for="item in list" :key="item"></div>
</template>

<script setup lang="'ts">
  import { computed } from 'vue';
  const list = computed(()=>[1,2,3].filter(item => item !== 2));
</script>
```
