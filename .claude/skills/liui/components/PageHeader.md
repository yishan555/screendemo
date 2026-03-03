# Page Header 页头

Maintainer: 陈尚书

1. [完整示例](#完整示例)
2. [基础用法](#基础用法)
3. [自定义图标](#自定义图标)
4. [面包屑导航](#面包屑导航)
5. [额外操作部分](#额外操作部分)
6. [主要内容](#主要内容)
7. [组件插槽结构](#组件插槽结构)
8. [Page Header API](#page-header-api)
   1. [Page Header Props](#page-header-props)
   2. [Page Header Events](#page-header-events)
   3. [Page Header Slots](#page-header-slots)

快速创建符合 LiUI 设计规范的页头。

## 完整示例

Page Title

homepage /[route 1](./page-header.html)/route 2/

PrintEdit

|  |  |  |
| --- | --- | --- |
| Usernamekooriookami | Telephone18100000000 | PlaceSuzhou |
| RemarksSchool | AddressNo.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province | |

LiUI team uses **weekly** release strategy under normal circumstance, but critical bug fixes would require hotfix so the actual release number **could be** more than 1 per week.

```
<template>
  <div aria-label="A complete example of page header">
    <li-page-header @back="onBack">
      <template #title>
        <div>Page Title</div>
      </template>
      <template #breadcrumb>
        <li-breadcrumb separator="/">
          <li-breadcrumb-item :to="{ path: './page-header.html' }"> homepage </li-breadcrumb-item>
          <li-breadcrumb-item><a href="./page-header.html">route 1</a></li-breadcrumb-item>
          <li-breadcrumb-item>route 2</li-breadcrumb-item>
        </li-breadcrumb>
      </template>
      <template #extra>
        <div class="flex items-center">
          <li-button>Print</li-button>
          <li-button type="primary" class="ml-2">Edit</li-button>
        </div>
      </template>

      <li-descriptions :column="3" size="small">
        <li-descriptions-item label="Username">kooriookami</li-descriptions-item>
        <li-descriptions-item label="Telephone">18100000000</li-descriptions-item>
        <li-descriptions-item label="Place">Suzhou</li-descriptions-item>
        <li-descriptions-item label="Remarks">
          <li-tag size="small">School</li-tag>
        </li-descriptions-item>
        <li-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </li-descriptions-item>
      </li-descriptions>
      <p class="mt-4 text-sm">
        LiUI team uses <b>weekly</b> release strategy under normal circumstance, but critical bug fixes would require
        hotfix so the actual release number <b>could be</b> more than 1 per week.
      </p>
    </li-page-header>
  </div>
</template>

<script setup lang="ts">
import { LiNotification as notify } from '@chehejia/liui-next';

const onBack = () => {
  notify('Back');
};
</script>
```

## 基础用法

简单场景下的标准页头，title 默认显示 `route.meta.title`，可通过配置 `title` 属性或添加插槽 `title` 来进行设置。

Title

```
<template>
  <li-page-header title="Title" @back="goBack" />
</template>
<script lang="ts" setup>
const goBack = () => {
  console.log('go back');
};
</script>
```

## 自定义图标

默认图标可能无法满足你的需求，可以通过设置 `icon` 属性来自定义图标，示例如下。

Title

```
<template>
  <li-page-header title="Title" :icon="IconArrowLeftO" />
</template>

<script lang="ts" setup>
import { IconArrowLeftO } from '@chehejia/liui-icons';
</script>
```

## 面包屑导航

可以通过设置 `breadcrumb-route` 属性为当前路由实例来从路由生成面包屑，或添加插槽 `breadcrumb` 来设置面包屑路由导航。

Title

homepage /[route 1](./page-header.html)/route 2/

```
<template>
  <li-page-header title="Title">
    <template #breadcrumb>
      <li-breadcrumb separator="/">
        <li-breadcrumb-item :to="{ path: './page-header.html' }"> homepage </li-breadcrumb-item>
        <li-breadcrumb-item><a href="./page-header.html">route 1</a></li-breadcrumb-item>
        <li-breadcrumb-item>route 2</li-breadcrumb-item>
      </li-breadcrumb>
    </template>
  </li-page-header>
</template>
```

## 额外操作部分

头部可能会变得很复杂，你可以在头部添加更多的区块，以允许丰富的交互。

![](https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png) Title  Sub title Default

PrintEdit

```
<template>
  <li-page-header>
    <template #title>
      <div class="flex items-center">
        <li-avatar :size="32" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="text-large font-600 mr-3"> Title </span>
        <span class="text-sm mr-2" style="color: var(--li-text-color-regular)"> Sub title </span>
        <li-tag>Default</li-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <li-button>Print</li-button>
        <li-button type="primary" class="ml-2">Edit</li-button>
      </div>
    </template>
  </li-page-header>
</template>
```

## 主要内容

有时我们想让页头显示一些协同响应内容，我们可以使用 `default` 插槽。

Title

Your additional content can be added with default slot, You may put as many content as you want here.

```
<template>
  <li-page-header title="Title">
    <div class="mt-4 text-sm font-bold">
      Your additional content can be added with default slot, You may put as many content as you want here.
    </div>
  </li-page-header>
</template>
```

## 组件插槽结构

本组件由这些部件构成：

```
<template>
  <li-page-header>
    
    <template #icon />
    <template #title />
    <template #breadcrumb />
    
    <template #extra />
    
    <template #default />
  </li-page-header>
</template>
```

## Page Header API

### Page Header Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标组件 | `string` / `Component` | - |
| title | 标题 | `string` | - |
| breadcrumb-route | 用于生成面包屑的 `route` （来自 `vue-router` 的 [`useRoute()`](https://router.vuejs.org/api/#Functions-useRoute "useRoute")） | `RouteLocationNormalizedLoaded` | - |

### Page Header Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| back | 点击左侧按钮触发 | — |

### Page Header Slots

| 名称 | 说明 |
| --- | --- |
| icon | 自定义图标 |
| title | 标题内容 |
| breadcrumb | 面包屑内容 |
| extra | 扩展设置 |
| default | 默认内容 |

最后修改日期： 2025-07-15
