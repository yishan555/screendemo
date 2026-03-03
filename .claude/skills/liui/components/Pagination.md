# Pagination 分页

Maintainer: 段扬帅

1. [基础用法](#基础用法)
2. [设置最大页码按钮数](#设置最大页码按钮数)
3. [小型分页](#小型分页)
4. [当只有一页时隐藏分页](#当只有一页时隐藏分页)
5. [附加功能](#附加功能)
6. [Pagination API](#pagination-api)
   1. [Pagination Props](#pagination-props)
   2. [Pagination Events](#pagination-events)
   3. [Pagination Slots](#pagination-slots)

当数据量过多时，使用分页分解数据。

## 基础用法

设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。 `prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示总条目数，`size`用于设置每页显示的页码数量。

When you have few pages

* 1
* 2
* 3
* 4
* 5

When you have more than 7 pages

* 1
* 2
* 3
* 4
* 5
* 6
* 100

```
<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">When you have few pages</div>
    <li-pagination layout="prev, pager, next" :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">When you have more than 7 pages</div>
    <li-pagination layout="prev, pager, next" :total="1000" />
  </div>
</template>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
```

## 设置最大页码按钮数

默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 `pager-count` 属性可以设置最大页码按钮数。

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
* 50

```
<template>
  <li-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
</template>
```

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

只需要设置 `small` 属性为 `true` 即可让分页变小。

* 1
* 2
* 3
* 4
* 5

```
<template>
  <li-pagination small layout="prev, pager, next" :total="50" />
</template>
```

## 当只有一页时隐藏分页

当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。

---

* 1

```
<template>
  <div>
    <li-switch v-model="value" />
    <hr class="my-4" />
    <li-pagination :hide-on-single-page="value" :total="5" layout="prev, pager, next" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(false);
</script>
```

## 附加功能

根据场景需要，可以添加其他功能模块。

此示例是一个完整的用例。 使用了 `size-change` 和 `current-change` 事件来处理页码大小和当前页变动时候触发的事件。 `page-sizes`接受一个整数类型的数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]` 表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。

defaultsmall

disabled:

---

Total item count

共 1000 条

* 1
* 3
* 4
* 5
* 6
* 7
* 10

Change page size

* 1
* 3
* 4
* 5
* 6
* 7
* 10

Jump to

* 1
* 3
* 4
* 5
* 6
* 7
* 10

前往页

All combined

共 400 条

* 1
* 2
* 3
* 4

前往页

```
<template>
  <div class="flex items-center mb-4">
    <li-radio-group v-model="small" class="mr-4">
      <li-radio-button :label="false">default</li-radio-button>
      <li-radio-button label>small</li-radio-button>
    </li-radio-group>
    <div class="ml-4">disabled: <li-switch v-model="disabled" class="ml-2" /></div>
  </div>

  <hr class="my-4" />

  <div class="demo-pagination-block">
    <div class="demonstration">Total item count</div>
    <li-pagination
      v-model:current-page="currentPage1"
      :page-size="100"
      :small="small"
      :disabled="disabled"
      layout="total, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <div class="demo-pagination-block">
    <div class="demonstration">Change page size</div>
    <li-pagination
      v-model:current-page="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <div class="demo-pagination-block">
    <div class="demonstration">Jump to</div>
    <li-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      :small="small"
      :disabled="disabled"
      layout="prev, pager, next, jumper"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <div class="demo-pagination-block">
    <div class="demonstration">All combined</div>
    <li-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const currentPage1 = ref(5);
const currentPage2 = ref(5);
const currentPage3 = ref(5);
const currentPage4 = ref(4);
const pageSize2 = ref(100);
const pageSize3 = ref(100);
const pageSize4 = ref(100);
const small = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
```

## Pagination API

### Pagination Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| small | 是否使用小型分页样式 | `boolean` | false |
| page-size / v-model:page-size | 每页显示条目个数 | `number` | 10 |
| default-page-size | 每页显示条目数的初始值 | `number` | — |
| total | 总条目数 | `number` | — |
| page-count | 总页数， `total` 和 `page-count` 设置任意一个就可以达到显示页码的功能；如果要支持 `page-sizes` 的更改，则需要使用 `total` 属性 | `number` | — |
| pager-count | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | `number` 5 | 7 | 9 | 11 | 13 | 15 | 17 | 19 | 21 | 7 |
| current-page / v-model:current-page | 当前页数 | `number` | 1 |
| default-current-page | 当前页数的初始值 | `number` | — |
| layout | 组件布局，子组件名用逗号分隔 | `string` string (consists of sizes, prev, pager, next, jumper, ->, total, slot) | prev, pager, next, jumper, ->, total |
| page-sizes | 每页显示个数选择器的选项设置 | `array` number[] | [10, 20, 30, 40, 50, 100] |
| popper-class | 每页显示个数选择器的下拉框类名 | `string` | — |
| prev-text | 替代图标显示的上一页文字 | `string` | — |
| prev-icon | 上一页的图标， 比 `prev-text` 优先级更高 | `string` / `Component` | ArrowLeft |
| next-text | 替代图标显示的下一页文字 | `string` | — |
| next-icon | 下一页的图标， 比 `next-text` 优先级更高 | `string` / `Component` | ArrowRight |
| disabled | 是否禁用分页 | `boolean` | false |
| hide-on-single-page | 只有一页时是否隐藏 | `boolean` | — |

WARNING

我们现在会检查一些不合理的用法，如果发现分页器未显示，可以核对是否违反以下情形：

* `total` 和 `page-count` 必须传一个，不然组件无法判断总页数；优先使用 `page-count`;
* 如果传入了 `current-page`，必须监听 `current-page` 变更的事件（`@update:current-page`），否则分页切换不起作用；
* 如果传入了 `page-size`，且布局包含 page-size 选择器（即 `layout` 包含 `sizes`），必须监听 `page-size` 变更的事件（`@update:page-size`），否则分页大小的变化将不起作用。

### Pagination Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| size-change | `page-size` 改变时触发 | `Function` (value: number) => void |
| current-change | `current-page` 改变时触发 | `Function` (value: number) => void |
| prev-click | 用户点击上一页按钮改变当前页时触发 | `Function` (value: number) => void |
| next-click | 用户点击下一页按钮改变当前页时触发 | `Function` (value: number) => void |

WARNING

以上事件不推荐使用（但由于兼容的原因仍然支持，在以后的版本中将会被删除）；如果要监听 current-page 和 page-size 的改变，使用 `v-model` 双向绑定是个更好的选择。

### Pagination Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，设置文案需要在 `layout` 中列出 `slot` |

最后修改日期： 2025-07-15
