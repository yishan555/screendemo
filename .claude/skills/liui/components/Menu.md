# Menu 菜单

Maintainer: 陈尚书

1. [顶栏](#顶栏)
2. [左右](#左右)
3. [侧栏](#侧栏)
4. [主题](#主题)
5. [更多模式](#更多模式)
6. [溢出折叠](#溢出折叠)
7. [Menu API](#menu-api)
   1. [Menu Props](#menu-props)
   2. [Menu Methods](#menu-methods)
   3. [Menu Events](#menu-events)
   4. [Menu Slots](#menu-slots)
8. [SubMenu API](#submenu-api)
   1. [SubMenu Props](#submenu-props)
   2. [SubMenu Slots](#submenu-slots)
9. [MenuItem API](#menuitem-api)
   1. [MenuItem Props](#menuitem-props)
   2. [MenuItem Events](#menuitem-events)
   3. [MenuItem Slots](#menuitem-slots)
10. [MenuItemGroup API](#menuitemgroup-api)
    1. [MenuItemGroup Props](#menuitemgroup-props)
    2. [MenuItemGroup Slots](#menuitemgroup-slots)

为网站提供导航功能的菜单。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

## 顶栏

顶部栏菜单可以在各种场景中使用。

导航菜单默认为垂直模式，通过将 mode 属性设置为 horizontal 来使导航菜单变更为水平模式。 另外，在菜单中通过 sub-menu 组件可以生成二级菜单。 Menu 还提供了`background-color`、`text-color`和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

* Processing Center
* Workspace
* Info
* Orders

* Processing Center
* Workspace
* Info
* Orders

```
<template>
  <li-menu :default-active="activeIndex" class="li-menu-demo" mode="horizontal" @select="handleSelect">
    <li-menu-item index="1">Processing Center</li-menu-item>
    <li-sub-menu index="2">
      <template #title>Workspace</template>
      <li-menu-item index="2-1">item one</li-menu-item>
      <li-menu-item index="2-2">item two</li-menu-item>
      <li-menu-item index="2-3">item three</li-menu-item>
      <li-sub-menu index="2-4">
        <template #title>item four</template>
        <li-menu-item index="2-4-1">item one</li-menu-item>
        <li-menu-item index="2-4-2">item two</li-menu-item>
        <li-menu-item index="2-4-3">item three</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
    <li-menu-item index="3" disabled>Info</li-menu-item>
    <li-menu-item index="4">Orders</li-menu-item>
  </li-menu>
  <div class="h-6" />
  <li-menu
    :default-active="activeIndex2"
    class="li-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <li-menu-item index="1">Processing Center</li-menu-item>
    <li-sub-menu index="2">
      <template #title>Workspace</template>
      <li-menu-item index="2-1">item one</li-menu-item>
      <li-menu-item index="2-2">item two</li-menu-item>
      <li-menu-item index="2-3">item three</li-menu-item>
      <li-sub-menu index="2-4">
        <template #title>item four</template>
        <li-menu-item index="2-4-1">item one</li-menu-item>
        <li-menu-item index="2-4-2">item two</li-menu-item>
        <li-menu-item index="2-4-3">item three</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
    <li-menu-item index="3" disabled>Info</li-menu-item>
    <li-menu-item index="4">Orders</li-menu-item>
  </li-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
```

## 左右

您可以将菜单项放置在左边或右边。

* LOGO
* Processing Center
* Workspace

```
<template>
  <li-menu
    :default-active="activeIndex"
    class="li-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <li-menu-item index="0">LOGO</li-menu-item>
    <div class="flex-grow" />
    <li-menu-item index="1">Processing Center</li-menu-item>
    <li-sub-menu index="2">
      <template #title>Workspace</template>
      <li-menu-item index="2-1">item one</li-menu-item>
      <li-menu-item index="2-2">item two</li-menu-item>
      <li-menu-item index="2-3">item three</li-menu-item>
      <li-sub-menu index="2-4">
        <template #title>item four</template>
        <li-menu-item index="2-4-1">item one</li-menu-item>
        <li-menu-item index="2-4-2">item two</li-menu-item>
        <li-menu-item index="2-4-3">item three</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
  </li-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
```

## 侧栏

垂直菜单，可内嵌子菜单。

通过 li-menu-item-group 组件可以实现菜单进行分组，分组名可以通过 title 属性直接设定，也可以通过具名 slot 来设定。

##### Default colors

* Navigator One

  + Group One

    - item one
    - item two
  + Group Two

    - item three
  + item four

    - item one
* Navigator Two
* Navigator Three
* Navigator Four

##### Custom colors

* Navigator One

  + Group One

    - item one
    - item two
  + Group Two

    - item three
  + item four

    - item one
* Navigator Two
* Navigator Three
* Navigator Four

```
<template>
  <li-row class="tac">
    <li-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <li-menu
        mode="vertical-expand"
        default-active="2"
        class="li-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <li-sub-menu index="1">
          <template #title>
            <li-icon><icon-other-location-o /></li-icon>
            <span>Navigator One</span>
          </template>
          <li-menu-item-group title="Group One">
            <li-menu-item index="1-1">item one</li-menu-item>
            <li-menu-item index="1-2">item two</li-menu-item>
          </li-menu-item-group>
          <li-menu-item-group title="Group Two">
            <li-menu-item index="1-3">item three</li-menu-item>
          </li-menu-item-group>
          <li-sub-menu index="1-4">
            <template #title>item four</template>
            <li-menu-item index="1-4-1">item one</li-menu-item>
          </li-sub-menu>
        </li-sub-menu>
        <li-menu-item index="2">
          <li-icon><icon-other-map-o /></li-icon>
          <span>Navigator Two</span>
        </li-menu-item>
        <li-menu-item index="3" disabled>
          <li-icon><icon-doc-document-o /></li-icon>
          <span>Navigator Three</span>
        </li-menu-item>
        <li-menu-item index="4">
          <li-icon><icon-basic-settings-o /></li-icon>
          <span>Navigator Four</span>
        </li-menu-item>
      </li-menu>
    </li-col>
    <li-col :span="12">
      <h5 class="mb-2">Custom colors</h5>
      <li-menu
        mode="vertical-expand"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="li-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <li-sub-menu index="1">
          <template #title>
            <li-icon><icon-other-location-o /></li-icon>
            <span>Navigator One</span>
          </template>
          <li-menu-item-group title="Group One">
            <li-menu-item index="1-1">item one</li-menu-item>
            <li-menu-item index="1-2">item two</li-menu-item>
          </li-menu-item-group>
          <li-menu-item-group title="Group Two">
            <li-menu-item index="1-3">item three</li-menu-item>
          </li-menu-item-group>
          <li-sub-menu index="1-4">
            <template #title>item four</template>
            <li-menu-item index="1-4-1">item one</li-menu-item>
          </li-sub-menu>
        </li-sub-menu>
        <li-menu-item index="2">
          <li-icon><icon-other-map-o /></li-icon>
          <span>Navigator Two</span>
        </li-menu-item>
        <li-menu-item index="3" disabled>
          <li-icon><icon-doc-document-o /></li-icon>
          <span>Navigator Three</span>
        </li-menu-item>
        <li-menu-item index="4">
          <li-icon><icon-basic-settings-o /></li-icon>
          <span>Navigator Four</span>
        </li-menu-item>
      </li-menu>
    </li-col>
  </li-row>
</template>

<script lang="ts" setup>
import { IconBasicSettingsO, IconDocDocumentO, IconOtherLocationO, IconOtherMapO } from '@chehejia/liui-icons';

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
```

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

通过设置 `effect` 属性来改变主题，默认为 `dark`。

* Processing Center
* Info
* Orders

* Processing Center
* Info
* Orders

```
<template>
  <li-menu :default-active="activeIndex" class="li-menu-demo" mode="horizontal" @select="handleSelect">
    <li-menu-item index="1">Processing Center</li-menu-item>
    <li-menu-item index="3" disabled>Info</li-menu-item>
    <li-menu-item index="4">Orders</li-menu-item>
  </li-menu>
  <li-divider />
  <li-menu :default-active="activeIndex" class="li-menu-demo" mode="horizontal" effect="light" @select="handleSelect">
    <li-menu-item index="1">Processing Center</li-menu-item>
    <li-menu-item index="3" disabled>Info</li-menu-item>
    <li-menu-item index="4">Orders</li-menu-item>
  </li-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
```

## 更多模式

垂直导航菜单拥有三种不同的模式，可以通过动态切换 mode 属性为 `vertical-expand` 或 `vertical-icon` 实现菜单折叠效果。

verticalvertical-iconvertical-expand

* 一级导航
* 字数很长的导航二
* 禁用的导航三
* 导航四

```
<template>
  <li-radio-group v-model="mode" style="margin-bottom: 20px">
    <li-radio-button label="vertical">vertical</li-radio-button>
    <li-radio-button label="vertical-icon">vertical-icon</li-radio-button>
    <li-radio-button label="vertical-expand">vertical-expand</li-radio-button>
  </li-radio-group>
  <li-menu default-active="2" class="li-menu-vertical-demo" :mode="mode" @open="handleOpen" @close="handleClose">
    <li-sub-menu index="1">
      <template #title>
        <li-icon><icon-other-location-o /></li-icon>
        <span>一级导航</span>
      </template>
      <li-menu-item-group>
        <template #title><span>Group One</span></template>
        <li-menu-item index="1-1">item one</li-menu-item>
        <li-menu-item index="1-2">item two</li-menu-item>
      </li-menu-item-group>
      <li-menu-item-group title="Group Two">
        <li-menu-item index="1-3">item three</li-menu-item>
      </li-menu-item-group>
      <li-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <li-menu-item index="1-4-1">item one</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
    <li-menu-item index="2">
      <li-icon><icon-other-map-o /></li-icon>
      <template #title>字数很长的导航二</template>
    </li-menu-item>
    <li-menu-item index="3" disabled>
      <li-icon><icon-doc-document-o /></li-icon>
      <template #title>禁用的导航三</template>
    </li-menu-item>
    <li-menu-item index="4">
      <li-icon><icon-basic-settings-o /></li-icon>
      <template #title>导航四</template>
    </li-menu-item>
  </li-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconBasicSettingsO, IconDocDocumentO, IconOtherLocationO, IconOtherMapO } from '@chehejia/liui-icons';
import type { Ref } from 'vue';

const mode: Ref<'vertical-icon' | 'vertical' | 'vertical-expand'> = ref('vertical');
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.li-menu-vertical-demo:not(.li-menu--vertical, .li-menu--vertical-icon) {
  width: 200px;
  min-height: 400px;
}
</style>
```

## 溢出折叠

在 mode 属性设置为 `vertical` 或 `horizontal` 时可以设置 ellipsis 来开启自动折叠溢出的菜单。

* Processing Center
* Workspace
* Info
* Orders1
* Orders2

* 一级导航
* 字数很长的导航二
* 禁用的导航三
* 更多

```
<template>
  <li-menu default-active="1" class="li-menu-demo" mode="horizontal" ellipsis>
    <li-menu-item index="1">Processing Center</li-menu-item>
    <li-sub-menu index="2">
      <template #title>Workspace</template>
      <li-menu-item index="2-1">item one</li-menu-item>
      <li-menu-item index="2-2">item two</li-menu-item>
      <li-menu-item index="2-3">item three</li-menu-item>
      <li-sub-menu index="2-4">
        <template #title>item four</template>
        <li-menu-item index="2-4-1">item one</li-menu-item>
        <li-menu-item index="2-4-2">item two</li-menu-item>
        <li-menu-item index="2-4-3">item three</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
    <li-menu-item index="3" disabled>Info</li-menu-item>
    <li-menu-item index="4">Orders1</li-menu-item>
    <li-menu-item index="5">Orders2</li-menu-item>
    <li-menu-item index="6">Orders3</li-menu-item>
    <li-menu-item index="7">Orders4</li-menu-item>
    <li-menu-item index="8">Orders5</li-menu-item>
    <li-menu-item index="9">Orders6</li-menu-item>
    <li-menu-item index="10">Orders7</li-menu-item>
  </li-menu>
  <div class="h-6" />

  <li-menu default-active="2" class="li-menu-ellipsis-demo" mode="vertical" ellipsis>
    <li-sub-menu index="1">
      <template #title>
        <li-icon><icon-other-location-o /></li-icon>
        <span>一级导航</span>
      </template>
      <li-menu-item-group>
        <template #title><span>Group One</span></template>
        <li-menu-item index="1-1">item one</li-menu-item>
        <li-menu-item index="1-2">item two</li-menu-item>
      </li-menu-item-group>
      <li-menu-item-group title="Group Two">
        <li-menu-item index="1-3">item three</li-menu-item>
      </li-menu-item-group>
      <li-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <li-menu-item index="1-4-1">item one</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
    <li-menu-item index="2">
      <li-icon><icon-other-map-o /></li-icon>
      <template #title>字数很长的导航二</template>
    </li-menu-item>
    <li-menu-item index="3" disabled>
      <li-icon><icon-doc-document-o /></li-icon>
      <template #title>禁用的导航三</template>
    </li-menu-item>
    <li-sub-menu index="4">
      <template #title>
        <li-icon><icon-other-location-o /></li-icon>
        <span>多级菜单</span>
      </template>
      <li-menu-item-group>
        <template #title><span>Group One</span></template>
        <li-menu-item index="4-1">item one</li-menu-item>
        <li-menu-item index="4-2">item two</li-menu-item>
      </li-menu-item-group>
      <li-menu-item-group title="Group Two">
        <li-menu-item index="4-3">item three</li-menu-item>
      </li-menu-item-group>
      <li-sub-menu index="4-4">
        <template #title><span>item four</span></template>
        <li-menu-item index="4-4-1">item one</li-menu-item>
      </li-sub-menu>
    </li-sub-menu>
    <li-menu-item index="5">
      <li-icon><icon-other-map-o /></li-icon>
      <template #title>导航五</template>
    </li-menu-item>
  </li-menu>
</template>

<script lang="ts" setup>
import { IconDocDocumentO, IconOtherLocationO, IconOtherMapO } from '@chehejia/liui-icons';
</script>

<style>
.li-menu-ellipsis-demo:not(.li-menu--horizontal) {
  height: 300px;
}
</style>
```

## Menu API

### Menu Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| mode | 菜单展示模式 | string | horizontal / vertical / vertical-icon / vertical-expand | vertical-expand |
| effect | 菜单主题色 | `enum` | dark / light | dark |
| ellipsis | 是否省略多余的子项（仅在 mode 为 `vertical` 或 `horizontal` 时有效） | boolean | — | false |
| background-color | 菜单的背景颜色（十六进制格式）（已被废弃，使用`--bg-color`） | string | — | #ffffff |
| text-color | 文字颜色（十六进制格式）（已被废弃，使用`--text-color`） | string | — | #303133 |
| active-text-color | 活动菜单项的文本颜色（十六进制格式）（已被废弃，使用`--active-color`） | string | — | #409EFF |
| default-active | 页面加载时默认激活菜单的 index | string | — | — |
| default-openeds | 默认打开的 sub-menu 的 index 的数组 | Array | — | — |
| unique-opened | 是否只保持一个子菜单的展开 | boolean | — | false |
| menu-trigger | 子菜单打开的触发方式，只在 `mode` 为 `vertical` 或 `horizontal` 时有效。 | string | hover / click | hover |
| router | 是否启用 `vue-router` 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 `default-active` 来设置加载时的激活项。 | boolean | — | false |
| popper-effect | Tooltip 主题，内置了 `dark` / `light` 两种主题 | string | dark / light | dark |
| mode-change-transition | 是否开启 mode 属性切换时的动画 (仅在设置为 `vertical-expand` 及 `vertical-icon` 时可用) | boolean | — | true |

### Menu Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

### Menu Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path, item: 选中菜单项, routeResult: vue-router 的返回值（如果 router 为 true） |
| open | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index, indexPath: 打开的 sub-menu 的 index path |
| close | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index, indexPath: 收起的 sub-menu 的 index path |

### Menu Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| — | 自定义默认内容 | SubMenu / Menu-Item / Menu-Item-Group |

## SubMenu API

### SubMenu Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| index | 唯一标志 | string | — | — |
| popper-class | 为 popper 添加类名 | string | — | — |
| show-timeout | 展开 sub-menu 的延时 | number | — | 300 |
| hide-timeout | 收起 sub-menu 的延时 | number | — | 300 |
| disabled | 是否禁用 | boolean | — | false |
| popper-append-to-body（已废弃） | 是否将弹出菜单插入至 body 元素。 在菜单的定位出现问题时，可尝试修改该属性 | boolean | — | 一级子菜单：true / 非一级子菜单：false |
| popper-offset | 弹出窗口偏移 | number | — | 6 |
| expand-close-icon | 父菜单展开且子菜单关闭时的图标， `expand-close-icon` 和 `expand-open-icon` 需要一起配置才能生效 | `string | Component` | — | — |
| expand-open-icon | 父菜单展开且子菜单打开时的图标， `expand-open-icon` 和 `expand-close-icon` 需要一起配置才能生效 | `string | Component` | — | — |
| collapse-close-icon | 父菜单收起且子菜单关闭时的图标， `expand-close-icon` 和 `expand-open-icon` 需要一起配置才能生效 | `string | Component` | — | — |
| collapse-open-icon | 父菜单收起且子菜单打开时的图标， `expand-open-icon` 和 `expand-close-icon` 需要一起配置才能生效 | `string | Component` | — | — |

### SubMenu Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| — | 自定义默认内容 | SubMenu / Menu-Item / Menu-Item-Group |
| title | 自定义标题内容 | — |

## MenuItem API

### MenuItem Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| index | 唯一标志 | string/null | — | null |
| route | Vue Router 路径对象 | object | — | — |
| disabled | 是否禁用 | boolean | — | false |

### MenuItem Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 菜单点击时的回调函数 | li-menu-item 实例 |

### MenuItem Slots

| 插槽名 | 说明 |
| --- | --- |
| — | 自定义默认内容 |
| title | 自定义标题内容 |

## MenuItemGroup API

### MenuItemGroup Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 组标题 | string | — | — |

### MenuItemGroup Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| — | 默认插槽内容 | Menu-Item |
| title | 自定义组标题内容 | — |

最后修改日期： 2025-07-15
