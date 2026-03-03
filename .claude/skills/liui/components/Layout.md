# Layout 布局

1. [基础布局](#基础布局)
2. [分栏间隔](#分栏间隔)
3. [混合布局](#混合布局)
4. [列偏移](#列偏移)
5. [对齐方式](#对齐方式)
6. [响应式布局](#响应式布局)
7. [基于断点的隐藏类](#基于断点的隐藏类)
8. [Row API](#row-api)
   1. [Row Props](#row-props)
   2. [Row Slots](#row-slots)
9. [Col API](#col-api)
   1. [Col Props](#col-props)
   2. [Col Slots](#col-slots)

通过基础的 24 分栏，迅速简便地创建布局。

TIP

组件默认使用 Flex 布局，不需要手动设置 `type="flex"`。

请注意父容器避免使用 `inline` 相关样式，会导致组件宽度不能撑满。

## 基础布局

使用列创建基础网格布局。

通过 `row` 和 `col` 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。

```
<template>
  <li-row>
    <li-col :span="24"><div class="grid-content li-bg-purple-dark" /></li-col>
  </li-row>
  <li-row>
    <li-col :span="12"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="12"><div class="grid-content li-bg-purple-light" /></li-col>
  </li-row>
  <li-row>
    <li-col :span="8"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="8"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="8"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
  </li-row>
  <li-row>
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple-light" /></li-col>
  </li-row>
</template>

<style lang="scss">
@import url('./index.scss');

.li-row {
  margin-bottom: 20px;
}

.li-row:last-child {
  margin-bottom: 0;
}

.li-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}
</style>
```

## 分栏间隔

支持列间距。

行提供 `gutter` 属性来指定列之间的间距，其默认值为 0。`gutter` 支持使用数组形式同时设置 `[水平间距，垂直间距]`。

```
<template>
  <li-row :gutter="20">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>

  <li-row :gutter="[20, 50]">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>

    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
</template>

<style>
.li-row {
  margin-bottom: 20px;
}

.li-row:last-child {
  margin-bottom: 0;
}

.li-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}
</style>
```

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

```
<template>
  <li-row :gutter="20">
    <li-col :span="16"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="8"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row :gutter="20">
    <li-col :span="8"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="8"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row :gutter="20">
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="16"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="4"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
</template>

<style>
.li-row {
  margin-bottom: 20px;
}

.li-row:last-child {
  margin-bottom: 0;
}

.li-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}
</style>
```

## 列偏移

您可以指定列偏移量。

通过制定 col 组件的 `offset` 属性可以指定分栏偏移的栏数。

```
<template>
  <li-row :gutter="20">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6" :offset="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row :gutter="20">
    <li-col :span="6" :offset="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6" :offset="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row :gutter="20">
    <li-col :span="12" :offset="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
</template>

<style>
.li-row {
  margin-bottom: 20px;
}

.li-row:last-child {
  margin-bottom: 0;
}

.li-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}
</style>
```

## 对齐方式

默认使用 flex 布局来对分栏进行灵活的对齐。

您可以通过`justify` 属性来定义子元素的排版方式，其取值为 start、center、end、space-between、space-around 或 space-evenly。

```
<template>
  <li-row class="row-bg">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row class="row-bg" justify="center">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row class="row-bg" justify="end">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row class="row-bg" justify="space-between">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row class="row-bg" justify="space-around">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
  <li-row class="row-bg" justify="space-evenly">
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :span="6"><div class="grid-content li-bg-purple" /></li-col>
  </li-row>
</template>

<style>
.li-row {
  margin-bottom: 20px;
}

.li-row:last-child {
  margin-bottom: 0;
}

.li-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}
</style>
```

## 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

```
<template>
  <li-row :gutter="10">
    <li-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content li-bg-purple-light" /></li-col>
    <li-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content li-bg-purple" /></li-col>
    <li-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content li-bg-purple-light" /></li-col>
  </li-row>
</template>

<style>
.li-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}
</style>
```

## 基于断点的隐藏类

LiUI 额外提供了一系列类名，用于在某些条件下隐藏元素。 这些类名可以添加在任何 DOM 元素或自定义组件上。 如果需要，请自行引入以下文件：

```
import '@chehejia/liui-next/theme-chalk/display.css'
```

这些类名为：

* `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
* `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
* `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
* `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
* `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
* `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
* `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
* `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
* `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
* `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
* `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏

## Row API

### Row Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔，支持使用数组形式同时设置 `[水平间距，垂直间距]` | `number` | [number, number] | 0 |
| justify | flex 布局下的水平排列方式 | `enum` 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly' | start |
| align | flex 布局下的垂直排列方式 | `enum` 'top' | 'middle' | 'bottom' | top |
| tag | 自定义元素标签 | `string` | div |

### Row Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| default | 自定义默认内容 | Col |

## Col API

### Col Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占据的列数 | `number` | 24 |
| offset | 栅格左侧的间隔格数 | `number` | 0 |
| push | 栅格向右移动格数 | `number` | 0 |
| pull | 栅格向左移动格数 | `number` | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | `number` / `object` {span?: number, offset?: number, pull?: number, push?: number} | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | `number` / `object` {span?: number, offset?: number, pull?: number, push?: number} | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | `number` / `object` {span?: number, offset?: number, pull?: number, push?: number} | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | `number` / `object` {span?: number, offset?: number, pull?: number, push?: number} | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | `number` / `object` {span?: number, offset?: number, pull?: number, push?: number} | — |
| tag | 自定义元素标签 | `string` | div |

### Col Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

最后修改日期： 2025-07-15
