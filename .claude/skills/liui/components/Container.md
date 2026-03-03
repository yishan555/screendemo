# Container 布局容器

Maintainer: 陈尚书

1. [常见页面布局](#常见页面布局)
2. [例子](#例子)
3. [Container API](#container-api)
   1. [Container Props](#container-props)
   2. [Container Slots](#container-slots)
4. [Header API](#header-api)
   1. [Header Props](#header-props)
   2. [Header Slots](#header-slots)
5. [Aside API](#aside-api)
   1. [Aside Props](#aside-props)
   2. [Aside Slots](#aside-slots)
6. [Main API](#main-api)
   1. [Main Slots](#main-slots)
7. [Footer API](#footer-api)
   1. [Footer Props](#footer-props)
   2. [Footer Slots](#footer-slots)

用于布局的容器组件，方便快速搭建页面的基本结构：

`<li-container>`：外层容器。 当子元素中包含 `<li-header>` 或 `<li-footer>` 时，全部子元素会垂直上下排列， 否则会水平左右排列。

`<li-header>`：顶栏容器。

`<li-aside>`：侧边栏容器。

`<li-main>`：主要区域容器。

`<li-footer>`：底栏容器。

TIP

以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， `<li-container>`的直接子元素必须是后四个组件中的一个或多个。 后四个组件的亲元素必须是一个 `<li-container>`

## 常见页面布局

HeaderMain

```
<template>
  <div class="common-layout">
    <li-container>
      <li-header>Header</li-header>
      <li-main>Main</li-main>
    </li-container>
  </div>
</template>
```

HeaderMainFooter

```
<template>
  <div class="common-layout">
    <li-container>
      <li-header>Header</li-header>
      <li-main>Main</li-main>
      <li-footer>Footer</li-footer>
    </li-container>
  </div>
</template>
```

AsideMain

```
<template>
  <div class="common-layout">
    <li-container>
      <li-aside width="200px">Aside</li-aside>
      <li-main>Main</li-main>
    </li-container>
  </div>
</template>
```

Header

AsideMain

```
<template>
  <div class="common-layout">
    <li-container>
      <li-header>Header</li-header>
      <li-container>
        <li-aside width="200px">Aside</li-aside>
        <li-main>Main</li-main>
      </li-container>
    </li-container>
  </div>
</template>
```

Header

Aside

MainFooter

```
<template>
  <div class="common-layout">
    <li-container>
      <li-header>Header</li-header>
      <li-container>
        <li-aside width="200px">Aside</li-aside>
        <li-container>
          <li-main>Main</li-main>
          <li-footer>Footer</li-footer>
        </li-container>
      </li-container>
    </li-container>
  </div>
</template>
```

Aside

HeaderMain

```
<template>
  <div class="common-layout">
    <li-container>
      <li-aside width="200px">Aside</li-aside>
      <li-container>
        <li-header>Header</li-header>
        <li-main>Main</li-main>
      </li-container>
    </li-container>
  </div>
</template>
```

Aside

HeaderMainFooter

```
<template>
  <div class="common-layout">
    <li-container>
      <li-aside width="200px">Aside</li-aside>
      <li-container>
        <li-header>Header</li-header>
        <li-main>Main</li-main>
        <li-footer>Footer</li-footer>
      </li-container>
    </li-container>
  </div>
</template>
```

## 例子

* Navigator One

  + Group 1

    - Option 1
    - Option 2
  + Group 2

    - Option 3
  + Option4

    - Option 4-1
* Navigator Two

  + Group 1

    - Option 1
    - Option 2
  + Group 2

    - Option 3
  + Option 4

    - Option 4-1
* Navigator Three

  + Group 1

    - Option 1
    - Option 2
  + Group 2

    - Option 3
  + Option 4

    - Option 4-1

Tom

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-container class="layout-container-demo" style="height: 500px">
    <li-aside width="200px">
      <li-scrollbar>
        <li-menu :default-openeds="['1', '3']">
          <li-sub-menu index="1">
            <template #title>
              <li-icon><icon-basic-mail-o /></li-icon>Navigator One
            </template>
            <li-menu-item-group>
              <template #title>Group 1</template>
              <li-menu-item index="1-1">Option 1</li-menu-item>
              <li-menu-item index="1-2">Option 2</li-menu-item>
            </li-menu-item-group>
            <li-menu-item-group title="Group 2">
              <li-menu-item index="1-3">Option 3</li-menu-item>
            </li-menu-item-group>
            <li-sub-menu index="1-4">
              <template #title>Option4</template>
              <li-menu-item index="1-4-1">Option 4-1</li-menu-item>
            </li-sub-menu>
          </li-sub-menu>
          <li-sub-menu index="2">
            <template #title>
              <li-icon><icon-other-map-o /></li-icon>Navigator Two
            </template>
            <li-menu-item-group>
              <template #title>Group 1</template>
              <li-menu-item index="2-1">Option 1</li-menu-item>
              <li-menu-item index="2-2">Option 2</li-menu-item>
            </li-menu-item-group>
            <li-menu-item-group title="Group 2">
              <li-menu-item index="2-3">Option 3</li-menu-item>
            </li-menu-item-group>
            <li-sub-menu index="2-4">
              <template #title>Option 4</template>
              <li-menu-item index="2-4-1">Option 4-1</li-menu-item>
            </li-sub-menu>
          </li-sub-menu>
          <li-sub-menu index="3">
            <template #title>
              <li-icon><icon-basic-settings-o /></li-icon>Navigator Three
            </template>
            <li-menu-item-group>
              <template #title>Group 1</template>
              <li-menu-item index="3-1">Option 1</li-menu-item>
              <li-menu-item index="3-2">Option 2</li-menu-item>
            </li-menu-item-group>
            <li-menu-item-group title="Group 2">
              <li-menu-item index="3-3">Option 3</li-menu-item>
            </li-menu-item-group>
            <li-sub-menu index="3-4">
              <template #title>Option 4</template>
              <li-menu-item index="3-4-1">Option 4-1</li-menu-item>
            </li-sub-menu>
          </li-sub-menu>
        </li-menu>
      </li-scrollbar>
    </li-aside>

    <li-container>
      <li-header style="font-size: 12px; text-align: right">
        <div class="toolbar">
          <li-dropdown>
            <li-icon style="margin-top: 1px; margin-right: 8px"><icon-basic-settings-o /></li-icon>
            <template #dropdown>
              <li-dropdown-menu>
                <li-dropdown-item>View</li-dropdown-item>
                <li-dropdown-item>Add</li-dropdown-item>
                <li-dropdown-item>Delete</li-dropdown-item>
              </li-dropdown-menu>
            </template>
          </li-dropdown>
          <span>Tom</span>
        </div>
      </li-header>

      <li-main>
        <li-scrollbar>
          <li-table :data="tableData">
            <li-table-column prop="date" label="Date" width="140" />
            <li-table-column prop="name" label="Name" width="120" />
            <li-table-column prop="address" label="Address" />
          </li-table>
        </li-scrollbar>
      </li-main>
    </li-container>
  </li-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconBasicMailO, IconBasicSettingsO, IconOtherMapO } from '@chehejia/liui-icons';

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>
<style lang="scss">
@import url('common-layout.scss');
</style>

<style scoped>
.layout-container-demo .li-header {
  position: relative;
  color: var(--li-text-color-primary);
  background-color: var(--li-color-brand-a200);
}

.layout-container-demo .li-aside {
  color: var(--li-text-color-primary);
  background: var(--li-color-brand-a300);
}

.layout-container-demo .li-menu {
  border-right: none;
}

.layout-container-demo .li-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  right: 20px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 100%;
}
</style>
```

## Container API

### Container Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 子元素的排列方向 | `enum` 'horizontal' | 'vertical' | 子元素中有 `li-header` 或 `li-footer` 时为 vertical，否则为 horizontal |

### Container Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| default | 自定义默认内容 | Container / Header / Aside / Main / Footer |

## Header API

### Header Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 顶栏高度 | `string` | 60px |

### Header Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

## Aside API

### Aside Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 侧边栏宽度 | `string` | 300px |

### Aside Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

## Main API

### Main Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

## Footer API

### Footer Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 底栏高度 | `string` | 60px |

### Footer Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

最后修改日期： 2025-07-15
