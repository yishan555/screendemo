# Tooltip 文字提示

Maintainer: 孙俊玮

1. [基础用法](#基础用法)
2. [主题](#主题)
3. [更多内容的文字提示](#更多内容的文字提示)
4. [高级扩展](#高级扩展)
5. [显示 HTML 内容](#显示-html-内容)
6. [虚拟触发](#虚拟触发)
7. [受控模式](#受控模式)
8. [自定义动画](#自定义动画)
9. [溢出触发](#溢出触发)
10. [Tooltip API](#tooltip-api)
    1. [Tooltip Props](#tooltip-props)
    2. [Tooltip Slots](#tooltip-slots)

常用于展示鼠标 hover 时的提示信息。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

top-starttoptop-end

left-startright-start

leftright

left-endright-end

bottom-startbottombottom-end

```
<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <li-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
        <li-button>top-start</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
        <li-button>top</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Top Right prompts info" placement="top-end">
        <li-button>top-end</li-button>
      </li-tooltip>
    </div>
    <div class="row">
      <li-tooltip class="box-item" effect="dark" content="Left Top prompts info" placement="left-start">
        <li-button>left-start</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Right Top prompts info" placement="right-start">
        <li-button>right-start</li-button>
      </li-tooltip>
    </div>
    <div class="row">
      <li-tooltip class="box-item" effect="dark" content="Left Center prompts info" placement="left">
        <li-button class="mt-3 mb-3">left</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Right Center prompts info" placement="right">
        <li-button>right</li-button>
      </li-tooltip>
    </div>
    <div class="row">
      <li-tooltip class="box-item" effect="dark" content="Left Bottom prompts info" placement="left-end">
        <li-button>left-end</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Right Bottom prompts info" placement="right-end">
        <li-button>right-end</li-button>
      </li-tooltip>
    </div>
    <div class="row center">
      <li-tooltip class="box-item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
        <li-button>bottom-start</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Bottom Center prompts info" placement="bottom">
        <li-button>bottom</li-button>
      </li-tooltip>
      <li-tooltip class="box-item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
        <li-button>bottom-end</li-button>
      </li-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}

.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
```

## 主题

Tooltip 组件内置了两个主题：`dark`和`light`。

TIP

要使用自定义主题，您必须知道您的工具提示在哪里渲染， 如果您的工具提示被呈现为根元素，您将需要全局设置 css 规则。

建议您使用自定义主题并同时显示箭头时不使用线性渐变背景颜色。 因为弹出箭头和内容是两个不同的元素， 弹出箭头的样式需要单独设置， 当它到渐变背景颜色时，会看起来很奇怪。

通过设置 `effect` 来修改主题，默认值为 `dark`.

DarkLightCustomized theme

```
<template>
  <li-tooltip content="Top center" placement="top">
    <li-button>Dark</li-button>
  </li-tooltip>
  <li-tooltip content="Bottom center" placement="bottom" effect="light">
    <li-button>Light</li-button>
  </li-tooltip>

  <li-tooltip content="Bottom center" effect="customized">
    <li-button>Customized theme</li-button>
  </li-tooltip>
</template>

<style>
.li-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.li-popper.is-customized .li-popper__arrow::before {
  right: 0;
  background: linear-gradient(45deg, #b2e68d, #bce689);
}
</style>
```

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

用具名 slot `content`，替代`tooltip`中的`content`属性。

Top center

```
<template>
  <li-tooltip placement="top">
    <template #content> multiple lines<br />second line </template>
    <li-button>Top center</li-button>
  </li-tooltip>
</template>
```

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求， 你只需要将其设置为 `true`。

事实上，Tooltip 是一个基于 [LiPopper](https://gitlab.chehejia.com/fed/liui-next/-/tree/develop/packages/components/popper) 的扩展，您可以使用 LiPopper 中允许的任何属性。

click to close tooltip function

```
<template>
  <li-tooltip :disabled="disabled" content="click to close tooltip function" placement="bottom" effect="light">
    <li-button @click="disabled = !disabled">click to {{ disabled ? 'active' : 'close' }} tooltip function</li-button>
  </li-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}
</style>
```

TIP

Tooltip 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

tooltip 内不支持 disabled form 元素，参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter)， 请在 disabled form 元素外层添加一层包裹元素。

## 显示 HTML 内容

内容属性可以设置为 HTML 字符串。

WARNING

`content` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `raw-content` 打开的情况下，请确保 `content` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `content` 属性。

hover me

```
<template>
  <li-tooltip content="<span>The content can be <strong>HTML</strong></span>" raw-content>
    <li-button>hover me</li-button>
  </li-tooltip>
</template>
```

## 虚拟触发

有时候我们想把 tooltip 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

TIP

需要注意的是，虚拟触发的 tooltip 是受控组件，因此你必须自己去控制 tooltip 是否显示，**你将无法**通过点击空白处来关闭 tooltip。

test

```
<template>
  <li-tooltip
    v-model:visible="visible"
    content="Bottom center"
    placement="bottom"
    effect="light"
    trigger="click"
    virtual-triggering
    :virtual-ref="triggerRef"
  />
  <li-button @click="visible = !visible">test</li-button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const visible = ref(false);
const triggerRef = ref({
  getBoundingClientRect() {
    return position.value;
  },
});

const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

const mousemoveHandler = (e) => {
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY,
  });
};
onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler);
});
</script>
```

## 受控模式

Tooltip 可以通过父组件使用 `:visible` 来控制它的显示与关闭。

Hover me

```
<template>
  <li-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <li-button @mouseenter="visible = true" @mouseleave="visible = false"> Hover me </li-button>
  </li-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>
```

## 自定义动画

Tooltip 可以自定义动画，你可以根据需要自行设置所需的动画方法。

trigger me

```
<template>
  <li-tooltip content="I am a li-tooltip">
    <li-button>trigger me</li-button>
  </li-tooltip>
</template>
```

## 溢出触发

仅在触发元素存在内容溢出时，启用 tooltip。

Long paragraph cause overflow

  

Long paragraph cause overflow

  

Long paragraph cause overflow

Toggle

```
<template>
  <div :class="{ limit: isLimit }">
    <li-tooltip :content="content" placement="right" overflow-triggering>
      {{ content }}
    </li-tooltip>
  </div>

  <br />

  <li-tooltip :content="content" placement="right" overflow-triggering>
    <div :class="{ limit: isLimit }">{{ content }}</div>
  </li-tooltip>

  <br />

  <li-tooltip :content="content" overflow-triggering placement="right" :virtual-ref="triggerRef" virtual-triggering />
  <div ref="triggerRef" :class="{ limit: isLimit }">{{ content }}</div>

  <li-divider />
  <li-button @click="toggle">Toggle</li-button>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const content = 'Long paragraph cause overflow';
const isLimit = ref(true);
const triggerRef = ref();
function toggle() {
  isLimit.value = !isLimit.value;
}
</script>
<style scoped>
.limit {
  overflow: hidden;

  max-width: 13em;

  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
```

## Tooltip API

### Tooltip Props

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| append-to | 指示 Tooltip 的内容将附加在哪一个网页元素上 | `CSS 选择器 | HTMLElement` | — | #li-popper-container-[randomValue] |
| effect | Tooltip 主题，内置了 `dark` / `light` 两种 | string | dark / light | dark |
| content | 显示的内容，也可被 `slot#content` 覆盖 | String | — | — |
| raw-content | `content` 中的内容是否作为 HTML 字符串处理 | boolean | — | false |
| placement | Tooltip 组件出现的位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom |
| visible / v-model:visible | Tooltip 组件可见性 | boolean | — | false |
| disabled | Tooltip 组件是否禁用 | boolean | — | false |
| offset | 出现位置的偏移量 | number | — | 0 |
| transition | 动画名称 | string | — | li-fade-in-linear |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) 参数 | Object | 详见 [popper.js](https://popper.js.org/docs/v2/) 文档 | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| show-after | 在触发后多久显示内容，单位毫秒 | number | — | 200 |
| show-arrow | tooltip 的内容是否有箭头 | boolean | true / false | true |
| hide-after | 延迟关闭，单位毫秒 | number | — | 200 |
| auto-close | tooltip 出现后自动隐藏延时，单位毫秒 | number | — | 0 |
| manual | 是否手动控制 Tooltip。 如果设置为 `true`，则 `mouseenter` 和 `mouseleave` 将不会生效 | boolean | — | false |
| popper-class | 为 Tooltip 的 popper 添加类名 | string | — | — |
| enterable | 鼠标是否可进入到 tooltip 中 | Boolean | — | true |
| tabindex | Tooltip 的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
| teleported | 是否使用 teleport。设置成 `true`则会被追加到 `append-to` 的位置 | boolean | true / false | true |
| trigger | 如何触发（展示） Tooltip | string | hover / click / focus / contextmenu | hover |
| virtual-triggering | 指示是否启用虚拟触发器 | boolean | — | false |
| virtual-ref | 代表 tooltip 所要附加的参照元素 | HTMLElement | — | — |
| overflow-triggering | 仅在触发元素存在内容溢出时，启用 tooltip | boolean | true / false | false |
| trigger-keys | 当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示 | Array | — | `['Enter','Space']` |

### Tooltip Slots

| 插槽名 | 说明 |
| --- | --- |
| — | Tooltip 触发 & 引用的元素 |
| content | 自定义内容 |

最后修改日期： 2025-07-15
