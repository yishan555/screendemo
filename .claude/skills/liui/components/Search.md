# Search 搜索

Maintainer: 王德师

1. [基础用法](#基础用法)
2. [展示风格](#展示风格)
3. [可清空](#可清空)
4. [禁用](#禁用)
5. [尺寸](#尺寸)
6. [Search API](#search-api)
   1. [Search Props](#search-props)
   2. [Search Events](#search-events)

搜索输入框。

## 基础用法

```
<template>
  <div class="demo-search">
    <li-search v-model="input" placeholder="请输入内容" @input="inputEvent" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref();

const inputEvent = (value: string) => {
  console.log(value);
};
</script>
```

## 展示风格

search 组件可通过 mode，direction 这些属性来实现如下这些类型的展示。

normal

dynamic

icon

dynamicIcon

```
<template>
  <div class="demo-search">
    <p style="margin-bottom: 12px">normal</p>
    <li-search v-model="input1" class="demo-search-item" placeholder="请输入内容" />

    <li-search v-model="input2" class="demo-search-item" placeholder="请输入内容" direction="suffix" />

    <p style="margin-bottom: 12px">dynamic</p>
    <li-search v-model="input3" class="demo-search-item" placeholder="请输入内容" mode="dynamic" />

    <p style="margin-bottom: 12px">icon</p>
    <li-search v-model="input4" class="demo-search-item" placeholder="请输入内容" mode="icon" />

    <p style="margin-bottom: 12px">dynamicIcon</p>
    <li-search v-model="input5" class="demo-search-item" placeholder="请输入内容" mode="dynamicIcon" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input1 = ref('理想汽车');
const input2 = ref('理想汽车');
const input3 = ref('理想汽车');
const input4 = ref();
const input5 = ref();
</script>
```

## 可清空

使用`clearable`属性即可得到一个可一键清空的输入框。

```
<template>
  <div class="demo-search">
    <li-search
      v-model="input"
      placeholder="请输入内容"
      direction="suffix"
      clearable
      @input="inputEvent"
      @click="clickEvent"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('理想汽车');

const inputEvent = (value: string) => {
  console.log(value);
};

const clickEvent = (value: string) => {
  console.log(value);
};
</script>
```

## 禁用

通过 `disabled` 属性指定是否禁用 search 组件。

```
<template>
  <div class="demo-search">
    <li-search v-model="input" placeholder="请输入内容" disabled @input="inputEvent" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('理想汽车');

const inputEvent = (value: string) => {
  console.log(value);
};
</script>
```

## 尺寸

支持三种尺寸，large、default、small。

large

default

small

```
<template>
  <div class="demo-search">
    <p style="margin: 12px 0">large</p>
    <li-search v-model="input1" placeholder="请输入内容" size="large" />

    <p style="margin: 12px 0">default</p>
    <li-search v-model="input2" placeholder="请输入内容" />

    <p style="margin: 12px 0">small</p>
    <li-search v-model="input3" placeholder="请输入内容" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input1 = ref('理想汽车');
const input2 = ref('理想汽车');
const input3 = ref('理想汽车');

const inputEvent = (value: string) => {
  console.log(value);
};
</script>
```

## Search API

### Search Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model | 绑定值 | `string` / `number` | - |
| mode | 展示风格 | `enum` normal | dynamic | icon | dynamicIcon | normal |
| disabled | 禁用 | `boolean` | false |
| clearable | 是否清除 | `boolean` | false |
| size | 大小 | `enum` large | default | small | - |
| direction | 搜索框头部图标的位置 | `string` | prefix / suffix |
| placeholder | 输入框占位文本 | `string` | - |

### Search Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| blur | 在 Search 失去焦点时触发 | `Function` (event: Event) |
| focus | 在 Search 获得焦点时触发 | `Function` (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | `Function` (value: string | number) |
| input | 在 Search 值改变时触发 | `Function` (value: string | number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | - |
| click | 当 direction="suffix"，可以接受 icon 的点击事件 | `Function` (value: string | number) |

最后修改日期： 2025-07-15
