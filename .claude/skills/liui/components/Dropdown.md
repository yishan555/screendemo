# Dropdown 下拉菜单

Maintainer: 王德师

1. [基础用法](#基础用法)
2. [触发对象](#触发对象)
3. [触发方式](#触发方式)
4. [菜单隐藏方式](#菜单隐藏方式)
5. [指令事件](#指令事件)
6. [下拉方法](#下拉方法)
7. [尺寸](#尺寸)
8. [Dropdown API](#dropdown-api)
   1. [Dropdown Props](#dropdown-props)
   2. [Dropdown Slots](#dropdown-slots)
   3. [Dropdown Events](#dropdown-events)
   4. [Dropdown Methods](#dropdown-methods)
9. [DropdownMenu API](#dropdownmenu-api)
   1. [DropdownMenu Slots](#dropdownmenu-slots)
10. [DropdownItem API](#dropdownitem-api)
    1. [DropdownItem Props](#dropdownitem-props)
    2. [DropdownItem Slots](#dropdownitem-slots)

将动作或菜单折叠到下拉菜单中。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

下拉菜单

```
<template>
  <li-dropdown trigger="click">
    <li-button text>
      下拉菜单
      <li-icon class="li-icon--right">
        <icon-arrow-down-s-o />
      </li-icon>
    </li-button>
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item> 下拉菜单项一 </li-dropdown-item>
        <li-dropdown-item> 下拉菜单项二 </li-dropdown-item>
        <li-dropdown-item>下拉菜单项三</li-dropdown-item>
        <li-dropdown-item disabled>下拉菜单项四</li-dropdown-item>
        <li-dropdown-item divided>
          <li-icon><icon-basic-settings-o /></li-icon>
          下拉菜单项五
        </li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>
</template>

<script lang="ts" setup>
import { IconArrowDownSO, IconBasicSettingsO } from '@chehejia/liui-icons';
</script>
```

## 触发对象

可使用按钮触发下拉菜单。

设置 `split-button` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 `true` 即可。 如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 `divider` 的 CSS class。

下拉菜单

下拉菜单

```
<template>
  <div class="flex flex-wrap items-center">
    <li-dropdown>
      <li-button type="primary">
        下拉菜单<li-icon class="li-icon--right"><icon-arrow-down-s-o /></li-icon>
      </li-button>
      <template #dropdown>
        <li-dropdown-menu>
          <li-dropdown-item>下拉菜单项一</li-dropdown-item>
          <li-dropdown-item>下拉菜单项二</li-dropdown-item>
          <li-dropdown-item>下拉菜单项三</li-dropdown-item>
          <li-dropdown-item>下拉菜单项四</li-dropdown-item>
          <li-dropdown-item>下拉菜单项五</li-dropdown-item>
        </li-dropdown-menu>
      </template>
    </li-dropdown>
    <li-dropdown split-button type="primary" @click="handleClick">
      下拉菜单
      <template #dropdown>
        <li-dropdown-menu>
          <li-dropdown-item>下拉菜单项一</li-dropdown-item>
          <li-dropdown-item>下拉菜单项二</li-dropdown-item>
          <li-dropdown-item>下拉菜单项三</li-dropdown-item>
          <li-dropdown-item>下拉菜单项四</li-dropdown-item>
          <li-dropdown-item>下拉菜单项五</li-dropdown-item>
        </li-dropdown-menu>
      </template>
    </li-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { IconArrowDownSO } from '@chehejia/liui-icons';

const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click');
};
</script>
<style scoped>
.example-showcase .li-dropdown + .li-dropdown {
  margin-left: 15px;
}
</style>
```

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 `click` 即可， 默认为 `hover`。

hover

下拉菜单

click

下拉菜单

right click

下拉菜单

```
<template>
  <li-row class="block-col-2">
    <li-col :span="8">
      <span class="demonstration">hover</span>
      <li-dropdown>
        <li-button text>
          下拉菜单
          <li-icon class="li-icon--right">
            <icon-arrow-down-s-o />
          </li-icon>
        </li-button>
        <template #dropdown>
          <li-dropdown-menu>
            <li-dropdown-item :icon="IconBasicAddO">Action 1</li-dropdown-item>
            <li-dropdown-item :icon="IconEditPlusCircleF"> Action 2 </li-dropdown-item>
            <li-dropdown-item :icon="IconEditCirclePlusO">Action 3</li-dropdown-item>
            <li-dropdown-item :icon="IconBasicSelectedO">Action 4</li-dropdown-item>
            <li-dropdown-item :icon="IconEditCircleSelectedO">Action 5</li-dropdown-item>
          </li-dropdown-menu>
        </template>
      </li-dropdown>
    </li-col>
    <li-col :span="8">
      <span class="demonstration">click</span>
      <li-dropdown trigger="click">
        <li-button text>
          下拉菜单
          <li-icon class="li-icon--right">
            <icon-arrow-down-s-o />
          </li-icon>
        </li-button>
        <template #dropdown>
          <li-dropdown-menu>
            <li-dropdown-item :icon="IconBasicAddO">Action 1</li-dropdown-item>
            <li-dropdown-item :icon="IconEditPlusCircleF"> Action 2 </li-dropdown-item>
            <li-dropdown-item :icon="IconEditCirclePlusO">Action 3</li-dropdown-item>
            <li-dropdown-item :icon="IconBasicSelectedO">Action 4</li-dropdown-item>
            <li-dropdown-item :icon="IconEditCircleSelectedO">Action 5</li-dropdown-item>
          </li-dropdown-menu>
        </template>
      </li-dropdown>
    </li-col>
    <li-col :span="8">
      <span class="demonstration">right click</span>
      <li-dropdown trigger="contextmenu">
        <li-button text>
          下拉菜单
          <li-icon class="li-icon--right">
            <icon-arrow-down-s-o />
          </li-icon>
        </li-button>
        <template #dropdown>
          <li-dropdown-menu>
            <li-dropdown-item :icon="IconBasicAddO">Action 1</li-dropdown-item>
            <li-dropdown-item :icon="IconEditPlusCircleF"> Action 2 </li-dropdown-item>
            <li-dropdown-item :icon="IconEditCirclePlusO">Action 3</li-dropdown-item>
            <li-dropdown-item :icon="IconBasicSelectedO">Action 4</li-dropdown-item>
            <li-dropdown-item :icon="IconEditCircleSelectedO">Action 5</li-dropdown-item>
          </li-dropdown-menu>
        </template>
      </li-dropdown>
    </li-col>
  </li-row>
</template>

<script lang="ts" setup>
import {
  IconArrowDownSO,
  IconBasicAddO,
  IconBasicSelectedO,
  IconEditCirclePlusO,
  IconEditCircleSelectedO,
  IconEditPlusCircleF,
} from '@chehejia/liui-icons';
</script>

<style scoped>
.block-col-2 .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 hide-on-click 属性设置为 false 可以关闭此功能。

下拉菜单

```
<template>
  <li-dropdown :hide-on-click="false">
    <li-button text>
      下拉菜单
      <li-icon class="li-icon--right">
        <icon-arrow-down-s-o />
      </li-icon>
    </li-button>
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item>下拉菜单项一</li-dropdown-item>
        <li-dropdown-item>下拉菜单项二</li-dropdown-item>
        <li-dropdown-item>下拉菜单项三</li-dropdown-item>
        <li-dropdown-item disabled>下拉菜单项四</li-dropdown-item>
        <li-dropdown-item divided>下拉菜单项五</li-dropdown-item>
        <li-dropdown-item divided>下拉菜单项六</li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>
</template>

<script lang="ts" setup>
import { IconArrowDownSO } from '@chehejia/liui-icons';
</script>
```

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

下拉菜单

```
<template>
  <li-dropdown @command="handleCommand">
    <li-button text>
      下拉菜单
      <li-icon class="li-icon--right">
        <icon-arrow-down-s-o />
      </li-icon>
    </li-button>
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item command="a">下拉菜单项一</li-dropdown-item>
        <li-dropdown-item command="b">下拉菜单项二</li-dropdown-item>
        <li-dropdown-item command="c">下拉菜单项三</li-dropdown-item>
        <li-dropdown-item command="d" disabled>下拉菜单项四</li-dropdown-item>
        <li-dropdown-item command="e" divided>下拉菜单项五</li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>
</template>

<script lang="ts" setup>
import { LiMessage } from '@chehejia/liui-next';
import { IconArrowDownSO } from '@chehejia/liui-icons';

const handleCommand = (command: string | number | object) => {
  LiMessage(`click on item ${command}`);
};
</script>
```

## 下拉方法

您可以手动调用 `handleOpen` 和 `handleClose` 方法控制打开或关闭。

下拉菜单

打开关闭

```
<template>
  <li-dropdown ref="dropdown" trigger="click">
    <li-button>下拉菜单</li-button>
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item>下拉菜单项一</li-dropdown-item>
        <li-dropdown-item>下拉菜单项二</li-dropdown-item>
        <li-dropdown-item>下拉菜单项三</li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>
  <li-divider direction="vertical" />
  <li-button type="primary" @click="dropdown.handleOpen()">打开</li-button>
  <li-button @click="dropdown.handleClose()">关闭</li-button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const dropdown = ref();
</script>
```

## 尺寸

Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

Large

Default

Small

```
<template>
  <li-dropdown size="large" split-button type="primary">
    Large
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item>下拉菜单项一</li-dropdown-item>
        <li-dropdown-item>下拉菜单项二</li-dropdown-item>
        <li-dropdown-item>下拉菜单项三</li-dropdown-item>
        <li-dropdown-item>下拉菜单项四</li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>

  <li-dropdown split-button type="primary">
    Default
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item>下拉菜单项一</li-dropdown-item>
        <li-dropdown-item>下拉菜单项二</li-dropdown-item>
        <li-dropdown-item>下拉菜单项三</li-dropdown-item>
        <li-dropdown-item>下拉菜单项四</li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>

  <li-dropdown size="small" split-button type="primary">
    Small
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item>下拉菜单项一</li-dropdown-item>
        <li-dropdown-item>下拉菜单项二</li-dropdown-item>
        <li-dropdown-item>下拉菜单项三</li-dropdown-item>
        <li-dropdown-item>下拉菜单项四</li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>
</template>
<style scoped>
.example-showcase .li-dropdown + .li-dropdown {
  margin-left: 15px;
}
</style>
```

## Dropdown API

### Dropdown Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 菜单按钮类型，同 `Button` 组件一样，仅在 `split-button` 为 true 的情况下有效。 | string | — | — |
| size | 菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。 | string | large / default / small | default |
| max-height | 菜单最大高度 | string / number | — | — |
| split-button | 下拉触发元素呈现为按钮组 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| placement | 菜单弹出位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom-end |
| trigger | 触发下拉的行为 | string | hover/click/contextmenu | hover |
| hide-on-click | 是否在点击菜单项后隐藏菜单 | boolean | — | true |
| show-timeout | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效 | number | — | 250 |
| hide-timeout | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） | number | — | 150 |
| role | 下拉菜单的 ARIA 属性。 根据具体场景，您可能想要将此更改为“navigation” | string | — | 'menu' |
| tabindex | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
| popper-class | 自定义浮层类名 | string | — | — |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) 参数 | Object | 请参考 [popper.js](https://popper.js.org/docs/v2/) 文档 | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |
| append-to | 指示 Tooltip 的内容将附加在哪一个网页元素上 | `CSS 选择器 | HTMLElement` | — | #li-popper-container-[randomValue] |

### Dropdown Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| — | 下拉菜单的内容。 注意：必须是有效的 html DOM 元素（例如 `<span>、<button>` 等）或 `li-component`，以附加监听触发器 | — |
| dropdown | 下拉列表，通常是 `<li-dropdown-menu>` 组件 | Dropdown-Menu |

### Dropdown Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | `split-button` 为 true 时，点击左侧按钮的回调 | — |
| command | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Dropdown Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| handleOpen | 打开下拉菜单 | — |
| handleClose | 关闭下拉菜单 | — |

## DropdownMenu API

### DropdownMenu Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| — | 下拉菜单的内容 | Dropdown-Item |

## DropdownItem API

### DropdownItem Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| command | 派发到`command`回调函数的指令参数 | string/number/object | — | — |
| disabled | 是否禁用 | boolean | — | false |
| divided | 是否显示分隔符 | boolean | — | false |
| icon | 自定义图标 | `string | Component` | — | — |

### DropdownItem Slots

| 插槽名 | 说明 |
| --- | --- |
| — | 自定义 Dropdown-Item 内容 |

最后修改日期： 2025-07-15
