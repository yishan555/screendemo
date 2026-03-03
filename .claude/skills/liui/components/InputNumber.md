# Input Number 数字输入框

Maintainer: 王德师

1. [基础用法](#基础用法)
2. [禁用状态](#禁用状态)
3. [步进](#步进)
4. [严格步进](#严格步进)
5. [精度](#精度)
6. [不同的输入框尺寸](#不同的输入框尺寸)
7. [按钮位置](#按钮位置)
8. [InputNumber API](#inputnumber-api)
   1. [InputNumber Props](#inputnumber-props)
   2. [InputNumber Events](#inputnumber-events)
   3. [InputNumber Methods](#inputnumber-methods)

仅允许输入标准的数字值，可定义范围

## 基础用法

要使用它，只需要在 `<li-input-number>` 元素中使用 `v-model` 绑定变量即可，变量的初始值即为默认值。

```
<template>
  <li-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>
```

TIP

当输入无效的字符串到输入框时，由于错误，输入值将把 `NaN` 导入到上层

## 禁用状态

`disabled`属性接受一个 `Boolean`，设置为`true`即可禁用整个组件。 ，如果你只需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性， 默认最小值为 `0`。

```
<template>
  <li-input-number v-model="num" :disabled="true" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
</script>
```

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

```
<template>
  <li-input-number v-model="num" :step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(5);
</script>
```

## 严格步进

`step-strictly`属性接受一个`Boolean`。 如果这个属性被设置为 `true`，则只能输入步进的倍数。

```
<template>
  <li-input-number v-model="num" :step="2" step-strictly />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(2);
</script>
```

## 精度

设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

```
<template>
  <li-input-number v-model="num" :precision="2" :step="0.1" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
</script>
```

TIP

`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。

## 不同的输入框尺寸

使用 `size` 属性额外配置尺寸，可选的尺寸大小为：`large` 或 `small`

```
<template>
  <li-input-number v-model="num1" size="large" />
  <li-input-number v-model="num2" class="mx-4" />
  <li-input-number v-model="num3" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num1 = ref(1);
const num2 = ref(2);
const num3 = ref(3);
</script>
```

## 按钮位置

设置 `controls-position` 属性可以控制按钮位置。

```
<template>
  <li-input-number v-model="num" :min="1" :max="10" controls-position="right" size="large" @change="handleChange" />
  <li-input-number v-model="num" class="mx-4" :min="1" :max="10" controls-position="right" @change="handleChange" />
  <li-input-number v-model="num" :min="1" :max="10" size="small" controls-position="right" @change="handleChange" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>
```

## InputNumber API

### InputNumber Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `number` | — |
| min | 设置计数器允许的最小值 | `number` | `-Infinity` |
| max | 设置计数器允许的最大值 | `number` | `Infinity` |
| step | 计数器步长 | `number` | 1 |
| step-strictly | 是否只能输入 step 的倍数 | `boolean` | false |
| precision | 数值精度 | `number` | — |
| size | 计数器尺寸 | `enum` 'large' | 'default' | 'small' | default |
| readonly | 原生 `readonly` 属性，是否只读 | `boolean` | false |
| disabled | 是否禁用状态 | `boolean` | false |
| controls | 是否使用控制按钮 | `boolean` | true |
| controls-position | 控制按钮位置 | `enum` '' | 'right' | - |
| name | 等价于原生 input `name` 属性 | `string` | — |
| label | 输入框关联的 label 文字 | `string` | — |
| placeholder | 输入框默认 placeholder | `string` | - |
| value-on-clear **(> 2.2.0)** | 当输入框被清空时显示的值 | `number` / `null` / `enum` 'min' | 'max' | - |
| validate-event | 输入时是否触发表单的校验 | `boolean` | true |

### InputNumber Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值被改变时触发 | (currentValue: number | NaN, oldValue: number | NaN) |
| blur | 在组件 Input 失去焦点时触发 | (event: FocusEvent) |
| focus | 在组件 Input 获得焦点时触发 | (event: FocusEvent) |

### InputNumber Methods

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使 input 组件获得焦点 | - |
| blur | 使 input 组件失去焦点 | — |
| select | 选中 input 中的文字 | — |

最后修改日期： 2025-07-15
