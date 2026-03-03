# Text

Maintainer: 陈尚书

1. [基础用法](#基础用法)
2. [尺寸](#尺寸)
3. [省略](#省略)
4. [覆盖](#覆盖)
5. [混合使用](#混合使用)
6. [Text API](#text-api)
   1. [Text Props](#text-props)
   2. [Text Slots](#text-slots)

## 基础用法

由 `type` 属性来选择 Text 的类型。

DefaultPrimarySuccessInfoWarningDanger

```
<template>
  <li-text class="mx-1">Default</li-text>
  <li-text class="mx-1" type="primary">Primary</li-text>
  <li-text class="mx-1" type="success">Success</li-text>
  <li-text class="mx-1" type="info">Info</li-text>
  <li-text class="mx-1" type="warning">Warning</li-text>
  <li-text class="mx-1" type="danger">Danger</li-text>
</template>
```

## 尺寸

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`。

LargeDefaultSmall

```
<template>
  <li-text class="mx-1" size="large">Large</li-text>
  <li-text class="mx-1">Default</li-text>
  <li-text class="mx-1" size="small">Small</li-text>
</template>
```

## 省略

通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略符。

Self element set width 100px

Squeezed by parent element

```
<template>
  <li-text class="w-100px" truncated>Self element set width 100px</li-text>
  <li-row>
    <li-col :span="4">
      <li-text truncated>Squeezed by parent element</li-text>
    </li-col>
  </li-row>
</template>
```

## 覆盖

使用属性 `tag` 覆盖元素。

span

This is a paragraph.

**Bold**

*Italic*

This is subscript

This is superscript

Inserted

~~Deleted~~

Marked

```
<template>
  <li-space direction="vertical">
    <li-text>span</li-text>
    <li-text tag="p">This is a paragraph.</li-text>
    <li-text tag="b">Bold</li-text>
    <li-text tag="i">Italic</li-text>
    <li-text>
      This is
      <li-text tag="sub" size="small">subscript</li-text>
    </li-text>
    <li-text>
      This is
      <li-text tag="sup" size="small">superscript</li-text>
    </li-text>
    <li-text tag="ins">Inserted</li-text>
    <li-text tag="del">Deleted</li-text>
    <li-text tag="mark">Marked</li-text>
  </li-space>
</template>
```

## 混合使用

混合使用 Text 组件。

LiUI

Rate

This is text mixed icon  and component Button

```
<template>
  <li-space direction="vertical">
    <li-text>
      <li-icon><icon-basic-heart-o /></li-icon>
      <li-icon><icon-basic-heart-o /></li-icon>
      LiUI
      <li-icon><icon-basic-heart-o /></li-icon>
      <li-icon><icon-basic-heart-o /></li-icon>
    </li-text>
    <li-row>
      <li-text>Rate</li-text>
      <li-rate class="ml-1" />
    </li-row>
    <li-text>
      This is text mixed icon
      <li-icon><icon-attention-notice-o /></li-icon>
      and component
      <li-button>Button</li-button>
    </li-text>
  </li-space>
</template>

<script lang="ts" setup>
import { IconAttentionNoticeO, IconBasicHeartO } from '@chehejia/liui-icons';
</script>
```

## Text API

### Text Props

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `enum` 'primary' | 'success' | 'warning' | 'danger' | 'info' | — |
| size | 大小 | `enum` 'large' | 'default' | 'small' | default |
| truncated | 显示省略号 | `boolean` | false |
| tag | 自定义元素标签 | `string` | span |

### Text Slots

| 名称 | 详情 |
| --- | --- |
| default | 默认内容 |

最后修改日期： 2025-07-15
