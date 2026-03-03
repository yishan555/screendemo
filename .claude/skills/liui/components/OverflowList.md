# OverflowList 折叠列表

Maintainer: 于斐然

1. [折叠模式 - 默认](#折叠模式-默认)
2. [折叠模式 - 方向](#折叠模式-方向)
3. [折叠模式 - 最小展示的数目](#折叠模式-最小展示的数目)
4. [折叠模式 - 最大展示的数目](#折叠模式-最大展示的数目)
5. [折叠模式 - 在表格中展示](#折叠模式-在表格中展示)
6. [滚动模式](#滚动模式)
7. [OverflowList API](#overflowlist-api)
   1. [OverflowList Props](#overflowlist-props)

OverflowList 是一个行为组件，用于展示列表，并支持自适应来展示尽可能多的项目。因过长而溢出项目将折叠为一个元素。当检测到调整大小时，可见项将被重新计算。

## 折叠模式 - 默认

通过 renderMode="collapse" (默认) 来实现内容的折叠。

第一项

第二项

第三项

第四项

+2

```
<template>
  <li-slider v-model="width" :max="1000" />
  <div :style="rootStyle">
    <li-overflow-list :items="items" :visible-item-renderer="renderVisibleItem" :overflow-renderer="renderOverflow" />
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';

const width = ref(300);

const rootStyle = computed(() => {
  return {
    width: `${width.value}px`,
  };
});

const items = ref([
  {
    name: '第一项',
    key: 'first',
  },
  {
    name: '第二项',
    key: 'second',
  },
  {
    name: '第三项',
    key: 'thirdly',
  },
  {
    name: '第四项',
    key: 'fourth',
  },
  {
    name: '第五项',
    key: 'fifth',
  },
  {
    name: '第六项',
    key: 'sixth',
  },
]);

const renderOverflow = (items) => {
  return items.length ? (
    <li-tooltip placement="top" effect="light">
      {{
        default: () => {
          return (
            <div>
              <li-tag
                type="info"
                effect="light"
                style={{
                  marginRight: '4px',
                  flex: '0 0 auto',
                  minWidth: '38px',
                }}
                disable-transitions
              >
                +{items.length}
              </li-tag>
            </div>
          );
        },
        content: () => {
          return (
            <div>
              {items.map((item) => {
                return (
                  <li-tag style={{ margin: '2px' }} disable-transitions type="info" effect="light">
                    <div style={{ display: 'flex' }}>{item.name}</div>
                  </li-tag>
                );
              })}
            </div>
          );
        },
      }}
    </li-tooltip>
  ) : null;
};

const renderVisibleItem = (item) => {
  return (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      <div style={{ display: 'flex' }}>{item.name}</div>
    </li-tag>
  );
};
</script>
```

## 折叠模式 - 方向

collapse 模式下支持 collapseFrom 设置折叠方向。

+2

第三项

第四项

第五项

第六项

```
<template>
  <li-slider v-model="width" :max="1000" />
  <div :style="rootStyle">
    <li-overflow-list
      :items="items"
      :visible-item-renderer="renderVisibleItem"
      :overflow-renderer="renderOverflow"
      collapse-from="start"
    />
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';

const width = ref(300);

const rootStyle = computed(() => {
  return {
    width: `${width.value}px`,
  };
});

const items = ref([
  {
    name: '第一项',
    key: 'first',
  },
  {
    name: '第二项',
    key: 'second',
  },
  {
    name: '第三项',
    key: 'thirdly',
  },
  {
    name: '第四项',
    key: 'fourth',
  },
  {
    name: '第五项',
    key: 'fifth',
  },
  {
    name: '第六项',
    key: 'sixth',
  },
]);

const renderOverflow = (items) => {
  return items.length ? (
    <li-tag
      type="info"
      effect="light"
      style={{ marginRight: '4px', flex: '0 0 auto', minWidth: '38px' }}
      disable-transitions
    >
      +{items.length}
    </li-tag>
  ) : null;
};

const renderVisibleItem = (item) => {
  return (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      <div style={{ display: 'flex' }}>{item.name}</div>
    </li-tag>
  );
};
</script>
```

## 折叠模式 - 最小展示的数目

collapse 模式下支持 minVisibleItems 设置最小展示的数目。

第一项

第二项

第三项

第四项

+2

```
<template>
  <li-slider v-model="width" :max="1000" />
  <div :style="rootStyle">
    <li-overflow-list
      :items="items"
      :visible-item-renderer="renderVisibleItem"
      :overflow-renderer="renderOverflow"
      :min-visible-items="3"
      :on-overflow="handleOverflow"
    />
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';

const width = ref(300);

const rootStyle = computed(() => {
  return {
    width: `${width.value}px`,
  };
});
const items = ref([
  {
    name: '第一项',
    key: 'first',
  },
  {
    name: '第二项',
    key: 'second',
  },
  {
    name: '第三项',
    key: 'thirdly',
  },
  {
    name: '第四项',
    key: 'fourth',
  },
  {
    name: '第五项',
    key: 'fifth',
  },
  {
    name: '第六项',
    key: 'sixth',
  },
]);

const renderOverflow = (items) => {
  return items.length ? (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      +{items.length}
    </li-tag>
  ) : null;
};

const renderVisibleItem = (item, index) => {
  return (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      <div style={{ display: 'flex' }}>{item.name}</div>
    </li-tag>
  );
};

const handleOverflow = () => {
  console.log('handleOverflow');
};
</script>
```

## 折叠模式 - 最大展示的数目

collapse 模式下支持 maxVisibleItems 设置最大展示的数目，超出此限制，则隐藏。

第一项

第二项

第三项

第四项

+2

```
<template>
  <li-slider v-model="width" :max="1000" />
  <div :style="rootStyle">
    <li-overflow-list
      :items="items"
      :visible-item-renderer="renderVisibleItem"
      :overflow-renderer="renderOverflow"
      :min-visible-items="2"
      :max-visible-items="4"
      :on-overflow="handleOverflow"
    />
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';

const width = ref(300);

const rootStyle = computed(() => {
  return {
    width: `${width.value}px`,
  };
});
const items = ref([
  {
    name: '第一项',
    key: 'first',
  },
  {
    name: '第二项',
    key: 'second',
  },
  {
    name: '第三项',
    key: 'thirdly',
  },
  {
    name: '第四项',
    key: 'fourth',
  },
  {
    name: '第五项',
    key: 'fifth',
  },
  {
    name: '第六项',
    key: 'sixth',
  },
]);

const renderOverflow = (items) => {
  return items.length ? (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      +{items.length}
    </li-tag>
  ) : null;
};

const renderVisibleItem = (item, index) => {
  return (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      <div style={{ display: 'flex' }}>{item.name}</div>
    </li-tag>
  );
};

const handleOverflow = () => {
  console.log('handleOverflow');
};
</script>
```

## 折叠模式 - 在表格中展示

自适应表格列的宽度

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | 第一项  第二项  第三项  +3 |
| 2016-05-02 | Tom | 第一项  第二项  第三项  +3 |
| 2016-05-04 | Tom | 第一项  第二项  第三项  +3 |
| 2016-05-01 | Tom | 第一项  第二项  第三项  +3 |

```
<template>
  <li-table border :data="tableData" style="width: 100%">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address">
      <template #default>
        <li-overflow-list
          :items="items"
          :visible-item-renderer="renderVisibleItem"
          :overflow-renderer="renderOverflow"
        />
      </template>
    </li-table-column>
  </li-table>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';

const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const tableData = ref(data);

const items = ref([
  {
    name: '第一项',
    key: 'first',
  },
  {
    name: '第二项',
    key: 'second',
  },
  {
    name: '第三项',
    key: 'thirdly',
  },
  {
    name: '第四项',
    key: 'fourth',
  },
  {
    name: '第五项',
    key: 'fifth',
  },
  {
    name: '第六项',
    key: 'sixth',
  },
]);

const renderOverflow = (items) => {
  return items.length ? (
    <li-tooltip placement="top" effect="light">
      {{
        default: () => {
          return (
            <div>
              <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
                +{items.length}
              </li-tag>
            </div>
          );
        },
        content: () => {
          return (
            <div>
              {items.map((item) => {
                return (
                  <li-tag style={{ margin: '2px' }} disable-transitions type="info" effect="light">
                    <div style={{ display: 'flex' }}>{item.name}</div>
                  </li-tag>
                );
              })}
            </div>
          );
        },
      }}
    </li-tooltip>
  ) : null;
};

const renderVisibleItem = (item) => {
  return (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      <div style={{ display: 'flex' }}>{item.name}</div>
    </li-tag>
  );
};
</script>
```

## 滚动模式

通过 renderMode="scroll" 来使用滚动模式的折叠列表

+0

第一项

第二项

第三项

第四项

第五项

第六项

+3

```
<template>
  <li-slider v-model="width" :max="1000" />
  <div :style="rootStyle">
    <li-overflow-list
      :items="items"
      :visible-item-renderer="renderVisibleItem"
      :overflow-renderer="renderOverflow"
      render-mode="scroll"
    />
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';

const width = ref(300);

const rootStyle = computed(() => {
  return {
    width: `${width.value}px`,
  };
});

const items = ref([
  {
    name: '第一项',
    key: 'first',
  },
  {
    name: '第二项',
    key: 'second',
  },
  {
    name: '第三项',
    key: 'thirdly',
  },
  {
    name: '第四项',
    key: 'fourth',
  },
  {
    name: '第五项',
    key: 'fifth',
  },
  {
    name: '第六项',
    key: 'sixth',
  },
]);

const renderOverflow = (items) => {
  return items.map((item, index) => (
    <li-tag
      type="info"
      effect="light"
      style={{
        marginRight: index === 0 ? '4px' : '0px',
        marginLeft: index === 1 ? '4px' : '0px',
        flex: '0 0 auto',
        minWidth: '35px',
      }}
      disable-transitions
    >
      +{item.length}
    </li-tag>
  ));
};

const renderVisibleItem = (item) => {
  return (
    <li-tag type="info" effect="light" style={{ marginRight: '4px', flex: '0 0 auto' }} disable-transitions>
      <div style={{ display: 'flex' }}>{item.name}</div>
    </li-tag>
  );
};
</script>
```

## OverflowList API

### OverflowList Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| renderMode | 渲染模式 | `collapse` / `scroll` | - |
| collapseFrom | 折叠方向 | `start` / `end` | - |
| items | 渲染项目 | `object` Record<string, any>[] |  |
| minVisibleItems | 最小展示的可见项数目 | `number` |  |
| onOverflow | 溢出回调 | `Function` (overflowItems: Record<string, any>[]) => void |  |
| overflowRenderer | 溢出项的自定义渲染函数 | `Function` (overflowItems: Record<string, any>[]) => VNode |  |
| visibleItemRenderer | 展示项的自定义渲染函数 | `Function` (item: Record<string, any>, index: number) => VNode |  |
| threshold | 触发溢出回调的阈值(scroll 模式) | `number` |  |

最后修改日期： 2025-07-15
