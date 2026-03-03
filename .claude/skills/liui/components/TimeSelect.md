# TimeSelect 时间选择

Maintainer: 刘振兴

1. [固定时间点](#固定时间点)
2. [时间格式](#时间格式)
3. [固定时间范围](#固定时间范围)
4. [TimeSelect API](#timeselect-api)
   1. [TimeSelect Props](#timeselect-props)
   2. [TimeSelect Events](#timeselect-events)
   3. [TimeSelect Methods](#timeselect-methods)

用于选择或输入日期

可用时间范围是 00:00-23:59

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (例如: [VitePress](https://vitepress.vuejs.org/)).

## 固定时间点

提供几个固定的时间点供用户选择

使用 `li-time-select` 标签，然后通过`start`、`end`和`step`指定起始时间，结束时间和步长。

```
<template>
  <li-time-select v-model="value" start="08:30" step="00:15" end="18:30" placeholder="Select time" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>
```

## 时间格式

使用 `format` 属性来控制时间格式 (小时以及分钟)。

在 [这里](https://day.js.org/docs/zh-CN/display/format) 查看 Day.js 支持的 format 参数。

WARNING

请一定要注意传入参数的大小写是否正确

```
<template>
  <li-time-select v-model="value" start="00:00" step="00:30" end="23:59" placeholder="Select time" format="hh:mm A" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>
```

## 固定时间范围

如果先选中了开始（或结束）时间，则结束（或开始）时间的状态也将会随之改变。

```
<template>
  <div class="demo-time-range">
    <li-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="Start time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
    <li-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="End time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const startTime = ref('');
const endTime = ref('');
</script>
```

## TimeSelect API

### TimeSelect Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | string | — | — |
| disabled | 禁用状态 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| name | 原生属性 | string | — | — |
| effect | Tooltip 主题，内置了 `dark` / `light` 两种主题 | string | string | light |
| prefix-icon | 自定义前缀图标组件 | `string | Component` | — | Clock |
| clear-icon | 自定义清除图标组件 | `string | Component` | — | CircleClose |
| start | 开始时间 | string | — | 09:00 |
| end | 结束时间 | string | — | 18:00 |
| step | 间隔时间 | string | — | 00:30 |
| min-time | 最早时间点，早于该时间的时间段将被禁用 | string | — | 00:00 |
| max-time | 最晚时间点，晚于该时间的时间段将被禁用 | string | — | — |
| format | 设置时间格式 | string | 详见 [格式表示](https://day.js.org/docs/en/display/format#list-of-all-available-formats) | HH:mm |

### TimeSelect Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | val，组件绑定值 |
| blur | 在组件 Input 失去焦点时触发 | (event: FocusEvent) |
| focus | 在组件 Input 获得焦点时触发 | (event: FocusEvent) |

### TimeSelect Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |

最后修改日期： 2025-07-15
