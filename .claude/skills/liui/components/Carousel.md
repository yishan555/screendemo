# Carousel 走马灯

Maintainer: 雷亚光

1. [基础用法](#基础用法)
2. [指示器](#指示器)
3. [切换箭头](#切换箭头)
4. [卡片化](#卡片化)
5. [垂直布局](#垂直布局)
6. [Carousel API](#carousel-api)
   1. [Carousel Props](#carousel-props)
   2. [Carousel Events](#carousel-events)
   3. [Carousel Methods](#carousel-methods)
   4. [Carousel Slots](#carousel-slots)
7. [CarouselItem API](#carouselitem-api)
   1. [CarouselItem Props](#carouselitem-props)
   2. [CarouselItem Slots](#carouselitem-slots)

在有限空间内，循环播放同一类型的图片、文字等内容

## 基础用法

结合使用 `li-carousel` 和 `li-carousel-item` 标签就得到了一个走马灯。 每一个页面的内容是完全可定制的，把你想要展示的内容放在 `li-carousel-item` 标签内。 默认情况下，在鼠标 hover 底部的指示器时就会触发切换。 通过设置 `trigger` 属性为 `click`，可以达到点击触发的效果。

Switch when indicator is hovered (default)

### 1

### 2

### 3

### 4

Switch when indicator is clicked

### 1

### 2

### 3

### 4

```
<template>
  <div class="block text-center">
    <span class="demonstration">Switch when indicator is hovered (default)</span>
    <li-carousel height="150px">
      <li-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </li-carousel-item>
    </li-carousel>
  </div>
  <div class="block text-center" m="t-4">
    <span class="demonstration">Switch when indicator is clicked</span>
    <li-carousel trigger="click" height="150px">
      <li-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </li-carousel-item>
    </li-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--li-text-color-secondary);
}

.li-carousel__item h3 {
  margin: 0;

  line-height: 150px;
  color: #475669;
  text-align: center;

  opacity: 0.75;
}

.li-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.li-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
```

## 指示器

可以将指示器的显示位置设置在容器外部

`indicator-position` 属性定义了指示器的位置。 默认情况下，它会显示在走马灯内部，设置为 `outside` 则会显示在外部；设置为 `none` 则不会显示指示器。

### 1

### 2

### 3

### 4

```
<template>
  <li-carousel indicator-position="outside">
    <li-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </li-carousel-item>
  </li-carousel>
</template>

<style scoped>
.li-carousel__item h3 {
  display: flex;

  margin: 0;

  line-height: 300px;
  color: #475669;

  opacity: 0.75;
}

.li-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.li-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
```

## 切换箭头

可以设置切换箭头的显示时机

`arrow` 属性定义了切换箭头的显示时机。 默认情况下，切换箭头只有在鼠标 hover 到走马灯上时才会显示。 若将 `arrow` 设置为 `always`，则会一直显示；设置为 `never`，则会一直隐藏。

### 1

### 2

### 3

### 4

```
<template>
  <li-carousel :interval="5000" arrow="always">
    <li-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </li-carousel-item>
  </li-carousel>
</template>

<style scoped>
.li-carousel__item h3 {
  margin: 0;

  line-height: 300px;
  color: #475669;
  text-align: center;

  opacity: 0.75;
}

.li-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.li-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
```

## 卡片化

当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格

将 `type` 属性设置为 `card` 即可启用卡片模式。 从交互上来说，卡片模式和一般模式的最大区别在于，卡片模式可以通过直接点击两侧的幻灯片进行切换。

### 1

### 2

### 3

### 4

### 5

### 6

```
<template>
  <li-carousel :interval="4000" type="card" height="200px">
    <li-carousel-item v-for="item in 6" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </li-carousel-item>
  </li-carousel>
</template>

<style scoped>
.li-carousel__item h3 {
  margin: 0;

  line-height: 200px;
  color: #475669;
  text-align: center;

  opacity: 0.75;
}

.li-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.li-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
```

## 垂直布局

默认情况下，`direction` 为 `horizontal`。 通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。

### 1

### 2

### 3

### 4

```
<template>
  <li-carousel height="200px" direction="vertical" :autoplay="false">
    <li-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </li-carousel-item>
  </li-carousel>
</template>

<style scoped>
.li-carousel__item h3 {
  margin: 0;

  line-height: 200px;
  color: #475669;
  text-align: center;

  opacity: 0.75;
}

.li-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.li-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
```

## Carousel API

### Carousel Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| height | carousel 的高度 | string | — | — |
| initial-index | 初始状态激活的幻灯片的索引，从 0 开始 | number | — | 0 |
| trigger | 指示器的触发方式 | string | hover/click | hover |
| autoplay | 是否自动切换 | boolean | — | true |
| interval | 自动切换的时间间隔，单位为毫秒 | number | — | 3000 |
| indicator-position | 指示器的位置 | string | outside/none | — |
| arrow | 切换箭头的显示时机 | string | always/hover/never | hover |
| type | carousel 的类型 | string | card | — |
| loop | 是否循环显示 | boolean | - | true |
| direction | 展示的方向 | string | horizontal/vertical | horizontal |
| pause-on-hover | 鼠标悬浮时暂停自动切换 | boolean | - | true |

### Carousel Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |

### Carousel Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| setActiveItem | 手动切换幻灯片 | 需要切换的幻灯片的索引，从 0 开始；或相应 `li-carousel-item` 的 `name` 属性值 |
| prev | 切换至上一张幻灯片 | — |
| next | 切换至下一张幻灯片 | — |

### Carousel Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| - | 自定义默认内容 | Carousel-Item |

## CarouselItem API

### CarouselItem Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 幻灯片的名字，可用作 `setActiveItem` 的参数 | string | — | — |
| label | 该幻灯片所对应指示器的文本 | string | — | — |

### CarouselItem Slots

| 插槽名 | 说明 |
| --- | --- |
| — | 自定义默认内容 |

最后修改日期： 2025-07-15
