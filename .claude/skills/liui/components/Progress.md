# Progress 进度条

Maintainer: 刘振兴

1. [直线进度条](#直线进度条)
2. [进度条内显示百分比标识](#进度条内显示百分比标识)
3. [自定义进度条的颜色](#自定义进度条的颜色)
4. [环形进度条](#环形进度条)
5. [仪表盘形进度条](#仪表盘形进度条)
6. [自定义内容](#自定义内容)
7. [动画进度条](#动画进度条)
8. [Progress API](#progress-api)
   1. [Progress Props](#progress-props)
   2. [Progress Slots](#progress-slots)

用于展示操作进度，告知用户当前状态和预期。

## 直线进度条

Progress 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性**必填**，并且必须在 `0-100` 的范围内。 你可以通过设置 `format` 来自定义文字显示的格式。

50%

Full

```
<template>
  <div class="demo-progress">
    <li-progress :percentage="50" />
    <li-progress :percentage="100" :format="format" />
    <li-progress :percentage="100" status="success" />
    <li-progress :percentage="100" status="warning" />
    <li-progress :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>

<style scoped>
.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
```

## 进度条内显示百分比标识

百分比不占用额外控件，适用于文件上传等场景。

Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字。

70%

100%

80%

50%

```
<template>
  <div class="demo-progress">
    <li-progress text-inside :stroke-width="26" :percentage="70" />
    <li-progress text-inside :stroke-width="24" :percentage="100" status="success" />
    <li-progress text-inside :stroke-width="22" :percentage="80" status="warning" />
    <li-progress text-inside :stroke-width="20" :percentage="50" status="exception" />
  </div>
</template>

<style scoped>
.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
```

## 自定义进度条的颜色

可以通过 `color` 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值，函数和数组。

20%

20%

20%

20%

```
<template>
  <div class="demo-progress">
    <li-progress :percentage="percentage" :color="customColor" />

    <li-progress :percentage="percentage" :color="customColorMethod" />

    <li-progress :percentage="percentage" :color="customColors" />
    <li-progress :percentage="percentage" :color="customColors" />
    <div>
      <li-button-group>
        <li-button :icon="IconBasicCutO" @click="decrease" />
        <li-button :icon="IconBasicAddO" @click="increase" />
      </li-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconBasicAddO, IconBasicCutO } from '@chehejia/liui-icons';

const percentage = ref(20);
const customColor = ref('#409eff');

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399';
  }
  if (percentage < 70) {
    return '#e6a23c';
  }
  return '#67c23a';
};
const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
</script>
<style scoped>
.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
```

## 环形进度条

Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

0%

25%

```
<template>
  <div class="demo-progress">
    <li-progress type="circle" :percentage="0" />
    <li-progress type="circle" :percentage="25" />
    <li-progress type="circle" :percentage="100" status="success" />
    <li-progress type="circle" :percentage="70" status="warning" />
    <li-progress type="circle" :percentage="50" status="exception" />
  </div>
</template>
<style scoped>
.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .li-progress--circle {
  margin-right: 15px;
}
</style>
```

## 仪表盘形进度条

您也可以指定 `type` 属性到 `dashboard` 使用控制面板进度栏。

10%

30%

```
<template>
  <div class="demo-progress">
    <li-progress type="dashboard" :percentage="percentage" :color="colors" />
    <li-progress type="dashboard" :percentage="percentage2" :color="colors" />
    <div>
      <li-button-group>
        <li-button :icon="IconBasicCutO" @click="decrease" />
        <li-button :icon="IconBasicAddO" @click="increase" />
      </li-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { IconBasicAddO, IconBasicCutO } from '@chehejia/liui-icons';

const percentage = ref(10);
const percentage2 = ref(0);

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
onMounted(() => {
  setInterval(() => {
    percentage2.value = (percentage2.value % 100) + 10;
  }, 500);
});
</script>
<style scoped>
.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .li-progress--circle {
  margin-right: 15px;
}
</style>
```

## 自定义内容

通过默认插槽添加自定义内容。

Content

Content

80%Progressing

```
<template>
  <div class="demo-progress">
    <li-progress :percentage="50">
      <li-button text>Content</li-button>
    </li-progress>
    <li-progress text-inside :stroke-width="20" :percentage="50" status="exception">
      <span>Content</span>
    </li-progress>
    <li-progress type="circle" :percentage="100" status="success">
      <li-button type="success" :icon="IconBasicSelectedO" circle />
    </li-progress>
    <li-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </li-progress>
  </div>
</template>

<script lang="ts" setup>
import { IconBasicSelectedO } from '@chehejia/liui-icons';
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .li-progress--circle {
  margin-right: 15px;
}
</style>
```

## 动画进度条

使用 `intermediate` 属性来设置不确定的进度， `duration` 来控制动画持续时间。

50%

Full

```
<template>
  <div class="demo-progress">
    <li-progress :percentage="50" indeterminate />
    <li-progress :percentage="100" :format="format" indeterminate />
    <li-progress :percentage="100" status="success" indeterminate :duration="5" />
    <li-progress :percentage="100" status="warning" indeterminate :duration="1" />
    <li-progress :percentage="50" status="exception" indeterminate />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>
<style scoped>
.demo-progress .li-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
```

## Progress API

### Progress Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 百分比，**必填** | `number` | 0 |
| type | 进度条类型 | `string` 'line' | 'circle' | 'dashboard' | line |
| stroke-width | 进度条的宽度 | `number` | 6 |
| text-inside | 进度条显示文字内置在进度条内（仅 `type` 为 'line' 时可用） | `boolean` | false |
| status | 进度条当前状态 | `string` 'success' | 'exception' | 'warning' | — |
| indeterminate | 是否为动画进度条 | `boolean` | false |
| duration | 控制动画进度条速度 | `number` | 3 |
| color | 进度条背景色 进度条背景色 （会覆盖 `status` 状态颜色） | `string` | `Function` | `array` | '' |
| width | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | `number` | 126 |
| show-text | 是否显示进度条文字内容 | `boolean` | true |
| stroke-linecap | circle/dashboard 类型路径两端的形状 | `string` 'butt' | 'round' | 'square' | round |
| format | 指定进度条文字内容 | `Function` (percentage: number) => string | — |

### Progress Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，参数为 `{ percentage }` |

最后修改日期： 2025-07-15
