# Query table list 查询表格列表

后台查询表格列表封装为hooks

## 创建组件

::: code-group

```ts:line-numbers [useTable.ts]
import { ref, toValue, watchEffect } from 'vue'

// 接口返回数据结构
interface IResResult<IData> {
  data: IData,
  total: number
}

// 初始化参数类型
type TProps<IData> = {
  // 获取数据方法
  fetchData: (...args: any) => Promise<IResResult<IData[]>>
}

export const useTable = <IData>({
  fetchData
}: TProps<IData>) => {
  // 数据列表
  const list = ref<IData[]>()
  // 总数
  const total = ref(0)
  // 当前页
  const pageIndex = ref(1)
  // 每页显示条目个数
  const pageSize = ref(2)
  // 加载状态
  const loading = ref(false)
  // 获取数据方法
  const getList = (filterOptions?: object): Promise<IResResult<IData[]>> => {
    loading.value = true
    return new Promise((resolve, reject) => {
      fetchData({
        index: pageIndex.value,
        size: pageSize.value,
        // 将值、refs 或 getters 规范化为值
        ...toValue(filterOptions)
      }).then(res => {
        list.value = res.data
        total.value = res.total
        // 如果需要在组件中特殊处理，返回数据
        resolve(res)
      }).catch(err => {
        console.log('获取数据失败！', err)
        reject(err)
      }).finally(() => {
        loading.value = false
        console.log('接口调用完成！')
      })
    })
  }
  // 页大小改变
  const onSizeChange = (size: number) => {
    pageSize.value = size
  }
  // 翻页
  const onIndexChange = (index: number) => {
    pageIndex.value = index
  }

  watchEffect(() => {
    // 使用watchEffect可监听getList方法中使用的响应式依赖变化后执行方法
    getList()
  })

  return {
    list,
    total,
    pageIndex,
    pageSize,
    loading,
    onSizeChange,
    onIndexChange,
    getList
  }
}
```

```vue:line-numbers [TableLayout.vue]
<!-- 表格布局组件，用来控制布局样式 -->
<template>
  <div class="table-layout" v-loading="loading">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<style scoped>
.table-layout {
  background-color: #fff;
  padding: 10px;
}
.footer {
  margin-top: 20px;
}
</style>
```

```vue:line-numbers [FilterForm.vue]
<template>
  <div class="filter">
    <div class="form">
      <el-form ref="form" inline v-bind="$attrs">
        <slot></slot>
      </el-form>
    </div>
    <div class="hanle">
      <el-button type="primary" @click="submit">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

const emit = defineEmits<{
  (e: 'submit'): void,
  (e: 'reset'): void
}>()

const form = ref<FormInstance>()

const submit = () => {
  emit('submit')
}
const reset = () => {
  form.value?.resetFields()
  emit('reset')
}
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  .hanle {
    margin-left: 20px;
  }
}
</style>
```

```vue:line-numbers [Table.vue]
<template>
  <el-table :data="data" style="width: 100%">
    <slot></slot>
  </el-table>
</template>

<script setup lang="ts">
defineProps<{
  data?: object[]
}>()
</script>

<style scoped>

</style>
```

```vue:line-numbers [Pagination.vue]
<template>
  <el-pagination
    :page-sizes="[1, 2, 3, 4]"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
```
:::

## 使用示例

::: code-group
```vue:line-numbers [userList.vue]
<template>
  <TableLayout :loading="loading">
    <template #header>
      <FilterForm :model="query" @submit="handleSearch" @reset="handleSearch">
        <el-form-item label="姓名" props="name">
          <el-input v-model="query.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" props="address">
          <el-input v-model="query.address"></el-input>
        </el-form-item>
      </FilterForm>
    </template>
    <<template #body>
      <Table :data="list">
        <el-table-column props="name" label="用户名" />
        <el-table-column props="address" label="地址" />
        <el-table-column props="date" label="创建时间" />
      </Table>
    </template>
    <<template #footer>
      <Pagination v-model:current-page="pageIndex" v-model:page-size="pageSize" :total="total" />
    </template>
  </TableLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TableLayout from "@/components/TableLayout.vue";
import Table from "@/components/Table.vue";
import Pagination from "@/components/Pagination.vue";
import FilterForm from "@/components/FilterForm.vue";
import { getUserList } from "@/apis/user"
import type { IUser } from "@/types";

import { useTable } from "@/hoooks/useTable";

const { list, total, pageIndex, pageSize, getList, loading } = useTable<IUser>({
  fetchData: getUserList
})

const query = ref({
  name: '',
  address: ''
})

const handleSearch = () => {
  getList(query)
}

</script>

<style scoped>

</style>
```
:::
