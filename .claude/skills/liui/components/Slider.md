# Slider 滑块

Maintainer: 李林森

1. [基础用法](#基础用法)
2. [离散值](#离散值)
3. [带有输入框的滑块](#带有输入框的滑块)
4. [不同尺寸](#不同尺寸)
5. [位置](#位置)
6. [范围选择](#范围选择)
7. [垂直模式](#垂直模式)
8. [显示标记](#显示标记)
9. [Slider API](#slider-api)
   1. [Slider Props](#slider-props)
   2. [Slider Events](#slider-events)

通过拖动滑块在一个固定区间内进行选择。

## 基础用法

在拖动滑块时，显示当前值。

通过设置绑定值自定义滑块的初始值。

Default value

Customized initial value

Hide Tooltip

Format Tooltip

Disabled

```
<template>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <li-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <li-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <li-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <li-slider v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <li-slider v-model="value5" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const value5 = ref(0);

const formatTooltip = (val: number) => {
  return val / 100;
};
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  overflow: hidden;
  flex: 1;

  margin-bottom: 0;

  font-size: 14px;
  line-height: 44px;
  color: var(--li-text-color-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slider-demo-block .demonstration + .li-slider {
  flex: 0 0 70%;
}
</style>
```

## 离散值

选项可以是离散的。

改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点。

Breakpoints not displayed

Breakpoints displayed

```
<template>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints not displayed</span>
    <li-slider v-model="value1" :step="10" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints displayed</span>
    <li-slider v-model="value2" :step="10" show-stops />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  overflow: hidden;
  flex: 1;

  margin-bottom: 0;

  font-size: 14px;
  line-height: 44px;
  color: var(--li-text-color-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slider-demo-block .demonstration + .li-slider {
  flex: 0 0 70%;
}
</style>
```

## 带有输入框的滑块

通过输入框输入来改变当前的值。

设置 `show-input` 属性会在右侧显示一个输入框。

```
<template>
  <div class="slider-demo-block">
    <li-slider v-model="value" show-input />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
```

## 不同尺寸

```
<template>
  <li-slider v-model="value" show-input size="large" />
  <li-slider v-model="value" show-input />
  <li-slider v-model="value" show-input size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>

<style scoped>
.li-slider {
  margin-top: 20px;
}

.li-slider:first-child {
  margin-top: 0;
}
</style>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
```

## 位置

您可以自定义 Tooltip 提示的位置。

```
<template>
  <div class="slider-demo-block">
    <li-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <li-slider v-model="value2" placement="bottom" />
  </div>
  <div class="slider-demo-block">
    <li-slider v-model="value3" placement="right" />
  </div>
  <div class="slider-demo-block">
    <li-slider v-model="value4" placement="left" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
```

## 范围选择

你还可以选择一个范围值。

配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

```
<template>
  <div class="slider-demo-block">
    <li-slider v-model="value" range show-stops :max="10" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref([4, 8]);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
```

## 垂直模式

配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

```
<template>
  <div class="slider-demo-block">
    <li-slider v-model="value" vertical height="200px" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
```

## 显示标记

设置 `marks` 属性可以在滑块上显示标记。

0°C

8°C

37°C

50%

```
<template>
  <div class="slider-demo-block">
    <li-slider v-model="value" range :marks="marks" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { CSSProperties } from 'vue';

interface Mark {
  style: CSSProperties;
  label: string;
}

type Marks = Record<number, Mark | string>;

const value = ref([30, 60]);
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: 'var(--li-color-brand-700)',
    },
    label: '50%',
  },
});
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .li-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
```

## Slider API

### Slider Props

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `number` | 0 |
| min | 最小值 | `number` | 0 |
| max | 最大值 | `number` | 100 |
| disabled | 是否禁用 | `boolean` | false |
| step | 步长 | `number` | 1 |
| show-input | 是否显示输入框，仅在非范围选择时有效 | `boolean` | false |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮 | `boolean` | true |
| size | slider 包装器的大小，垂直模式下该属性不可用 | `string` 'large' | 'default' | 'small' | default |
| input-size | 输入框的大小，如果设置了 `size` 属性，默认值自动取 `size` | `string` 'large' | 'default' | 'small' | default |
| show-stops | 是否显示间断点 | `boolean` | false |
| show-tooltip | 是否显示提示信息 | `boolean` | true |
| format-tooltip | 格式化提示信息 | `Function` (value: number) => number | string | — |
| range | 是否开启选择范围 | `boolean` | false |
| vertical | 垂直模式 | `boolean` | false |
| height | 滑块高度，垂直模式必填 | `string` | — |
| label | 屏幕阅读器标签 | `string` | — |
| range-start-label | 当 `range` 为 true 时，屏幕阅读器标签开始的标记 | `string` | — |
| range-end-label | 当 `range` 为 true 时，屏幕阅读器标签结尾的标记 | `string` | — |
| format-value-text | 显示屏幕阅读器的 `aria-valuenow` 属性的格式 | `Function` (value: number) => string | — |
| debounce | 输入时的去抖延迟，毫秒，仅在 `show-input` 等于 true 时有效 | `number` | 300 |
| tooltip-class | tooltip 的自定义类名 | `string` | — |
| placement | Tooltip 出现的位置 | `string` 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | top |
| marks | 标记， key 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | `object` | — |
| validate-event | 输入时是否触发表单的校验 | `boolean` | true |

### Slider Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | `Function` (value: number | number[]) => void |
| input | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | `Function` (value: number | number[]) => void |

最后修改日期： 2025-07-15
