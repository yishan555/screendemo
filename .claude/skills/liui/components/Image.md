# Image 图片

Maintainer: 雷亚光

1. [基础用法](#基础用法)
2. [占位内容](#占位内容)
3. [加载失败](#加载失败)
4. [懒加载](#懒加载)
5. [Image API](#image-api)
   1. [Image Props](#image-props)
   2. [Image Events](#image-events)
   3. [Image Slots](#image-slots)

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等。

## 基础用法

可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

fill

![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

contain

![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

cover

![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

none

![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

scale-down

![](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

```
<template>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <li-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
</script>

<style scoped>
.demo-image .block {
  display: inline-block;

  box-sizing: border-box;
  width: 20%;
  padding: 30px 0;

  text-align: center;
  vertical-align: top;

  border-right: solid 1px var(--li-border-color);
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 占位内容

可通过`slot = placeholder`可自定义占位内容

Default

![](https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg)

Custom

![](https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg)

```
<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <li-image :src="src" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <li-image :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </li-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
const src = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
</script>

<style scoped>
.demo-image__placeholder .block {
  display: inline-block;

  box-sizing: border-box;
  width: 49%;
  padding: 30px 0;

  text-align: center;
  vertical-align: top;

  border-right: solid 1px var(--li-border-color);
}

.demo-image__placeholder .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}

.demo-image__placeholder .li-image {
  max-width: 300px;
  max-height: 200px;
  padding: 0 5px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 14px;
  color: var(--li-text-color-secondary);

  background: var(--li-fill-color-light);
}

.demo-image__placeholder .dot {
  overflow: hidden;
  animation: dot 2s infinite steps(3, start);
}
</style>
```

## 加载失败

可通过`slot = error`可自定义加载失败内容

Default

加载失败

Custom

```
<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">Default</span>
      <li-image />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <li-image>
        <template #error>
          <div class="image-slot">
            <li-icon><icon-media-image-o /></li-icon>
          </div>
        </template>
      </li-image>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconMediaImageO } from '@chehejia/liui-icons';
</script>

<style scoped>
.demo-image__error .block {
  display: inline-block;

  box-sizing: border-box;
  width: 49%;
  padding: 30px 0;

  text-align: center;
  vertical-align: top;

  border-right: solid 1px var(--li-border-color);
}

.demo-image__error .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}

.demo-image__error .li-image {
  width: 100%;
  max-width: 300px;
  height: 200px;
  max-height: 200px;
  padding: 0 5px;
}

.demo-image__error .image-slot {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 30px;
}

.demo-image__error .image-slot .li-icon {
  font-size: 30px;
}
</style>
```

## 懒加载

您可以使用浏览器原生支持的 `loading="lazy"` 开启懒加载功能，当图片滚动到可视范围内才会加载。

TIP

如果当前浏览器支持原生图片延迟加载，则先使用原生能力，否则将使用滚动监听实现相同效果。

可通过 `scroll-container` 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。

![](https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg)

![](https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg)

![](https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg)

![](https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg)

![](https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg)

![](https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg)

![](https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg)

```
<template>
  <div class="demo-image__lazy">
    <li-image v-for="url in urls" :key="url" :src="url" loading="lazy" />
  </div>
</template>

<script lang="ts" setup>
const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
];
</script>

<style scoped>
.demo-image__lazy {
  overflow-y: auto;
  height: 400px;
}

.demo-image__lazy .li-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}

.demo-image__lazy .li-image:last-child {
  margin-bottom: 0;
}
</style>
```

## Image API

### Image Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 图片源地址，同原生属性一致 | `string` | — |
| `fit` | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | `'fill' | 'contain' | 'cover' | 'none' | 'scale-down'` | — |
| `loading` | 浏览器加载图像的策略，和 [浏览器原生](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)能力一致 | `'eager' | 'lazy'` | — |
| `scroll-container` | 开启懒加载功能后，监听 scroll 事件的容器 | `string | HTMLElement` | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| `alt` | 原生属性 `alt` | `string` | — |
| `referrer-policy` | 原生属性 `referrerPolicy` | `string` | — |
| `z-index` | 设置图片预览的 z-index | `number` | — |

### Image Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| `load` | 图片加载成功触发 | `(e: Event) => void` |
| `error` | 图片加载失败触发 | `(e: Error) => void` |

### Image Slots

| 插槽名 | 说明 |
| --- | --- |
| `placeholder` | 当图像尚未加载时，自定义的占位符内容 |
| `error` | 自定义图像加载失败的内容 |

最后修改日期： 2025-07-15
