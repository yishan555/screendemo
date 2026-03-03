# Backtop 回到顶部

Maintainer: 徐鑫

1. [基础用法](#基础用法)
2. [效果](#效果)
3. [自定义内容](#自定义内容)
4. [Backtop API](#backtop-api)
   1. [Backtop Props](#backtop-props)
   2. [Backtop Events](#backtop-events)
   3. [Backtop Slots](#backtop-slots)

返回页面顶部的操作按钮。

## 基础用法

Scroll down to see the bottom-right button.   
 向下滚动来查看容器右下角的按钮。

```
<template>
  Scroll down to see the bottom-right button.
  <br />
  向下滚动来查看容器右下角的按钮。

  <li-backtop target="#press-body" :right="100" :bottom="100" />
</template>
```

## 效果

使用 `effect` props 控制颜色效果。

Scroll down to see the bottom-right button.   
 向下滚动来查看容器右下角的按钮。

```
<template>
  Scroll down to see the bottom-right button.
  <br />
  向下滚动来查看容器右下角的按钮。

  <li-backtop target="#press-body" effect="light" />
  <li-backtop target="#press-body" effect="dark" :right="100" />
</template>
```

## 自定义内容

显示区域被固定为 40px \* 40px 的区域，其中的内容可支持自定义。

Scroll down to see the bottom-right button.   
 向下滚动来查看容器右下角的按钮。

```
<template>
  Scroll down to see the bottom-right button.
  <br />
  向下滚动来查看容器右下角的按钮。

  <li-backtop target="#press-body" :bottom="100">
    <div
      style="
        width: 100%;
        height: 100%;

        font-weight: 600;
        line-height: 40px;
        color: var(--li-color-brand-700);
        text-align: center;

        background-color: var(--li-bg-color-overlay);
        border-radius: 50%;
        box-shadow: var(--li-box-shadow-lighter);
      "
    >
      UP
    </div>
  </li-backtop>
</template>
```

## Backtop API

### Backtop Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 触发滚动的对象 | `string` | — |
| effect | 颜色效果 | `enum` 'light' | 'dark' | `'light'` |
| visibility-height | 滚动高度达到此参数值才出现 | `number` | 200 |
| right | 控制其显示位置，距离页面右边距 | `number` | 40 |
| bottom | 控制其显示位置，距离页面底部距离 | `number` | 40 |

### Backtop Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮触发的事件 | `Function` (evt: MouseEvent) => void |

### Backtop Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

最后修改日期： 2025-07-15
