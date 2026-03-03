# Collapse 折叠面板

Maintainer: 徐鑫

1. [基础用法](#基础用法)
2. [手风琴效果](#手风琴效果)
3. [隐藏右侧箭头图标](#隐藏右侧箭头图标)
4. [紧凑模式](#紧凑模式)
5. [自定义面板标题](#自定义面板标题)
6. [自定义箭头图标区域](#自定义箭头图标区域)
7. [触发热区](#触发热区)
8. [Collapse API](#collapse-api)
   1. [Collapse Props](#collapse-props)
   2. [Collapse Events](#collapse-events)
   3. [Collapse Slots](#collapse-slots)
9. [CollapseItem API](#collapseitem-api)
   1. [CollapseItem Props](#collapseitem-props)
   2. [CollapseItem Slots](#collapseitem-slots)

通过折叠面板收纳内容区域。

## 基础用法

可同时展开多个面板，面板之间不影响。

Consistency

Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;

Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.

Feedback

Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;

Visual feedback: reflect current state by updating or rearranging elements of the page.

Efficiency

Simplify the process: keep operating process simple and intuitive;

Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;

Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.

Controllability

Decision making: giving advices about operations is acceptable, but do not make decisions for the users;

Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.

```
<template>
  <div class="demo-collapse">
    <li-collapse v-model="activeNames" @change="handleChange">
      <li-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
      </li-collapse-item>
      <li-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their operations by style updates and interactive
          effects;
        </div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </li-collapse-item>
      <li-collapse-item title="Efficiency" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make
          decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps the users to identify and frees them
          from memorizing and recalling.
        </div>
      </li-collapse-item>
      <li-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or
          terminating current operation.
        </div>
      </li-collapse-item>
    </li-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['1']);
const handleChange = (val: string[]) => {
  console.log(val);
};
</script>
```

## 手风琴效果

每次只能展开一个面板。

通过 `accordion` 属性来设置是否以手风琴模式显示。

Consistency

Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;

Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.

Feedback

Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;

Visual feedback: reflect current state by updating or rearranging elements of the page.

Efficiency

Simplify the process: keep operating process simple and intuitive;

Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;

Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.

Controllability

Decision making: giving advices about operations is acceptable, but do not make decisions for the users;

Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.

```
<template>
  <div class="demo-collapse">
    <li-collapse v-model="activeName" accordion>
      <li-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
      </li-collapse-item>
      <li-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their operations by style updates and interactive
          effects;
        </div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </li-collapse-item>
      <li-collapse-item title="Efficiency" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make
          decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps the users to identify and frees them
          from memorizing and recalling.
        </div>
      </li-collapse-item>
      <li-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or
          terminating current operation.
        </div>
      </li-collapse-item>
    </li-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeName = ref('1');
</script>
```

## 隐藏右侧箭头图标

传入 `:show-icon="false"` 隐藏图标。

《阿房宫赋》

嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽锱铢，用之如泥沙？使负栋之柱，多于南亩之农夫；架梁之椽，多于机上之工女； 钉头磷磷，多于在庾之粟粒；瓦缝参差，多于周身之帛缕；直栏横槛，多于九土之城郭；管弦呕哑，多于市人之言语。使天下之人，不敢言而敢怒。 独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！

《阿房宫赋》隐藏了右侧箭头

呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦； 使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。

```
<template>
  <div class="demo-collapse">
    <li-collapse v-model="activeNames" @change="handleChange">
      <li-collapse-item title="《阿房宫赋》" name="2">
        <div>
          嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽锱铢，用之如泥沙？使负栋之柱，多于南亩之农夫；架梁之椽，多于机上之工女；
          钉头磷磷，多于在庾之粟粒；瓦缝参差，多于周身之帛缕；直栏横槛，多于九土之城郭；管弦呕哑，多于市人之言语。使天下之人，不敢言而敢怒。
          独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！
        </div>
      </li-collapse-item>
      <li-collapse-item title="《阿房宫赋》隐藏了右侧箭头" name="1" :show-icon="false">
        <div>
          呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；
          使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。
        </div>
      </li-collapse-item>
    </li-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['1', '2']);
const handleChange = (val: string[]) => {
  console.log(val);
};
</script>
```

## 紧凑模式

设置 `compact` 或 `compact="small"` 开启紧凑模式。

`compact`

Consistency

Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;

Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.

Feedback

Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;

Visual feedback: reflect current state by updating or rearranging elements of the page.

Efficiency

Simplify the process: keep operating process simple and intuitive;

Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;

Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.

Controllability

Decision making: giving advices about operations is acceptable, but do not make decisions for the users;

Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.

`compact="small"`

Consistency

Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;

Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.

Feedback

Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;

Visual feedback: reflect current state by updating or rearranging elements of the page.

Efficiency

Simplify the process: keep operating process simple and intuitive;

Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;

Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.

Controllability

Decision making: giving advices about operations is acceptable, but do not make decisions for the users;

Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.

```
<template>
  <li-row>
    <li-col :span="10">
      <code>compact</code>
      <li-divider />
      <li-collapse v-model="activeNames" compact>
        <li-collapse-item title="Consistency" name="1">
          <div>
            Consistent with real life: in line with the process and logic of real life, and comply with languages and
            habits that the users are used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
            position of elements, etc.
          </div>
        </li-collapse-item>
        <li-collapse-item title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their operations by style updates and interactive
            effects;
          </div>
          <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
        </li-collapse-item>
        <li-collapse-item title="Efficiency" name="3">
          <div>Simplify the process: keep operating process simple and intuitive;</div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make
            decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which helps the users to identify and frees them
            from memorizing and recalling.
          </div>
        </li-collapse-item>
        <li-collapse-item title="Controllability" name="4">
          <div>
            Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or
            terminating current operation.
          </div>
        </li-collapse-item>
      </li-collapse>
    </li-col>
    <li-col :span="10" :offset="2">
      <code>compact="small"</code>
      <li-divider />
      <li-collapse v-model="activeNames" compact="small">
        <li-collapse-item title="Consistency" name="1">
          <div>
            Consistent with real life: in line with the process and logic of real life, and comply with languages and
            habits that the users are used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
            position of elements, etc.
          </div>
        </li-collapse-item>
        <li-collapse-item title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their operations by style updates and interactive
            effects;
          </div>
          <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
        </li-collapse-item>
        <li-collapse-item title="Efficiency" name="3">
          <div>Simplify the process: keep operating process simple and intuitive;</div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make
            decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which helps the users to identify and frees them
            from memorizing and recalling.
          </div>
        </li-collapse-item>
        <li-collapse-item title="Controllability" name="4">
          <div>
            Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or
            terminating current operation.
          </div>
        </li-collapse-item>
      </li-collapse>
    </li-col>
  </li-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['1']);
</script>
```

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

Consistency

Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;

Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.

Feedback

Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;

Visual feedback: reflect current state by updating or rearranging elements of the page.

Efficiency

Simplify the process: keep operating process simple and intuitive;

Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;

Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.

Controllability

Decision making: giving advices about operations is acceptable, but do not make decisions for the users;

Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.

```
<template>
  <div class="demo-collapse">
    <li-collapse accordion>
      <li-collapse-item name="1">
        <template #title>
          Consistency<li-icon class="header-icon">
            <icon-attention-info-o />
          </li-icon>
        </template>
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
      </li-collapse-item>
      <li-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their operations by style updates and interactive
          effects;
        </div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </li-collapse-item>
      <li-collapse-item title="Efficiency" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make
          decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps the users to identify and frees them
          from memorizing and recalling.
        </div>
      </li-collapse-item>
      <li-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or
          terminating current operation.
        </div>
      </li-collapse-item>
    </li-collapse>
  </div>
</template>

<script setup lang="ts">
import { IconAttentionInfoO } from '@chehejia/liui-icons';
</script>
```

## 自定义箭头图标区域

《阿房宫赋》

嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽锱铢，用之如泥沙？使负栋之柱，多于南亩之农夫；架梁之椽，多于机上之工女； 钉头磷磷，多于在庾之粟粒；瓦缝参差，多于周身之帛缕；直栏横槛，多于九土之城郭；管弦呕哑，多于市人之言语。使天下之人，不敢言而敢怒。 独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！

《阿房宫赋》隐藏了右侧箭头

请背诵全文！

呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦； 使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。

```
<template>
  <div class="demo-collapse">
    <li-collapse v-model="activeNames" @change="handleChange">
      <li-collapse-item title="《阿房宫赋》" name="2">
        <div>
          嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽锱铢，用之如泥沙？使负栋之柱，多于南亩之农夫；架梁之椽，多于机上之工女；
          钉头磷磷，多于在庾之粟粒；瓦缝参差，多于周身之帛缕；直栏横槛，多于九土之城郭；管弦呕哑，多于市人之言语。使天下之人，不敢言而敢怒。
          独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！
        </div>
      </li-collapse-item>
      <li-collapse-item title="《阿房宫赋》隐藏了右侧箭头" name="1">
        <template #icon>请背诵全文！</template>
        <div>
          呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；
          使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。
        </div>
      </li-collapse-item>
    </li-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['1', '2']);
const handleChange = (val: string[]) => {
  console.log(val);
};
</script>
```

## 触发热区

整个头部

呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦； 使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。

仅图标

呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦； 使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。

仅图标 + 自定义图标区域

自定义按钮展开

呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦； 使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。

```
<template>
  <div class="demo-collapse">
    <li-collapse v-model="activeNames">
      <li-collapse-item title="整个头部" name="1">
        呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；
        使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。
      </li-collapse-item>
      <li-collapse-item title="仅图标" trigger-area="icon" name="2">
        呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；
        使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。
      </li-collapse-item>
      <li-collapse-item title="仅图标 + 自定义图标区域" trigger-area="icon" name="3">
        <template #icon="{ toggle, isActive }">
          <li-button size="small" type="primary">自定义按钮</li-button>
          <li-button size="small" @click="toggle">{{ isActive ? '收起' : '展开' }}</li-button>
        </template>
        呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；
        使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。
      </li-collapse-item>
    </li-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['1', '2']);
</script>
```

## Collapse API

### Collapse Props

| 名称 | 详情 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | `string`(accordion mode) / `array`(non-accordion mode) | — |
| accordion | 是否手风琴模式 | `boolean` | false |
| compact | 是否开启紧凑模式 | `string` '' | 'small' | - |

### Collapse Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`) | (activeNames: array (non-accordion mode) / string (accordion mode)) |

### Collapse Slots

| 名称 | Description | 子标签 |
| --- | --- | --- |
| - | 自定义默认内容 | Collapse Item |

## CollapseItem API

### CollapseItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标志符 | string/number | — |
| title | 面板标题 | string | — |
| disabled | 是否禁用 | boolean | — |
| show-icon | 是否显示右侧箭头图标 | boolean | true |
| trigger-area | 触发热区，整个头部或者仅图标。`compact` 开启时无效。 | `enum` 'header' | 'icon' | `'header'` |

### CollapseItem Slots

| 插槽名 | 说明 |
| --- | --- |
| — | Collapse Item 的内容 |
| title | Collapse Item 的标题 |
| icon | Collapse Item 的图标 |

最后修改日期： 2025-07-15
