# Transfer 穿梭框

Maintainer: 孙庞渝

1. [基础用法](#基础用法)
2. [可搜索过滤](#可搜索过滤)
3. [自定义](#自定义)
4. [数据项属性别名](#数据项属性别名)
5. [Transfer API](#transfer-api)
   1. [Transfer Props](#transfer-props)
   2. [Transfer Slots](#transfer-slots)
   3. [Transfer Methods](#transfer-methods)
   4. [Transfer Events](#transfer-events)

## 基础用法

Transfer 的数据通过 `data` 属性传入。 数据需要是一个对象数组，每个对象有以下属性：`key` 为数据的唯一性标识，`label` 为显示文本，`disabled` 表示该项数据是否禁止被操作。 目标列表中的数据项会同步到绑定至 `v-model` 的变量，值为数据项的 `key` 所组成的数组。 当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 `v-model` 绑定的变量赋予一个初始值。

列表 1 0/15

Option 1Option 2Option 3Option 4Option 5Option 6Option 7Option 8Option 9Option 10Option 11Option 12Option 13Option 14Option 15

暂无数据

列表 2 0/0

暂无数据

```
<template>
  <li-transfer v-model="value" :data="data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

const generateData = () => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref<Option[]>(generateData());
const value = ref([]);
</script>
```

## 可搜索过滤

在数据很多的情况下，可以对数据进行搜索和过滤。

设置 `filterable` 为 `true` 即可开启搜索模式。 默认情况下，若数据项的 `label` 属性包含搜索关键字，则会在搜索结果中显示。 你也可以使用 `filter-method` 定义自己的搜索逻辑。 `filter-method` 接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。 若方法返回 `true`，则会在搜索结果中显示对应的数据项。

列表 1 0/7

CaliforniaIllinoisMarylandTexasFloridaColoradoConnecticut

暂无数据

列表 2 0/0

暂无数据

```
<template>
  <li-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Option {
  key: number;
  label: string;
  initial: string;
}

const generateData = () => {
  const data: Option[] = [];
  const states = ['California', 'Illinois', 'Maryland', 'Texas', 'Florida', 'Colorado', 'Connecticut '];
  const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT'];
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index],
    });
  });
  return data;
};

const data = ref<Option[]>(generateData());
const value = ref([]);

const filterMethod = (query, item) => {
  return item.initial.toLowerCase().includes(query.toLowerCase());
};
</script>
```

## 自定义

可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案、列表底部的内容区等进行自定义。

可以使用 `titles`、`render-content` 和 `format` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表顶部的勾选状态文案进行自定义。 数据项的渲染还可以使用 `scoped-slot` 进行自定义。 对于列表底部的内容区，提供了两个具名 slot：`left-footer` 和 `right-footer`。 此外，如果希望某些数据项在初始化时就被勾选，可以使用 `left-default-checked` 和 `right-default-checked` 属性。 最后，本例还展示了 `change` 事件的用法。 注意，由于 JSFiddle 不支持 JSX 语法，故该示例无法在 JSFiddle 运行。 但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。

Customize data items using render-content

Source 2/14

Option 2Option 3Option 4Option 5Option 6Option 7Option 8Option 9Option 10Option 11Option 12Option 13Option 14Option 15

暂无数据

Operation

Target 1/1

Option 1

暂无数据

Operation

Customize data items using scoped slot

Source 2/14

2 - Option 23 - Option 34 - Option 45 - Option 56 - Option 67 - Option 78 - Option 89 - Option 910 - Option 1011 - Option 1112 - Option 1213 - Option 1314 - Option 1415 - Option 15

暂无数据

Operation

Target 1/1

1 - Option 1

暂无数据

Operation

```
<template>
  <p style="text-align: center; margin: 0 0 20px">Customize data items using render-content</p>
  <div style="text-align: center">
    <li-transfer
      v-model="leftValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #left-footer>
        <li-button class="transfer-footer" size="small">Operation</li-button>
      </template>
      <template #right-footer>
        <li-button class="transfer-footer" size="small">Operation</li-button>
      </template>
    </li-transfer>
    <p style="text-align: center; margin: 50px 0 20px">Customize data items using scoped slot</p>
    <div style="text-align: center">
      <li-transfer
        v-model="rightValue"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
        :data="data"
        @change="handleChange"
      >
        <template #default="{ option }">
          <span>{{ option.key }} - {{ option.label }}</span>
        </template>
        <template #left-footer>
          <li-button class="transfer-footer" size="small">Operation</li-button>
        </template>
        <template #right-footer>
          <li-button class="transfer-footer" size="small">Operation</li-button>
        </template>
      </li-transfer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { VNode, VNodeProps } from 'vue';

interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

const generateData = (): Option[] => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref(generateData());
const rightValue = ref([1]);
const leftValue = ref([1]);

const renderFunc = (h: (type: string, props: VNodeProps | null, children?: string) => VNode, option: Option) => {
  return h('span', null, option.label);
};
const handleChange = (value: number | string, direction: 'left' | 'right', movedKeys: string[] | number[]) => {
  console.log(value, direction, movedKeys);
};
</script>

<style>
.transfer-footer {
  padding: 6px 5px;
}
</style>
```

## 数据项属性别名

默认情况下，Transfer 仅能识别数据项中的 `key`、`label` 和 `disabled` 字段。 如果你的数据的字段名不同，可以使用 `props` 属性为它们设置别名。

本例中的数据源没有 `key` 和 `label` 字段，在功能上与它们相同的字段名为 `value` 和 `desc`。 因此可以使用`props` 属性为 `key` 和 `label` 设置别名。

列表 1 0/15

Option 1Option 2Option 3Option 4Option 5Option 6Option 7Option 8Option 9Option 10Option 11Option 12Option 13Option 14Option 15

暂无数据

列表 2 0/0

暂无数据

```
<template>
  <li-transfer
    v-model="value"
    :props="{
      key: 'value',
      label: 'desc',
    }"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Option {
  value: number;
  desc: string;
  disabled: boolean;
}

const generateData = () => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref<Option[]>(generateData());
const value = ref([]);
</script>
```

## Transfer API

### Transfer Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | array | — | — |
| data | Transfer 的数据源 | `Array<{ key, label, disabled }>` | — | [ ] |
| filterable | 是否可搜索 | boolean | — | false |
| filter-placeholder | 搜索框占位符 | string | — | Enter keyword |
| filter-method | 自定义搜索方法 | function | — | — |
| target-order | 右侧列表元素的排序策略： 若为 `original`，则保持与数据源相同的顺序； 若为 `push`，则新加入的元素排在最后； 若为 `unshift`，则新加入的元素排在最前 | string | original / push / unshift | original |
| titles | 自定义列表标题 | array | — | ['List 1', 'List 2'] |
| render-content | 自定义数据项渲染函数 | function(h, option) | — | — |
| format | 列表顶部勾选状态文案 | `{ noChecked, hasChecked }` | — | `{ noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' }` |
| props | 数据源的字段别名 | `{ key, label, disabled }` | — | — |
| left-default-checked | 初始状态下左侧列表的已勾选项的 key 数组 | array | — | [ ] |
| right-default-checked | 初始状态下右侧列表的已勾选项的 key 数组 | array | — | [ ] |
| validate-event | 是否触发表单验证 | boolean | - | true |

### Transfer Slots

| 插槽名 | 说明 |
| --- | --- |
| — | 自定义数据项的内容， 参数为 `{ option }` |
| left-footer | 左侧列表底部的内容 |
| right-footer | 右侧列表底部的内容 |

### Transfer Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| clearQuery | 清空某个面板的搜索关键词 | 'left' / 'right' |

### Transfer Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 右侧列表元素变化时触发 | 当前值、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组 |
| left-check-change | 左侧列表元素被用户选中 / 取消选中时触发 | 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组 |
| right-check-change | 右侧列表元素被用户选中 / 取消选中时触发 | 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组 |

最后修改日期： 2025-07-15
