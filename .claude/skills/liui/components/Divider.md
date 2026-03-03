# Divider 分割线

Maintainer: 徐鑫

1. [基础用法](#基础用法)
2. [设置文案](#设置文案)
3. [虚线](#虚线)
4. [垂直分隔线](#垂直分隔线)
5. [Divider API](#divider-api)
   1. [Divider Props](#divider-props)
   2. [Divider Slots](#divider-slots)

区隔内容的分割线。

## 基础用法

对不同段落的文本进行分割。

I sit at my window this morning where the world like a passer-by stops for a moment, nods to me and goes.There little thoughts are the rustle of leaves; they have their whisper of joy in my mind.

```
<template>
  <div>
    <span
      >I sit at my window this morning where the world like a passer-by stops for a moment, nods to me and goes.</span
    >
    <li-divider />
    <span>There little thoughts are the rustle of leaves; they have their whisper of joy in my mind.</span>
  </div>
</template>
```

## 设置文案

可以在分割线上自定义文本内容。

What you are you do not see, what you see is your shadow. 

Rabindranath Tagore

My wishes are fools, they shout across thy song, my Master. Let me but listen.I cannot choose the best. The best chooses me.

Rabindranath Tagore

```
<template>
  <div>
    <span>What you are you do not see, what you see is your shadow. </span>
    <li-divider content-position="left">Rabindranath Tagore</li-divider>
    <span>My wishes are fools, they shout across thy song, my Master. Let me but listen.</span>
    <li-divider>
      <li-icon><icon-basic-star-f /></li-icon>
    </li-divider>
    <span>I cannot choose the best. The best chooses me.</span>
    <li-divider content-position="right">Rabindranath Tagore</li-divider>
  </div>
</template>

<script lang="ts" setup>
import { IconBasicStarF } from '@chehejia/liui-icons';
</script>
```

## 虚线

您可以设置分隔符的样式。

What language is thine, O sea?The language of eternal question.

What language is thy answer, O sky?The language of eternal silence.

```
<template>
  <div>
    <span>What language is thine, O sea?</span>
    <li-divider border-style="dashed" />
    <span>The language of eternal question.</span>
  </div>
  <li-divider border-style="dotted" />
  <span>What language is thy answer, O sky?</span>
  <li-divider border-style="double" />
  <span>The language of eternal silence.</span>
</template>
```

## 垂直分隔线

RainHomeGrass

```
<template>
  <div>
    <span>Rain</span>
    <li-divider direction="vertical" />
    <span>Home</span>
    <li-divider direction="vertical" border-style="dashed" />
    <span>Grass</span>
  </div>
</template>
```

## Divider API

### Divider Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| direction | 设置分割线方向 | string | horizontal / vertical | horizontal |
| border-style | 设置分隔符样式 | string | [CSS/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid |
| content-position | 自定义分隔线内容的位置 | string | left / right / center | center |

### Divider Slots

| 事件名 | Description |
| --- | --- |
| — | 设置分割线文案的位置 |

最后修改日期： 2025-07-15
