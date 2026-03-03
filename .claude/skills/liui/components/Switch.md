# Switch 开关

Maintainer: 李林森

1. [基础用法](#基础用法)
2. [尺寸](#尺寸)
3. [文字描述](#文字描述)
4. [显示自定义图标](#显示自定义图标)
5. [扩展的 value 类型](#扩展的-value-类型)
6. [禁用状态](#禁用状态)
7. [加载状态](#加载状态)
8. [阻止切换](#阻止切换)
9. [Switch API](#switch-api)
   1. [Switch Props](#switch-props)
   2. [Switch Events](#switch-events)
   3. [Switch Methods](#switch-methods)

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。

```
<template>
  <li-switch v-model="value1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
</script>
```

## 尺寸

```
<template>
  <li-switch v-model="value" size="large" />
  <br />
  <li-switch v-model="value" />
  <br />
  <li-switch v-model="value" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
```

## 文字描述

使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。 使用 `inline-prompt` 属性来控制文本是否显示在点内。

使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

Pay by yearPay by month

  

Pay by yearPay by month

  

是

Y

超出省略

完整展示多个内容

```
<template>
  <li-switch v-model="value1" class="mb-2" active-text="Pay by month" inactive-text="Pay by year" />
  <br />
  <li-switch
    v-model="value2"
    class="mb-2 demo-steps-custom-color"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <li-switch v-model="value3" inline-prompt active-text="是" inactive-text="否" />
  <li-switch v-model="value4" class="ml-2 demo-steps-custom-color" inline-prompt active-text="Y" inactive-text="N" />
  <li-switch v-model="value6" class="ml-2" width="60" inline-prompt active-text="超出省略" inactive-text="超出省略" />
  <li-switch
    v-model="value5"
    class="ml-2 demo-steps-custom-color"
    inline-prompt
    active-text="完整展示多个内容"
    inactive-text="多个内容"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
const value5 = ref(true);
const value6 = ref(true);
</script>
<style>
.demo-steps-custom-color {
  --li-switch-on-color: #13ce66;
  --li-switch-off-color: #ff4949;
}
</style>
```

## 显示自定义图标

TIP

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 您可以传递组件名称的字符串（提前注册）或组件本身是一个 SVG Vue 组件。 LiUI 提供了一组图标，您可以在 [icon component](./icon) 查看。

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 使用 `inline-prompt` 属性来控制图标显示在点内。

```
<template>
  <li-switch v-model="value1" :active-icon="IconBasicSelectedO" :inactive-icon="IconBasicCancelO" />
  <br />
  <li-switch
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="IconBasicSelectedO"
    :inactive-icon="IconBasicCancelO"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconBasicCancelO, IconBasicSelectedO } from '@chehejia/liui-icons';
const value1 = ref(true);
const value2 = ref(true);
</script>
```

## 扩展的 value 类型

你可以设置 `active-value` 和 `inactive-value` 属性， 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

```
<template>
  <li-tooltip :content="'Switch value: ' + value" placement="top">
    <li-switch v-model="value" class="demo-steps-custom-color" active-value="100" inactive-value="0" />
  </li-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('100');
</script>
<style>
.demo-steps-custom-color {
  --li-switch-on-color: #13ce66;
  --li-switch-off-color: #ff4949;
}
</style>
```

## 禁用状态

设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

```
<template>
  <li-switch v-model="value1" disabled />
  <li-switch v-model="value2" class="ml-2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
</script>
```

## 加载状态

设置`loading`属性，接受一个`Boolean`，设置`true`即加载中状态。

```
<template>
  <li-switch v-model="value1" loading />
  <li-switch v-model="value2" loading class="ml-2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(false);
</script>
```

## 阻止切换

设置`beforeChange`属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。

```
<template>
  <li-switch v-model="value1" :loading="loading1" :before-change="beforeChange1" />
  <li-switch v-model="value2" class="ml-2" :loading="loading2" :before-change="beforeChange2" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LiMessage } from '@chehejia/liui-next';

const value1 = ref(false);
const value2 = ref(false);
const loading1 = ref(false);
const loading2 = ref(false);

const beforeChange1 = () => {
  loading1.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false;
      LiMessage.success('Switch success');
      return resolve(true);
    }, 1000);
  });
};

const beforeChange2 = () => {
  loading2.value = true;
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false;
      LiMessage.error('Switch failed');
      return reject(new Error('Error'));
    }, 1000);
  });
};
</script>
```

## Switch API

### Switch Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值，必须等于 `active-value` 或 `inactive-value`，默认为 `Boolean` 类型 | `enum` boolean | string | number | — |
| disabled | 是否禁用 | `boolean` | false |
| loading | 是否显示加载中 | `boolean` | false |
| size | switch 的大小 | `string` 'large' | 'default' | 'small' | — |
| width | switch 的宽度 | `number | string` | — |
| inline-prompt | 无论图标或文本是否显示在点内，只会呈现文本的第一个字符 | `boolean` | false |
| active-icon | switch 状态为 `on` 时所显示图标，设置此项会忽略 `active-text` | `string | Component` | — |
| inactive-icon | switch 状态为 `off` 时所显示图标，设置此项会忽略 `inactive-text` | `string | Component` | — |
| active-text | switch 打开时的文字描述 | `string` | — |
| inactive-text | switch 的状态为 `off` 时的文字描述 | `string` | — |
| active-value | switch 状态为 `on` 时的值 | `enum` boolean | string | number | true |
| inactive-value | switch 的状态为 `off` 时的值 | `enum` boolean | string | number | false |
| active-color | 当在 `on` 状态时的背景颜色(已废弃，请使用 CSS var `--li-switch-on-color` ) | `string` | — |
| inactive-color | `off` 状态时的背景颜色(已废弃，使用 CSS var `--li-switch-of-color` ) | `string` | — |
| name | switch 对应的 name 属性 | `string` | — |
| validate-event | 改变 switch 状态时是否触发表单的校验 | `boolean` | true |
| before-change | switch 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | `Function` () => Promise<boolean> | boolean | — |

### Switch Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | switch 状态发生变化时的回调函数 | `Function` (value: boolean | string | number) => void |

### Switch Methods

| 名称 | 说明 |
| --- | --- |
| focus | 使 Switch 获取焦点 |

最后修改日期： 2025-07-15
