# Empty 空状态

Maintainer: 刘振兴

1. [基础用法](#基础用法)
2. [自定义图片](#自定义图片)
3. [图片尺寸](#图片尺寸)
4. [底部内容](#底部内容)
5. [自定义样式](#自定义样式)
   1. [默认变量](#默认变量)
6. [Empty API](#empty-api)
   1. [Empty Props](#empty-props)
   2. [Empty Slots](#empty-slots)

空状态时的占位提示。

## 基础用法

description

```
<template>
  <li-empty description="description" />
</template>
```

## 自定义图片

通过设置 `image` 属性传入图片 URL。

![](https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png)

暂无数据

```
<template>
  <li-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
</template>
```

## 图片尺寸

通过使用 `image-size` 属性来控制图片大小。

暂无数据

```
<template>
  <li-empty :image-size="200" />
</template>
```

## 底部内容

使用默认插槽可在底部插入内容。

暂无数据

Button

```
<template>
  <li-empty>
    <li-button type="primary">Button</li-button>
  </li-empty>
</template>
```

## 自定义样式

您可以为 empty 组件设置自定义样式。 使用 `css/scss` 语言来更改全局或局部颜色。 我们设置了一些全局颜色变量：`--li-empty-fill-color-0`、`--li-empty-fill-color-1`、`--li-empty-fill-color-2`、……、`--li-empty-fill-color-9`。 您可以使用类似 `:root { --li-empty-fill-color-0: red; --li-empty-fill-color-1: blue; }` 等变量。 但通常，如果你想要更改样式，你需要更改所有颜色，因为这些颜色是一个组合。

### 默认变量

| 变量 | 颜色 |
| --- | --- |
| --li-empty-fill-color-0 | var(--li-color-white) |
| --li-empty-fill-color-1 | #fcfcfd |
| --li-empty-fill-color-2 | #f8f9fb |
| --li-empty-fill-color-3 | #f7f8fc |
| --li-empty-fill-color-4 | #eeeff3 |
| --li-empty-fill-color-5 | #edeef2 |
| --li-empty-fill-color-6 | #e9ebef |
| --li-empty-fill-color-7 | #e5e7e9 |
| --li-empty-fill-color-8 | #e0e3e9 |
| --li-empty-fill-color-9 | #d5d7de |

## Empty API

### Empty Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| image | 图片地址 | string | — | — |
| image-size | 图片大小（宽度） | number | — | — |
| description | 描述 | string | — | — |

### Empty Slots

| 插槽名 | 描述说明 |
| --- | --- |
| default | 自定义底部内容 |
| image | 自定义图片 |
| description | 自定义描述 |

最后修改日期： 2025-07-15
