# Radio 单选框

Maintainer: 孙俊玮

1. [基础用法](#基础用法)
2. [禁用状态](#禁用状态)
3. [单选框组](#单选框组)
4. [按钮样式](#按钮样式)
5. [单选组合-等分固定空间宽度](#单选组合-等分固定空间宽度)
6. [Radio API](#radio-api)
   1. [Radio Props](#radio-props)
   2. [Radio Events](#radio-events)
   3. [Radio Slots](#radio-slots)
7. [RadioGroup API](#radiogroup-api)
   1. [RadioGroup Props](#radiogroup-props)
   2. [RadioGroup Events](#radiogroup-events)
   3. [Radiogroup Slots](#radiogroup-slots)
8. [RadioButton API](#radiobutton-api)
   1. [RadioButton Props](#radiobutton-props)
   2. [RadioButton Slots](#radiobutton-slots)

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。

要使用 Radio 组件，只需要设置`v-model`绑定变量， 选中意味着变量的值为相应 Radio `label`属性的值， `label`可以是`String`、`Number` 或 `Boolean`。

Option 1Option 2

Option 1Option 2

Option 1Option 2

Option 1Option 2

```
<template>
  <div class="mb-2 flex items-center text-sm">
    <li-radio-group v-model="radio1" size="large" class="ml-4">
      <li-radio label="1">Option 1</li-radio>
      <li-radio label="2">Option 2</li-radio>
    </li-radio-group>
  </div>
  <div class="my-2 flex items-center text-sm">
    <li-radio-group v-model="radio2" class="ml-4">
      <li-radio label="1">Option 1</li-radio>
      <li-radio label="2">Option 2</li-radio>
    </li-radio-group>
  </div>
  <div class="my-4 flex items-center text-sm">
    <li-radio-group v-model="radio3" size="small" class="ml-4">
      <li-radio label="1">Option 1</li-radio>
      <li-radio label="2">Option 2</li-radio>
    </li-radio-group>
  </div>
  <div class="mb-2 flex items-center text-sm">
    <li-radio-group v-model="radio3" size="small" disabled class="ml-4">
      <li-radio label="1">Option 1</li-radio>
      <li-radio label="2">Option 2</li-radio>
    </li-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
</script>
```

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

你只需要为单选框设置 `disabled` 属性就能控制其禁用状态。

Option AOption B

```
<template>
  <li-radio v-model="radio" disabled label="disabled">Option A</li-radio>
  <li-radio v-model="radio" disabled label="selected and disabled">Option B</li-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('selected and disabled');
</script>
```

## 单选框组

适用于在多个互斥的选项中选择的场景

结合`li-radio-group`元素和子元素`li-radio`可以实现单选组， 为 `li-radio-group` 绑定 `v-model`，再为 每一个 `li-radio` 设置好 `label` 属性即可， 另外，还可以通过 `change` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。

Option AOption BOption C

```
<template>
  <li-radio-group v-model="radio">
    <li-radio :label="3">Option A</li-radio>
    <li-radio :label="6">Option B</li-radio>
    <li-radio :label="9">Option C</li-radio>
  </li-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref(3);
</script>
```

## 按钮样式

你可以让单选框看起来像一个按钮一样。

只需要把 `li-radio` 元素换成 `li-radio-button` 元素即可， 此外，LiUI 还提供了 `size` 属性用来控制单选框的大小。

上海北京广州深圳

上海北京广州深圳

上海北京广州深圳

```
<template>
  <div>
    <li-radio-group v-model="radio1" size="large">
      <li-radio-button label="上海" />
      <li-radio-button label="北京" />
      <li-radio-button label="广州" />
      <li-radio-button label="深圳" />
    </li-radio-group>
  </div>
  <div style="margin-top: 20px">
    <li-radio-group v-model="radio2">
      <li-radio-button label="上海" />
      <li-radio-button label="北京" />
      <li-radio-button label="广州" />
      <li-radio-button label="深圳" />
    </li-radio-group>
  </div>
  <div style="margin-top: 20px">
    <li-radio-group v-model="radio3" size="small">
      <li-radio-button label="上海" />
      <li-radio-button label="北京" />
      <li-radio-button label="广州" />
      <li-radio-button label="深圳" />
    </li-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('上海');
const radio2 = ref('上海');
const radio3 = ref('上海');
</script>
```

## 单选组合-等分固定空间宽度

设置 `auto-size` 属性为 true 等分固定空间宽度(外层容器宽度)

北京上海广州深圳

```
<template>
  <div style="width: 600px">
    <li-radio-group v-model="radio1" auto-size>
      <li-radio-button label="北京" />
      <li-radio-button label="上海" />
      <li-radio-button label="广州" />
      <li-radio-button label="深圳" />
    </li-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('北京');
</script>
```

## Radio API

### Radio Props

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `enum` number | string | boolean | — | — |
| label | 单选框对应的值 | `enum` number | string | boolean | — | — |
| disabled | 是否禁用单选框 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | Radio 的尺寸 | string | `enum` large | default | small | — |
| name | 原生 name 属性 | string | — | — |

### Radio Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio Slots

| 名称 | 说明 |
| --- | --- |
| — | 自定义默认内容 |

## RadioGroup API

### RadioGroup Props

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `enum` number | string | boolean | — | — |
| size | 单选框组尺寸 | string | `enum` large | default | small | default |
| disabled | 是否禁用 | boolean | — | false |
| text-color | 按钮形式的 Radio 激活时的文本颜色 | string | — | - |
| fill | 按钮形式的 Radio 激活时的填充色和边框色 | string | — | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |
| auto-size | 等分固定空间宽度，行内模式默认 100% 宽度 | boolean | - | false |

### RadioGroup Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radiogroup Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| — | 自定义默认内容 | `enum` Radio | Radio-button |

## RadioButton API

### RadioButton Props

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | radio 的 value | `enum` number | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |

### RadioButton Slots

| 名称 | 说明 |
| --- | --- |
| — | 默认插槽内容 |

最后修改日期： 2025-07-15
