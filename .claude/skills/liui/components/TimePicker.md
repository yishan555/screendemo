# TimePicker 时间选择器

Maintainer: 刘振兴

1. [任意时间点](#任意时间点)
2. [限制时间选择范围](#限制时间选择范围)
3. [任意时间范围](#任意时间范围)
4. [弹出的选择时间组件的出现位置](#弹出的选择时间组件的出现位置)
5. [绑定值的格式(输出的格式)](#绑定值的格式-输出的格式)
6. [TimePicker API](#timepicker-api)
   1. [TimePicker Props](#timepicker-props)
   2. [TimePicker Events](#timepicker-events)
   3. [TimePicker Methods](#timepicker-methods)

用于选择或输入日期。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/))。

## 任意时间点

可以选择任意时间。

提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。

```
<template>
  <div class="example-basic">
    <li-time-picker v-model="value1" placeholder="Arbitrary time" />
    <li-time-picker v-model="value2" arrow-control placeholder="Arbitrary time" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref();
const value2 = ref();
</script>

<style>
.example-basic .li-date-editor {
  margin: 8px;
}
</style>
```

## 限制时间选择范围

您也可以限制时间选择范围。

通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。

```
<template>
  <div class="example-basic">
    <li-time-picker
      v-model="value1"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(new Date(2016, 9, 10, 18, 30));

const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23));
};
const disabledMinutes = (hour: number) => {
  if (hour === 17) {
    return makeRange(0, 29);
  }
  if (hour === 18) {
    return makeRange(31, 59);
  }
};
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59);
  }
};
</script>

<style>
.example-basic .li-date-editor {
  margin: 8px;
}
</style>
```

## 任意时间范围

可选择任意的时间范围。

添加`is-range`属性即可选择时间范围。 同样支持 `arrow-control` 属性。

~

~

```
<template>
  <div class="demo-range">
    <li-time-picker
      v-model="value1"
      is-range
      range-separator="~"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
    <li-time-picker
      v-model="value2"
      is-range
      arrow-control
      range-separator="~"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]);
const value2 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]);
</script>

<style>
.demo-range .li-date-editor {
  margin: 8px;
}

.demo-range .li-range-separator {
  box-sizing: content-box;
}
</style>
```

## 弹出的选择时间组件的出现位置

可设置弹出的选择时间组件的出现位置。

添加`placement`属性即可设置弹出的选择时间组件的出现位置。 默认是 bottom。

```
<template>
  <div class="example-placement">
    <li-time-picker v-model="value1" placeholder="请选择时间" placement="top" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref();
</script>

<style>
.example-placement .li-date-editor {
  margin: 8px;
}
</style>
```

## 绑定值的格式(输出的格式)

可设置绑定值的格式(输出的格式)。

添加`value-format`属性即可设置绑定值的格式。 默认是 Date 对象。

```
<template>
  <div class="example-format">
    <li-time-picker
      v-model="value1"
      placeholder="请选择时间"
      placement="top"
      value-format="HH:mm:ss"
      format="HH:mm"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref();

const handleChange = (val: string) => {
  console.log(val);
};
</script>

<style>
.example-format .li-date-editor {
  margin: 8px;
}
</style>
```

## TimePicker API

### TimePicker Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2 | `Date` / `number` / `string` / `Array` | — |
| readonly | 完全只读 | `boolean` | false |
| disabled | 禁用 | `boolean` | false |
| editable | 文本框可输入 | `boolean` | true |
| clearable | 是否显示清除按钮 | `boolean` | true |
| size | 输入框尺寸 | `enum` large | default | small | — |
| placeholder | 非范围选择时的占位内容 | `string` | — |
| start-placeholder | 范围选择时开始日期的占位内容 | `string` | — |
| end-placeholder | 范围选择时结束日期的占位内容 | `string` | — |
| is-range | 是否为时间范围选择 | `boolean` | false |
| arrow-control | 是否使用箭头进行时间选择 | `boolean` | false |
| popper-class | TimePicker 下拉框的类名 | `string` | — |
| range-separator | 选择范围时的分隔符 | `string` | '-' |
| format | 显示在输入框中的格式 | `string` | HH:mm:ss 请查看 [date formats](./date-picker#date-formats) |
| value-format | 绑定值的格式(输出的格式) | Date 对象 | 请查看 [date formats](./date-picker#date-formats) |
| default-value | 可选，选择器打开时默认显示的时间 | `Date` / [Date, Date] | — |
| id | 等价于原生 input `id` 属性 | `string` / [string, string] | - |
| name | 等价于原生 input `name` 属性 | `string` | — |
| prefix-icon | 自定义前缀图标 | `string | Component` | Clock |
| clear-icon | 自定义清除图标 | `string | Component` | CircleClose |
| disabled-hours | 禁止选择部分小时选项 | `function` | — |
| disabled-minutes | 禁止选择部分分钟选项 | `Function` function (selectedHour) | — |
| disabled-seconds | 禁止选择部分秒选项 1 | `Function` function (selectedHour, selectedMinute) | — |
| teleported | 是否将 popover 的下拉列表镜像至 body 元素 | `enum` true | false | true |
| placement | 弹出的选择时间组件的出现位置 | `enum` top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end | bottom |

### TimePicker Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | `(val: typeof v-model)` |
| blur | 在组件 Input 失去焦点时触发 | `(e: FocusEvent)` |
| focus | 在组件 Input 获得焦点时触发 | `(e: FocusEvent)` |
| visible-change | 当 TimePicker 的下拉列表出现/消失时触发 | `(visibility: boolean)` |

### TimePicker Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| handleOpen | 打开时间选择器弹窗 | — |
| handleClose | 关闭时间选择器弹窗 | — |

最后修改日期： 2025-07-15
