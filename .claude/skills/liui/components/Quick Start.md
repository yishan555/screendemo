# 快速开始

1. [安装](#安装)
2. [使用](#使用)
   1. [1. 按需自动导入 推荐](#_1-按需自动导入-推荐)
   2. [2. 按需手动导入](#_2-按需手动导入)
   3. [3. 完整引入](#_3-完整引入)
   4. [4. CDN 引入](#_4-cdn-引入)
3. [全局配置](#全局配置)
4. [z-index 管理](#z-index-管理)
5. [环境支持](#环境支持)

## 安装

当前最新版本：

[![version badge](https://npm.chehejia.com/badge/v/@chehejia/liui-next.svg?style=flat-square)](https://npm.chehejia.com/package/@chehejia/liui-next)

建议使用包管理器（如 [pnpm](https://pnpm.io/)、[yarn](https://classic.yarnpkg.com/lang/en/) 或 `npm` ）安装 LiUI。

```
# pnpm
$ pnpm add @chehejia/liui-next

# or Yarn
$ yarn add @chehejia/liui-next

# or NPM
$ npm install @chehejia/liui-next --save
```

## 使用

### 1. 按需自动导入 推荐

* 注：手动引入组件会导致自动引入样式失效，若需要手动引入，请一并引入样式文件

[Fed CLI 脚手架](https://npm.chehejia.com/package/@chehejia/fed-cli) 提供的 Vue3 模板已内置以下配置。

首先你需要安装 `unplugin-vue-components`、`unplugin-auto-import`、`@chehejia/liui-next-resolver` 这三款插件。

```
# pnpm
$ pnpm add -D unplugin-vue-components unplugin-auto-import @chehejia/liui-next-resolver

# or Yarn
$ yarn add -D unplugin-vue-components unplugin-auto-import @chehejia/liui-next-resolver

# or NPM
$ npm install -D unplugin-vue-components unplugin-auto-import @chehejia/liui-next-resolver
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中。

WARNING

使用方法调用的模式使用组件时，例如 `LiMessage` 及 `LiMessageBox`，需手动引入方法及样式。

```
import { LiMessage, LiMessageBox } from '@chehejia/liui-next'
import '@chehejia/liui-next/es/components/message/style/css'
import '@chehejia/liui-next/es/components/message-box/style/css'
```

#### Vite

```
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { LiUINextResolver } from '@chehejia/liui-next-resolver'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [LiUINextResolver()],
    }),
    Components({
      resolvers: [LiUINextResolver()],
    }),
  ],
})
```

#### Webpack

```
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { LiUINextResolver } = require('@chehejia/liui-next-resolver')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [LiUINextResolver()],
    }),
    Components({
      resolvers: [LiUINextResolver()],
    }),
  ],
}
```

### 2. 按需手动导入

LiUI 提供了基于 ES Module 开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能，但是需要手动导入样式。

```
import { LiButton } from '@chehejia/liui-next'
import '@chehejia/liui-next/es/components/button/style/css'
```

如果不想手动导入样式，可以使用 [vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import/blob/main/README.zh_CN.md) 插件来帮我们自动导入样式。

### 3. 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```
// main.ts
import { createApp } from 'vue'
import LiUINext from '@chehejia/liui-next'
import '@chehejia/liui-next/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(LiUINext)
app.mount('#app')
```

### 4. CDN 引入

WARNING

2.2.11 以前的版本请使用 <https://s.ampmake.com> 地址作为前缀

css 导入

```
<link rel="stylesheet" href="https://p.ampmake.com/fed/liui-next/v2.2.11/index.css" />
```

esm 包导入

```
<script type="module" src="https://p.ampmake.com/fed/liui-next/v2.2.11/index.full.esm.min.js"></script>
```

#### 完整引入的 Volar 支持

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@chehejia/liui-next/global"]
  }
}
```

## 全局配置

在引入 LiUI 时，可以传入一个包含 `size` 属性的全局配置对象。 `size` 用于设置表单组件的默认尺寸。

完整引入：

```
import { createApp } from 'vue'
import LiUINext from '@chehejia/liui-next'
import App from './App.vue'

const app = createApp(App)
app.use(LiUINext, { size: 'small' })
```

按需引入：

```
<template>
  <li-config-provider :size="size">
    <app />
  </li-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { LiConfigProvider } from '@chehejia/liui-next'

export default defineComponent({
  components: {
    LiConfigProvider,
  },
  setup() {
    return {
      size: 'small',
    }
  },
})
</script>
```

## z-index 管理

LiUI Next 按照 [z-index 管理规范](https://li.feishu.cn/docx/KJdRdOMCVoxjv4xsLQ2cie47nMe)管理组件的 z-index。 请查阅并遵循此规则来管理项目中的 z-index。

## 环境支持

LiUI Next 可以在支持 [ES2018](https://caniuse.com/?feats=mdn-javascript_builtins_regexp_dotall,mdn-javascript_builtins_regexp_lookbehind_assertion,mdn-javascript_builtins_regexp_named_capture_groups,mdn-javascript_builtins_regexp_property_escapes,mdn-javascript_builtins_symbol_asynciterator,mdn-javascript_functions_method_definitions_async_generator_methods,mdn-javascript_grammar_template_literals_template_literal_revision,mdn-javascript_operators_destructuring_rest_in_objects,mdn-javascript_operators_spread_spread_in_destructuring,promise-finally) 和 [ResizeObserver](https://caniuse.com/resizeobserver) 的浏览器上运行。 如果您确实需要支持旧版本的浏览器，请自行添加 [Babel](https://babeljs.io/) 和相应的 Polyfill 。

由于 Vue 3 不再支持 IE11，LiUI Next 也不再支持 IE 浏览器。

| IE | Firefox | Chrome | Safari |
| --- | --- | --- | --- |
| Edge ≥ 79 | Firefox ≥ 78 | Chrome ≥ 64 | Safari ≥ 12 |

最后修改日期： 2025-07-15
