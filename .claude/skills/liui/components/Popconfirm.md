# Popconfirm 气泡确认框

Maintainer: 孙俊玮

1. [基础用法](#基础用法)
2. [自定义弹出框的内容](#自定义弹出框的内容)
3. [多种让 Popconfirm 出现的方法](#多种让-popconfirm-出现的方法)
4. [Popconfirm API](#popconfirm-api)
   1. [Popconfirm Props](#popconfirm-props)
   2. [Popconfirm Slots](#popconfirm-slots)
   3. [Popconfirm Events](#popconfirm-events)

点击某个元素弹出一个简单的气泡确认框

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

Popconfirm 的属性与 Popover 很类似， 因此对于重复属性，请参考 Popover 的文档，在此文档中不做详尽解释。

在 Popconfirm 中，只有 `title` 属性可用，`content` 属性会被忽略。

删除

```
<template>
  <li-popconfirm title="确定删除吗？">
    <template #reference>
      <li-button>删除</li-button>
    </template>
  </li-popconfirm>
</template>
```

## 自定义弹出框的内容

可以在 Popconfirm 中自定义内容。

删除

```
<template>
  <li-popconfirm
    width="220"
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    :icon="IconAttentionInfoO"
    icon-color="#626AEF"
    title="确定删除吗？"
  >
    <template #reference>
      <li-button>删除</li-button>
    </template>
  </li-popconfirm>
</template>

<script setup lang="ts">
import { IconAttentionInfoO } from '@chehejia/liui-icons';
</script>
```

## 多种让 Popconfirm 出现的方法

点击按钮触发事件

删除

```
<template>
  <li-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="IconAttentionInfoO"
    icon-color="#626AEF"
    title="确定删除吗？"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <li-button>删除</li-button>
    </template>
  </li-popconfirm>
</template>

<script setup lang="ts">
import { IconAttentionInfoO } from '@chehejia/liui-icons';

const confirmEvent = () => {
  console.log('confirm!');
};
const cancelEvent = () => {
  console.log('cancel!');
};
</script>
```

## Popconfirm API

### Popconfirm Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| confirm-button-text | 确认按钮文字 | `string` | — |
| cancel-button-text | 取消按钮文字 | `string` | — |
| confirm-button-type | 确认按钮类型 | `enum` 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | primary |
| cancel-button-type | 取消按钮类型 | `enum` 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | text |
| icon | 自定义图标 | `string` / `Component` | IconAttentionQuestionO |
| icon-color | Icon 颜色 | `string` | #f90 |
| hide-icon | 是否隐藏 Icon | `boolean` | false |
| teleported | 是否将 popover 的下拉列表插入至 body 元素 | `boolean` | true |
| persistent | 当 popover 组件长时间不触发且 `persistent` 属性设置为 `false` 时, popover 将会被删除 | `boolean` | false |
| width | 弹出窗口宽度 | `string` / `number` | Min width 150px |

### Popconfirm Slots

| 名称 | 说明 |
| --- | --- |
| reference | 触发 Popconfirm 显示的 HTML 元素 |

### Popconfirm Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | `Function` (e: MouseEvent) => void |
| cancel | 点击取消按钮时触发 | `Function` (e: MouseEvent) => void |

最后修改日期： 2025-07-15
