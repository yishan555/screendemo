# StatusTag

Maintainer: 刘振兴

1. [基础用法](#基础用法)
2. [Size](#size)
3. [StatusTag API](#statustag-api)
   1. [StatusTag Props](#statustag-props)
   2. [StatusTag Slots](#statustag-slots)

## 基础用法

状态

品牌

正常

成功

警告

错误

```
<template>
  <div class="demo-status-tag">
    <li-status-tag>状态</li-status-tag>
    <li-status-tag type="primary">品牌</li-status-tag>
    <li-status-tag type="normal">正常</li-status-tag>
    <li-status-tag type="success">成功</li-status-tag>
    <li-status-tag type="warning">警告</li-status-tag>
    <li-status-tag type="danger">错误</li-status-tag>
  </div>
</template>

<style>
.demo-status-tag {
  display: flex;
  margin: 16px 0;
}

.li-status-tag + .li-status-tag {
  margin-left: 16px;
}
</style>
```

## Size

### large

状态

品牌

正常

成功

警告

错误

### default

状态

品牌

正常

成功

警告

错误

### small

状态

品牌

正常

成功

警告

错误

```
<template>
  <h3>large</h3>
  <div class="demo-status-tag">
    <li-status-tag size="large">状态</li-status-tag>
    <li-status-tag size="large" type="primary">品牌</li-status-tag>
    <li-status-tag size="large" type="normal">正常</li-status-tag>
    <li-status-tag size="large" type="success">成功</li-status-tag>
    <li-status-tag size="large" type="warning">警告</li-status-tag>
    <li-status-tag size="large" type="danger">错误</li-status-tag>
  </div>

  <h3>default</h3>
  <div class="demo-status-tag">
    <li-status-tag>状态</li-status-tag>
    <li-status-tag type="primary">品牌</li-status-tag>
    <li-status-tag type="normal">正常</li-status-tag>
    <li-status-tag type="success">成功</li-status-tag>
    <li-status-tag type="warning">警告</li-status-tag>
    <li-status-tag type="danger">错误</li-status-tag>
  </div>

  <h3>small</h3>
  <div class="demo-status-tag">
    <li-status-tag size="small">状态</li-status-tag>
    <li-status-tag size="small" type="primary">品牌</li-status-tag>
    <li-status-tag size="small" type="normal">正常</li-status-tag>
    <li-status-tag size="small" type="success">成功</li-status-tag>
    <li-status-tag size="small" type="warning">警告</li-status-tag>
    <li-status-tag size="small" type="danger">错误</li-status-tag>
  </div>
</template>

<style>
.demo-status-tag {
  display: flex;
  margin: 16px 0;
}

.li-status-tag + .li-status-tag {
  margin-left: 16px;
}
</style>
```

## StatusTag API

### StatusTag Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `string` 'info' | 'primary' | 'normal' | 'success' | 'warning' | 'danger' | info |
| size | 尺寸 | `string` 'large' | 'default' | 'small' | default |

### StatusTag Slots

| 名称 | 说明 |
| --- | --- |
| - | 状态标签后的内容 |

最后修改日期： 2025-07-15
