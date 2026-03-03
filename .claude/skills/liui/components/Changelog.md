# 更新日志

1. [v2.2.17 2025-11-26](#v2-2-17-2025-11-26)
2. [v2.2.16 2025-11-19](#v2-2-16-2025-11-19)
3. [v2.2.15 2025-11-18](#v2-2-15-2025-11-18)
4. [v2.2.14 2025-10-20](#v2-2-14-2025-10-20)
5. [v2.2.13 2025-10-20](#v2-2-13-2025-10-20)
6. [v2.2.12 2025-5-19](#v2-2-12-2025-5-19)
7. [v2.2.11 2025-3-25](#v2-2-11-2025-3-25)
8. [v2.2.10 2025-2-10](#v2-2-10-2025-2-10)
9. [v2.2.9 2025-1-3](#v2-2-9-2025-1-3)
10. [v2.2.8 2024-12-30](#v2-2-8-2024-12-30)
11. [v2.2.7 2024-12-27](#v2-2-7-2024-12-27)
12. [v2.2.6 2024-12-12](#v2-2-6-2024-12-12)
13. [v2.2.5 2024-11-29](#v2-2-5-2024-11-29)
14. [v2.2.4 2024-11-13](#v2-2-4-2024-11-13)
15. [v2.2.3 2024-09-24](#v2-2-3-2024-09-24)
16. [v2.2.2 2024-09-13](#v2-2-2-2024-09-13)
17. [v2.2.1 2024-09-11](#v2-2-1-2024-09-11)
18. [v2.2.0 2024-09-05](#v2-2-0-2024-09-05)
19. [v2.1.8 2024-08-14](#v2-1-8-2024-08-14)
20. [v2.1.7 2024-08-08](#v2-1-7-2024-08-08)
21. [v2.1.6 2024-08-06](#v2-1-6-2024-08-06)
22. [v2.1.5 2024-07-22](#v2-1-5-2024-07-22)
23. [v2.1.4 2024-06-07](#v2-1-4-2024-06-07)
24. [v2.1.3 2024-05-24](#v2-1-3-2024-05-24)
25. [v2.1.2 2024-05-23](#v2-1-2-2024-05-23)
26. [v2.1.1 2024-01-29](#v2-1-1-2024-01-29)
27. [v2.0.3 2024-01-22](#v2-0-3-2024-01-22)
28. [v2.0.1 2024-01-04](#v2-0-1-2024-01-04)
29. [v2.0.0 Breaking Change 2023-12-13](#v2-0-0-breaking-change-2023-12-13)
30. [v1.0.9 2023-11-03](#v1-0-9-2023-11-03)
31. [v1.0.8 2023-09-12](#v1-0-8-2023-09-12)
32. [v1.0.7 2023-09-08](#v1-0-7-2023-09-08)
33. [v1.0.6 2023-08-24](#v1-0-6-2023-08-24)
34. [v1.0.5 2023-08-10](#v1-0-5-2023-08-10)
35. [v1.0.4 2023-08-03](#v1-0-4-2023-08-03)
36. [v1.0.3 2023-07-19](#v1-0-3-2023-07-19)
37. [v1.0.2 2023-07-19](#v1-0-2-2023-07-19)
38. [v1.0.1 2023-07-05](#v1-0-1-2023-07-05)
39. [v1.0.0 2023-07-03](#v1-0-0-2023-07-03)

[更新日志 Changelog 规范](https://li.feishu.cn/wiki/PwIAw6ebWi5p2MkdwpxciYNpnZc#RIegdKW0ooKKqmxkibPcBfa5n9V)

## v2.2.17 2025-11-26

`🚀 Features`

* `Licium` 字体添加 `font-display: swap` 属性

## v2.2.16 2025-11-19

`🐞 Bug Fixes`

* 修复 `Table` `clearFilter` 方法入参类型不准确问题

## v2.2.15 2025-11-18

`🐞 Bug Fixes`

* 修复 `Table Column` 开启 `:filter-multiple="false"` 单选筛选时下拉选项颜色及背景色错误的问题

## v2.2.14 2025-10-20

* Unknown commit 79c5da993d73eca9c261863b26eaa85874cac579

## v2.2.13 2025-10-20

`🐞 Bug Fixes`

* Fix date range

## v2.2.12 2025-5-19

`🐞 Bug Fixes`

* 修复 `Icon` 样式可能重复引入导致覆盖的问题

## v2.2.11 2025-3-25

`🚀 Features`

* `Alert` 组件支持自定义图标

## v2.2.10 2025-2-10

`🐞 Bug Fixes`

* `Select` 开启 `teleported` 时，下拉框使用 `fixed` 定位，避免在微前端中定位不准确的问题
* `Cascader` 开启 `teleported` 时，下拉框使用 `fixed` 定位，避免在微前端中定位不准确的问题

## v2.2.9 2025-1-3

`🐞 Bug Fixes`

* 修复 `Radio` 在表单中的样式问题
* 修复 `Input Number`
  + 更新值问题
  + 滚动事件问题
  + firefox 浏览器兼容问题
  + aria-valuenow 赋值处理问题

## v2.2.8 2024-12-30

`🚀 Features`

* `Date Picker` 支持 gggg 周格式化

## v2.2.7 2024-12-27

`🚀 Features`

* 调整 `Radio` 及 `Checkbox` 组件，对齐表单样式

## v2.2.6 2024-12-12

`🐞 Bug Fixes`

* 修复 `Drawer` 组件在呼出情况下不能聚焦外部input的问题。

## v2.2.5 2024-11-29

`🐞 Bug Fixes`

* 修复 `Input` 组件在 `type=textarea` 时，`useCursor` 内使用的 `ref` 可能为 `null` 的问题

## v2.2.4 2024-11-13

`🚀 Features`

* 调整 `Input` type=textarea 时默认最小计算高度与 type=text size=small 时一致

`🐞 Bug Fixes`

* 修复 `Select` 组件设置 tag-props 时存在的 Ts 类型报错问题

## v2.2.3 2024-09-24

`🚀 Features`

* `FormItem` 组件支持设置 `tooltip-effect`

`🐞 Bug Fixes`

* 修复 `TabPane` 设置为 active 时， hover 颜色问题

## v2.2.2 2024-09-13

`🐞 Bug Fixes`

* 修复 `TabPane` 设置为 disabled 时， hover 颜色问题

## v2.2.1 2024-09-11

`🐞 Bug Fixes`

* 修复 `LiTableColumn` 开启 `show-overflow-tooltip` 后，tooltip 在微前端子应用内定位不准的问题

## v2.2.0 2024-09-05

`🚀 Features`

* `Cascader` 组件的 `modelValue` 支持 `BigInt` 类型

## v2.1.8 2024-08-14

`🐞 Bug Fixes`

* 修复 `MessageBox` icon 样式问题
* 修复 `FormItem` content 文字大小问题

## v2.1.7 2024-08-08

`🚀 Features`

* 修改 `Form` 组件必填校验默认提示为 “请填写{label}”

## v2.1.6 2024-08-06

`🐞 Bug Fixes`

* 修复 `Tabs` 组件 card 风格在网页缩放时的样式问题

## v2.1.5 2024-07-22

`🐞 Bug Fixes`

* 修复 `OverflowList` 方向和表格失效的问题

## v2.1.4 2024-06-07

`🚀 Features`

* `Tag` 默认关闭动画

`🐞 Bug Fixes`

* 修复 `Input` hover 覆盖 active 样式的问题

## v2.1.3 2024-05-24

`🚀 Features`

* `Cascader` 添加当前路径高亮
* `Form` 组件对外暴露 fields 字段

## v2.1.2 2024-05-23

`🚀 Features`

* `OverflowList` 增加 maxVisibleItems 支持
* `Upload` 增加配置项是否使用上传动画

## v2.1.1 2024-01-29

`🐞 Bug Fixes`

* 修复 `Form` 表单 top 布局时,required 的样式过高的问题

## v2.0.3 2024-01-22

`🚀 Features`

* `upload` 组件增加 `hide-trigger-on-disabled`

`🐞 Bug Fixes`

* 修复 `carousel-item` 样式无效问题
* 修复 `dist/index.css` 内对字体文件的本地应用路径无效问题

`📄 Docs`

* 添加 `cascader` 超长使用示例

## v2.0.1 2024-01-04

`🐞 Bug Fixes`

* 修复 `Loading` 组件在非 service 模式下的 z-index 层级问题
* 纠正 `Overlay` `Popper` 组件 style 中的默认 z-index

## v2.0.0 Breaking Change 2023-12-13

`🚀 Features`

* 代码侧重构，完成依赖升级，支持更高版本 node
* 按照 [z-index 管理规范](https://li.feishu.cn/docx/KJdRdOMCVoxjv4xsLQ2cie47nMe) 重构 z-index
* 更新 `Popper` 最大宽度到 600px
* `Select` 增加远程搜索及选项分页场景
* 统一 `Cascader` clear 图标

`🐞 Bug Fixes`

* 修复 `Collection` render 问题

## v1.0.9 2023-11-03

`🚀 Features`

* `Autocomplete` 增加控制触发 suggestions 下拉框展示的时机的方法
* `Select` 增加自适应宽度的 tag 展示
* 添加 `Message` css 手动导入提示

`🐞 Bug Fixes`

* 修复 `Popper` 组件在 dom 意外销毁时无法重建而报错的问题

## v1.0.8 2023-09-12

`🚀 Features`

* 导出 `Dialog` 对话框组件 `DialogInstance` type
* `Dropdown` 下拉框组件添加 `append-to` props

## v1.0.7 2023-09-08

`🚀 Features`

* 组件 `date-picker` 支持半年选择
* 添加开发时站点与组件库的关联(hmr)
* 增加 ci 发布 beta 版功能

`🐞 Bug Fixes`

* 修改 `autocomplete` 样式的引用
* `message`、`message-box` 、`notification` demo 中的 button 样式修复

## v1.0.6 2023-08-24

`🐞 Bug Fixes`

* 修复 `Cascader` 级联组件任一级选择时选择节点不触发懒加载的问题

## v1.0.5 2023-08-10

`🚀 Features`

* 增加 `Overflow List` 折叠列表组件
* `Cascader` 级联组件增加 focus 方法

`🐞 Bug Fixes`

* 修改 `Tree` 树形组件的引入逻辑

## v1.0.4 2023-08-03

`🚀 Features`

* `Select` 添加 `alwaysDisplayTagsTooltip` 属性配置展开下拉框时是否展示 tags 的 toolTip

## v1.0.3 2023-07-19

`🐞 Bug Fixes`

* gulpfile: 产物 css 引用本地字体文件路径修复

## v1.0.2 2023-07-19

`🚀 Features`

* `Cascader` 添加 max-collapse-tags 属性控制 tag 显示数量
* `Select` 添加自定义已选标签渲染

`🐞 Bug Fixes`

* `Input` 复合型输入框中按钮的 hover 样式被覆盖的问题

## v1.0.1 2023-07-05

`🐞 Bug Fixes`

* 补充缺失的字体文件：LiciumFont2022-Normal

## v1.0.0 2023-07-03

Initial release

最后修改日期： 2025-11-26
