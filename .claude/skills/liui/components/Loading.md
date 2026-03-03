# Loading 加载

Maintainer: 孙庞渝

1. [区域加载](#区域加载)
2. [自定义加载中组件内容](#自定义加载中组件内容)
3. [让加载组件铺满整个屏幕](#让加载组件铺满整个屏幕)
4. [以服务的方式来调用](#以服务的方式来调用)
5. [Loading](#loading)
   1. [Loading Props](#loading-props)
   2. [Loading Directives](#loading-directives)

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。

LiUI 提供了两种调用 Loading 的方法：指令和服务。 对于自定义指令 `v-loading`，只需要绑定 `boolean` 值即可。 默认状况下，Loading 遮罩会插入到绑定元素的子节点。 通过添加 `body` 修饰符，可以使遮罩插入至 Dom 中的 body 上。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-02 | John Smith | No.1518, Jinshajiang Road, Putuo District |
| 2016-05-04 | John Smith | No.1518, Jinshajiang Road, Putuo District |
| 2016-05-01 | John Smith | No.1518, Jinshajiang Road, Putuo District |

```
<template>
  <li-table v-loading="loading" :data="tableData" style="width: 100%">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);

const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
];
</script>

<style>
body {
  margin: 0;
}

.example-showcase .li-loading-mask {
  z-index: 9;
}
</style>
```

## 自定义加载中组件内容

你可以自定义加载中组件的文字，图标，以及背景颜色。

在绑定了`v-loading`指令的元素上添加`li-loading-text`属性，其值会被渲染为加载文案，并显示在加载图标的下方。 类似地，`li-loading-spinner`、`li-loading-background` 和 `li-loading-svg` 属性分别用来设定 svg 图标、背景色值、加载图标。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-02 | John Smith | No.1518, Jinshajiang Road, Putuo District |
| 2016-05-04 | John Smith | No.1518, Jinshajiang Road, Putuo District |
| 2016-05-01 | John Smith | No.1518, Jinshajiang Road, Putuo District |

拼命加载中...

```
<template>
  <li-table
    v-loading="loading"
    li-loading-text="拼命加载中..."
    :li-loading-spinner="svg"
    li-loading-custom-class="custom-loading-svg"
    li-loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    style="width: 100%"
  >
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);
const svg = `
  <path d="M8 1C7.72386 1 7.5 1.22386 7.5 1.5V4.5C7.5 4.77614 7.72386 5 8 5C8.27614 5 8.5 4.77614 8.5 4.5V1.5C8.5 1.22386 8.27614 1 8 1Z" fill="currentColor"></path>
  <path d="M8 11C7.72386 11 7.5 11.2239 7.5 11.5V14.5C7.5 14.7761 7.72386 15 8 15C8.27614 15 8.5 14.7761 8.5 14.5V11.5C8.5 11.2239 8.27614 11 8 11Z" fill="currentColor"></path>
  <path d="M15 8C15 7.72386 14.7761 7.5 14.5 7.5H11.5C11.2239 7.5 11 7.72386 11 8C11 8.27614 11.2239 8.5 11.5 8.5H14.5C14.7761 8.5 15 8.27614 15 8Z" fill="currentColor"></path>
  <path d="M5 8C5 7.72386 4.77614 7.5 4.5 7.5H1.5C1.22386 7.5 1 7.72386 1 8C1 8.27614 1.22386 8.5 1.5 8.5H4.5C4.77614 8.5 5 8.27614 5 8Z" fill="currentColor"></path>
  <path d="M12.9497 3.05021C12.7545 2.85495 12.4379 2.85495 12.2426 3.05021L10.1213 5.17153C9.92606 5.36679 9.92606 5.68338 10.1213 5.87864C10.3166 6.0739 10.6332 6.0739 10.8284 5.87864L12.9497 3.75732C13.145 3.56206 13.145 3.24547 12.9497 3.05021Z" fill="currentColor"></path>
  <path d="M5.87868 10.1213C5.68342 9.92602 5.36684 9.92602 5.17157 10.1213L3.05025 12.2426C2.85499 12.4379 2.85499 12.7544 3.05025 12.9497C3.24551 13.145 3.5621 13.145 3.75736 12.9497L5.87868 10.8284C6.07394 10.6331 6.07394 10.3165 5.87868 10.1213Z" fill="currentColor"></path>
  <path d="M12.9497 12.9497C13.145 12.7544 13.145 12.4379 12.9497 12.2426L10.8284 10.1213C10.6332 9.92602 10.3166 9.92602 10.1213 10.1213C9.92606 10.3165 9.92606 10.6331 10.1213 10.8284L12.2426 12.9497C12.4379 13.145 12.7545 13.145 12.9497 12.9497Z" fill="currentColor"></path>
  <path d="M5.87868 5.87864C6.07394 5.68338 6.07394 5.36679 5.87868 5.17153L3.75736 3.05021C3.5621 2.85495 3.24552 2.85495 3.05025 3.05021C2.85499 3.24547 2.85499 3.56206 3.05025 3.75732L5.17157 5.87864C5.36684 6.0739 5.68342 6.0739 5.87868 5.87864Z" fill="currentColor"></path>
      `;
const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
];
</script>
<style>
.example-showcase .li-loading-mask {
  z-index: 9;
}

.custom-loading-svg {
  color: var(--li-color-on-dark-900);
}
</style>
```

WARNING

虽然 `li-loading-spinner / li-loading-svg` 属性支持传入的 HTML 片段，但是动态在网站上渲染任意的 HTML 是非常危险的，因为很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 请确保 `li-loading-spinner / li-loading-svg`的内容是可信的， **不要**将用户提交的内容赋值给 `li-loading-spinner / li-loading-svg` 属性。

## 让加载组件铺满整个屏幕

加载数据时显示全屏动画。

当使用指令方式时，全屏遮罩需要添加`fullscreen`修饰符（遮罩会插入至 body 上） 此时若需要锁定屏幕的滚动，可以使用`lock`修饰符； 当使用服务方式时，遮罩默认即为全屏，无需额外设置。

As a directive  As a service

```
<template>
  <li-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="openFullScreen1">
    As a directive
  </li-button>
  <li-button type="primary" @click="openFullScreen2"> As a service </li-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiLoading } from '@chehejia/liui-next';

const fullscreenLoading = ref(false);
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 2000);
};
const svg = `
  <path d="M8 1C7.72386 1 7.5 1.22386 7.5 1.5V4.5C7.5 4.77614 7.72386 5 8 5C8.27614 5 8.5 4.77614 8.5 4.5V1.5C8.5 1.22386 8.27614 1 8 1Z" fill="currentColor"></path>
  <path d="M8 11C7.72386 11 7.5 11.2239 7.5 11.5V14.5C7.5 14.7761 7.72386 15 8 15C8.27614 15 8.5 14.7761 8.5 14.5V11.5C8.5 11.2239 8.27614 11 8 11Z" fill="currentColor"></path>
  <path d="M15 8C15 7.72386 14.7761 7.5 14.5 7.5H11.5C11.2239 7.5 11 7.72386 11 8C11 8.27614 11.2239 8.5 11.5 8.5H14.5C14.7761 8.5 15 8.27614 15 8Z" fill="currentColor"></path>
  <path d="M5 8C5 7.72386 4.77614 7.5 4.5 7.5H1.5C1.22386 7.5 1 7.72386 1 8C1 8.27614 1.22386 8.5 1.5 8.5H4.5C4.77614 8.5 5 8.27614 5 8Z" fill="currentColor"></path>
  <path d="M12.9497 3.05021C12.7545 2.85495 12.4379 2.85495 12.2426 3.05021L10.1213 5.17153C9.92606 5.36679 9.92606 5.68338 10.1213 5.87864C10.3166 6.0739 10.6332 6.0739 10.8284 5.87864L12.9497 3.75732C13.145 3.56206 13.145 3.24547 12.9497 3.05021Z" fill="currentColor"></path>
  <path d="M5.87868 10.1213C5.68342 9.92602 5.36684 9.92602 5.17157 10.1213L3.05025 12.2426C2.85499 12.4379 2.85499 12.7544 3.05025 12.9497C3.24551 13.145 3.5621 13.145 3.75736 12.9497L5.87868 10.8284C6.07394 10.6331 6.07394 10.3165 5.87868 10.1213Z" fill="currentColor"></path>
  <path d="M12.9497 12.9497C13.145 12.7544 13.145 12.4379 12.9497 12.2426L10.8284 10.1213C10.6332 9.92602 10.3166 9.92602 10.1213 10.1213C9.92606 10.3165 9.92606 10.6331 10.1213 10.8284L12.2426 12.9497C12.4379 13.145 12.7545 13.145 12.9497 12.9497Z" fill="currentColor"></path>
  <path d="M5.87868 5.87864C6.07394 5.68338 6.07394 5.36679 5.87868 5.17153L3.75736 3.05021C3.5621 2.85495 3.24552 2.85495 3.05025 3.05021C2.85499 3.24547 2.85499 3.56206 3.05025 3.75732L5.17157 5.87864C5.36684 6.0739 5.68342 6.0739 5.87868 5.87864Z" fill="currentColor"></path>
      `;
const openFullScreen2 = () => {
  const loading = LiLoading.service({
    lock: true,
    text: 'Loading',
    customClass: 'custom-loading-svg',
    spinner: svg,
    background: 'rgba(0, 0, 0, 0.7)',
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
};
</script>
<style>
.custom-loading-svg {
  color: var(--li-color-on-dark-900);
}
</style>
```

## 以服务的方式来调用

Loading 还可以以服务的方式调用。 你可以像这样引入 Loading 服务：

```
import { LiLoading } from '@chehejia/liui-next'
```

在你需要的时候通过下面的方式调用：

```
LiLoading.service(options)
```

其中`options`参数为 Loading 的配置项，具体见下表。 `LoadingService` 会返回一个 Loading 实例，可通过调用该实例的 `close` 方法来关闭它：

```
const loadingInstance = LiLoading.service(options)
nextTick(() => {
  // Loading should be closed asynchronously
  loadingInstance.close()
})
```

需要注意的是，以服务的方式调用的全屏 Loading 是单例的。 若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例：

```
const loadingInstance1 = LiLoading.service({ fullscreen: true })
const loadingInstance2 = LiLoading.service({ fullscreen: true })
console.log(loadingInstance1 === loadingInstance2) // true
```

此时调用它们中任意一个的 `close` 方法都能关闭这个全屏 Loading。

如果完整引入了 LiUI，那么 `app.config.globalProperties` 上会有一个全局方法`$loading`， 它的调用方式为：`this.$loading(options)`，同样会返回一个 Loading 实例。

## Loading

### Loading Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 `document.querySelector`以获取到对应 DOM 节点 | `object | string` | document.body |
| body | 同 `v-loading` 指令中的 `body` 修饰符 x | `boolean` | false |
| fullscreen | 同 `v-loading` 指令中的 `fullscreen` 修饰符 | `boolean` | true |
| lock | 同 `v-loading` 指令中的 `lock` 修饰符 | `boolean` | false |
| text | 显示在加载图标下方的加载文案 | `string` | — |
| spinner | 自定义加载图标 | `string` | — |
| background | 遮罩背景色 | `string` | — |
| custom-class | Loading 的自定义类名 | `string` | — |

### Loading Directives

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| v-loading | 是否显示动画 | boolean |
| li-loading-text | 显示在加载图标下方的加载文案 | string |
| li-loading-spinner | 自定义加载图标 | string |
| li-loading-svg | 自定义加载图标 (与 li-loading-spinner 相同) | string |
| li-loading-background | 背景遮罩的颜色 | string |

最后修改日期： 2025-07-15
