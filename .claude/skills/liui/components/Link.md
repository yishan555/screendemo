# Link 链接

Maintainer: 陈尚书

1. [基础用法](#基础用法)
2. [禁用状态](#禁用状态)
3. [下划线](#下划线)
4. [图标](#图标)
5. [Link API](#link-api)
   1. [Link Props](#link-props)
   2. [Link Slots](#link-slots)

文字超链接。

## 基础用法

基础的文字链接用法。

[default](https://fed.chehejia.com/)primarysuccesswarningdangerinfo

```
<template>
  <div>
    <li-link href="https://fed.chehejia.com/" target="_blank">default</li-link>
    <li-link type="primary">primary</li-link>
    <li-link type="success">success</li-link>
    <li-link type="warning">warning</li-link>
    <li-link type="danger">danger</li-link>
    <li-link type="info">info</li-link>
  </div>
</template>
<style scoped>
.li-link {
  margin-right: 8px;
}

.li-link .li-icon--right.li-icon {
  vertical-align: text-bottom;
}
</style>
```

## 禁用状态

文字链接不可用状态。

defaultprimarysuccesswarningdangerinfo

```
<template>
  <div>
    <li-link disabled>default</li-link>
    <li-link type="primary" disabled>primary</li-link>
    <li-link type="success" disabled>success</li-link>
    <li-link type="warning" disabled>warning</li-link>
    <li-link type="danger" disabled>danger</li-link>
    <li-link type="info" disabled>info</li-link>
  </div>
</template>
<style scoped>
.li-link {
  margin-right: 8px;
}

.li-link .li-icon--right.li-icon {
  vertical-align: text-bottom;
}
</style>
```

## 下划线

文字链接下划线。

Without UnderlineWith Underline

```
<template>
  <div>
    <li-link :underline="false">Without Underline</li-link>
    <li-link>With Underline</li-link>
  </div>
</template>
<style scoped>
.li-link {
  margin-right: 8px;
}

.li-link .li-icon--right.li-icon {
  vertical-align: text-bottom;
}
</style>
```

## 图标

带图标的链接。

TIP

使用 `icon` 属性来为按钮添加图标。你可以传递组件名称的字符串（提前注册）或组件本身是一个 SVG Vue 组件。 LiUI 提供了一组图标，你可以在 [icon component](./icon) 中查看。

EditCheck

```
<template>
  <div>
    <li-link :icon="IconEditTextEditingO">Edit</li-link>
    <li-link>
      Check<li-icon class="li-icon--right"><icon-basic-visible-o /></li-icon>
    </li-link>
  </div>
</template>

<script setup lang="ts">
import { IconBasicVisibleO, IconEditTextEditingO } from '@chehejia/liui-icons';
</script>

<style scoped>
.li-link {
  margin-right: 8px;
}
</style>
```

## Link API

### Link Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `string` 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | default |
| underline | 是否下划线 | `boolean` | true |
| disabled | 是否禁用状态 | `boolean` | false |
| href | 原生 href 属性 | `string` | — |
| icon | 图标组件 | `string` / `Component` | — |

### Link Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |
| icon | 自定义图标组件 |

最后修改日期： 2025-07-15
