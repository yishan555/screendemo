# Badge 徽章

Maintainer: 孙庞渝

1. [基础用法](#基础用法)
2. [最大值](#最大值)
3. [自定义显示内容](#自定义显示内容)
4. [小红点](#小红点)
5. [Badge API](#badge-api)
   1. [Badge Props](#badge-props)
   2. [Badge Slots](#badge-slots)

按钮和图标上的数字或状态标记。

## 基础用法

可以用来展示新消息的数量。

数量值可接受 Number 或 String。

comments12

replies3

comments1

replies2

Click Me

```
<template>
  <li-badge :value="12" class="badge-item">
    <li-button>comments</li-button>
  </li-badge>
  <li-badge :value="3" class="badge-item">
    <li-button>replies</li-button>
  </li-badge>
  <li-badge :value="1" class="badge-item" type="primary">
    <li-button>comments</li-button>
  </li-badge>
  <li-badge :value="2" class="badge-item" type="warning">
    <li-button>replies</li-button>
  </li-badge>

  <li-dropdown trigger="click">
    <span class="li-dropdown-link">
      Click Me
      <li-icon class="li-icon--right"><icon-arrow-down-o /></li-icon>
    </span>
    <template #dropdown>
      <li-dropdown-menu>
        <li-dropdown-item class="clearfix">
          comments
          <li-badge class="mark" :value="12" />
        </li-dropdown-item>
        <li-dropdown-item class="clearfix">
          replies
          <li-badge class="mark" :value="3" />
        </li-dropdown-item>
      </li-dropdown-menu>
    </template>
  </li-dropdown>
</template>

<script lang="ts" setup>
import { IconArrowDownO } from '@chehejia/liui-icons';
</script>

<style scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}

.li-dropdown {
  margin-top: 1.1rem;
}
</style>
```

## 最大值

你还可以自定义最大值。 由 max 属性定义，接受 Number 值。 请注意，仅在值也是 Number 时起作用。

comments99+

replies10+

```
<template>
  <li-badge :value="200" :max="99" class="badge-item">
    <li-button>comments</li-button>
  </li-badge>
  <li-badge :value="100" :max="10" class="badge-item">
    <li-button>replies</li-button>
  </li-badge>
</template>

<style scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```

## 自定义显示内容

你也可以展示除数字以外你想要展示的任何值。

当 value 是 String 时，可以显示自定义文字。

commentsnew

replieshot

```
<template>
  <li-badge value="new" class="badge-item">
    <li-button>comments</li-button>
  </li-badge>
  <li-badge value="hot" class="badge-item">
    <li-button>replies</li-button>
  </li-badge>
</template>

<style scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```

## 小红点

通过一个小红点标记来告知用户有新内容。

使用 `is-dot` 属性，是个布尔值。

query

```
<template>
  <li-badge is-dot class="badge-item">query</li-badge>
  <li-badge is-dot class="badge-item">
    <li-button class="share-button" :icon="IconMenuShareO" type="primary" />
  </li-badge>
</template>

<script lang="ts" setup>
import { IconMenuShareO } from '@chehejia/liui-icons';
</script>

<style scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```

## Badge API

### Badge Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 显示值 | `string` | `number` | '' |
| max | 最大值，超过最大值会显示 `{max}+`，只有当 value 是数字类型时起作用 | `number` | 99 |
| is-dot | 是否显示小圆点 | `boolean` | false |
| hidden | 是否隐藏 Badge | `boolean` | false |
| type | Badge 类型 | `string` 'primary' | 'success' | 'warning' | 'danger' | 'info' | danger |

### Badge Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

最后修改日期： 2025-07-15
