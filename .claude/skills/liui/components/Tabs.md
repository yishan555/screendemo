# Tabs 标签页

Maintainer: 陈尚书

1. [基础用法](#基础用法)
2. [尺寸](#尺寸)
3. [隐藏分割线](#隐藏分割线)
4. [卡片风格的标签](#卡片风格的标签)
5. [填充卡片风格的标签](#填充卡片风格的标签)
6. [带有边框的卡片风格](#带有边框的卡片风格)
7. [盒子风格的标签](#盒子风格的标签)
8. [标签位置的设置](#标签位置的设置)
9. [自定义标签页的内容](#自定义标签页的内容)
10. [动态增减标签页](#动态增减标签页)
11. [自定义增加标签页触发器](#自定义增加标签页触发器)
12. [Tabs API](#tabs-api)
    1. [Tabs Props](#tabs-props)
    2. [Tabs Events](#tabs-events)
    3. [Tabs Slots](#tabs-slots)
13. [TabPane API](#tabpane-api)
    1. [TabPane Props](#tabpane-props)
    2. [TabPane Slots](#tabpane-slots)

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

Tabs 组件提供了选项卡功能， 默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <li-tab-pane label="User" name="first">User</li-tab-pane>
    <li-tab-pane label="Config" name="second">Config</li-tab-pane>
    <li-tab-pane label="Role" name="third">Role</li-tab-pane>
    <li-tab-pane label="Task" name="fourth" disabled>Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 尺寸

使用 `size` 属性额外配置尺寸，可使用 `large` 和 `small` 两种值。

User

Config

Role

Task

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" size="small" @tab-click="handleClick">
    <li-tab-pane label="User" name="first" />
    <li-tab-pane label="Config" name="second" />
    <li-tab-pane label="Role" name="third" />
    <li-tab-pane label="Task" name="fourth" />
  </li-tabs>
  <li-tabs v-model="activeName" @tab-click="handleClick">
    <li-tab-pane label="User" name="first" />
    <li-tab-pane label="Config" name="second" />
    <li-tab-pane label="Role" name="third" />
    <li-tab-pane label="Task" name="fourth" />
  </li-tabs>
  <li-tabs v-model="activeName" size="large" @tab-click="handleClick">
    <li-tab-pane label="User" name="first" />
    <li-tab-pane label="Config" name="second" />
    <li-tab-pane label="Role" name="third" />
    <li-tab-pane label="Task" name="fourth" />
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
```

## 隐藏分割线

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" no-division class="demo-tabs" @tab-click="handleClick">
    <li-tab-pane label="User" name="first">User</li-tab-pane>
    <li-tab-pane label="Config" name="second">Config</li-tab-pane>
    <li-tab-pane label="Role" name="third">Role</li-tab-pane>
    <li-tab-pane label="Task" name="fourth" disabled>Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 卡片风格的标签

你可以设置具有卡片风格的标签。

只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
    <li-tab-pane label="User" name="first">User</li-tab-pane>
    <li-tab-pane label="Config" name="second">Config</li-tab-pane>
    <li-tab-pane label="Role" name="third">Role</li-tab-pane>
    <li-tab-pane label="Task" name="fourth" disabled>Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 填充卡片风格的标签

`type="fill-card"`

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" type="fill-card" class="demo-tabs" @tab-click="handleClick">
    <li-tab-pane label="User" name="first">User</li-tab-pane>
    <li-tab-pane label="Config" name="second">Config</li-tab-pane>
    <li-tab-pane label="Role" name="third">Role</li-tab-pane>
    <li-tab-pane label="Task" name="fourth" disabled>Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 带有边框的卡片风格

你还可以设置标签页为带有边框的卡片

将 `type` 设置为 `border-card`。

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
    <li-tab-pane label="User" name="first">User</li-tab-pane>
    <li-tab-pane label="Config" name="second">Config</li-tab-pane>
    <li-tab-pane label="Role" name="third">Role</li-tab-pane>
    <li-tab-pane label="Task" name="fourth" disabled>Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 盒子风格的标签

`type="box"`

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-tabs v-model="activeName" type="box" class="demo-tabs" @tab-click="handleClick">
    <li-tab-pane label="User" name="first">User</li-tab-pane>
    <li-tab-pane label="Config" name="second">Config</li-tab-pane>
    <li-tab-pane label="Role" name="third">Role</li-tab-pane>
    <li-tab-pane label="Task" name="fourth" disabled>Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@chehejia/liui-next';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 标签位置的设置

可以通过 `tab-position` 设置标签的位置

标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

toprightbottomleft

User

Config

Role

Task

User

Config

Role

Task

```
<template>
  <li-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <li-radio-button label="top">top</li-radio-button>
    <li-radio-button label="right">right</li-radio-button>
    <li-radio-button label="bottom">bottom</li-radio-button>
    <li-radio-button label="left">left</li-radio-button>
  </li-radio-group>

  <li-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <li-tab-pane label="User">User</li-tab-pane>
    <li-tab-pane label="Config">Config</li-tab-pane>
    <li-tab-pane label="Role">Role</li-tab-pane>
    <li-tab-pane label="Task">Task</li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tabPosition = ref('left');
</script>
<style scoped>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}

.li-tabs--right .li-tabs__content,
.li-tabs--left .li-tabs__content {
  height: 100%;
}
</style>
```

## 自定义标签页的内容

可以通过具名插槽来实现自定义标签页的内容

Route

Config

Role

Task

Route

Config

Role

Task

```
<template>
  <li-tabs type="border-card" class="demo-tabs">
    <li-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <li-icon><icon-calendar-date-o /></li-icon>
          <span>Route</span>
        </span>
      </template>
      Route
    </li-tab-pane>
    <li-tab-pane label="Config">Config</li-tab-pane>
    <li-tab-pane label="Role">Role</li-tab-pane>
    <li-tab-pane label="Task">Task</li-tab-pane>
  </li-tabs>
</template>

<script lang="ts" setup>
import { IconCalendarDateO } from '@chehejia/liui-icons';
</script>
<style>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}

.demo-tabs .custom-tabs-label .li-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  margin-left: 4px;
  vertical-align: middle;
}
</style>
```

## 动态增减标签页

设置 `editable` 以允许同时增加和关闭标签。

Tab 1

Tab 2

Tab 1 content

Tab 2 content

```
<template>
  <li-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
    <li-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      {{ item.content }}
    </li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`;
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    });
    editableTabsValue.value = newTabName;
  } else if (action === 'remove') {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }

    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  }
};
</script>
<style>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## 自定义增加标签页触发器

add tab

Tab 1

Tab 2

Tab 1 content

Tab 2 content

```
<template>
  <div style="margin-bottom: 20px">
    <li-button size="small" @click="addTab(editableTabsValue)"> add tab </li-button>
  </div>
  <li-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
    <li-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      {{ item.content }}
    </li-tab-pane>
  </li-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
<style>
.demo-tabs > .li-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}
</style>
```

## Tabs API

### Tabs Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值，选中选项卡的 name | string / number | — | 第一个选项卡的 name |
| type | 风格类型 | `enum` 'card' | 'border-card' | '' | 'box' | 'fill-card' | `card/border-card/fill-card/box` | `''` |
| size | 尺寸 | `enum` '' | 'default' | 'small' | 'large' | `default/small/large` | `default` |
| no-division | 是否隐藏分割线 | boolean | — | false |
| closable | 标签是否可关闭 | boolean | — | false |
| addable | 标签是否可增加 | boolean | — | false |
| editable | 标签是否同时可增加和关闭 | boolean | — | false |
| tab-position | 选项卡所在位置 | string | top/right/bottom/left | top |
| stretch | 标签的宽度是否自撑开 | boolean | - | false |
| before-leave | 切换标签之前的钩子函数， 若返回 `false` 或者返回被 reject 的 `Promise`，则阻止切换。 | Function(activeName, oldActiveName) | — | — |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| tab-click | tab 被选中时触发 | (pane: `TabsPaneContext`, ev: `Event`) |
| tab-change | `activeName` 改变时触发 | (name: `TabPaneName`) |
| tab-remove | 点击 tab 移除按钮时触发 | (name: `TabPaneName`) |
| tab-add | 点击 tab 新增按钮时触发 | — |
| edit | 点击 tab 的新增或移除按钮后触发 | (paneName: `TabPaneName | undefined`, action: `'remove' | 'add'`) |

### Tabs Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| - | 默认插槽 | Tab-pane |

## TabPane API

### TabPane Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 选项卡标题 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string / number | — | 该选项卡在选项卡列表中的序数值，第一个选项卡为 '0' |
| closable | 标签是否可关闭 | boolean | — | false |
| lazy | 标签是否延迟渲染 | boolean | — | false |

### TabPane Slots

| 插槽名 | 说明 |
| --- | --- |
| - | Tab-pane 的内容 |
| label | Tab-pane 的标题内容 |

最后修改日期： 2025-07-15
