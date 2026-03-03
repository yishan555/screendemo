# 全局配置

1. [i18n 配置](#i18n-配置)
2. [对按钮进行配置](#对按钮进行配置)
3. [对消息进行配置](#对消息进行配置)
4. [实验性功能](#实验性功能)
5. [Config Provider API](#config-provider-api)
   1. [Config Provider Props](#config-provider-props)
   2. [Button Props](#button-props)
   3. [Message Props](#message-props)
   4. [Config Provider Slots](#config-provider-slots)

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到。

## i18n 配置

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

使用两个属性来提供 i18n 相关配置

Switch Language  

|
|  |

暂无数据

* 1
* 2
* 3
* 4
* 5
* 6
* 10

前往页

共 100 条

```
<template>
  <div>
    <li-button mb-2 @click="toggle">Switch Language</li-button>
    <br />

    <li-config-provider :locale="locale">
      <li-table mb-1 :data="[]" />
      <li-pagination :total="100" />
    </li-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import zhCn from '@chehejia/liui-next/dist/locale/zh-cn';
import en from '@chehejia/liui-next/dist/locale/en';
// import zhCn from '@chehejia/liui-next/dist/locale/zh-cn.mjs'
// import en from '@chehejia/liui-next/dist/locale/en.mjs'

const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn';
};
</script>
```

## 对按钮进行配置

autoInsertSpace

中文

```
<template>
  <div>
    <div m="b-2">
      <li-checkbox v-model="config.autoInsertSpace">autoInsertSpace</li-checkbox>
    </div>

    <li-config-provider :button="config">
      <li-button>中文</li-button>
    </li-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const config = reactive({
  autoInsertSpace: true,
});
</script>
```

## 对消息进行配置

OPEN

```
<template>
  <div>
    <li-config-provider :message="config">
      <li-button @click="open">OPEN</li-button>
    </li-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { LiMessage } from '@chehejia/liui-next';
const config = reactive({
  max: 3,
});
const open = () => {
  LiMessage('This is a message.');
};
</script>
```

## 实验性功能

在本节中，您可以学习如何使用 Config Provider 来提供实验性功能。 现在，我们还没有添加任何实验性功能，但在未来的规划中，我们将添加一些实验性功能。 您可以使用此配置来管理这些功能。

## Config Provider API

### Config Provider Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| locale | 翻译文本对象 | `object` {name: string, el: TranslatePair}  [languages](https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang) | [en](https://github.com/element-plus/element-plus/blob/dev/packages/locale/lang/en.ts) |
| size | 全局组件大小 | `enum` 'large' | 'default' | 'small' | default |
| namespace | 全局组件类名称前缀 (需要配合 [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1) 使用) | `string` | el |
| button | 按钮相关的配置[详细配置见下表](#button-attributes) | `object` {autoInsertSpace?: boolean} | 详见下表 |
| message | 消息相关配置， [详见下表](#message-attributes) | `object` {max?: number} | 详见下表 |
| experimental-features | 将要添加的实验阶段的功能，所有功能都是默认设置为 false | `object` | — |

### Button Props

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | `boolean` | false |

### Message Props

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| max | 可同时显示的消息最大数量 | `number` | — |

### Config Provider Slots

| 名称 | 描述 | Scope |
| --- | --- | --- |
| default | 自定义默认内容 | config: 提供全局配置（从顶部继承） |

最后修改日期： 2025-07-15
