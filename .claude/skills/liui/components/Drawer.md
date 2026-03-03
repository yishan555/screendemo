# Drawer 抽屉

Maintainer: 窦林旭

1. [基础用法](#基础用法)
2. [不添加 Title](#不添加-title)
3. [自定义内容](#自定义内容)
4. [自定义头部](#自定义头部)
5. [嵌套抽屉](#嵌套抽屉)
6. [Drawer API](#drawer-api)
   1. [Drawer Props](#drawer-props)
   2. [Drawer Slots](#drawer-slots)
   3. [Drawer Methods](#drawer-methods)
   4. [Drawer Events](#drawer-events)

有些时候, `Dialog` 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, `Drawer` 拥有和 `Dialog` 几乎相同的 API, 在 UI 上带来不一样的体验.

TIP

在 Vue 3 之后的版本 v-model 可以用于任何一个组件，`visible.sync` 已被移除，请使用 `v-model="visibilityBinding"` 来控制抽屉组件的显示和隐藏状态。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (例如: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

呼出一个临时的侧边栏, 可以从多个方向呼出。

你必须像 `Dialog`一样为 `Drawer` 设置 `model-value` 属性来控制 `Drawer` 的显示与隐藏状态，该属性接受一个 `boolean` 类型。 `Drawer` 包含三部分: `title` & `body` & `footer`, 其中 `title` 是一个具名 slot, 你还可以通过 `title` 属性来设置标题, 默认情况下它是一个空字符串, 其中 `body` 部分是 `Drawer` 组件的主区域, 它包含了用户定义的主要内容. footer 和 title 用法一致, 用来显示页脚信息. 当 `Drawer` 打开时，默认设置是**从右至左**打开 **30%** 浏览器宽度。 你可以通过传入对应的 `direction` 和 `size` 属性来修改这一默认行为。 下面一个示例将展示如何使用 `before-close` API，更多详细用法请参考页面底部的 API 部分。

left to rightright to lefttop to bottombottom to top

 open  with footer 

I am the title

#### set title by slot

cancelconfirm

```
<template>
  <li-radio-group v-model="direction">
    <li-radio label="ltr">left to right</li-radio>
    <li-radio label="rtl">right to left</li-radio>
    <li-radio label="ttb">top to bottom</li-radio>
    <li-radio label="btt">bottom to top</li-radio>
  </li-radio-group>

  <li-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </li-button>
  <li-button type="primary" style="margin-left: 16px" @click="drawer2 = true"> with footer </li-button>

  <li-drawer v-model="drawer" title="I am the title" :direction="direction" :before-close="handleClose">
    <span>Hi, there!</span>
  </li-drawer>
  <li-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <li-radio v-model="radio1" label="Option 1" size="large">Option 1</li-radio>
        <li-radio v-model="radio1" label="Option 2" size="large">Option 2</li-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <li-button size="large" @click="cancelClick">cancel</li-button>
        <li-button size="large" type="primary" @click="confirmClick">confirm</li-button>
      </div>
    </template>
  </li-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiMessageBox } from '@chehejia/liui-next';

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref('rtl');
const radio1 = ref('Option 1');
const handleClose = (done: () => void) => {
  LiMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  LiMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>
```

## 不添加 Title

当你不需要标题的时候，你可以将它移除。

通过设置 `with-header` 属性为 **false** 来控制是否显示标题。 如果你的应用需要具备可访问性，请务必设置好 `title`。

open

```
<template>
  <li-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </li-button>

  <li-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </li-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const drawer = ref(false);
</script>
```

## 自定义内容

像 `Dialog` 组件一样，`Drawer` 也可以用来显示多种不同的交互。

Open Drawer with nested tableOpen Drawer with nested form

I have a nested table inside!

I have a nested form inside!

```
<template>
  <li-button text @click="table = true">Open Drawer with nested table</li-button>
  <li-button text @click="dialog = true">Open Drawer with nested form</li-button>
  <li-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="50%">
    <li-table :data="gridData">
      <li-table-column property="date" label="Date" width="150" />
      <li-table-column property="name" label="Name" width="200" />
      <li-table-column property="address" label="Address" />
    </li-table>
  </li-drawer>

  <li-drawer
    ref="drawerRef"
    v-model="dialog"
    title="I have a nested form inside!"
    :before-close="handleClose"
    direction="ltr"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <li-form :model="form">
        <li-form-item label="Name" :label-width="formLabelWidth">
          <li-input v-model="form.name" autocomplete="off" />
        </li-form-item>
        <li-form-item label="Area" :label-width="formLabelWidth">
          <li-select v-model="form.region" placeholder="Please select activity area">
            <li-option label="Area1" value="shanghai" />
            <li-option label="Area2" value="beijing" />
          </li-select>
        </li-form-item>
      </li-form>
      <div class="demo-drawer__footer">
        <li-button @click="cancelForm">Cancel</li-button>
        <li-button type="primary" :loading="loading" @click="onClick">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</li-button>
      </div>
    </div>
  </li-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { LiDrawer, LiMessageBox } from '@chehejia/liui-next';

const formLabelWidth = '80px';
let timer;

const table = ref(false);
const dialog = ref(false);
const loading = ref(false);

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
];

const drawerRef = ref<InstanceType<typeof LiDrawer>>();
const onClick = () => {
  drawerRef.value!.close();
};

const handleClose = (done) => {
  if (loading.value) {
    return;
  }
  LiMessageBox.confirm('Do you want to submit?')
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {
      // catch error
    });
};

const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  clearTimeout(timer);
};
</script>
```

## 自定义头部

`header` 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 `title` 属性，或使用 `titleId` 插槽属性来指定哪些元素应该读取为抽屉标题。

Open Drawer with customized header 

#### This is a custom header!

 Close

```
<template>
  <li-button @click="visible = true"> Open Drawer with customized header </li-button>
  <li-drawer v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <li-button type="danger" @click="close">
        <li-icon class="li-icon--left"><icon-edit-circle-clear-f /></li-icon>
        Close
      </li-button>
    </template>
    This is drawer content.
  </li-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiButton, LiDrawer } from '@chehejia/liui-next';
import { IconEditCircleClearF } from '@chehejia/liui-icons';

const visible = ref(false);
</script>
```

## 嵌套抽屉

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`

如果你需要在不同图层中多个抽屉，你必须设置 `append-to-body` 属性到 **true**

open 

I'm outer Drawer

```
<template>
  <li-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </li-button>

  <li-drawer v-model="drawer" title="I'm outer Drawer" size="50%">
    <div>
      <li-button @click="innerDrawer = true">Click me!</li-button>
      <li-drawer v-model="innerDrawer" title="I'm inner Drawer" append-to-body :before-close="handleClose">
        <p>_(:зゝ∠)_</p>
      </li-drawer>
    </div>
  </li-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiMessageBox } from '@chehejia/liui-next';

const drawer = ref(false);
const innerDrawer = ref(false);

const handleClose = (done: () => void) => {
  LiMessageBox.confirm('You still have unsaved data, proceed?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
```

TIP

Drawer 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。 因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。

TIP

Drawer 还提供一个 `destroy-on-close` 的 API，用来控制是否在 Drawer 隐藏之后把 Drawer 的默认插槽内的内容销毁。 当你需要你的 `挂载的` 生命周期每次打开时你可以使用此 API。

## Drawer API

### Drawer Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 是否显示 Drawer | boolean | — | false |
| append-to-body | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 **true** | boolean | — | false |
| lock-scroll | 是否在 Drawer 出现时将 body 滚动锁定 | boolean | — | true |
| before-close | 关闭前的回调，会暂停 Drawer 的关闭 | function(done)，done 用于关闭 Drawer | — | — |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Drawer | boolean | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer | boolean | — | true |
| open-delay | Drawer 打开的延时时间，单位毫秒 | number | — | 0 |
| close-delay | Drawer 关闭的延时时间，单位毫秒 | number | — | 0 |
| destroy-on-close | 控制是否在关闭 Drawer 之后将子元素全部销毁 | boolean | - | false |
| modal | 是否需要遮罩层 | boolean | — | true |
| direction | Drawer 打开的方向 | Direction | rtl / ltr / ttb / btt | rtl |
| show-close | 是否显示关闭按钮 | boolean | — | true |
| size | Drawer 窗体的大小, 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%', 否则便会以 `number` 类型解释 | number / string | - | '30%' |
| title | Drawer 的标题，也可通过具名 slot （见下表）传入 | string | — | — |
| with-header | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效 | boolean | - | true |
| modal-class | 遮罩层的自定义类名 | string | - | - |
| z-index | 设置 z-index | number | - | - |

### Drawer Slots

| 插槽名 | 说明 |
| --- | --- |
| — | Drawer 的内容 |
| header | Drawer 标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| title(已废弃) | 与 header 作用相同 请使用 header |
| footer | Drawer 页脚部分 |

### Drawer Methods

| 名称 | 说明 |
| --- | --- |
| handleClose | 用于关闭 Drawer, 该方法会调用传入的 `before-close` 方法 |

### Drawer Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| open | Drawer 打开的回调 | — |
| opened | Drawer 打开动画结束时的回调 | — |
| close | Drawer 关闭的回调 | — |
| closed | Drawer 关闭动画结束时的回调 | — |
| open-auto-focus | 抽屉打开并聚焦内容后触发 | `Function` () => void |
| close-auto-focus | 抽屉关闭并聚焦内容后触发 | `Function` () => void |

最后修改日期： 2025-07-15
