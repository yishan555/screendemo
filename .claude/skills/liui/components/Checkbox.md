# Checkbox 多选框

Maintainer: 孙俊玮

1. [基础用法](#基础用法)
2. [禁用状态](#禁用状态)
3. [多选框组](#多选框组)
4. [中间状态](#中间状态)
5. [可选项目数量的限制](#可选项目数量的限制)
6. [Checkbox API](#checkbox-api)
   1. [Checkbox Props](#checkbox-props)
   2. [Checkbox Events](#checkbox-events)
   3. [Checkbox Slots](#checkbox-slots)
7. [CheckboxGroup API](#checkboxgroup-api)
   1. [CheckboxGroup Attributes](#checkboxgroup-attributes)
   2. [CheckboxGroup Events](#checkboxgroup-events)
   3. [CheckboxGroup Slots](#checkboxgroup-slots)

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

`checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用 `v-model` 绑定 `Array` 类型的变量即可。 只有一个选项时的默认值类型为 `Boolean`，当选中时值为`true`。 `li-checkbox` 标签中的内容将成为复选框按钮之后的描述。

Option 1Option 2

```
<template>
  <div>
    <li-checkbox v-model="checked1" label="Option 1" />
    <li-checkbox v-model="checked2" label="Option 2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
</script>
```

## 禁用状态

多选框不可用状态。

设置 `disabled` 属性即可。

DisabledNot disabled

```
<template>
  <li-checkbox v-model="checked1" disabled>Disabled</li-checkbox>
  <li-checkbox v-model="checked2">Not disabled</li-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked1 = ref(false);
const checked2 = ref(true);
</script>
```

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

在 `li-checkbox` 元素中定义 `v-model` 绑定变量，单一的 `checkbox` 中，默认绑定变量的值会是 `Boolean`，选中为 `true`。 在 `li-checkbox` 组件中，`label` 是选择框的值。 如果该组件下没有被传入内容，那么 `label` 将会作为 checkbox 按钮后的介绍。 `label` 也与数组中的元素值相对应。 如果指定的值存在于数组中，就处于选择状态，反之亦然。

Option AOption BOption Cdisabledselected and disabled

```
<template>
  <li-checkbox-group v-model="checkList">
    <li-checkbox label="Option A" />
    <li-checkbox label="Option B" />
    <li-checkbox label="Option C" />
    <li-checkbox label="disabled" disabled />
    <li-checkbox label="selected and disabled" disabled />
  </li-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList = ref(['selected and disabled', 'Option A']);
</script>
```

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

Check all

ShanghaiBeijingGuangzhouShenzhen

```
<template>
  <li-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
    >Check all</li-checkbox
  >
  <li-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <li-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</li-checkbox>
  </li-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref(['Shanghai', 'Beijing']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
</script>
```

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

ShanghaiBeijingGuangzhouShenzhen

```
<template>
  <li-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <li-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</li-checkbox>
  </li-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkedCities = ref(['Shanghai', 'Beijing']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>
```

## Checkbox API

### Checkbox Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `string` | `number` | `boolean` | — |
| label | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效） | `string` | `number` | `boolean` | `object` | — |
| true-label | 选中时的值 | `string` | `number` | — |
| false-label | 没有选中时的值 | `string` | `number` | — |
| disabled | 是否禁用 | `boolean` | false |
| size | Checkbox 的尺寸 | `string` 'large' | 'default' | 'small' | — |
| name | 原生 name 属性 | `string` | — |
| checked | 当前是否勾选 | `boolean` | false |
| indeterminate | 设置不确定状态，仅负责样式控制 | `boolean` | false |
| validate-event | 输入时是否触发表单的校验 | `boolean` | true |
| tabindex | 输入框的 tabindex | `string` | `number` | — |
| id | input id | `string` | — |
| controls a11y | 与 [aria-control](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)一致, 当 `indeterminate`为 `true`时生效 | `boolean` | — |

### Checkbox Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 当绑定值变化时触发的事件 | `Function` (value: string | number | boolean) => void |

### Checkbox Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

## CheckboxGroup API

### CheckboxGroup Attributes

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `object` string[] | number[] | [] |
| size | 多选框组尺寸 | `string` 'large' | 'default' | 'small' | — |
| disabled | 是否禁用 | `boolean` | false |
| min | 可被勾选的 checkbox 的最小数量 | `number` | — |
| max | 可被勾选的 checkbox 的最大数量 | `number` | — |
| label | 为屏幕阅读器准备的标签 | `string` | — |
| tag | 复选框组元素标签 | `string` | div |
| validate-event | 是否触发表单验证 | `boolean` | true |

### CheckboxGroup Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 当绑定值变化时触发的事件 | `Function` (value: string[] | number[]) => void |

### CheckboxGroup Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| default | 自定义默认内容 | Checkbox |

最后修改日期： 2025-07-15
