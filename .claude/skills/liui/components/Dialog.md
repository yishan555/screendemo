# Dialog 对话框

Maintainer: 窦林旭

1. [基础用法](#基础用法)
2. [自定义内容](#自定义内容)
3. [自定义头部](#自定义头部)
4. [嵌套的对话框](#嵌套的对话框)
5. [内容居中](#内容居中)
6. [居中对话框](#居中对话框)
7. [关闭时销毁](#关闭时销毁)
8. [可拖拽对话框](#可拖拽对话框)
9. [Dialog API](#dialog-api)
   1. [Dialog Props](#dialog-props)
   2. [Dialog Slots](#dialog-slots)
   3. [Dialog Events](#dialog-events)
10. [常见问题解答（FAQ）](#常见问题解答（faq）)

在保留当前页面状态的情况下，告知用户并承载相关操作。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `model-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为两个部分：`body` 和 `footer`，`footer` 需要具名为 `footer` 的 `slot`。 `title` 属性用于定义标题，它是可选的，默认值为空。 最后，本例还展示了 `before-close` 的用法。

click to open the Dialog

```
<template>
  <li-button text @click="dialogVisible = true"> click to open the Dialog </li-button>

  <li-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <li-button size="large" @click="dialogVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="dialogVisible = false"> Confirm </li-button>
      </span>
    </template>
  </li-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiMessageBox } from '@chehejia/liui-next';

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  LiMessageBox.confirm('Are you sure to close this dialog?', '', {
    autofocus: false,
  })
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

TIP

`before-close` 只会在用户点击关闭按钮或者对话框的遮罩区域时被调用。 如果你在 `footer` 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。

## 自定义内容

对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 LiUI 的表格和表单。

open a Table nested Dialog  open a Form nested Dialog

```
<template>
  <li-button text @click="dialogTableVisible = true"> open a Table nested Dialog </li-button>

  <li-dialog v-model="dialogTableVisible" title="Shipping address">
    <li-table :data="gridData">
      <li-table-column property="date" label="Date" width="150" />
      <li-table-column property="name" label="Name" width="200" />
      <li-table-column property="address" label="Address" />
    </li-table>
  </li-dialog>

  <!-- Form -->
  <li-button text @click="dialogFormVisible = true"> open a Form nested Dialog </li-button>

  <li-dialog v-model="dialogFormVisible" title="Shipping address">
    <li-form :model="form">
      <li-form-item label="Promotion name" :label-width="formLabelWidth">
        <li-input v-model="form.name" autocomplete="off" />
      </li-form-item>
      <li-form-item label="Zones" :label-width="formLabelWidth">
        <li-select v-model="form.region" placeholder="Please select a zone">
          <li-option label="Zone No.1" value="shanghai" />
          <li-option label="Zone No.2" value="beijing" />
        </li-select>
      </li-form-item>
    </li-form>
    <template #footer>
      <span class="dialog-footer">
        <li-button size="large" @click="dialogFormVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="dialogFormVisible = false"> Confirm </li-button>
      </span>
    </template>
  </li-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

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
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
];
</script>
<style scoped>
.li-button--text {
  margin-right: 15px;
}

.li-select {
  width: 300px;
}

.li-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

## 自定义头部

`header` 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 `title` 属性，或使用 `titleId` 插槽属性来指定哪些元素应该读取为对话框标题。

Open Dialog with customized header

```
<template>
  <li-button @click="visible = true"> Open Dialog with customized header </li-button>
  <li-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <li-button type="danger" @click="close">
          <li-icon class="li-icon--left"><icon-edit-circle-clear-f /></li-icon>
          Close
        </li-button>
      </div>
    </template>
    This is dialog content.
  </li-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiButton, LiDialog } from '@chehejia/liui-next';
import { IconEditCircleClearF } from '@chehejia/liui-icons';

const visible = ref(false);
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
```

## 嵌套的对话框

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。

通常我们不建议使用嵌套对话框。 如果你需要在页面上呈现多个对话框，你可以简单地打平它们，以便它们彼此之间是平级关系。 如果必须要在一个对话框内展示另一个对话框，可以将内部嵌套的对话框属性 `append-to-body` 设置为 true，嵌套的对话框将附加到 body 而不是其父节点，这样两个对话框都可以被正确地渲染。

open the outer Dialog

```
<template>
  <li-button text @click="outerVisible = true"> open the outer Dialog </li-button>

  <li-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <li-dialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <li-button size="large" @click="outerVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="innerVisible = true"> open the inner Dialog </li-button>
      </div>
    </template>
  </li-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

## 内容居中

对话框的内容可以居中。

将`center`设置为`true`即可使标题和底部居中。 `center`仅影响标题和底部区域。 Dialog 的内容是任意的，在一些情况下，内容并不适合居中布局。 如果需要内容也水平居中，请自行为其添加 CSS 样式。

Click to open the Dialog

```
<template>
  <li-button text @click="centerDialogVisible = true"> Click to open the Dialog </li-button>

  <li-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span> It should be noted that the content will not be aligned in center by default </span>
    <template #footer>
      <span class="dialog-footer">
        <li-button size="large" @click="centerDialogVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="centerDialogVisible = false"> Confirm </li-button>
      </span>
    </template>
  </li-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

TIP

Dialog 的内容是懒渲染的——在被第一次打开之前，传入的默认 slot 不会被立即渲染到 DOM 上。 因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。

## 居中对话框

从屏幕中心打开对话框。

设置 `align-center` 为 `true` 使对话框水平垂直居中。 由于对话框垂直居中在弹性盒子中，所以`top`属性将不起作用。

Click to open the Dialog

```
<template>
  <li-button text @click="centerDialogVisible = true"> Click to open the Dialog </li-button>

  <li-dialog v-model="centerDialogVisible" title="Warning" width="30%" align-center>
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <span class="dialog-footer">
        <li-button size="large" @click="centerDialogVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="centerDialogVisible = false"> Confirm </li-button>
      </span>
    </template>
  </li-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

## 关闭时销毁

启用此功能时，默认栏位下的内容将使用 `v-if` 指令销毁。 当出现性能问题时，可以启用此功能。

需要注意的是，当这个属性被启用时，在 `transition.beforeEnter` 事件卸载前，除了 `overlay`、`header (可选)`与`footer(可选)` ，Dialog 内不会有其它任何其它的 DOM 节点存在。

Click to open Dialog

```
<template>
  <li-button text @click="centerDialogVisible = true"> Click to open Dialog </li-button>

  <li-dialog v-model="centerDialogVisible" title="Notice" width="30%" destroy-on-close center>
    <span>
      Notice: before dialog gets opened for the first time this node and the one bellow will not be rendered
    </span>
    <div>
      <strong>Extra content (Not rendered)</strong>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <li-button size="large" @click="centerDialogVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="centerDialogVisible = false"> Confirm </li-button>
      </span>
    </template>
  </li-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

## 可拖拽对话框

试着拖动一下`header`部分吧

设置`draggable`属性为`true`以做到拖拽

Click to open Dialog

```
<template>
  <li-button text @click="dialogVisible = true"> Click to open Dialog </li-button>

  <li-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <li-button size="large" @click="dialogVisible = false">Cancel</li-button>
        <li-button type="primary" size="large" @click="dialogVisible = false"> Confirm </li-button>
      </span>
    </template>
  </li-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 4px;
}
</style>
```

TIP

当 `modal` 的值为 false 时，请一定要确保 `append-to-body` 属性为 **true**，由于 `Dialog` 使用 `position: relative` 定位，当外层的遮罩层被移除时，`Dialog` 则会根据当前 DOM 上的祖先节点来定位，因此可能造成定位问题。

## Dialog API

### Dialog Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 是否显示 Dialog | boolean | — | — |
| title | Dialog 对话框 Dialog 的标题， 也可通过具名 slot （见下表）传入 | string | — | — |
| width | Dialog 的宽度 | string / number | — | 50% |
| fullscreen | 是否为全屏 Dialog | boolean | — | false |
| top | Dialog CSS 中的 margin-top 值 | string | — | 15vh |
| modal | 是否需要遮罩层 | boolean | — | true |
| append-to-body | Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true | boolean | — | false |
| lock-scroll | 是否在 Dialog 出现时将 body 滚动锁定 | boolean | — | true |
| open-delay | Dialog 打开的延时时间，单位毫秒 | number | — | 0 |
| close-delay | Dialog 关闭的延时时间，单位毫秒 | number | — | 0 |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean | — | true |
| show-close | 是否显示关闭按钮 | boolean | — | true |
| before-close | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. | Function(done) (done 用来关闭 Dialog) | — | — |
| draggable | 为 Dialog 启用可拖拽功能 | boolean | — | false |
| center | 是否让 Dialog 的 header 和 footer 部分居中排列 | boolean | — | false |
| align-center | 是否水平垂直对齐对话框 | boolean | — | false |
| destroy-on-close | 当关闭 Dialog 时，销毁其中的元素 | boolean | — | false |

### Dialog Slots

| 插槽名 | 说明 |
| --- | --- |
| — | Dialog 的内容 |
| header | 对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| footer | Dialog 按钮操作区的内容 |

### Dialog Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| open | Dialog 打开的回调 | — |
| opened | Dialog 打开动画结束时的回调 | — |
| close | Dialog 关闭的回调 | — |
| closed | Dialog 关闭动画结束时的回调 | — |
| open-auto-focus | 输入焦点聚焦在 Dialog 内容时的回调 | — |
| close-auto-focus | 输入焦点从 Dialog 内容失焦时的回调 | — |

## 常见问题解答（FAQ）

#### 在 SFC 文件中使用对话框，scope 样式不会生效

典型议题：[#10515](https://github.com/element-plus/element-plus/issues/10515)

PS：既然对话框是使用 `Teleport` 渲染的，建议在全局范围写入根节点的样式。

#### 当对话框被显示及隐藏时，页面元素会来回移动（抖动）

典型议题：[#10481](https://github.com/element-plus/element-plus/issues/10481)

PS：建议将滚动区域放置在一个挂载的 vue 节点，如 `<div id="app" />` 下，并对 body 使用 `overflow: hidden` 样式。

最后修改日期： 2025-07-15
