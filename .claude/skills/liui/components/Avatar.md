# Avatar 头像

Maintainer: 刘振兴

1. [基础用法](#基础用法)
2. [展示类型](#展示类型)
3. [回退行为](#回退行为)
4. [适应容器](#适应容器)
5. [Avatar API](#avatar-api)
   1. [Avatar Props](#avatar-props)
   2. [Avatar Events](#avatar-events)
   3. [Avatar Slots](#avatar-slots)

Avatar 组件可以用来代表人物或对象，支持使用图片、图标或者文字作为 Avatar。

## 基础用法

使用 `shape` 和 `size` 属性来设置 Avatar 的形状和大小。

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)

```
<template>
  <li-row class="demo-avatar demo-basic">
    <li-col :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <li-avatar :size="50" :src="circleUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <li-avatar :size="size" :src="circleUrl" />
        </div>
      </div>
    </li-col>
  </li-row>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  circleUrl: 'https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg',
  sizeList: ['small', '', 'large'] as const,
});

const { circleUrl, sizeList } = toRefs(state);
</script>

<style scoped>
.demo-basic {
  text-align: center;
}

.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-basic .block {
  flex: 1;
}

.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--li-color-on-light-300);
}

.demo-basic .li-col:not(:last-child) {
  border-right: 1px solid var(--li-color-on-light-300);
}
</style>
```

## 展示类型

支持使用图片，图标或者文字作为 Avatar。

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)

user

```
<template>
  <div class="demo-type">
    <div>
      <li-avatar :icon="IconUserBasicO" />
    </div>
    <div>
      <li-avatar src="https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg" />
    </div>
    <div>
      <li-avatar> user </li-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconUserBasicO } from '@chehejia/liui-icons';
</script>

<style scoped>
.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--li-color-on-light-300);
}
</style>
```

## 回退行为

图片加载失败时的回退行为。

![](https://p.ampmake.com/fed/image/png/0aa24e033595cffa43ae00b492ac48ea.png)

```
<template>
  <div class="demo-type">
    <li-avatar class="demo-avatar" :size="40" src="https://empty" @error="errorHandler">
      <img src="https://p.ampmake.com/fed/image/png/0aa24e033595cffa43ae00b492ac48ea.png" />
    </li-avatar>
  </div>
</template>

<script lang="ts" setup>
const errorHandler = () => true;
</script>
<style scoped>
.demo-avatar {
  padding: 8px;
}
</style>
```

## 适应容器

当使用图片作为用户头像时，设置该图片如何在容器中展示，与 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性一致。

fill![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

contain![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

cover![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

none![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

scale-down![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

```
<template>
  <div class="demo-fit">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="title">{{ fit }}</span>
      <li-avatar shape="square" :size="100" :fit="fit" :src="url" />
    </div>
  </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue';
const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
});

const { fits, url } = toRefs(state);
</script>

<style scoped>
.demo-fit {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.demo-fit .block {
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
```

## Avatar API

### Avatar Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 设置 Avatar 的图标类型，具体参考 Icon 组件 | `string` | `Component` | — |
| size | Avatar 大小 | `number` | `string` 'large' | 'default' | 'small' | default |
| shape | Avatar 形状 | `string` 'circle' | 'square' | circle |
| src | Avatar 图片的源地址 | `string` | — |
| src-set | 图片 Avatar 的原生 `srcset` 属性 | `string` | — |
| alt | 图片 Avatar 的原生 `alt` 属性 | `string` | — |
| fit | 当展示类型为图片的时候，设置图片如何适应容器 | `string` 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | cover |

### Avatar Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| error | 图片加载失败时触发 | `Function` (e: Event) => void |

### Avatar Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义头像展示内容 |

最后修改日期： 2025-07-15
