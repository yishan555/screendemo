# Card 卡片

Maintainer: 徐鑫

1. [基础用法](#基础用法)
2. [简单卡片](#简单卡片)
3. [有图片内容的卡片](#有图片内容的卡片)
4. [有边框的卡片](#有边框的卡片)
5. [带有阴影效果的卡片](#带有阴影效果的卡片)
6. [Card API](#card-api)
   1. [Card Props](#card-props)
   2. [Card Slots](#card-slots)

将信息聚合在卡片容器中展示。

## 基础用法

卡片包含标题，内容以及操作区域。

Card 组件由 `header` 和 `body` 组成，`header` 是可选的，其内容取决于一个具名的 slot。

标题按钮

卡片内容 1

卡片内容 2

卡片内容 3

卡片内容 4

```
<template>
  <div class="demo-card">
    <li-card class="box-card" shadow>
      <template #header>
        <div class="card-header">
          <span>标题</span>
          <li-button text>按钮</li-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '卡片内容 ' + o }}
      </div>
    </li-card>
  </div>
</template>

<style>
.demo-card {
  padding: 16px;
  background-color: var(--li-color-mono-100);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 480px;
}
</style>
```

## 简单卡片

卡片可以只有内容区域。

卡片内容 1

卡片内容 2

卡片内容 3

卡片内容 4

```
<template>
  <div class="demo-card">
    <li-card class="box-card" shadow>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '卡片内容 ' + o }}
      </div>
    </li-card>
  </div>
</template>
<style scoped>
.demo-card {
  padding: 16px;
  background-color: var(--li-color-mono-100);
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 480px;
}
</style>
```

## 有图片内容的卡片

可配置定义更丰富的内容展示。

![](https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png)

标题

Mon Jan 12 2026 10:20:43 GMT+0800 (China Standard Time)按钮

![](https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png)

标题

Mon Jan 12 2026 10:20:43 GMT+0800 (China Standard Time)按钮

```
<template>
  <div class="demo-card">
    <li-row>
      <li-col v-for="(o, index) in 2" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
        <li-card class="demo-image-card" shadow>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>标题</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <li-button text>按钮</li-button>
            </div>
          </div>
        </li-card>
      </li-col>
    </li-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentDate = ref(new Date());
</script>

<style>
.demo-card {
  padding: 16px;
  background-color: var(--li-color-mono-100);
}

.demo-image-card {
  padding: 0;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 13px;

  line-height: 12px;
}

.button {
  min-height: auto;
  padding: 0;
}

.image {
  display: block;
  width: 100%;
}
</style>
```

## 有边框的卡片

标题按钮

卡片内容 1

卡片内容 2

卡片内容 3

卡片内容 4

```
<template>
  <div class="demo-card">
    <li-card class="box-card" bordered>
      <template #header>
        <div class="card-header">
          <span>标题</span>
          <li-button text>按钮</li-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '卡片内容 ' + o }}
      </div>
    </li-card>
  </div>
</template>

<style>
.demo-card {
  padding: 16px;
  background-color: var(--li-color-mono-100);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 14px;
}

.box-card {
  width: 480px;
}
</style>
```

## 带有阴影效果的卡片

有阴影

无阴影

```
<template>
  <div class="demo-card">
    <li-row :gutter="12">
      <li-col :span="8">
        <li-card shadow> 有阴影 </li-card>
      </li-col>
      <li-col :span="8">
        <li-card> 无阴影 </li-card>
      </li-col>
    </li-row>
  </div>
</template>
<style>
.demo-card {
  padding: 16px;
  background-color: var(--li-color-mono-100);
}
</style>
```

## Card API

### Card Props

| 名称 | 说明 | 类型 | 预设值 |
| --- | --- | --- | --- |
| header | 卡片的标题，你既可以通过设置 header 来修改标题，也可以通过 `slot#header` 传入 DOM 节点 | `string` | — |
| body-style | body 的 CSS 样式 | `object` CSSProperties | — |
| header-style | header 的 CSS 样式 | `object` CSSProperties | — |
| shadow | 是否有阴影 | `boolean` true | false | `false` |
| bordered | 是否有边框 | `boolean` true | false | `false` |

### Card Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |
| header | 卡片标题内容 |

最后修改日期： 2025-07-15
