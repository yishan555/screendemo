# 内置过渡动画

Maintainer: 陈尚书

1. [Fade 淡入淡出](#fade-淡入淡出)
2. [Zoom 缩放](#zoom-缩放)
3. [Collapse 折叠面板](#collapse-折叠面板)
4. [按需导入](#按需导入)

LiUI 内应用在部分组件的过渡动画，你也可以直接使用。 在使用之前，请阅读 [官方的过渡组件文档](https://vuejs.org/guide/built-ins/transition.html)。

## Fade 淡入淡出

提供 `li-fade-in-linear` 和 `li-fade-in` 两种效果。

Click Me

.li-fade-in-linear

.li-fade-in

```
<template>
  <div>
    <li-button @click="show = !show">Click Me</li-button>

    <div style="display: flex; height: 100px; margin-top: 20px">
      <transition name="li-fade-in-linear">
        <div v-show="show" class="transition-box">.li-fade-in-linear</div>
      </transition>
      <transition name="li-fade-in">
        <div v-show="show" class="transition-box">.li-fade-in</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(true);
</script>

<style>
.transition-box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 40px 20px;

  color: #fff;
  text-align: center;

  background-color: #409eff;
  border-radius: 4px;
}
</style>
```

## Zoom 缩放

提供 `li-zoom-in-center`，`li-zoom-in-top` 和 `li-zoom-in-bottom` 三种效果。

Click Me

.li-zoom-in-center

.li-zoom-in-top

.li-zoom-in-bottom

```
<template>
  <div>
    <li-button @click="show = !show">Click Me</li-button>

    <div style="display: flex; height: 100px; margin-top: 20px">
      <transition name="li-zoom-in-center">
        <div v-show="show" class="transition-box">.li-zoom-in-center</div>
      </transition>

      <transition name="li-zoom-in-top">
        <div v-show="show" class="transition-box">.li-zoom-in-top</div>
      </transition>

      <transition name="li-zoom-in-bottom">
        <div v-show="show" class="transition-box">.li-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(true);
</script>

<style>
.transition-box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 40px 20px;

  color: #fff;
  text-align: center;

  background-color: #409eff;
  border-radius: 4px;
}
</style>
```

## Collapse 折叠面板

使用 `li-collapse-transition` 组件实现折叠展开效果。

Click Me

li-collapse-transition

li-collapse-transition

```
<template>
  <div>
    <li-button @click="show = !show">Click Me</li-button>

    <div style="height: 200px; margin-top: 20px">
      <li-collapse-transition>
        <div v-show="show">
          <div class="transition-box">li-collapse-transition</div>
          <div class="transition-box">li-collapse-transition</div>
        </div>
      </li-collapse-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(true);
</script>

<style>
.transition-box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 40px 20px;

  color: #fff;
  text-align: center;

  background-color: #409eff;
  border-radius: 4px;
}
</style>
```

## 按需导入

```
// collapse
import { LiCollapseTransition } from '@chehejia/liui-next'
// fade/zoom
import '@chehejia/liui-next/lib/theme-chalk/base.css'
import App from './App.vue'

const app = createApp(App)
app.component(LiCollapseTransition.name, LiCollapseTransition)
```

最后修改日期： 2025-07-15
