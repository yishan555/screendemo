# Select 选择器

Maintainer: 王德师

1. [基础用法](#基础用法)
2. [有禁用选项](#有禁用选项)
3. [禁用状态](#禁用状态)
4. [可清空单选](#可清空单选)
5. [基础多选](#基础多选)
6. [自定义多选 Tag](#自定义多选-tag)
7. [自定义已选项标签渲染](#自定义已选项标签渲染)
8. [自定义模板](#自定义模板)
9. [将选项进行分组](#将选项进行分组)
10. [筛选选项](#筛选选项)
11. [远程搜索](#远程搜索)
12. [创建新的选项](#创建新的选项)
13. [下拉框超长](#下拉框超长)
14. [选项分页（异步）](#选项分页（异步）)
15. [远程搜索 + 选项分页（异步）](#远程搜索-选项分页（异步）)
16. [选项分页（同步）](#选项分页（同步）)
17. [Select API](#select-api)
    1. [Select Props](#select-props)
    2. [Select Events](#select-events)
    3. [Select Slots](#select-slots)
    4. [Select Methods](#select-methods)
18. [OptionGroup API](#optiongroup-api)
    1. [OptionGroup Props](#optiongroup-props)
    2. [OptionGroup Slots](#optiongroup-slots)
19. [Option API](#option-api)
    1. [Option Props](#option-props)
    2. [Option Slots](#option-slots)

当选项过多时，使用下拉菜单展示并选择内容。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/))。

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的 `li-option` 的 value 属性值。

```
<template>
  <li-select v-model="value" class="m-2" placeholder="Select" size="large">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
  <li-select v-model="value" class="m-2" placeholder="Select">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
  <li-select v-model="value" class="m-2" placeholder="Select" size="small">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
```

## 有禁用选项

在 `li-option` 中，设定 `disabled` 值为 true，即可禁用该选项。

```
<template>
  <li-select v-model="value" placeholder="Select">
    <li-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
```

## 禁用状态

禁用整个选择器组件

为 `li-select` 设置 `disabled`属性，则整个选择器不可用。

```
<template>
  <li-select v-model="value" disabled placeholder="Select">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
```

## 可清空单选

您可以使用清除图标来清除选择。

为 `li-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

```
<template>
  <li-select v-model="value" clearable placeholder="Select">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
```

## 基础多选

多选选择器使用 tag 组件来展示已选中的选项。

为 `li-select` 设置 `multiple` 属性即可启用多选， 此时 `v-model` 的值为当前选中值所组成的数组。 默认情况下选中值会以 Tag 组件的形式展现， 你也可以设置 `collapse-tags` 属性将它们合并为一段文字。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

default

use collapse-tags

use collapse-tags-tooltip

use max-collapse-tags

use always-display-tags-tooltip

使用 collapse-tags-responsive 根据宽度自适应展示 collapse-tags

```
<template>
  <div class="m-4">
    <p>default</p>
    <li-select v-model="value1" multiple placeholder="Select" style="width: 240px">
      <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </li-select>
  </div>
  <div class="m-4">
    <p>use collapse-tags</p>
    <li-select v-model="value2" multiple collapse-tags placeholder="Select" style="width: 240px">
      <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </li-select>
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <li-select v-model="value3" multiple collapse-tags collapse-tags-tooltip placeholder="Select" style="width: 240px">
      <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </li-select>
  </div>
  <div class="m-4">
    <p>use max-collapse-tags</p>
    <li-select
      v-model="value4"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="Select"
      style="width: 240px"
    >
      <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </li-select>
  </div>
  <div class="m-4">
    <p>use always-display-tags-tooltip</p>
    <li-select
      v-model="value5"
      multiple
      collapse-tags
      collapse-tags-tooltip
      always-display-tags-tooltip
      placeholder="Select"
      style="width: 240px"
    >
      <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </li-select>
  </div>
  <div class="m-4">
    <p>使用 collapse-tags-responsive 根据宽度自适应展示 collapse-tags</p>
    <li-slider v-model="width" :max="600" :min="200" />
    <li-select
      v-model="value6"
      multiple
      collapse-tags
      collapse-tags-responsive
      collapse-tags-tooltip
      placeholder="Select"
      :style="{ width: `${width}px` }"
    >
      <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </li-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);
const value5 = ref([]);
const value6 = ref([]);

const width = ref(240);

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
```

## 自定义多选 Tag

为 li-option 设置 tag-props 属性即可启用自定义 Tag 配置。

```
<template>
  <li-select v-model="value" multiple placeholder="Select" clearable>
    <li-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :tag-props="{
        effect: 'dark',
        type: 'success',
        imgSrc: item.avatar,
      }"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: var(--li-text-color-secondary); font-size: 13px">{{ item.value }}</span>
    </li-option>
  </li-select>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const value = ref('');
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
];
</script>
```

## 自定义已选项标签渲染

你可以自定义如何来渲染已选项标签。

使用 `render-selected-item` 自定义已选项标签渲染。

```
<template>
  <li-select v-model="value" placeholder="Select" clearable :render-selected-item="renderSelectedItem">
    <li-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" :option="item">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; font-size: 13px; color: var(--li-text-color-secondary)">{{ item.value }}</span>
    </li-option>
  </li-select>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const value = ref('');
const cities = [
  {
    value: 'Beijing1',
    label: 'Beijing1',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/ddce0307-0f81-4bc8-a1cb-175072afabfg~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp',
  },
];

const renderSelectedItem = (selected) => {
  return selected.value ? (
    <li-tag key={selected.value} imgSrc={selected.option.avatar} disable-transitions type="info" effect="light">
      {selected.value}
    </li-tag>
  ) : (
    ''
  );
};
</script>
```

## 自定义模板

你可以自定义如何来渲染每一个选项。

将自定义的 HTML 模板插入 `li-option` 的 slot 中即可。

```
<template>
  <li-select v-model="value" placeholder="Select">
    <li-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; font-size: 13px; color: var(--li-text-color-secondary)">{{ item.value }}</span>
    </li-option>
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
];
</script>
```

## 将选项进行分组

你可以为选项进行分组来区分不同的选项。

使用 `li-option-group` 对备选项进行分组，它的 `label` 属性为分组名。

```
<template>
  <li-select v-model="value" placeholder="Select">
    <li-option-group v-for="group in options" :key="group.label" :label="group.label">
      <li-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
    </li-option-group>
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
];
</script>
```

## 筛选选项

可以利用筛选功能快速查找选项。

为`li-select`添加`filterable`属性即可启用搜索功能。 默认情况下，Select 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

```
<template>
  <li-select v-model="value" filterable placeholder="Select">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: '选项1',
  },
  {
    value: 'Option2',
    label: '选项2',
  },
  {
    value: 'Option3',
    label: '选项3',
  },
  {
    value: 'Option4',
    label: '选项4',
  },
  {
    value: 'Option5',
    label: '选项5',
  },
];
</script>
```

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。 `remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `li-option` 是通过 `v-for` 指令渲染出来的，此时需要为 `li-option` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

default

use remote-show-suffix

```
<template>
  <div class="flex flex-wrap">
    <div class="m-4">
      <p>default</p>
      <li-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </li-select>
    </div>
    <div class="m-4">
      <p>use remote-show-suffix</p>
      <li-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </li-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface ListItem {
  value: string;
  label: string;
}

const list = ref<ListItem[]>([]);
const options = ref<ListItem[]>([]);
const value = ref<string[]>([]);
const loading = ref(false);

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
</script>
```

## 创建新的选项

创建并选中未包含在初始选项中的条目。

通过使用 `allow-create` 属性，用户可以通过输入框创建新项目。 为了使 `allow-create` 正常工作， `filterable` 的值必须为 `true`。 本例还使用了 `default-first-option` 属性， 在该属性为 `true` 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

```
<template>
  <li-select
    v-model="value"
    multiple
    filterable
    allow-create
    create-tip="创建"
    default-first-option
    :reserve-keyword="false"
    placeholder="Choose tags for your article"
    @create="handleChangeCreated"
  >
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string[]>([]);
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
];

const handleChangeCreated = (createdOptionVal) => {
  console.log(createdOptionVal);
};
</script>
```

TIP

如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。

## 下拉框超长

默认下拉框的宽度和父元素输入框的宽度相等，可以设置 fit-input-width 为 false 取消宽度相等效果

```
<template>
  <li-select v-model="value" class="m-2" placeholder="Select" :fit-input-width="false">
    <li-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>

  <li-select v-model="value" class="m-2" placeholder="Select" style="margin-left: 20px">
    <li-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>

  <li-select v-model="value" class="m-2" placeholder="Select" style="margin-left: 20px">
    <li-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options1 = [
  {
    value: 'Option1',
    label: '选项很长1，选项很长1，选项很长1，选项很长1，选项很长1',
  },
  {
    value: 'Option2',
    label: '选项很长2，选项很长2，选项很长2，选项很长2，选项很长2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];

const options2 = [
  {
    value: 'Option1',
    label: '选项宽度正常',
  },
  {
    value: 'Option2',
    label: '选项宽度正常',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
```

## 选项分页（异步）

可以满足需要异步加载的列表

```
<template>
  <li-select v-model="value" placeholder="请选择" :pager="handleLoadMore">
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

interface Option {
  label: string;
  value: string;
}

type MockHttpDataFunctionType = () => Promise<Option[]>;

const options = ref<Option[]>(
  Array.from({ length: 5 }, (_, i) => ({
    label: `选项${i + 1}`,
    value: `选项${i + 1}`,
  })),
);

const handleLoadMore = async () => {
  const newOptions = await mockHttpData();
  options.value.push(...newOptions);

  // 根据业务逻辑判断，是否全部加载完成
  const finished = options.value.length >= 15;
  return finished;
};

// 模拟网络请求
const mockHttpData: MockHttpDataFunctionType = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 5 }, (_, i) => ({
          label: `选项${i + options.value.length + 1}`,
          value: `选项${i + options.value.length + 1}`,
        })),
      );
    }, 300);
  });
};
</script>
```

## 远程搜索 + 选项分页（异步）

可以满足需要异步加载的列表

加载更多  加载更多

```
<template>
  <li-select
    v-model="value"
    placeholder="请选择"
    remote
    :teleported="false"
    :remote-method="onRemote"
    :pager="handleLoadMore"
    filterable
    :loading="isLoading"
  >
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const theKeyword = ref('');
const isLoading = ref(false);

interface Option {
  label: string;
  value: string;
}

type MockHttpDataFunctionType = () => Promise<Option[]>;
type LoadRemoteDataHttpDataFunctionType = (key: string) => Promise<Option[]>;

const options = ref<Option[]>([]);

const handleLoadMore = async () => {
  const newOptions = await mockHttpData();
  options.value.push(...newOptions);

  // 根据业务逻辑判断，是否全部加载完成
  const finished = options.value.length >= 15;
  return finished;
};

const onRemote = async (keyword: string) => {
  if (keyword) {
    isLoading.value = true;
    theKeyword.value = keyword;
    const newOptions = await loadRemoteData(keyword);
    isLoading.value = false;

    options.value = newOptions;
  }
};

// 模拟网络请求
const mockHttpData: MockHttpDataFunctionType = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 5 }, (_, i) => ({
          label: `选项${i + options.value.length + 1}`,
          value: `选项${i + options.value.length + 1}`,
        })),
      );
    }, 300);
  });
};

// 模拟第一次远程加载部分数据
const loadRemoteData: LoadRemoteDataHttpDataFunctionType = (keyword: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 5 }, (_, i) => ({
          label: `选项${i + options.value.length + 1}(first)`,
          value: `选项${i + options.value.length + 1}(first)`,
        })),
      );
    }, 300);
  });
};
</script>
```

## 选项分页（同步）

适合大量数据返回需要分批展示的场景

```
<template>
  <li-select v-model="value" :pager="5" filterable>
    <li-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </li-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = ref(
  Array.from({ length: 15 }, (_, i) => ({
    value: `选项${i + 1}`,
    label: `选项${i + 1}`,
  })),
);
</script>
```

## Select API

### Select Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | array / string / number / boolean / object | — |
| multiple | 是否多选 | `enum` true | false | false |
| disabled | 是否禁用 | `enum` true | false | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | value |
| size | 输入框尺寸 | `enum` large | default | small | default |
| clearable | 是否可以清空选项 | `enum` true | false | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | `enum` true | false | false |
| collapse-tags-tooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，`collapse-tags`属性必须设定为 true | `enum` true | false | false |
| always-display-tags-tooltip | 设置是否下拉框展开时触发 toolTip，默认为展开时不触发，此属性需要配合 collapse-tags-tooltip 使用 | `enum` true | false | false |
| collapse-tags-responsive | 多选时是否通过响应式布局让选项自动收缩 | `enum` true | false | false |
| multiple-limit | `multiple` 属性设置为 `true` 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制 | number | 0 |
| name | Select 输入框的原生 name 属性 | string | — |
| effect | Tooltip 主题，内置了 `dark` / `light` 两种 | string | light |
| autocomplete | Select 输入框的原生 autocomplete 属性 | string | off |
| placeholder | 占位文字 | string | Select |
| filterable | Select 组件是否可筛选 | `enum` true | false | false |
| allow-create | 是否允许用户创建新条目， 只有当 `filterable` 设置为 true 时才会生效。 | `enum` true | false | false |
| create-tip | 自定义创建时标签前内容， 只有当 `allow-create` 设置为 true 时才会生效。 | `string` | - |
| filter-method | 自定义筛选方法 | function | — |
| remote | 其中的选项是否从服务器远程加载 | `enum` true | false | false |
| remote-method | 自定义远程搜索方法 | function | — |
| remote-show-suffix | 远程搜索方法显示后缀图标 | `enum` true | false | false |
| loading | 是否正在从远程获取数据 | `enum` true | false | false |
| loading-text | 从服务器加载内容时显示的文本 | string | Loading |
| no-match-text | 搜索条件无匹配时显示的文字，也可以使用 `empty` 插槽设置 | string | No matching data |
| no-data-text | 无选项时显示的文字，也可以使用 `empty` 插槽设置自定义内容 | string | No data |
| popper-class | 选择器下拉菜单的自定义类名 | string | — |
| reserve-keyword | 当 `multiple` 和 `filter`被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词 | `enum` true | false | true |
| default-first-option | 是否在输入框按下回车时，选择第一个匹配项。 需配合 `filterable` 或 `remote` 使用 | `enum` true | false | false |
| popper-append-to-body(已废弃) | 是否将弹出框插入至 body 元素 当弹出框的位置出现问题时，你可以尝试将该属性设置为 false。 | `enum` true | false | true |
| teleported | 该下拉菜单是否使用 teleport 插入 body 元素 | `enum` true | false | true |
| persistent | 当下拉选择器未被激活并且`persistent`设置为`false`，选择器会被删除。 | `enum` true | false | true |
| automatic-dropdown | 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单 | `enum` true | false | false |
| clear-icon | 自定义清除图标 | `string | Component` | CircleClose |
| fit-input-width | 下拉框的宽度是否与输入框相同 | `enum` true | false | true |
| suffix-icon | 自定义后缀图标组件 | `string | Component` | ArrowDown |
| tag-type | 标签类型 | `enum` success | info | warning | danger | info |
| validate-event | 是否触发表单验证 | `enum` true | false | true |
| placement | 下拉框出现的位置 | `enum` top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end | bottom-start |
| pager | 开启分页，同步加载时传 number 类型，表示每页数量 / 异步加载传递函数类型，表示回调函数，函数返回 false 为还有数据，返回 true 为全部展示完成，不再展示加载按钮 | `enum` boolean | () => Promise<boolean> | — |
| renderSelectedItem | 通过 renderSelectedItem 自定义单选选择框中已选项标签的渲染 | `function`(option: Option) | — |

### Select Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | val，目前的选中值 |
| create | 选中创建的 option 时触发 | val，目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | val，出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除 tag 时触发 | val，移除的 tag 值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | `function`(event: FocusEvent) |
| focus | 当 input 获得焦点时触发 | `function`(event: FocusEvent) |

### Select Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| — | Option 组件列表 | Option Group / Option |
| prefix | Select 组件头部内容 | — |
| empty | 无选项时的列表 | — |

### Select Methods

| 名称 | 说明 |
| --- | --- |
| focus | 使选择器的输入框获取焦点 |
| blur | 使选择器的输入框失去焦点，并隐藏下拉框 |

## OptionGroup API

### OptionGroup Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组的组名 | string | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | false |

### OptionGroup Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| - | 自定义默认内容 | Option |

## Option API

### Option Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项的值 | `string` / `number` / `boolean` / `object` | — |
| label | 选项的标签，若不设置则默认与`value`相同 | `string`/`number` | — |
| disabled | 是否禁用该选项 | `boolean` | false |
| tag-props | 自定义 tag 配置，参考 Tag | `object` | - |

### Option Slots

| 名称 | 说明 |
| --- | --- |
| — | 默认插槽 |

最后修改日期： 2025-07-15
