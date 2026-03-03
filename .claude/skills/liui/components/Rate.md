# Rate 评分

Maintainer: 孙庞渝

1. [基础用法](#基础用法)
2. [尺寸](#尺寸)
3. [允许半选](#允许半选)
4. [辅助文字](#辅助文字)
5. [可清空](#可清空)
6. [更多种类的图标](#更多种类的图标)
7. [只读](#只读)
8. [自定义样式](#自定义样式)
   1. [默认变量](#默认变量)
9. [Rate API](#rate-api)
   1. [Rate Props](#rate-props)
   2. [Rate Events](#rate-events)
   3. [Rate Methods](#rate-methods)

用于评分。

## 基础用法

评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级（默认情况下不区分颜色）。 三个等级所对应的颜色用 `colors` 属性设置，而它们对应的两个阈值则通过 `low-threshold` 和 `high-threshold` 设定。

Default

Color for different levels

```
<template>
  <div class="demo-rate-block">
    <span class="demonstration">Default</span>
    <li-rate v-model="value1" />
  </div>
  <div class="demo-rate-block">
    <span class="demonstration">Color for different levels</span>
    <li-rate v-model="value2" :colors="colors" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref();
const value2 = ref();
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']); // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
</script>

<style scoped>
.demo-rate-block {
  display: inline-block;

  box-sizing: border-box;
  width: 49%;
  padding: 30px 0;

  text-align: center;

  border-right: solid 1px var(--li-border-color);
}

.demo-rate-block:last-child {
  border-right: none;
}

.demo-rate-block .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 尺寸

```
<template>
  <li-rate v-model="value" size="large" />
  <br />
  <li-rate v-model="value" />
  <br />
  <li-rate v-model="value" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
</script>
```

## 允许半选

属性 `allow-half` 允许出现半星。

```
<template>
  <li-rate v-model="value" allow-half />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
</script>
```

## 辅助文字

用辅助文字直接地表达对应分数。

为组件设置 `show-text` 属性会在右侧显示辅助文字。 通过设置 `texts` 可以为每一个分值指定对应的辅助文字。 `texts` 为一个数组，长度应等于最大值 `max`。

```
<template>
  <li-rate v-model="value" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" show-text />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
</script>
```

## 可清空

当你再次点击相同的值时，可以将值重置为 `0`。

```
<template>
  <li-rate v-model="value" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3);
</script>
```

## 更多种类的图标

当有多层评价时，可以用不同类型的图标区分评分层级。

设置`icons`属性可以自定义不同分段的图标。 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名。 本例还使用 `void-icon` 指定了未选中时的图标类名。

```
<template>
  <li-rate
    v-model="value"
    :icons="icons"
    :void-icon="IconInsuranceShieldO"
    :colors="['#FF9900', '#409eff', '#67c23a']"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  IconInsuranceAddO,
  IconInsuranceBlockO,
  IconInsuranceCheckO,
  IconInsuranceShieldO,
} from '@chehejia/liui-icons';

const value = ref();
const icons = [IconInsuranceBlockO, IconInsuranceCheckO, IconInsuranceAddO]; // same as { 2: ChatRound, 4: { value: ChatLineRound, excluded: true }, 5: ChatDotRound }
</script>
```

## 只读

只读的评分用来展示分数， 允许出现半星。

为组件设置 `disabled` 属性表示组件为只读。 此时若设置 `show-score`，则会在右侧显示目前的分值。 此外，您可以使用属性 `score-template` 来提供评分模板。 模板为一个包含了 `{value}` 的字符串，`{value}` 会被替换为当前分值。

3.7 points

```
<template>
  <li-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value} points" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3.7);
</script>
```

## 自定义样式

您可以为 rate 组件设定自定义样式。 使用 `css` 或 `scss` 改变全局或局部的颜色。 我们设置了一些全局颜色变量：`--li-rate-void-color`、`--li-rate-fill-color`、`--li-rate-disabled-void-color` 和 `--li-rate-text-color`。 您可以像这样使用：`:root { --li-rate-void-color: red; --li-rate-fill-color: blue; }`。

### 默认变量

| 变量 | 默认颜色 |
| --- | --- |
| --li-rate-void-color | var(--li-color-on-light-400) |
| --li-rate-fill-color | var(--li-color-warning-600) |
| --li-rate-disabled-void-color | var(--li-color-on-light-400) |
| --li-rate-text-color | var(--li-color-on-light-800) |

## Rate API

### Rate Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `number` | 0 |
| max | 最大分值 | `number` | 5 |
| size | 尺寸 | `string` 'large' | 'default' | 'small' | default |
| disabled | 是否为只读 | `boolean` | false |
| allow-half | 是否允许半选 | `boolean` | false |
| low-threshold | 低分和中等分数的界限值， 值本身被划分在低分中 | `number` | 2 |
| high-threshold | 高分和中等分数的界限值， 值本身被划分在高分中 | `number` | 4 |
| colors | icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色 | `object` string[] | Record<number, string> | ['#F7BA2A', '#F7BA2A', '#F7BA2A'] |
| void-color | 未选中 icon 的颜色 | `string` | #C6D1DE |
| disabled-void-color | 只读时未选中 icon 的颜色 | `string` | #EFF2F7 |
| icons | 图标组件 若传入数组，则需要传入 3 个元素，分别为 3 个部分所对应的类名；若传入对象，则可自定义分段，键名为分段的界限值，键值为对应的类名 | `object` string[] | Component[] | Record<number, string | Component> | [StarFilled, StarFilled, StarFilled] |
| void-icon | 未被选中的图标组件 | `string | Component` | Star |
| disabled-void-icon | 禁用状态的未选择图标 | `string | Component` | StarFilled |
| show-text | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | `boolean` | false |
| show-score | 是否显示当前分数， show-score 和 show-text 不能同时为真 | `boolean` | false |
| text-color | 辅助文字的颜色 | `string` | #1F2D3D |
| texts | 辅助文字数组 | `array` string[] | ['Extremely bad', 'Disappointed', 'Fair', 'Satisfied', 'Surprise'] |
| score-template | 分数显示模板 | `string` |  |
| clearable | 是否可以重置值为 `0` | `boolean` | false |

### Rate Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 分值改变时触发 | `Function` (value: number) => void |

### Rate Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| setCurrentValue | 设置当前值 | `Function` (value: number) => void |
| resetCurrentValue | 重置当前值 | `Function` () => void |

最后修改日期： 2025-07-15
