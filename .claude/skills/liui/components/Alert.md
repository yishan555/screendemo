# Alert 提示

Maintainer: 窦林旭

1. [基础用法](#基础用法)
2. [自定义关闭按钮](#自定义关闭按钮)
3. [使用图标](#使用图标)
4. [文字居中](#文字居中)
5. [文字描述](#文字描述)
6. [带图标和描述](#带图标和描述)
7. [Alert API](#alert-api)
   1. [Alert Props](#alert-props)
   2. [Alert Events](#alert-events)
   3. [Alert Slots](#alert-slots)

用于页面中展示重要的提示信息。

## 基础用法

Alert 组件不属于浮层元素，不会自动消失或关闭。

Alert 组件提供四种类型，由 `type` 属性指定，默认值为 `info`。

success alert

info alert

warning alert

error alert

```
<template>
  <li-alert title="success alert" type="success" />
  <li-alert title="info alert" type="info" />
  <li-alert title="warning alert" type="warning" />
  <li-alert title="error alert" type="error" />
</template>

<style scoped>
.li-alert {
  margin: 20px 0 0;
}
.li-alert:first-child {
  margin: 0;
}
</style>
```

## 自定义关闭按钮

你可以自定义关闭按钮为文字或其他符号。

你可以设置 Alert 组件是否为可关闭状态，关闭按钮的内容以及关闭时的回调函数同样可以定制。`closable` 属性决定 Alert 组件是否可关闭，该属性接受一个 `Boolean`，默认为 `false`。你可以设置 `close-text` 属性来代替右侧的关闭图标， 需要注意的是 `close-text` 必须是一个字符串。当 Alert 组件被关闭时会触发 `close` 事件。

unclosable alert

customized close-text关闭

alert with callback

```
<template>
  <li-alert title="unclosable alert" type="success" :closable="false" />
  <li-alert title="customized close-text" type="info" close-text="关闭" />
  <li-alert title="alert with callback" type="warning" @close="hello" />
</template>

<script lang="ts" setup>
const hello = () => {
  // eslint-disable-next-line no-alert
  alert('Hello World!');
};
</script>
<style scoped>
.li-alert {
  margin: 20px 0 0;
}
.li-alert:first-child {
  margin: 0;
}
</style>
```

## 使用图标

你可以通过为 Alert 组件添加图标来提高可读性。

通过设置 `show-icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

通过设置 `icon` 属性或 `icon` 插槽来字定义 Alert 的 icon。

success alert

info alert

warning alert

error alert

success alert

success alert

```
<template>
  <li-alert title="success alert" type="success" show-icon />
  <li-alert title="info alert" type="info" show-icon />
  <li-alert title="warning alert" type="warning" show-icon />
  <li-alert title="error alert" type="error" show-icon />

  <li-alert title="success alert" type="success" :icon="IconArrowCircleDownO" />
  <li-alert title="success alert" type="success">
    <template #icon><IconAttentionWarningO /></template>
  </li-alert>
</template>
<script setup lang="ts">
import { IconArrowCircleDownO, IconAttentionWarningO } from '@chehejia/liui-icons';
</script>
<style scoped>
.li-alert {
  margin: 20px 0 0;
}

.li-alert:first-child {
  margin: 0;
}
</style>
```

## 文字居中

使用 `center` 属性来让文字水平居中。

success alert

info alert

warning alert

error alert

```
<template>
  <li-alert title="success alert" type="success" center show-icon />
  <li-alert title="info alert" type="info" center show-icon />
  <li-alert title="warning alert" type="warning" center show-icon />
  <li-alert title="error alert" type="error" center show-icon />
</template>
<style scoped>
.li-alert {
  margin: 20px 0 0;
}
.li-alert:first-child {
  margin: 0;
}
</style>
```

## 文字描述

为 Alert 组件添加一个更加详细的描述来使用户了解更多信息。

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放文本内容，当内容超出长度限制时会自动换行显示。

with description

This is a description.

```
<template>
  <li-alert title="with description" type="success" description="This is a description." />
</template>
```

## 带图标和描述

在最后，这是一个带有图标和描述的例子。

success alert

more text description

info alert

more text description

warning alert

more text description

error alert

more text description

error alert

more text description

success alert

more text description  
 more text description

```
<template>
  <li-alert title="success alert" type="success" description="more text description" show-icon />
  <li-alert title="info alert" type="info" description="more text description" show-icon />
  <li-alert title="warning alert" type="warning" description="more text description" show-icon />
  <li-alert title="error alert" type="error" description="more text description" show-icon />
  <li-alert title="error alert" type="success" description="more text description" :icon="IconAttentionWarningO" />
  <li-alert title="success alert" type="error">
    <template #icon><IconAttentionWarningO /></template>
    more text description<br />
    more text description
  </li-alert>
</template>
<script setup lang="ts">
import { IconAttentionWarningO } from '@chehejia/liui-icons';
</script>
<style scoped>
.li-alert {
  margin: 20px 0 0;
}

.li-alert:first-child {
  margin: 0;
}
</style>
```

## Alert API

### Alert Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | Alert 标题 | `string` | — |
| type | Alert 类型 | `string` 'success' | 'warning' | 'info' | 'error' | `info` |
| description | 描述性文本 | `string` | — |
| closable | 是否可以关闭 | `boolean` | `true` |
| center | 文字是否居中 | `boolean` | `false` |
| close-text | 自定义关闭按钮文本 | `string` | — |
| show-icon | 是否显示类型图标 | `boolean` | `false` |
| icon | 图标组件 | `Component` | — |
| show-border-radius | 是否圆角展示 | `boolean` | `true` |

### Alert Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| close | 关闭 Alert 时触发的事件 | `Function` (event: MouseEvent) => void |

### Alert Slots

| 名称 | 说明 |
| --- | --- |
| default | Alert 内容描述 |
| title | 标题的内容 |
| icon | 自定义图标组件 |

最后修改日期： 2025-07-15
