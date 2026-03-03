# Button 按钮

Maintainer: 陈尚书

1. [基础用法](#基础用法)
2. [禁用状态](#禁用状态)
3. [文字按钮](#文字按钮)
4. [图标按钮](#图标按钮)
5. [按钮组](#按钮组)
6. [加载状态按钮](#加载状态按钮)
7. [调整尺寸](#调整尺寸)
8. [Button API](#button-api)
   1. [Button Props](#button-props)
   2. [Button Slots](#button-slots)
   3. [Button Methods](#button-methods)
9. [ButtonGroup API](#buttongroup-api)
   1. [Button Group Props](#button-group-props)
   2. [ButtonGroup Slots](#buttongroup-slots)

常用的操作按钮。

## 基础用法

使用 `type` 来定义按钮的样式。

DefaultPrimarySecondarySuccessWarningDanger

```
<template>
  <li-row class="mb-4">
    <li-button>Default</li-button>
    <li-button type="primary">Primary</li-button>
    <li-button type="secondary">Secondary</li-button>
    <li-button type="success">Success</li-button>
    <li-button type="warning">Warning</li-button>
    <li-button type="danger">Danger</li-button>
  </li-row>
</template>
```

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态，该属性接受一个 `Boolean` 类型的值。

DefaultPrimarySecondarySuccessWarningDanger

```
<template>
  <li-row class="mb-4">
    <li-button disabled>Default</li-button>
    <li-button type="primary" disabled>Primary</li-button>
    <li-button type="secondary" disabled>Secondary</li-button>
    <li-button type="success" disabled>Success</li-button>
    <li-button type="warning" disabled>Warning</li-button>
    <li-button type="danger" disabled>Danger</li-button>
  </li-row>
</template>
```

## 文字按钮

没有边框和背景色的按钮。

defaultprimarysuccesswarningdanger

defaultprimarysuccesswarningdanger

defaultprimary

```
<template>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <li-button v-for="button in buttons" :key="button.text" :type="button.type" text>{{ button.text }}</li-button>
  </div>

  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <li-button v-for="button in buttons" :key="button.text" :type="button.type" text disabled>{{
      button.text
    }}</li-button>
  </div>

  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <li-button
      v-for="textButton in textButtons"
      :key="textButton.text"
      :type="textButton.type"
      text
      :icon="IconOperationsViewO"
      >{{ textButton.text }}</li-button
    >
  </div>

  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <li-button
      v-for="textButton in textButtons"
      :key="textButton.text"
      :type="textButton.type"
      text
      :icon="IconOperationsViewO"
    />
  </div>
</template>

<script setup lang="ts">
import { IconOperationsViewO } from '@chehejia/liui-icons';
const buttons = [
  { type: 'default', text: 'default' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const;
const textButtons = [
  { type: 'default', text: 'default' },
  { type: 'primary', text: 'primary' },
] as const;
</script>
```

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

使用 `icon` 属性来为按钮添加图标。 你可以在我们的 Icon 组件中找到所需图标。 通过向右方添加`<i>`标签来添加图标， 你也可以使用自定义图标。

Search Upload

```
<template>
  <div class="flex">
    <li-button type="primary" :icon="IconEditTextEditingO" />
    <li-button type="primary" :icon="IconMenuShareO" />
    <li-button type="primary" :icon="IconBasicDeleteO" />
    <li-button type="primary" :icon="IconBasicSearchO">Search</li-button>
    <li-button type="primary">
      Upload<li-icon class="li-icon--right"><icon-cloud-up-o /></li-icon>
    </li-button>
  </div>
</template>
<script setup lang="ts">
import {
  IconBasicDeleteO,
  IconBasicSearchO,
  IconCloudUpO,
  IconEditTextEditingO,
  IconMenuShareO,
} from '@chehejia/liui-icons';
</script>
```

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

使用 `<li-button-group>` 对多个按钮分组。

上一页 下一页

```
<template>
  <li-row>
    <li-button-group>
      <li-button :icon="IconArrowLeftO">上一页</li-button>
      <li-button>
        下一页<li-icon class="li-icon--right"><icon-arrow-right-o /></li-icon>
      </li-button>
    </li-button-group>

    <li-button-group class="ml-4">
      <li-button :icon="IconEditTextEditingO" />
      <li-button :icon="IconMenuShareO" />
      <li-button :icon="IconBasicDeleteO" />
    </li-button-group>
  </li-row>
</template>

<script setup lang="ts">
import {
  IconArrowLeftO,
  IconArrowRightO,
  IconBasicDeleteO,
  IconEditTextEditingO,
  IconMenuShareO,
} from '@chehejia/liui-icons';
</script>
```

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

TIP

你可以使用 `loading` 插槽或 `loadingIcon` 属性自定义你的 loading 图标。

ps: `loading` 插槽优先级高于 `loadingIcon` 属性。

LoadingLoading Loading

```
<template>
  <li-button type="primary" loading />
  <li-button type="primary" loading>Loading</li-button>
  <li-button type="primary" :loading-icon="IconArrowRefreshO" loading />
  <li-button type="primary" :loading-icon="IconArrowRefreshO" loading>Loading</li-button>
  <li-button type="primary" loading>
    <template #loading>
      <div class="custom-loading">
        <svg class="circular" viewBox="-10, -10, 50, 50">
          <path
            class="path"
            d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
            style="fill: rgba(0, 0, 0, 0); stroke-width: 4px"
          />
        </svg>
      </div>
    </template>
    Loading
  </li-button>
</template>

<script lang="ts" setup>
import { IconArrowRefreshO } from '@chehejia/liui-icons';
</script>

<style scoped>
.li-button .custom-loading .circular {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  animation: loading-rotate 2s linear infinite;
}

.li-button .custom-loading .circular .path {
  stroke: var(--li-button-text-color);
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2;

  animation: loading-dash 1.5s ease-in-out infinite;
}
</style>
```

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 `size` 属性额外配置尺寸，可使用 `large` 和 `small`。

LargeDefaultSmall

SearchSearchSearch

```
<template>
  <li-row>
    <li-button size="large">Large</li-button>
    <li-button>Default</li-button>
    <li-button size="small">Small</li-button>
  </li-row>
  <li-row class="my-4">
    <li-button size="large" :icon="IconBasicSearchO">Search</li-button>
    <li-button :icon="IconBasicSearchO">Search</li-button>
    <li-button size="small" :icon="IconBasicSearchO">Search</li-button>
  </li-row>
  <li-row class="my-4">
    <li-button :icon="IconBasicSearchO" size="large" />
    <li-button :icon="IconBasicSearchO" />
    <li-button :icon="IconBasicSearchO" size="small" />
  </li-row>
</template>

<script setup lang="ts">
import { IconBasicSearchO } from '@chehejia/liui-icons';
</script>
```

## Button API

### Button Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `string` 'large' | 'default' | 'small' | — |
| type | 类型 | `string` 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'text'(delete) | — |
| text | 是否为文字按钮 | `boolean` | false |
| loading | 是否为加载中状态 | `boolean` | false |
| loading-icon | 自定义加载中状态图标组件 | `string` / `Component` | Loading |
| disabled | 按钮是否为禁用状态 | `boolean` | false |
| icon | 图标组件 | `string` / `Component` | — |
| autofocus | 原生 `autofocus` 属性 | `boolean` | false |
| native-type | 原生 type 属性 | `string` 'button' | 'submit' | 'reset' | button |
| auto-insert-space | 自动在两个中文字符之间插入空格 | `boolean` | — |

### Button Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |
| loading | 自定义加载中组件 |
| icon | 自定义图标组件 |

### Button Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| ref | 按钮 html 元素 | `object` Ref<HTMLButtonElement> |
| size | 按钮尺寸 | `object` ComputedRef<'' | 'small' | 'default' | 'large'> |
| type | 按钮类型 | `object` ComputedRef<'' | 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text'> |
| disabled | 按钮已禁用 | `object` ComputedRef<boolean> |
| shouldAddSpace | 是否在两个字符之间插入空格 | `object` ComputedRef<boolean> |

## ButtonGroup API

### Button Group Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 用于控制该按钮组内按钮的大小 | `string` 'large' | 'default' | 'small' | — |
| type | 用于控制该按钮组内按钮的类型 | `string` 'primary' | 'success' | 'warning' | 'danger' | 'info' | — |

### ButtonGroup Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| default | 自定义按钮组内容 | Button |

最后修改日期： 2025-07-15
