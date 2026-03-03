# Anchor 锚点

Maintainer: 陈尚书

1. [基础用法](#基础用法)
2. [指定容器锚点](#指定容器锚点)
3. [多级锚点](#多级锚点)
4. [折叠锚点](#折叠锚点)
5. [右侧锚点](#右侧锚点)
6. [Anchor API](#anchor-api)
   1. [Anchor Attributes](#anchor-attributes)
   2. [AnchorItem Attributes](#anchoritem-attributes)
   3. [Anchor Events](#anchor-events)

页面内的超级链接，用于跳转到页面内指定位置。

### 基础用法

适用广泛的基础用法。

见右侧中部浮动内容

基础用法

指定容器锚点

多级锚点

折叠锚点

```
<template>
  <div class="anchor-demo is-sticky">
    见右侧中部浮动内容
    <li-anchor @click="handleClick">
      <li-anchor-item href="#基础用法" title="基础用法" />
      <li-anchor-item href="#指定容器锚点" title="指定容器锚点" />
      <li-anchor-item href="#多级锚点" title="多级锚点" />
      <li-anchor-item href="#折叠锚点" title="折叠锚点" />
    </li-anchor>
  </div>
</template>
<script setup lang="ts">
function handleClick({ e, href, title }) {
  console.log('click', href, title);
}
</script>

<style>
.anchor-demo.is-sticky .li-anchor {
  position: fixed;
  z-index: 9999;
  top: 400px;
  right: 80px;

  background-color: var(--li-color-on-dark-900);
}

@media screen and (width <= 1439px) {
  .anchor-demo.is-sticky .li-anchor {
    top: 100px;
    right: 0;
  }
}
</style>
```

### 指定容器锚点

配置 `container` 设置指定容器，若您的滚动容器不为 window / document / body，则需要设置 container。建议使用 id 获取 container。

如果配合 li-scrollbar 使用，则需指定到内部的 `.li-scrollbar__wrap` 容器。例如：`container="#li-scrollbar .li-scrollbar__wrap"`。

anchor-1

复杂内容的复杂标题复杂内容的复杂标题

anchor-3

anchor-4

anchor-content-1

anchor-content-2

anchor-content-3

anchor-content-4

anchor-content-5

anchor-content-6

```
<template>
  <div class="anchor-demo anchor-container-demo">
    <li-anchor container="#anchor-container" @click="handleClick">
      <li-anchor-item href="#anchor-demo-1" title="anchor-1" />
      <li-anchor-item href="#anchor-demo-2" title="复杂内容的复杂标题复杂内容的复杂标题" />
      <li-anchor-item href="#anchor-demo-3" title="anchor-3" />
      <li-anchor-item href="#anchor-demo-4" title="anchor-4" />
    </li-anchor>
    <div id="anchor-container" class="anchor-demo-content">
      <div id="anchor-demo-1" class="anchor-content-1">anchor-content-1</div>
      <div id="anchor-demo-2" class="anchor-content-2">anchor-content-2</div>
      <div id="anchor-demo-3" class="anchor-content-3">anchor-content-3</div>
      <div id="anchor-demo-4" class="anchor-content-4">anchor-content-4</div>
      <div id="anchor-demo-5" class="anchor-content-5">anchor-content-5</div>
      <div id="anchor-demo-6" class="anchor-content-6">anchor-content-6</div>
    </div>
  </div>
</template>
<script setup lang="ts">
function handleClick({ e, href, title }) {
  console.log('click', href, title, e);
}
</script>
<style lang="scss">
.anchor-container-demo {
  display: flex;

  .anchor-demo-content {
    overflow: auto;
    flex-grow: 1;
    height: 200px;
    margin-left: 16px;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      min-height: 80px;
      padding-left: 16px;

      font-size: 22px;
    }

    @each $index in 1, 2, 3, 4, 5, 6, 7 {
      .anchor-content-#{$index} {
        background: var(--li-color-brand-#{$index}00);
      }
    }
  }
}
</style>
```

### 多级锚点

锚点内含有层级关系。适用锚点内含有父子级关系时，属于页面结构复杂的场景。

content-1

sub-1

sub-2

sub-2-1

sub-2-2

content-2

content-3

content-4

content-1

sub-1

sub-2

sub-2-1

sub-2-2

content-2

content-3

content-4

content-5

content-6

content-7

```
<template>
  <div class="anchor-demo anchor-container-demo">
    <li-anchor container="#anchor-nested" @click="handleClick">
      <li-anchor-item href="#nested-1" title="content-1">
        <li-anchor-item href="#nested-sub-1" title="sub-1" />
        <li-anchor-item href="#nested-sub-2" title="sub-2">
          <li-anchor-item href="#nested-sub-2-1" title="sub-2-1" />
          <li-anchor-item href="#nested-sub-2-2" title="sub-2-2" />
        </li-anchor-item>
      </li-anchor-item>
      <li-anchor-item href="#nested-2" title="content-2" />
      <li-anchor-item href="#nested-3" title="content-3" />
      <li-anchor-item href="#nested-4" title="content-4" />
    </li-anchor>

    <div id="anchor-nested" class="anchor-demo-content" style="height: 300px">
      <div id="nested-1" class="anchor-content-1">
        content-1
        <div id="nested-sub-1" class="anchor-sub-1">sub-1</div>
        <div id="nested-sub-2" class="anchor-sub-2">
          sub-2
          <div id="nested-sub-2-1" class="anchor-sub-2-1">sub-2-1</div>
          <div id="nested-sub-2-2" class="anchor-sub-2-2">sub-2-2</div>
        </div>
      </div>
      <div id="nested-2" class="anchor-content-2">content-2</div>
      <div id="nested-3" class="anchor-content-3">content-3</div>
      <div id="nested-4" class="anchor-content-4">content-4</div>
      <div id="nested-5" class="anchor-content-5">content-5</div>
      <div id="nested-6" class="anchor-content-6">content-6</div>
      <div id="nested-7" class="anchor-content-7">content-7</div>
    </div>
  </div>
</template>
<script setup lang="ts">
function handleClick({ e, href, title }) {
  console.log('click', href, title);
}
</script>
```

### 折叠锚点

配置折叠和头部。

目录

content-1

sub-1

sub-2

sub-2-1

sub-2-2

content-2

content-3

content-4

content-1

sub-1

sub-2

sub-2-1

sub-2-2

content-2

content-3

content-4

content-5

content-6

content-7

```
<template>
  <div class="anchor-demo anchor-container-demo">
    <li-anchor name="目录" collapsible container="#anchor-collapse" @click="handleClick" @collapse="handleCollapse">
      <li-anchor-item href="#collapse-1" title="content-1">
        <li-anchor-item href="#collapse-sub-1" title="sub-1" />
        <li-anchor-item href="#collapse-sub-2" title="sub-2">
          <li-anchor-item href="#collapse-sub-2-1" title="sub-2-1" />
          <li-anchor-item href="#collapse-sub-2-2" title="sub-2-2" />
        </li-anchor-item>
      </li-anchor-item>
      <li-anchor-item href="#collapse-2" title="content-2" />
      <li-anchor-item href="#collapse-3" title="content-3" />
      <li-anchor-item href="#collapse-4" title="content-4" />
    </li-anchor>

    <div id="anchor-collapse" class="anchor-demo-content" style="height: 300px">
      <div id="collapse-1" class="anchor-content-1">
        content-1
        <div id="collapse-sub-1" class="anchor-sub-1">sub-1</div>
        <div id="collapse-sub-2" class="anchor-sub-2">
          sub-2
          <div id="collapse-sub-2-1" class="anchor-sub-2-1">sub-2-1</div>
          <div id="collapse-sub-2-2" class="anchor-sub-2-2">sub-2-2</div>
        </div>
      </div>
      <div id="collapse-2" class="anchor-content-2">content-2</div>
      <div id="collapse-3" class="anchor-content-3">content-3</div>
      <div id="collapse-4" class="anchor-content-4">content-4</div>
      <div id="collapse-5" class="anchor-content-5">content-5</div>
      <div id="collapse-6" class="anchor-content-6">content-6</div>
      <div id="collapse-7" class="anchor-content-7">content-7</div>
    </div>
  </div>
</template>
<script setup lang="ts">
function handleClick({ e, href, title }) {
  console.log('click', href, title);
}
function handleCollapse(val) {
  console.log('collapse', val);
}
</script>

<style lang="scss">
.anchor-demo-content {
  .anchor-sub-1 {
    background-color: var(--li-color-warning-a300);
  }

  .anchor-sub-2 {
    background-color: var(--li-color-warning-a400);
  }

  .anchor-sub-2-1 {
    background-color: var(--li-color-error-a300);
  }

  .anchor-sub-2-2 {
    background-color: var(--li-color-error-a400);
  }
}
</style>
```

### 右侧锚点

设置 position 改变左右锚点对应的折叠样式。

目录

content-1

sub-1

sub-2

sub-2-1

sub-2-2

content-2

content-3

content-4

content-1

sub-1

sub-2

sub-2-1

sub-2-2

content-2

content-3

content-4

content-5

content-6

content-7

```
<template>
  <div class="anchor-demo anchor-container-demo" style="display: flex; justify-content: flex-end">
    <li-anchor name="目录" collapsible position="right" container="#anchor-position" @click="handleClick">
      <li-anchor-item href="#position-1" title="content-1">
        <li-anchor-item href="#position-sub-1" title="sub-1" />
        <li-anchor-item href="#position-sub-2" title="sub-2">
          <li-anchor-item href="#position-sub-2-1" title="sub-2-1" />
          <li-anchor-item href="#position-sub-2-2" title="sub-2-2" />
        </li-anchor-item>
      </li-anchor-item>
      <li-anchor-item href="#position-2" title="content-2" />
      <li-anchor-item href="#position-3" title="content-3" />
      <li-anchor-item href="#position-4" title="content-4" />
    </li-anchor>

    <div id="anchor-position" class="anchor-demo-content" style="height: 300px">
      <div id="position-1" class="anchor-content-1">
        content-1
        <div id="position-sub-1" class="anchor-sub-1">sub-1</div>
        <div id="position-sub-2" class="anchor-sub-2">
          sub-2
          <div id="position-sub-2-1" class="anchor-sub-2-1">sub-2-1</div>
          <div id="position-sub-2-2" class="anchor-sub-2-2">sub-2-2</div>
        </div>
      </div>
      <div id="position-2" class="anchor-content-2">content-2</div>
      <div id="position-3" class="anchor-content-3">content-3</div>
      <div id="position-4" class="anchor-content-4">content-4</div>
      <div id="position-5" class="anchor-content-5">content-5</div>
      <div id="position-6" class="anchor-content-6">content-6</div>
      <div id="position-7" class="anchor-content-7">content-7</div>
    </div>
  </div>
</template>
<script setup lang="ts">
function handleClick({ e, href, title }) {
  console.log('click', href, title);
}
</script>
```

## Anchor API

### Anchor Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| container | 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。 | string / function | - | window |
| bounds | 锚点区域边界 | number | - | 5 |
| target-offset | 锚点滚动偏移量 | number | - | 0 |
| name | 锚点顶部标题 | string | - | - |
| collapsible | 是否可折叠 | boolean | - | false |
| default-collapse | 是否默认折起 | boolean | - | false |
| position | 锚点位置(不同位置折叠样式不同) | string | left / right | left |

### AnchorItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 锚点名称 | string | - | - |
| href | 必需。锚点链接，同 `<a>` 标签，如果是 hash 模式需要加上当前 path | string | - | - |
| target | 页面目标，同 `<a>` 标签 | string | \_self / \_blank / \_parent / \_top | \_self |

### Anchor Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 锚点改变时触发 | `(currentLink: string, prevLink: string)` |
| click | 锚点被点击时触发 | `(link: { href: string; title: string; e: MouseEvent })` |
| collapse | 锚点折叠改变时触发 | `(collapse： boolean)` |

最后修改日期： 2025-07-15
