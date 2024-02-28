# Virtual Scroller 虚拟滚动

::: code-group
```vue:line-numbers [virtualScroller.vue]
<template>
  <div class="scrollView" @scroll="onScroll">
    <div class="virtualScroller" :style="{ height: listHeight + 'px' }"></div>
    <div class="list" :style="{ transform: `translateY(${this.startOffset}px)` }">
      <div class="item" v-for="item in list" :key="item">
        {{ item + 1 }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listHeight: 0,
      itemHeight: 50,
      containerHeight: 300,
      visibleCount: 6,
      data: [],
      startOffset: 0,
    };
  },
  mounted() {
    const total = 100000;
    const list = [];
    for (let i = 0; i < total; i++) {
      list.push(i);
    }
    this.listHeight = list.length * this.itemHeight;
    this.data = list;
    this.list = list.slice(0, 6);
  },
  methods: {
    onScroll(e) {
      // 当前滚动位置
      const scrollTop = e.target.scrollTop;
      // 列表开始索引
      const startIndex = Math.floor(scrollTop / this.itemHeight);
      // 列表结束索引
      const endIndex = Math.ceil((scrollTop + this.containerHeight) / this.itemHeight);
      this.list = this.data.slice(startIndex, endIndex);
      // 列表移动距离
      this.startOffset = scrollTop - (scrollTop % this.itemHeight);
    }
  }
}
</script>
<style>
.scrollView {
  width: 200px;
  height: 300px;
  background-color: #abcdef;
  overflow-y: scroll;
  position: relative;
  box-sizing: border-box;
}
.item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #fff;
}
.list {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
```
:::
