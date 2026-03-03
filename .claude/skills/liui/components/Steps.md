# Steps 步骤条

Maintainer: 雷亚光

1. [基础用法](#基础用法)
2. [带描述的步骤条](#带描述的步骤条)
3. [设置步骤间距](#设置步骤间距)
4. [步骤标题行内显示](#步骤标题行内显示)
5. [居中的步骤条](#居中的步骤条)
6. [竖直的步骤条](#竖直的步骤条)
7. [完成的步骤展示为成功状态](#完成的步骤展示为成功状态)
8. [控制单个步骤的状态](#控制单个步骤的状态)
9. [自定义步骤的图标](#自定义步骤的图标)
10. [监听图标点击](#监听图标点击)
11. [Steps API](#steps-api)
    1. [Steps Props](#steps-props)
    2. [Steps Slots](#steps-slots)
12. [Step API](#step-api)
    1. [Step Props](#step-props)
    2. [Step Slots](#step-slots)
    3. [Step Events](#step-events)

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。`active` 代表当前步骤的序号，从 0 开始。

1

步骤一

2

步骤二

3

步骤三

下一步当前步骤序号：1

```
<template>
  <li-steps :active="active">
    <li-step title="步骤一" />
    <li-step title="步骤二" />
    <li-step title="步骤三" />
  </li-steps>

  <li-divider />
  <li-button @click="next">下一步</li-button>
  <li-divider direction="vertical" />当前步骤序号：{{ active }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(1);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
```

## 带描述的步骤条

为每个步骤添加文本描述。

1

诵读预备

《诗经-国风-齐风-东方之日》

2

东方之日兮

彼姝者子、在我室兮。在我室兮、履我即兮。

3

东方之月兮

彼姝者子、在我闼兮。在我闼兮、履我发兮。

4

诵读完毕

```
<template>
  <li-steps :active="1">
    <li-step title="诵读预备" description="《诗经-国风-齐风-东方之日》" />
    <li-step title="东方之日兮" description="彼姝者子、在我室兮。在我室兮、履我即兮。" />
    <li-step title="东方之月兮" description="彼姝者子、在我闼兮。在我闼兮、履我发兮。" />
    <li-step title="诵读完毕" />
  </li-steps>
</template>
```

## 设置步骤间距

设置 `space="140px"` 指定步骤间距

1

诵读预备

2

东方之日兮

彼姝者子、在我室兮。在我室兮、履我即兮。

3

东方之月兮

彼姝者子、在我闼兮。在我闼兮、履我发兮。

4

诵读完毕

```
<template>
  <li-steps :active="1" space="140px">
    <li-step title="诵读预备" />
    <li-step title="东方之日兮" description="彼姝者子、在我室兮。在我室兮、履我即兮。" />
    <li-step title="东方之月兮" description="彼姝者子、在我闼兮。在我闼兮、履我发兮。" />
    <li-step title="诵读完毕" />
  </li-steps>
</template>
```

## 步骤标题行内显示

添加 `inline` 开启，仅在水平模式有效。

1

诵读预备

2

东方之日兮

3

东方之月兮

4

诵读完毕

```
<template>
  <li-steps :active="1" inline>
    <li-step title="诵读预备" description="《诗经-国风-齐风-东方之日》" />
    <li-step title="东方之日兮" description="彼姝者子、在我室兮。在我室兮、履我即兮。" />
    <li-step title="东方之月兮" description="彼姝者子、在我闼兮。在我闼兮、履我发兮。" />
    <li-step title="诵读完毕" />
  </li-steps>
</template>
```

## 居中的步骤条

标题和描述可以居中。

1

诵读预备

《诗经-国风-齐风-东方之日》

2

东方之日兮

彼姝者子、在我室兮。在我室兮、履我即兮。

3

东方之月兮

彼姝者子、在我闼兮。在我闼兮、履我发兮。

4

诵读完毕

```
<template>
  <li-steps :active="1" align-center>
    <li-step title="诵读预备" description="《诗经-国风-齐风-东方之日》" />
    <li-step title="东方之日兮" description="彼姝者子、在我室兮。在我室兮、履我即兮。" />
    <li-step title="东方之月兮" description="彼姝者子、在我闼兮。在我闼兮、履我发兮。" />
    <li-step title="诵读完毕" />
  </li-steps>
</template>
```

## 竖直的步骤条

竖直展示的步骤条。

1

诵读预备

《诗经-国风-齐风-东方之日》

2

东方之日兮

彼姝者子、在我室兮。在我室兮、履我即兮。

3

东方之月兮

彼姝者子、在我闼兮。在我闼兮、履我发兮。

4

诵读完毕

```
<template>
  <li-steps :active="1" direction="vertical" space="60px">
    <li-step title="诵读预备" description="《诗经-国风-齐风-东方之日》" />
    <li-step title="东方之日兮" description="彼姝者子、在我室兮。在我室兮、履我即兮。" />
    <li-step title="东方之月兮" description="彼姝者子、在我闼兮。在我闼兮、履我发兮。" />
    <li-step title="诵读完毕" />
  </li-steps>
</template>
```

## 完成的步骤展示为成功状态

给 `<li-steps />` 添加 `finish-status="success"` 将完成的步骤显示为成功状态。

步骤一

2

步骤二

3

步骤三

4

步骤四

下一步当前步骤序号：1

```
<template>
  <li-steps :active="active" finish-status="success">
    <li-step title="步骤一" />
    <li-step title="步骤二" />
    <li-step title="步骤三" />
    <li-step title="步骤四" />
  </li-steps>

  <li-divider />
  <li-button @click="next">下一步</li-button>
  <li-divider direction="vertical" />当前步骤序号：{{ active }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(1);

const next = () => {
  if (active.value++ > 3) active.value = 0;
};
</script>
```

## 控制单个步骤的状态

通过 `<li-step />` 的 `status` 属性为步骤指定状态，覆盖其内部的状态。

1

wait

2

process

error

success

5

finish

```
<template>
  <li-steps align-center>
    <li-step title="wait" status="wait" />
    <li-step title="process" status="process" />
    <li-step title="error" status="error" />
    <li-step title="success" status="success" />
    <li-step title="finish" status="finish" />
  </li-steps>
</template>
```

## 自定义步骤的图标

通过 `<li-step />` 的 `icon` 属性来为每个步骤设置自定义的图标。

诵读预备

《诗经-国风-齐风-东方之日》

东方之日兮

彼姝者子、在我室兮。在我室兮、履我即兮。

东方之月兮

彼姝者子、在我闼兮。在我闼兮、履我发兮。

诵读完毕

```
<template>
  <li-steps :active="1">
    <li-step title="诵读预备" description="《诗经-国风-齐风-东方之日》" :icon="IconBasicHeartO" />
    <li-step title="东方之日兮" description="彼姝者子、在我室兮。在我室兮、履我即兮。" :icon="IconOtherBookO" />
    <li-step title="东方之月兮" description="彼姝者子、在我闼兮。在我闼兮、履我发兮。" :icon="IconOtherBookO" />
    <li-step title="诵读完毕" :icon="IconOtherSmileO" />
  </li-steps>
</template>

<script lang="ts" setup>
import { IconBasicHeartO, IconOtherBookO, IconOtherSmileO } from '@chehejia/liui-icons';
</script>
```

## 监听图标点击

给 `<li-step />` 添加 `@icon-click="doSomething"` 来监听步骤图标的点击事件。添加监听的对应图标将自动获得 `cursor: pointer;` 样式。

下面的例子允许在步骤间的自由切换。

1

步骤一

2

步骤二

3

步骤三

4

步骤四

```
<template>
  <li-steps :active="active">
    <li-step title="步骤一" @icon-click="active = 0" />
    <li-step title="步骤二" @icon-click="active = 1" />
    <li-step title="步骤三" @icon-click="active = 2" />
    <li-step title="步骤四" @icon-click="active = 3" />
  </li-steps>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
```

## Steps API

### Steps Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| space | 每个 step 的间距，不填写将自适应间距。 支持百分比。 | `string` / `number` | — |
| direction | 显示方向 | `enum` 'vertical' | 'horizontal' | horizontal |
| inline | `direction="horizontal"`时，是否一行展示 | `boolean` | false |
| active | 设置当前激活步骤 | `number` | 0 |
| process-status | 设置当前步骤的状态 | `enum` 'wait' | 'process' | 'finish' | 'error' | 'success' | process |
| finish-status | 设置结束步骤的状态 | `enum` 'wait' | 'process' | 'finish' | 'error' | 'success' | finish |
| align-center | 进行居中对齐 | `boolean` | false |

### Steps Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| - | 默认插槽 | Step |

## Step API

### Step Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| description | 描述文案 | `string` | — |
| icon | Step 组件的自定义图标。 也支持 slot 方式写入 | `string` / `Component` | — |
| status | 设置当前步骤的状态， 不设置则根据 steps 确定状态 | `enum` 'wait' | 'process' | 'finish' | 'error' | 'success' | — |

### Step Slots

| 名称 | 说明 |
| --- | --- |
| icon | 自定义图标 |
| title | 自定义标题 |
| description | 自定义描述文案 |

### Step Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| `icon-click` | 点击图标 | `(event: MouseEvent)` |

最后修改日期： 2025-07-15
