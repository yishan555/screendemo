# Tag 标签

Maintainer: 孙俊玮

1. [基础用法](#基础用法)
2. [可移除标签](#可移除标签)
3. [动态编辑标签](#动态编辑标签)
4. [不同尺寸](#不同尺寸)
5. [主题](#主题)
6. [Hover 样式](#hover-样式)
7. [可选中的标签](#可选中的标签)
8. [带图片的标签](#带图片的标签)
9. [Tag API](#tag-api)
   1. [Tag Props](#tag-props)
   2. [Tag Events](#tag-events)
   3. [Tag Slots](#tag-slots)
10. [CheckTag API](#checktag-api)
    1. [CheckTag Props](#checktag-props)
    2. [CheckTag Events](#checktag-events)
    3. [CheckTag Slots](#checktag-slots)

用于标记和选择。

## 基础用法

由 `type` 属性来选择 tag 的类型。 也可以通过 `color` 属性来自定义背景色。

标签一标签一标签一标签一标签一标签一

```
<template>
  <li-tag>标签一</li-tag>
  <li-tag class="ml-2" type="normal">标签一</li-tag>
  <li-tag class="ml-2" type="success">标签一</li-tag>
  <li-tag class="ml-2" type="info">标签一</li-tag>
  <li-tag class="ml-2" type="warning">标签一</li-tag>
  <li-tag class="ml-2" type="danger">标签一</li-tag>
</template>
```

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 Tag 被移除时会触发 `close` 事件。

标签一标签一标签一标签一标签一标签一

```
<template>
  <li-tag v-for="tag in tags" :key="tag.name" class="mx-1" closable :type="tag.type">
    {{ tag.name }}
  </li-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tags = ref([
  { name: '标签一', type: '' },
  { name: '标签一', type: 'normal' },
  { name: '标签一', type: 'success' },
  { name: '标签一', type: 'info' },
  { name: '标签一', type: 'warning' },
  { name: '标签一', type: 'danger' },
]);
</script>
```

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。

标签一标签一标签一

```
<template>
  <li-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closable
    type="info"
    size="large"
    disable-transitions
    @close="handleClose(tag)"
  >
    {{ tag }}
  </li-tag>
  <li-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 tag-dynamic-input"
    clearable
    size="large"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <li-button v-else class="ml-1 tag-dynamic-add" :icon="IconBasicAddO" @click="showInput" />
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { LiInput } from '@chehejia/liui-next';
import { IconBasicAddO } from '@chehejia/liui-icons';

const inputValue = ref('');
const dynamicTags = ref(['标签一', '标签一', '标签一']);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof LiInput>>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};
</script>

<style scoped lang="scss">
.tag-dynamic-add {
  width: 32px;

  color: var(--li-color-on-light-800);

  background-color: var(--li-color-on-light-200);
  border: none;
  border-radius: 50% !important;

  &:hover {
    background-color: var(--li-color-on-light-300) !important;
  }
}

.tag-dynamic-input {
  width: 160px !important;
  height: 32px !important;

  .li-input__suffix {
    right: 2px;
  }
}
</style>
```

## 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

使用 `size` 属性来设置额外尺寸, 可选值包括 `large`, `default` 或 `small`。

标签一标签一标签一

标签一标签一标签一

```
<template>
  <li-row>
    <li-tag class="mx-1" size="large" type="normal">标签一</li-tag>
    <li-tag class="mx-1" type="normal">标签一</li-tag>
    <li-tag class="mx-1" size="small" type="normal">标签一</li-tag>
  </li-row>

  <li-row class="mt-4">
    <li-tag class="mx-1" size="large" closable type="normal">标签一</li-tag>
    <li-tag class="mx-1" closable type="normal">标签一</li-tag>
    <li-tag class="mx-1" size="small" closable type="normal">标签一</li-tag>
  </li-row>
</template>
```

## 主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。

通过设置 `effect` 属性来改变主题，默认为 `plain`。

Dark

标签一标签一标签一标签一标签一标签一

Dark 可关闭

标签一标签一标签一标签一标签一标签一

Light

标签一标签一标签一标签一标签一标签一

Light 可关闭

标签一标签一标签一标签一标签一标签一

Plain

标签一标签一标签一标签一标签一标签一

Plain 可关闭

标签一标签一标签一标签一标签一标签一

```
<template>
  <div class="tag-group my-2 gap-1 items-center">
    <div class="tag-group__title m-1 mr-12 line-height-2">Dark</div>
    <div>
      <li-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
        {{ item.label }}
      </li-tag>
    </div>
  </div>

  <div class="tag-group my-2 mt-3 gap-1 items-center">
    <p class="tag-group__title m-1 line-height-2">Dark 可关闭</p>
    <div>
      <li-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" closable>
        {{ item.label }}
      </li-tag>
    </div>
  </div>

  <div class="tag-group my-2 mt-3 gap-1 items-center">
    <p class="tag-group__title m-1">Light</p>
    <div>
      <li-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light">
        {{ item.label }}
      </li-tag>
    </div>

    <p class="tag-group__title m-1 mt-3">Light 可关闭</p>
    <div>
      <li-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light" closable>
        {{ item.label }}
      </li-tag>
    </div>
  </div>

  <div class="tag-group my-2 mt-3 gap-1 items-center">
    <p class="tag-group__title m-1">Plain</p>
    <div>
      <li-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
        {{ item.label }}
      </li-tag>
    </div>

    <p class="tag-group__title mt-3 m-1">Plain 可关闭</p>
    <div>
      <li-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain" closable>
        {{ item.label }}
      </li-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { TagProps } from '@chehejia/liui-next';

interface Item {
  type: TagProps['type'];
  label: string;
}

const items = ref<Array<Item>>([
  { type: '', label: '标签一' },
  { type: 'normal', label: '标签一' },
  { type: 'success', label: '标签一' },
  { type: 'info', label: '标签一' },
  { type: 'danger', label: '标签一' },
  { type: 'warning', label: '标签一' },
]);
</script>
```

## Hover 样式

可设置 `hoverable` 属性来改变鼠标悬浮时的样式。

标签一标签一标签一标签一标签一标签一

标签一标签一标签一标签一标签一标签一

标签一标签一标签一标签一标签一标签一

```
<template>
  <div class="flex flex-wrap gap-2 my-2">
    <li-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" round hoverable>
      {{ item.label }}
    </li-tag>
  </div>
  <div class="flex flex-wrap gap-2">
    <li-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="light" round hoverable>
      {{ item.label }}
    </li-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <li-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="plain" round hoverable>
      {{ item.label }}
    </li-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { TagProps } from '@chehejia/liui-next';

interface Item {
  type: TagProps['type'];
  label: string;
}

const items = ref<Array<Item>>([
  { type: '', label: '标签一' },
  { type: 'normal', label: '标签一' },
  { type: 'success', label: '标签一' },
  { type: 'info', label: '标签一' },
  { type: 'danger', label: '标签一' },
  { type: 'warning', label: '标签一' },
]);
</script>
```

## 可选中的标签

有时候因为业务需求，我们可能会需要用到类似复选框的标签，但是**按钮式的复选框**的样式又不满足需求，此时我们就可以用到 `check-tag`组件。

check-tag 的基础使用方法，check-tag 提供的 API 非常简单。

CheckedToggle me

```
<template>
  <div>
    <li-check-tag checked style="margin-right: 8px">Checked</li-check-tag>
    <li-check-tag :checked="checked" @change="onChange">Toggle me</li-check-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);

const onChange = (status: boolean) => {
  checked.value = status;
};
</script>
```

## 带图片的标签

有时候因为业务需求，我们可能会需要用到带图片的标签

可设置 `img-src` 属性来展示图片。

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一

![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一![](https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg)标签一

```
<template>
  <div v-for="effect in effectList" :key="effect" class="acatar-wrap">
    <li-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      :effect="effect"
      hoverable
      :img-src="item.imgSrc"
    >
      {{ item.label }}
    </li-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { TagProps } from '@chehejia/liui-next';

interface Item {
  type: TagProps['type'];
  label: string;
  imgSrc: string;
}

const imgSrc = `https://p.ampmake.com/fed/image/svg+xml/2535bf45403169daaa3aff56797d8e02.svg`;

type Effect = 'dark' | 'plain' | 'light';

const effectList = ref<Effect[]>(['dark', 'light', 'plain']);

const items = ref<Array<Item>>([
  { type: '', label: '标签一', imgSrc },
  { type: 'normal', label: '标签一', imgSrc },
  { type: 'success', label: '标签一', imgSrc },
  { type: 'info', label: '标签一', imgSrc },
  { type: 'danger', label: '标签一', imgSrc },
  { type: 'warning', label: '标签一', imgSrc },
]);
</script>

<style scoped lang="scss">
.acatar-wrap {
  display: flex;
  margin-bottom: 20px;
}
</style>
```

## Tag API

### Tag Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `enum` 'normal' | 'success' | 'info' | 'warning' | 'danger' | — |
| closable | 是否可关闭 | boolean | false |
| disable-transitions | 是否禁用渐变动画（v2.1.4 起默认关闭动画） | boolean | true |
| hit | 是否有边框描边 | boolean | false |
| color | 背景色 | string | — |
| size | 尺寸 | `enum` 'large' | 'default' | 'small' | default |
| effect | 主题 | `enum` 'dark' | 'light' | 'plain' | plain |
| round | Tag 是否为圆形 | boolean | true |
| hoverable | 悬停时是否高亮 | boolean | false |
| img-src | 图片链接 | string | '' |

### Tag Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击 Tag 时触发的事件 | — |
| close | 关闭 Tag 时触发的事件 | — |

### Tag Slots

| 名称 | 说明 |
| --- | --- |
| — | 自定义默认内容 |

## CheckTag API

### CheckTag Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | boolean | — |

### CheckTag Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 点击 Check Tag 时触发的事件 | checked |

### CheckTag Slots

| 名称 | 说明 |
| --- | --- |
| — | 自定义默认内容 |

最后修改日期： 2025-07-15
