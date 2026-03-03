# Icon 图标

Maintainer: 陈尚书

1. [使用图标](#使用图标)
2. [安装](#安装)
   1. [使用包管理器](#使用包管理器)
   2. [注册所有图标](#注册所有图标)
3. [基础用法](#基础用法)
4. [直接使用 SVG 图标](#直接使用-svg-图标)
5. [图标集合](#图标集合)
6. [Icon API](#icon-api)
   1. [Icon Props](#icon-props)
   2. [Icon Slots](#icon-slots)

LiUI 提供了一套常用的图标集合。

## 使用图标

* 如果你想像用例一样**直接使用**，你需要[全局注册组件](https://v3.vuejs.org/guide/component-registration.html#global-registration)，才能够直接在项目里使用。
* 如若需要查看所有可用的 SVG 图标请查阅 Icon Collection 的源码 [liui-icons](https://gitlab.chehejia.com/fed/liui-icons)

## 安装

### 使用包管理器

```
# 选择一个你喜欢的包管理器

# NPM
$ npm install @chehejia/liui-icons
# Yarn
$ yarn add @chehejia/liui-icons
# pnpm
$ pnpm install @chehejia/liui-icons
```

### 注册所有图标

您需要从 `@chehejia/liui-icons` 中导入所有图标并进行全局注册。

```
// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as LiUIIcons from '@chehejia/liui-icons'

const app = createApp(App)
for (const [key, component] of Object.entries(LiUIIcons)) {
  app.component(key, component)
}
```

您也可以参考 [此模板](https://codepen.io/sxzz/pen/xxpvdrg)。

## 基础用法

通过添加额外的 CSS 类名 `is-loading`，你的图标就可以在 2 秒内旋转 360 度，当然你也可以自己改写想要的动画。

```
<div style="color: var(--li-color-error-700)">
  <li-icon color="skyblue"><icon-other-smile-o /></li-icon>
  <li-icon :size="20"><icon-other-smile-o /></li-icon>
  <icon-other-smile-o width="20px" />
  <li-icon class="is-loading" style="color: gray">
    <icon-basic-loading-o />
  </li-icon>
</div>
```

## 直接使用 SVG 图标

由于 SVG 图标默认不携带任何属性，需要控制其尺寸

```
<div style="font-size: 20px">
  <icon-edit-text-editing-o style="width: 1em; height: 1em" />
  <icon-menu-share-o style="width: 1em; height: 1em" />
  <icon-basic-delete-o style="width: 1em; height: 1em" />
  <icon-basic-search-o style="width: 1em; height: 1em" />
</div>
```

## 图标集合

TIP

只要你安装了 `@chehejia/liui-icons`，**就可以在任意版本里使用 SVG 图标**。

**您可以点击图标复制代码。**

## Icon API

### Icon Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | svg 的 fill 颜色 | `string` | 继承颜色 |
| size | SVG 图标的大小，size x size | `number` / `string` | 继承字体大小 |

### Icon Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

最后修改日期： 2025-07-15
