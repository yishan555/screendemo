# Notification 通知

Maintainer: 窦林旭

1. [基础用法](#基础用法)
2. [不同类型的通知](#不同类型的通知)
3. [自定义消息弹出的位置](#自定义消息弹出的位置)
4. [有位置偏移的通知栏](#有位置偏移的通知栏)
5. [使用 HTML 片段作为正文内容](#使用-html-片段作为正文内容)
6. [隐藏关闭按钮](#隐藏关闭按钮)
7. [全局方法](#全局方法)
8. [单独引用](#单独引用)
9. [应用程序上下文继承](#应用程序上下文继承)
10. [Notification API](#notification-api)
    1. [Notification Props](#notification-props)
    2. [Notification Methods](#notification-methods)

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

LiUI 注册了 `$notify` 方法并且它接受一个 Object 作为其参数。在最简单的情况下，你可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。默认情况下，通知在 4500 毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。如果你将它设置为 `0`，那么通知将不会自动关闭。需要注意的是 `duration` 接收一个 `Number`，单位为毫秒。

可自动关闭  不会自动关闭

```
<template>
  <li-button @click="open1"> 可自动关闭 </li-button>
  <li-button @click="open2"> 不会自动关闭 </li-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { LiNotification } from '@chehejia/liui-next';

const open1 = () => {
  LiNotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, '提示消息'),
  });
};

const open2 = () => {
  LiNotification({
    title: 'Prompt',
    message: '这是一条不会自动关闭的消息',
    duration: 0,
  });
};
</script>
```

## 不同类型的通知

我们提供了四种不同类型的提醒框：success、warning、info 和 error。

LiUI 为 Notification 组件准备了四种通知类型：`success`，`warning`，`info`，`error`。他们可以设置 `type` 字段来修改，除上述的四个值之外的值会被忽略。同时，我们也为 Notification 的各种 type 注册了单独的方法，可以在不传入 `type` 字段的情况下像 `open3` 和 `open4` 那样直接调用。

Success  Warning  Info  Error

```
<template>
  <li-button @click="open1"> Success </li-button>
  <li-button @click="open2"> Warning </li-button>
  <li-button @click="open3"> Info </li-button>
  <li-button @click="open4"> Error </li-button>
</template>

<script lang="ts" setup>
import { LiNotification } from '@chehejia/liui-next';

const open1 = () => {
  LiNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  });
};

const open2 = () => {
  LiNotification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning',
  });
};

const open3 = () => {
  LiNotification({
    title: 'Info',
    message: 'This is an info message',
    type: 'info',
  });
};

const open4 = () => {
  LiNotification({
    title: 'Error',
    message: 'This is an error message',
    type: 'error',
  });
};
</script>
```

## 自定义消息弹出的位置

可以让 Notification 从屏幕四角中的任意一角弹出。

使用 `position` 属性设置 Notification 的弹出位置，支持六个选项：`top-right`、`top-left`、`bottom-right`、`bottom-left`、`top-center`、`bottom-center`，默认为 `top-right`。

Top Right  Bottom Right  Bottom Left  Top Left  Top Center  Bottom Center

```
<template>
  <li-button @click="open1"> Top Right </li-button>
  <li-button @click="open2"> Bottom Right </li-button>
  <li-button @click="open3"> Bottom Left </li-button>
  <li-button @click="open4"> Top Left </li-button>
  <li-button @click="open5"> Top Center </li-button>
  <li-button @click="open6"> Bottom Center </li-button>
</template>

<script lang="ts" setup>
import { LiNotification } from '@chehejia/liui-next';

const open1 = () => {
  LiNotification({
    title: 'Custom Position',
    message: "I'm at the top right corner",
  });
};

const open2 = () => {
  LiNotification({
    title: 'Custom Position',
    message: "I'm at the bottom right corner",
    position: 'bottom-right',
  });
};

const open3 = () => {
  LiNotification({
    title: 'Custom Position',
    message: "I'm at the bottom left corner",
    position: 'bottom-left',
  });
};

const open4 = () => {
  LiNotification({
    title: 'Custom Position',
    message: "I'm at the top left corner",
    position: 'top-left',
  });
};

const open5 = () => {
  LiNotification({
    title: 'Custom Position',
    message: "I'm at the top-center corner",
    position: 'top-center',
  });
};

const open6 = () => {
  LiNotification({
    title: 'Custom Position',
    message: "I'm at the bottom-center corner",
    position: 'bottom-center',
  });
};
</script>
```

## 有位置偏移的通知栏

能够设置偏移量来使 Notification 偏移默认位置。

Notification 提供设置偏移量的功能，通过设置 `offset` 字段，可以使弹出的消息距屏幕边缘偏移一段距离。注意在同一时刻，每一个的 Notification 实例应当具有一个相同的偏移量。

Notification with offset

```
<template>
  <li-button @click="open"> Notification with offset </li-button>
</template>

<script lang="ts" setup>
import { LiNotification } from '@chehejia/liui-next';

const open = () => {
  LiNotification.success({
    title: 'Success',
    message: 'This is a success message',
    offset: 100,
  });
};
</script>
```

## 使用 HTML 片段作为正文内容

`message` 支持传入 HTML 字符串来作为正文内容。

将 `dangerouslyUseHTMLString` 属性设置为 true，`message` 属性就会被当作 HTML 片段处理。

Use HTML String

```
<template>
  <li-button @click="open"> Use HTML String </li-button>
</template>

<script lang="ts" setup>
import { LiNotification } from '@chehejia/liui-next';

const open = () => {
  LiNotification({
    title: 'HTML String',
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>
```

WARNING

`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。

## 隐藏关闭按钮

通知的关闭按钮可以被设置为隐藏。

将 `showClose` 属性设置为 `false` 即可隐藏关闭按钮。

Hide close button

```
<template>
  <li-button @click="open"> Hide close button </li-button>
</template>

<script lang="ts" setup>
import { LiNotification } from '@chehejia/liui-next';

const open = () => {
  LiNotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  });
};
</script>
```

## 全局方法

LiUI 为 `app.config.globalProperties` 添加了全局方法 `$notify`。因此在 Vue instance 中可以采用本页面中的方式调用 `Notification`。

## 单独引用

```
import { LiNotification } from '@chehejia/liui-next'
```

你可以在对应的处理函数内调用 `LiNotification(options)` 来呼出通知栏。我们也提前定义了多个 type 的单独调用方法，如 `LiNotification.success(options)`。当你需要关闭页面上所有的通知栏的时候，可以调用 `LiNotification.closeAll()` 来关闭所有的实例。

## 应用程序上下文继承

现在 Notification 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 Notification 中，这将允许你继承应用程序的所有属性。

你可以像这样使用它：

TIP

如果您全局注册了 LiNotification 组件，它将自动继承应用的上下文环境。

```
import { getCurrentInstance } from 'vue'
import { LiNotification } from '@chehejia/liui-next'

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!
LiNotification({}, appContext)
```

## Notification API

### Notification Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| message | 通知栏正文内容 | `string | Vue.VNode` | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | `boolean` | false |
| type | 通知的类型 | `string` 'success' | 'warning' | 'info' | 'error' | — |
| icon | 自定义图标。若设置了 `type`，则 `icon` 会被覆盖 | `string | Component` | — |
| custom-class | 自定义类名 | `string` | — |
| duration | 显示时间，单位为毫秒。值为 0 则不会自动关闭 | `number` | 4500 |
| position | 自定义弹出位置 | `string` 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' | top-right |
| show-close | 是否显示关闭按钮 | `boolean` | true |
| on-close | 关闭时的回调函数 | `function` | — |
| on-click | 点击 Notification 时的回调函数 | `function` | — |
| offset | 相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | `number` | 0 |
| appendTo | 设置通知栏在 DOM 中的根元素 | `string | HTMLElement` | document.body |

### Notification Methods

`Notification` 和 `this.$notify` 都返回当前的 Notification 实例。如果需要手动关闭实例，可以调用它的 `close` 方法。

| 名称 | 说明 |
| --- | --- |
| close | 关闭当前的 Notification |

最后修改日期： 2025-07-15
