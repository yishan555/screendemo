# Infinite Scroll 无限滚动

1. [基础用法](#基础用法)
2. [禁用加载](#禁用加载)
3. [InfiniteScroll API](#infinitescroll-api)
   1. [InfiniteScroll Directives](#infinitescroll-directives)

滚动至底部时，加载更多数据。

## 基础用法

在要实现滚动加载的列表上上添加`v-infinite-scroll`，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法。

* 1
* 2
* 3
* 4
* 5
* 6

```
<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const count = ref(0);
const load = () => {
  count.value += 2;
};
</script>

<style>
.infinite-list {
  height: 300px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  margin: 10px;

  color: var(--li-color-primary);

  background: var(--li-color-primary-light-9);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
```

## 禁用加载

* 1
* 2
* 3
* 4
* 5
* 6
* 7
* 8
* 9
* 10

```
<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
      <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading" class="tip-text">Loading...</p>
    <p v-if="noMore" class="tip-text">No more</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const count = ref(10);
const loading = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
</script>

<style>
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}

.infinite-list-wrapper .list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;

  color: var(--li-color-danger);

  background: var(--li-color-danger-light-9);
}

.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}

.infinite-list-wrapper .tip-text {
  color: var(--li-color-on-light-700);
}
</style>
```

## InfiniteScroll API

### InfiniteScroll Directives

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-infinite-scroll | 滚动到底部时，加载更多数据 | function | - | - |
| infinite-scroll-disabled | 是否禁用 | boolean | - | false |
| infinite-scroll-delay | 节流时延，单位为 ms | number | - | 200 |
| infinite-scroll-distance | 触发加载的距离阈值，单位为 px | number | - | 0 |
| infinite-scroll-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器。 | boolean | - | true |

最后修改日期： 2025-07-15
