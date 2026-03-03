# Popover 气泡卡片

Maintainer: 李林森

1. [基础用法](#基础用法)
2. [宽度控制](#宽度控制)
3. [虚拟触发](#虚拟触发)
4. [内容可扩展](#内容可扩展)
5. [嵌套操作](#嵌套操作)
6. [溢出触发](#溢出触发)
7. [指令](#指令)
8. [Popover API](#popover-api)
   1. [Popover Props](#popover-props)
   2. [Popover Slots](#popover-slots)
   3. [Popover Events](#popover-events)

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (例如: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

与 Tooltip 相似，Popover 也是基于`LiPopper`的构建。 因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

`trigger` 属性被用来决定 popover 的触发方式，支持的触发方式： `hover`、`click`、`focus` 或 `contextmenu`。 如果你想手动控制它，可以设置 `:visible` 属性。

Hover to activateClick to activateFocus to activatecontextmenu to activateManual to activate

```
<template>
  <li-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <li-button class="m-2">Hover to activate</li-button>
    </template>
  </li-popover>

  <li-popover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <li-button class="m-2">Click to activate</li-button>
    </template>
  </li-popover>

  <li-popover
    ref="popover"
    placement="right"
    title="Title"
    :width="200"
    trigger="focus"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <li-button class="m-2">Focus to activate</li-button>
    </template>
  </li-popover>

  <li-popover
    ref="popover"
    title="Title"
    :width="200"
    trigger="contextmenu"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <li-button class="m-2">contextmenu to activate</li-button>
    </template>
  </li-popover>

  <li-popover
    :visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <li-button class="m-2" @click="visible = !visible">Manual to activate</li-button>
    </template>
  </li-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<style scoped>
.li-button + .li-button {
  margin-left: 8px;
}
</style>
```

## 宽度控制

默认宽度控制外部指定宽度

```
<template>
  <li-popover placement="top" title="鹿鸣" trigger="hover" :content="content">
    <template #reference>
      <li-button>默认宽度控制</li-button>
    </template>
  </li-popover>

  <li-popover placement="top" title="鹿鸣" width="13em" trigger="hover" :content="content">
    <template #reference>
      <li-button>外部指定宽度</li-button>
    </template>
  </li-popover>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const content = `
呦呦鹿鸣，食野之苹。
我有嘉宾，鼓瑟吹笙。
吹笙鼓簧，承筐是将。
人之好我，示我周行。
—— 《诗经·小雅》
`;
</script>
<style scoped>
.li-button + .li-button {
  margin-left: 8px;
}
</style>
```

## 虚拟触发

像 Tooltip 一样，Popover 可以由虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景。通常我们使用 `#reference` 来放置我们的触发元素， 用 `triggering-element` API，您可以任意设置您的触发元素 但注意到触发元素应该是接受 `mouse` 和 `keyboard` 事件的元素。

WARNING

`v-popover` 将被废弃，请使用 `virtual-ref` 作为替代。

Click me

```
<template>
  <li-button ref="buttonRef" v-click-outside="onClickOutside">Click me</li-button>

  <li-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" virtual-triggering>
    <span> Some content </span>
  </li-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from '@chehejia/liui-next';
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>
```

## 内容可扩展

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。

利用插槽取代 `content` 属性

Click to activate

```
<template>
  <div style="display: flex; align-items: center">
    <li-popover placement="right" :width="400" trigger="click">
      <template #reference>
        <li-button style="margin-right: 16px">Click to activate</li-button>
      </template>
      <li-table :data="gridData">
        <li-table-column width="150" property="date" label="date" />
        <li-table-column width="100" property="name" label="name" />
        <li-table-column width="300" property="address" label="address" />
      </li-table>
    </li-popover>

    <li-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <li-icon :size="32">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 10.5C12 9.67157 11.3284 9 10.5 9C9.67157 9 9 9.67157 9 10.5V16C9 19.866 12.134 23 16 23C17.5508 23 18.9838 22.4957 20.144 21.6421C20.3846 22.1493 20.9013 22.5 21.5 22.5C22.3284 22.5 23 21.8284 23 21V16V14.5C23 13.6716 22.3284 13 21.5 13C20.6716 13 20 13.6716 20 14.5V16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16V10.5ZM21.5 12C22.3284 12 23 11.3284 23 10.5C23 9.67157 22.3284 9 21.5 9C20.6716 9 20 9.67157 20 10.5C20 11.3284 20.6716 12 21.5 12Z"
              fill="#00665F"
            />
          </svg>
        </li-icon>
      </template>
      <template #default>
        <div class="demo-rich-conent" style="display: flex; flex-direction: column; gap: 16px">
          <li-icon :size="64">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 10.5C12 9.67157 11.3284 9 10.5 9C9.67157 9 9 9.67157 9 10.5V16C9 19.866 12.134 23 16 23C17.5508 23 18.9838 22.4957 20.144 21.6421C20.3846 22.1493 20.9013 22.5 21.5 22.5C22.3284 22.5 23 21.8284 23 21V16V14.5C23 13.6716 22.3284 13 21.5 13C20.6716 13 20 13.6716 20 14.5V16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16V10.5ZM21.5 12C22.3284 12 23 11.3284 23 10.5C23 9.67157 22.3284 9 21.5 9C20.6716 9 20 9.67157 20 10.5C20 11.3284 20.6716 12 21.5 12Z"
                fill="#00665F"
              />
            </svg>
          </li-icon>
          <div>
            <p class="demo-rich-content__name" style="margin: 0; font-weight: 600">LiUI</p>
            <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--li-color-info)">
              @chehejia/liui-next
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            LiUI, a Vue 3 based component library for developers, designers and product managers
          </p>
        </div>
      </template>
    </li-popover>
  </div>
</template>

<script lang="ts" setup>
const gridData = [
  {
    date: '2016-05-02',
    name: 'Jack',
    address: 'New York City',
  },
  {
    date: '2016-05-04',
    name: 'Jack',
    address: 'New York City',
  },
  {
    date: '2016-05-01',
    name: 'Jack',
    address: 'New York City',
  },
  {
    date: '2016-05-03',
    name: 'Jack',
    address: 'New York City',
  },
];
</script>
```

## 嵌套操作

当然，你还可以嵌套操作， 它比使用 dialog 更加轻量。

Delete

```
<template>
  <li-popover :visible="visible" placement="top" :width="220">
    <p>Are you sure to delete this?</p>
    <div style="margin: 0; text-align: right">
      <li-button class="nested-btn" text @click="visible = false">cancel</li-button>
      <li-button class="nested-btn" type="primary" @click="visible = false"> confirm </li-button>
    </div>
    <template #reference>
      <li-button @click="visible = true">Delete</li-button>
    </template>
  </li-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<style>
.nested-btn + .nested-btn {
  margin-left: 16px;
}
</style>
```

## 溢出触发

仅在触发元素存在内容溢出时，启用 popover。

Long paragraph that cause overflow

  

Long paragraph that cause overflow

  

Long paragraph that cause overflow

Toggle

```
<template>
  <div :class="{ limit: isLimit }">
    <li-popover placement="right" title="popover title" :content="content" overflow-triggering>
      <template #reference>{{ content }}</template>
    </li-popover>
  </div>
  <br />
  <li-popover placement="right" title="popover title" :content="content" overflow-triggering>
    <template #reference>
      <div :class="{ limit: isLimit }">{{ content }}</div>
    </template>
  </li-popover>
  <br />
  <li-popover
    title="popover title"
    :content="content"
    overflow-triggering
    placement="right"
    :virtual-ref="triggerRef"
    virtual-triggering
  />
  <div ref="triggerRef" :class="{ limit: isLimit }">{{ content }}</div>

  <li-divider />
  <li-button @click="toggle">Toggle</li-button>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const content = 'Long paragraph that cause overflow';
const isLimit = ref(true);
const triggerRef = ref();
function toggle() {
  isLimit.value = !isLimit.value;
}
</script>
<style scoped>
.limit {
  overflow: hidden;

  max-width: 16em;

  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
```

## 指令

您可以使用指令性方式弹出窗口，但这种方法**不再推荐** ，因为这使得应用程序变得复杂， 您可以参考虚拟触发来实现一样的效果。

Click me

```
<template>
  <li-button v-popover="popoverRef" v-click-outside="onClickOutside">Click me</li-button>

  <li-popover ref="popoverRef" trigger="click" title="With title" virtual-triggering persistent>
    <span> Some content </span>
  </li-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from '@chehejia/liui-next';
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>
```

## Popover API

### Popover Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| trigger | 触发方式 | string | click/focus/hover/contextmenu | click |
| virtual-triggering | 指示是否启用虚拟触发器 | boolean | — | false |
| virtual-ref | 代表 popover 所要附加的参照元素 | HTMLElement | — | — |
| overflow-triggering | 仅在触发元素存在内容溢出时，启用 popover | boolean | true / false | false |
| title | 标题 | string | — | — |
| effect | Tooltip 主题，LiUI 内置了 `dark` / `light` 两种主题 | string | string | light |
| content | 显示的内容，也可以通过写入默认 `slot` 修改显示内容 | string | — | — |
| width | 宽度 | string / number | — | - |
| placement | 出现位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom |
| disabled | Popover 是否可用 | boolean | — | false |
| visible / v-model:visible | Popover 是否显示 | Boolean | — | false |
| offset | 出现位置的偏移量 | number | — | 0 |
| transition | 定义渐变动画 | string | — | li-fade-in-linear |
| show-arrow | 是否显示 Tooltip 箭头， 欲了解更多信息，请参考 [LiPopper](https://gitlab.chehejia.com/fed/liui-next/-/tree/develop/packages/components/popper) | boolean | — | true |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) 的参数 | object | 详情参考 [popper.js](https://popper.js.org/docs/v2/) | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| popper-class | 为 popper 添加类名 | string | — | — |
| popper-style | 为 popper 自定义样式 | string / object | — | — |
| show-after | 在触发后多久显示内容，单位毫秒 | number | — | 200 |
| hide-after | 延迟关闭，单位毫秒 | number | — | 200 |
| auto-close | tooltip 出现后自动隐藏延时，单位毫秒 | number | — | 0 |
| tabindex | Popover 组件的 [tabindex](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex) | number | — | — |
| teleported | 是否将 popover 的下拉列表插入至 body 元素 | boolean | true / false | true |
| persistent | 当 popover 组件长时间不触发且 `persistent` 属性设置为 `false` 时, popover 将会被删除 | boolean | — | true |

### Popover Slots

| 插槽名 | 说明 |
| --- | --- |
| — | Popover 内嵌 HTML 文本 |
| reference | 触发 Popover 显示的 HTML 元素 |

### Popover Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| before-enter | 显示动画播放前触发 | — |
| after-enter | 显示动画播放完毕后触发 | — |
| before-leave | 隐藏动画播放前触发 | — |
| after-leave | 隐藏动画播放完毕后触发 | — |

最后修改日期： 2025-07-15
