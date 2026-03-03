# Autocomplete 自动补全输入框

Maintainer: 王德师

1. [基础用法](#基础用法)
2. [自定义模板](#自定义模板)
3. [远程搜索](#远程搜索)
4. [Autocomplete API](#autocomplete-api)
   1. [Autocomplete Props](#autocomplete-props)
   2. [Autocomplete Events](#autocomplete-events)
   3. [Autocomplete Slots](#autocomplete-slots)
   4. [Autocomplete Methods](#autocomplete-methods)

根据输入内容提供对应的输入建议。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

## 基础用法

Autodcomplete 组件提供输入建议。

`获取建议` 属性是返回建议输入的方法。 在此示例中， `querySearch(queryString, cb)` 方法通过 `cb(data)` 给 Autocomplete 组件返回建议。

聚焦时展示 suggestions

输入内容时展示 suggestions

自定义控制 suggestions 展示的时机

```
<template>
  <li-row class="demo-autocomplete">
    <li-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600 autocomplete-tip">聚焦时展示 suggestions</div>
      <li-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </li-col>
    <li-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600 autocomplete-tip">输入内容时展示 suggestions</div>
      <li-autocomplete
        v-model="state2"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </li-col>
  </li-row>
  <li-row class="demo-autocomplete">
    <li-col :span="12">
      <div class="sub-title my-2 mb-2 text-sm text-gray-600 autocomplete-tip">自定义控制 suggestions 展示的时机</div>
      <li-autocomplete
        v-model="state3"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        :trigger="handleTrigger"
        @select="handleSelect"
      />
    </li-col>
  </li-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface RestaurantItem {
  value: string;
  link: string;
}

const state1 = ref('');
const state2 = ref('');
const state3 = ref('');

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

const handleTrigger = (queryString: string) => {
  return queryString.length > 2;
};

onMounted(() => {
  restaurants.value = loadAll();
});
</script>

<style scoped>
.autocomplete-tip {
  margin-bottom: 4px;
}

.demo-autocomplete {
  margin-bottom: 16px;
}
</style>
```

## 自定义模板

自定义如何显示输入建议。

使用 `scoped slot` 自定义输入建议。 在这个范围中，你可以使用 `item` 键来访问当前输入建议对象。

```
<template>
  <li-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    popper-class="my-autocomplete"
    placeholder="Please input"
    @select="handleSelect"
  >
    <template #suffix>
      <li-icon class="li-input__icon" @click="handleIconClick">
        <icon-edit-text-editing-o />
      </li-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </li-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { IconEditTextEditingO } from '@chehejia/liui-icons';

interface LinkItem {
  value: string;
  link: string;
}

const state = ref('');
const links = ref<LinkItem[]>([]);

const querySearch = (queryString: string, cb) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;
  // call callback function to return suggestion objects
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};
const handleSelect = (item: LinkItem) => {
  console.log(item);
};

const handleIconClick = (ev: Event) => {
  console.log(ev);
};

onMounted(() => {
  links.value = loadAll();
});
</script>

<style>
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
```

## 远程搜索

从服务端搜索数据。

```
<template>
  <li-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const state = ref('');

interface LinkItem {
  value: string;
  link: string;
}

const links = ref<LinkItem[]>([]);

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};

let timeout: NodeJS.Timeout;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const handleSelect = (item: LinkItem) => {
  console.log(item);
};

onMounted(() => {
  links.value = loadAll();
});
</script>
```

## Autocomplete API

### Autocomplete Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 占位文本 | `string` | — |
| clearable | 是否可清空 | `boolean` | false |
| disabled | 自动补全组件是否被禁用 | `boolean` | false |
| value-key | 输入建议对象中用于显示的键名 | `string` | value |
| model-value / v-model | 选中项绑定值 | `string` | — |
| debounce | 获取输入建议的防抖延时，单位为毫秒 | `number` | 300 |
| placement | 菜单弹出位置 | `enum` 'top' | 'top- start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | bottom-start |
| fetch-suggestions | 获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 `callback(data:[])` 来返回它 | `Function` (queryString: string, callback: callbackfn) => void | — |
| popper-class | 下拉列表的类名 | `string` | — |
| trigger-on-focus | whether show suggestions when input focus | `boolean` | true |
| name | 等价于原生 input `name` 属性 | `string` | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | `boolean` | false |
| label | 输入框关联的 label 文字 | `string` | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | `boolean` | false |
| popper-append-to-body(deprecated) | 是否将下拉列表插入至 body 元素。 在下拉列表的定位出现问题时，可将该属性设置为 false | `boolean` | false |
| teleported | 是否将下拉列表元素插入 append-to 指向的元素下 | `boolean` | true |
| highlight-first-item | 是否默认高亮远程搜索结果的第一项 | `boolean` | false |
| fit-input-width | 下拉框的宽度是否与输入框相同 | `boolean` | true |
| trigger | 控制触发 suggestions 下拉框展示的时机 | `Function` (queryString: string) => boolean | — |

### Autocomplete Events

| 名称 | 详情 | 类型 |
| --- | --- | --- |
| select | 点击选中建议项时触发 | `Function` (item: typeof modelValue | any) => void |
| change | 在 Input 值改变时触发 | `Function` (value: string | number) => void |

### Autocomplete Slots

| 名称 | 描述说明 |
| --- | --- |
| default | 自定义输入建议的内容。 自定义标签，参数为 |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容，在 prefix 之前 |
| append | 输入框后置内容，在 suffix 之后 |

### Autocomplete Methods

| 名称 | 详情 | 类型 |
| --- | --- | --- |
| activated | 自动补全输入框是否被激活 | `object` Ref<boolean> |
| blur | 使 input 失去焦点 | `Function` () => void |
| close | 折叠建议列表 | `Function` () => void |
| focus | 使 input 获取焦点 | `Function` () => void |
| handleSelect | 手动触发选中建议事件 | `Function` (item: any) => promise<void> |
| handleKeyEnter | 手动触发键盘回车事件 | `Function` () => promise<void> |
| highlightedIndex | 当前高亮显示选项的索引 | `object` Ref<number> |
| highlight | 在建议中高亮显示一个项目 | `Function` (itemIndex: number) => void |
| inputRef | li-input 组件实例 | `object` Ref<LiInputInstance> |
| loading | 远程获取提示内容的加载状态指示器 | `object` Ref<boolean> |
| popperRef | li-tooltip 组件实例 | `object` Ref<LiTooltipInstance> |
| suggestions | 获取自动补全结果 | `object` Ref<record<string, any>> |

最后修改日期： 2025-07-15
