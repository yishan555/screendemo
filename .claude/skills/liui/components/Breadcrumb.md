# Breadcrumb 面包屑

Maintainer: 李林森

1. [基础用法](#基础用法)
2. [尺寸](#尺寸)
3. [图标分隔符](#图标分隔符)
4. [Breadcrumb API](#breadcrumb-api)
   1. [Breadcrumb Props](#breadcrumb-props)
   2. [Breadcrumb Slots](#breadcrumb-slots)
5. [BreadcrumbItem API](#breadcrumbitem-api)
   1. [BreadcrumbItem Props](#breadcrumbitem-props)
   2. [BreadcrumbItem Slots](#breadcrumbitem-slots)

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

在 `li-breadcrumb` 中使用 `li-breadcrumb-item` 标签表示从首页开始的每一级。 该组件接受一个 `String` 类型的参数 `separator`来作为分隔符。 默认值为 '/'。

homepage/[promotion management](/)/promotion list/promotion detail/

```
<template>
  <li-breadcrumb separator="/">
    <li-breadcrumb-item :to="{ path: '/' }">homepage</li-breadcrumb-item>
    <li-breadcrumb-item><a href="/">promotion management</a></li-breadcrumb-item>
    <li-breadcrumb-item>promotion list</li-breadcrumb-item>
    <li-breadcrumb-item>promotion detail</li-breadcrumb-item>
  </li-breadcrumb>
</template>
```

## 尺寸

使用 `size` 属性额外配置尺寸，可使用 `large` 和 `small` 两种值。

homepage/promotion list/promotion detail/

  

homepage/promotion list/promotion detail/

  

homepage/promotion list/promotion detail/

```
<template>
  <li-breadcrumb size="small">
    <li-breadcrumb-item>homepage</li-breadcrumb-item>
    <li-breadcrumb-item>promotion list</li-breadcrumb-item>
    <li-breadcrumb-item>promotion detail</li-breadcrumb-item>
  </li-breadcrumb>
  <br />
  <li-breadcrumb>
    <li-breadcrumb-item>homepage</li-breadcrumb-item>
    <li-breadcrumb-item>promotion list</li-breadcrumb-item>
    <li-breadcrumb-item>promotion detail</li-breadcrumb-item>
  </li-breadcrumb>
  <br />
  <li-breadcrumb size="large">
    <li-breadcrumb-item>homepage</li-breadcrumb-item>
    <li-breadcrumb-item>promotion list</li-breadcrumb-item>
    <li-breadcrumb-item>promotion detail</li-breadcrumb-item>
  </li-breadcrumb>
</template>
```

## 图标分隔符

通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 失效。

homepagepromotion managementpromotion listpromotion detail

```
<template>
  <li-breadcrumb :separator-icon="IconArrowRightO">
    <li-breadcrumb-item :to="{ path: '/' }">homepage</li-breadcrumb-item>
    <li-breadcrumb-item>promotion management</li-breadcrumb-item>
    <li-breadcrumb-item>promotion list</li-breadcrumb-item>
    <li-breadcrumb-item>promotion detail</li-breadcrumb-item>
  </li-breadcrumb>
</template>

<script lang="ts" setup>
import { IconArrowRightO } from '@chehejia/liui-icons';
</script>
```

## Breadcrumb API

### Breadcrumb Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| separator | 分隔符 | `string` | / |
| size | 尺寸 | `enum` '' | 'default' | 'small' | 'large' | `default` |
| separator-icon | 图标分隔符的组件或组件名 | `string` / `Component` | - |

### Breadcrumb Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| default | 自定义默认内容 | Breadcrumb Item |

## BreadcrumbItem API

### BreadcrumbItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 路由跳转目标，同 `vue-router` 的 `to` 属性 | `string` / `object` RouteLocationRaw | '' |
| replace | 如果设置该属性为 `true`, 导航将不会留下历史记录 | `boolean` | false |

### BreadcrumbItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

最后修改日期： 2025-07-15
