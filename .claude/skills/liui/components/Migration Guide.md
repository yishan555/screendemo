# 

1. [TextMorePopover](#textmorepopover)
   1. [已删除](#已删除)
2. [Tooltip](#tooltip)
   1. [Props 变更](#props-变更)
3. [Popover](#popover)
   1. [Props 变更](#props-变更-1)
   2. [Emit event 变更](#emit-event-变更)
4. [Breadcrumb](#breadcrumb)
   1. [Props 变更](#props-变更-2)
5. [Scrollbar](#scrollbar)
   1. [Props 变更](#props-变更-3)
6. [Dialog](#dialog)
   1. [Props 变更](#props-变更-4)
7. [CollapseItem](#collapseitem)
   1. [Props 变更](#props-变更-5)
   2. [Slots 变更](#slots-变更)
8. [Calendar](#calendar)
   1. [Props 变更](#props-变更-6)
9. [Tabs](#tabs)
   1. [Props 变更](#props-变更-7)
10. [Drawer](#drawer)
    1. [Props 变更](#props-变更-8)
    2. [Methods 变更](#methods-变更)
11. [TimePicker](#timepicker)
    1. [Props 变更](#props-变更-9)
12. [TimePicker](#timepicker-1)
    1. [Props 变更](#props-变更-10)
13. [Menu](#menu)
    1. [Props 变更](#props-变更-11)
14. [Steps 步骤条](#steps-步骤条)
    1. [Props 变更](#props-变更-12)
    2. [Events 变更](#events-变更)
15. [Step 步骤条的步骤](#step-步骤条的步骤)
    1. [Props 变更](#props-变更-13)
16. [StatusTag](#statustag)
    1. [Props 变更](#props-变更-14)
17. [Text 文本](#text-文本)
    1. [Props 变更](#props-变更-15)
18. [Card 卡片](#card-卡片)
    1. [Events 变更](#events-变更-1)
19. [Image 图片](#image-图片)
    1. [Props 变更](#props-变更-16)
20. [Select 选择器](#select-选择器)
    1. [Props 变更](#props-变更-17)
    2. [Events 变更](#events-变更-2)

# LiUI 迁移指引

基于 `vue@2.6` 的 `@chehejia/liui` 用户，请参考本指引。

---

## TextMorePopover

### 已删除

其功能由 `<li-tooltip/>` 或 `<li-popover/>` 的 `overflow-triggering` props 提供（详见组件文档）。

示例：

```
<li-text-more-popover text="天上地下云里风中" />


<li-tooltip overflow-triggering>天上地下云里风中</li-tooltip>


<li-popover title="Popover title" content="Popover content" overflow-triggering>
天上地下云里风中
</li-popover>
```

## Tooltip

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `v-model="visible"` | `v-model:visible="visible"` | Tooltip 组件可见性 |
| `visible-arrow` | `show-arrow` | Tooltip 的内容是否有箭头 |
| `open-delay` | `show-after` | 在触发后多久显示内容，单位毫秒 |

## Popover

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `v-model="visible"` | `v-model:visible="visible"` | Popover 组件可见性 |
| `visible-arrow` | `show-arrow` | Popover 的内容是否有箭头 |
| `open-delay` | `show-after` | 在触发后多久显示内容，单位毫秒 |
| `close-delay` | `hide-after` | 延迟关闭，单位毫秒 |

### Emit event 变更

| 原事件名 | 现在的事件名 | 触发时机 |
| --- | --- | --- |
| `show` | `before-enter` | 显示动画播放前触发 |
| `hide` | `before-leave` | 隐藏动画播放前触发 |

## Breadcrumb

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `separator-class` | `separator-icon` | 图标分隔符的组件或组件名 |

## Scrollbar

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `x` | 已移除；使用组件暴露的 `setScrollLeft` 方法实现 | 设置滚动条到左边的距离 |
| `y` | 已移除；使用组件暴露的 `setScrollTop` 方法实现 | 设置滚动条到顶部的距离 |
| `scroll-bar-show-type`，可选值为 `always`、`scroll` | `always`，布尔值 props | 滚动条是否一直显示 |
| `scroll-bar-size` | `size` | 滚动条尺寸 |

## Dialog

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `:visible.sync="dialogVisible"` | `v-model="dialogVisible"` | 是否显示 Dialog |
| `modal-append-to-body` | 已移除，不再需要 | 遮罩层是否插入至 body 元素 |

## CollapseItem

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `show-subtitle-arrow"` | `show-icon` | 是否显示右侧箭头图标 |

### Slots 变更

| 原 slots | 现在的 slots | 用途 |
| --- | --- | --- |
| `subtitle"` | `icon` | Collapse Item 的图标 |

## Calendar

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `first-day-of-week` | 已移除，通过国际化配置实现 | 每一周的第一天 |

示例：

```
<template>
  <li-config-provider :locale="zhCn">
    <li-calendar />
  </li-config-provider>
</template>
<script lang="ts" setup>
import zhCn from '@chehejia/liui-next/dist/locale/zh-cn.mjs'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
</script>
```

## Tabs

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `fill` | 已移除，设置 `type` props 为 `fill-card` 实现原效果 | 开启标签风格的填充模式 |

## Drawer

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `:visible.sync="dialogVisible"` | `v-model="dialogVisible"` | 是否显示 Drawer |
| `wrapperClosable` | `close-on-click-modal` | 是否可以通过点击 modal 关闭 Drawer |
| `modal-append-to-body` | 已移除，不再需要 | 遮罩层是否插入至 body 元素 |
| `width` | 已移除，不支持 M 端 | 在 M 端控制弹窗的宽度(仅 M 端有效) |
| `height` | 已移除，不支持 M 端 | 在 M 端控制弹窗的高度(仅 M 端有效) |

### Methods 变更

| 原 method | 现在的 method | 用途 |
| --- | --- | --- |
| `closeDrawer` | `handleClose` | 用于关闭 Drawer |

## TimePicker

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `reverse` | **已移除**，建议使用数组 `reverse()` 或者将 `<li-timeline-item/>` 按需求顺序编写 | 指定节点排序方向 |
| `backgroud-color` | 已移除，建议使用`type`控制节点颜色，或使用 `dot` slot 自定义 | 节点背景颜色 |
| `color` | 已移除，建议使用`type`控制节点颜色，或使用 `dot` slot 自定义 | 节点图标颜色 |
| `type` 可选值：`'start'`|`'end'` | 可选值变化，现在的 `type` 可选值：`'primary'` | `'success'` | `'warning'` | `'danger'` | `'info'` | 节点类型 |

## TimePicker

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `picker-options` | `已删除` | 此属性已移至顶层 |
| `picker-options.format` | `已删除` | 请使用顶层属性 format |
| `picker-options.selectableRange` | `已删除` | 请使用顶层属性 disabled-hours / disabled-minutes / disabled-seconds |
| `align` | `placement` | 对齐方式 |

## Menu

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `theme` | `effect` | 菜单主题色 |
| `size` | **已移除** 建议在项目中手动覆盖 style | 紧凑模式 |
| `collapse` | **已移除** 现改为通过修改 mode 属性变更样式 | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） |
| `collapse-transition` | `mode-change-transition` | 是否开启折叠动画 |

## Steps 步骤条

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `type` | **已移除** | 设置 `type="freedom"` 用于开启原 `step-click` 事件 |

### Events 变更

| 原事件名 | 现在的事件名 | 触发时机 |
| --- | --- | --- |
| `step-click` | **已移除** 建议直接监听 `<li-step/>` 的 `icon-click` 事件 | 设置 `type="freedom"` 后，点击步骤图标时触发 |

## Step 步骤条的步骤

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `finish-status-icon-class` | **已移除** 建议使用组件自身类名 | 自定义 finish 状态 icon 的 class |
| `finish-status-line-class` | **已移除** 建议使用组件自身类名 | 自定义 finish 状态 line 的 class |
| `finish-status-title-class` | **已移除** 建议使用组件自身类名 | 自定义 finish 状态 title 的 class |
| `finish-status-description-class` | **已移除** 建议使用组件自身类名 | 自定义 finish 状态 description 的 class |

## StatusTag

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `size` | `size` 可选值 dense 改为 default， 默认值由 large 改为 default | 尺寸 |

## Text 文本

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `class` | 使用 `size` 替代 | 文本尺寸 |

## Card 卡片

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `title` | `header` | 标题 |
| `type` | **已移除** 使用 card 现在的 props 能够实现相应的样式 | 卡片类型 |
| `position` | **已移除** | 卡片倒角类型 |
| `collapsable` | **已移除** 使用 LiUI Pro Next 中的 `li-pro-card` 组件 | 是否可展开收起 |
| `open` | **已移除** 迁移至 LiUI Pro Next 中的 `li-pro-card` 组件 | 是否展开 |
| `subtitle` | **已移除** 迁移至 LiUI Pro Next 中的 `li-pro-card` 组件 | 子标题 |
| `use-title-collapse` | **已移除** 参见 LiUI Pro Next 中 `li-pro-card` 组件的 `trigger-area` 属性 | 折叠卡片标题是否可点击收起 |
| `visible-change` | **已移除** 迁移至 LiUI Pro Next 中的 `li-pro-card` 组件 | 点击展开收起时触发 |

### Events 变更

| 原事件名 | 现在的事件名 | 触发时机 |
| --- | --- | --- |
| `visible-change` | **已移除** | 点击展开收起时触发 |

## Image 图片

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `hide-on-click-modal` | **已移除**，建议使用 LiUI Pro Next 中预览图片的方法 | 当开启图片预览功能时，是否可以通过点击遮罩层关闭 preview |
| `preview-src-list` | **已移除**，建议使用 LiUI Pro Next 中预览图片的方法 | 开启图片预览功能 |
| `initial-index` | **已移除**，建议使用 LiUI Pro Next 中预览图片的方法 | 初始预览图像索引，小于 `url-list` 的长度 |
| `close-on-press-escape` | **已移除**，建议使用 LiUI Pro Next 中预览图片的方法 | 是否可以通过按下 ESC 关闭 Image Viewer |
| `preview-teleported` | **已移除**，建议使用 LiUI Pro Next 中预览图片的方法 | image-viewer 是否插入至 body 元素上。 |
| `lazy` | **已移除**，建议使用 `loading="lazy"` | 是否使用懒加载。 |

## Select 选择器

### Props 变更

| 原 props | 现在的 props | 用途 |
| --- | --- | --- |
| `pageable` | **已移除**，使用新的 props: pager 是否传递来控制是否分页 | 是否开启分页功能 |
| `pageSize` | **已移除**，使用新的 props: pager 为 number 类型时控制 | 同步分页的每页数量 |
| `async` | **已移除**，使用新的 props: pager 为 function 类型时控制 | 控制是否异步，并控制是否展示加载按钮 |
| `asyncLoading` | **已移除**，内部控制 | 加载按钮是否是 loading 状态 |

### Events 变更

| 原事件名 | 现在的事件名 | 触发时机 |
| --- | --- | --- |
| `loadMoreCallback` | **已移除** 使用新的 props: pager 为 function 类型，传递方法控制加载更多的逻辑 | 点击加载更多按钮时需要执行的回调方法 |

最后修改日期： 2025-07-15
