# Table 表格

Maintainer: 段扬帅

1. [基础表格](#基础表格)
2. [带斑马纹表格](#带斑马纹表格)
3. [带边框表格](#带边框表格)
4. [带状态表格](#带状态表格)
5. [固定表头](#固定表头)
6. [固定列](#固定列)
7. [固定列和表头](#固定列和表头)
8. [流体高度](#流体高度)
9. [多级表头](#多级表头)
10. [单选](#单选)
11. [多选](#多选)
12. [排序](#排序)
13. [筛选](#筛选)
14. [自定义列模板](#自定义列模板)
15. [自定义表头](#自定义表头)
16. [展开行](#展开行)
17. [树形数据与懒加载](#树形数据与懒加载)
18. [表尾合计行](#表尾合计行)
19. [合并行或列](#合并行或列)
20. [自定义索引](#自定义索引)
21. [表格布局](#表格布局)
22. [Table API](#table-api)
    1. [Table Props](#table-props)
    2. [Table Events](#table-events)
    3. [Table Methods](#table-methods)
    4. [Table Slots](#table-slots)
23. [TableColumn API](#tablecolumn-api)
    1. [TableColumn Props](#tablecolumn-props)
    2. [TableColumn Slots](#tablecolumn-slots)
24. [常见问题解答（FAQ）](#常见问题解答（faq）)

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

基础的表格展示用法。

当 `li-table` 元素中注入 `data` 对象数组后，在 `li-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名，可以使用 `width` 属性来定义列宽。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" style="width: 100%">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
const tableData = [
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
</script>
```

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

`stripe` 可以创建带斑马纹的表格。如果为 `true`，表格将会带有斑马纹。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" stripe style="width: 100%">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
const tableData = [
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
</script>
```

## 带边框表格

默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用 `border` 属性，把该属性设置为 `true` 即可启用。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" border style="width: 100%">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
const tableData = [
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
</script>
```

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

可以通过指定 Table 组件的 `row-class-name` 属性来为 Table 中的某一行添加 class，这样就可以自定义每一行的样式了。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  address: string;
}

const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
  if (rowIndex === 1) {
    return 'warning-row';
  } else if (rowIndex === 3) {
    return 'success-row';
  }
  return '';
};

const tableData: User[] = [
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
</script>

<style>
.li-table .warning-row {
  --li-table-tr-bg-color: var(--li-color-warning-200);
}
.li-table .success-row {
  --li-table-tr-bg-color: var(--li-color-success-200);
}
</style>
```

## 固定表头

纵向内容过多时，可选择固定表头。

只要在 `li-table` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-08 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-06 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-07 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" height="250" style="width: 100%">
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
const tableData = [
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
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
```

## 固定列

横向内容过多时，可选择固定列。

固定列需要使用 `fixed` 属性，它接受 `Boolean` 值。如果为 `true`，列将被左侧固定。它还接受传入字符串，left 或 right，表示左边固定还是右边固定。

| Date | Name | State | City | Address | Zip | Operations |
| --- | --- | --- | --- | --- | --- | --- |

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| 2016-05-03 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 查看编辑 |
| 2016-05-02 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 查看编辑 |
| 2016-05-04 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 查看编辑 |
| 2016-05-01 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 查看编辑 |

```
<template>
  <li-table :data="tableData" style="width: 100%">
    <li-table-column fixed prop="date" label="Date" width="150" />
    <li-table-column prop="name" label="Name" width="120" />
    <li-table-column prop="state" label="State" width="120" />
    <li-table-column prop="city" label="City" width="120" />
    <li-table-column prop="address" label="Address" width="600" />
    <li-table-column prop="zip" label="Zip" width="120" />
    <li-table-column fixed="right" label="Operations" width="130">
      <template #default>
        <li-button text type="primary" @click="handleClick">查看</li-button>
        <li-button text type="primary">编辑</li-button>
      </template>
    </li-table-column>
  </li-table>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('click');
};

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
];
</script>
```

## 固定列和表头

当您有大量数据块放入表中，您可以同时固定表头和列。

固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

| Date | Name | State | City | Address | Zip |
| --- | --- | --- | --- | --- | --- |

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| 2016-05-03 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-02 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-04 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-01 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-08 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-06 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-07 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |

```
<template>
  <li-table :data="tableData" style="width: 100%" height="250">
    <li-table-column fixed prop="date" label="Date" width="150" />
    <li-table-column prop="name" label="Name" width="120" />
    <li-table-column prop="state" label="State" width="120" />
    <li-table-column prop="city" label="City" width="320" />
    <li-table-column prop="address" label="Address" width="600" />
    <li-table-column prop="zip" label="Zip" width="120" />
  </li-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];
</script>
```

## 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

通过设置 `max-height` 属性为 `li-table` 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。

| Date | Name | State | City | Address | Zip | Operations |
| --- | --- | --- | --- | --- | --- | --- |

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| 2016-05-01 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 删除 |
| 2016-05-02 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 删除 |
| 2016-05-03 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 | 删除 |

添加

```
<template>
  <li-table :data="tableData" style="width: 100%" max-height="250">
    <li-table-column fixed prop="date" label="Date" width="150" />
    <li-table-column prop="name" label="Name" width="120" />
    <li-table-column prop="state" label="State" width="120" />
    <li-table-column prop="city" label="City" width="120" />
    <li-table-column prop="address" label="Address" width="600" />
    <li-table-column prop="zip" label="Zip" width="120" />
    <li-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <li-button text type="danger" @click.prevent="deleteRow(scope.$index)"> 删除 </li-button>
      </template>
    </li-table-column>
  </li-table>
  <li-button class="mt-4" style="width: 100%" @click="onAddItem">添加</li-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const now = new Date();

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]);

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};

const onAddItem = () => {
  now.setDate(now.getDate() + 1);
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  });
};
</script>
```

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

只需要将 li-table-column 放置于 li-table-column 中，你可以实现组头。

| Date | Delivery Info | | | | |
| --- | --- | --- | --- | --- | --- |
| Name | Address Info | | | |
| State | City | Address | Zip |

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| 2016-05-03 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-02 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-04 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-01 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-08 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-06 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |
| 2016-05-07 | Tom | California | Los Angeles | No. 189, Grove St, Los Angeles | CA 90036 |

```
<template>
  <li-table :data="tableData" style="width: 100%">
    <li-table-column prop="date" label="Date" width="150" />
    <li-table-column label="Delivery Info">
      <li-table-column prop="name" label="Name" width="120" />
      <li-table-column label="Address Info">
        <li-table-column prop="state" label="State" width="120" />
        <li-table-column prop="city" label="City" width="120" />
        <li-table-column prop="address" label="Address" />
        <li-table-column prop="zip" label="Zip" width="120" />
      </li-table-column>
    </li-table-column>
  </li-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];
</script>
```

## 单选

选择单行数据时使用色块表示。

Table 组件提供了单选的支持，只需要配置 `highlight-current-row` 属性即可实现单选。之后由 `current-change` 事件来管理选中时触发的事件，它会传入 `currentRow`，`oldCurrentRow`。如果需要显示索引，可以增加一列 `li-table-column`，设置 `type` 属性为 `index` 即可显示从 1 开始的索引号。

|  | Date | Name | Address |
| --- | --- | --- | --- |

|  |  |  |  |
| --- | --- | --- | --- |
| 1 | 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2 | 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 3 | 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 4 | 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

Select second rowClear selection

```
<template>
  <li-table
    ref="singleTableRef"
    :data="tableData"
    highlight-current-row
    style="width: 100%"
    @current-change="handleCurrentChange"
  >
    <li-table-column type="index" width="50" />
    <li-table-column property="date" label="Date" width="120" />
    <li-table-column property="name" label="Name" width="120" />
    <li-table-column property="address" label="Address" />
  </li-table>
  <div style="margin-top: 20px">
    <li-button @click="setCurrent(tableData[1])">Select second row</li-button>
    <li-button @click="setCurrent()">Clear selection</li-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiTable } from '@chehejia/liui-next';

interface User {
  date: string;
  name: string;
  address: string;
}

const currentRow = ref();
const singleTableRef = ref<InstanceType<typeof LiTable>>();

const setCurrent = (row?: User) => {
  singleTableRef.value!.setCurrentRow(row);
};
const handleCurrentChange = (val: User | undefined) => {
  currentRow.value = val;
};
const tableData: User[] = [
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
</script>
```

## 多选

你也可以选择多行。

实现多选非常简单: 手动添加一个 `li-table-column`，设 `type` 属性为 `selection` 即可；除了多选，这里还使用到了 `show-overflow-tooltip`属性。默认情况下，如果单元格内容过长，会占用多行显示。若需要单行显示可以使用 `show-overflow-tooltip` 属性，它接受一个 `Boolean`，为 `true` 时多余的内容会在 hover 时以 tooltip 的形式显示出来。

|  | Date | Name | Address |
| --- | --- | --- | --- |

|  |  |  |  |
| --- | --- | --- | --- |
|  | 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
|  | 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
|  | 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
|  | 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |
|  | 2016-05-08 | Tom | No. 189, Grove St, Los Angeles |
|  | 2016-05-06 | Tom | No. 189, Grove St, Los Angeles |
|  | 2016-05-07 | Tom | No. 189, Grove St, Los Angeles |

Toggle selection status of second and third rowsClear selection

```
<template>
  <li-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <li-table-column type="selection" width="55" />
    <li-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </li-table-column>
    <li-table-column property="name" label="Name" width="120" />
    <li-table-column property="address" label="Address" show-overflow-tooltip />
  </li-table>
  <div style="margin-top: 20px">
    <li-button @click="toggleSelection([tableData[1], tableData[2]])"
      >Toggle selection status of second and third rows</li-button
    >
    <li-button @click="toggleSelection()">Clear selection</li-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiTable } from '@chehejia/liui-next';

interface User {
  date: string;
  name: string;
  address: string;
}

const multipleTableRef = ref<InstanceType<typeof LiTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const tableData: User[] = [
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
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
```

## 排序

对表格进行排序，可快速查找或对比数据。

在列中设置 `sortable` 属性即可实现以该列为基准的排序，接受一个 `Boolean`，默认为 `false`。可以通过 Table 的 `default-sort` 属性设置默认的排序列和排序顺序。可以使用 `sort-method` 或者 `sort-by` 使用自定义的排序规则。如果需要后端排序，需将 `sortable` 设置为 `custom`，同时在 Table 上监听 `sort-change` 事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了 `formatter` 属性，它用于格式化指定列的值，接受一个 `Function`，会传入两个参数：`row` 和 `column`，可以根据自己的需求进行处理。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
    <li-table-column prop="date" label="Date" sortable width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" :formatter="formatter" />
  </li-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from '@chehejia/liui-next';

interface User {
  date: string;
  name: string;
  address: string;
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};

const tableData: User[] = [
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
</script>
```

## 筛选

对表格进行筛选，可快速查找到自己想看的数据。

在列中设置 `filters` 和 `filter-method` 属性即可开启该列的筛选，filters 是一个数组，`filter-method` 是一个方法，它用于决定某些数据是否显示，会传入三个参数：`value`，`row` 和 `column`。

reset date filterreset all filters

| Date | Name | Address | Tag |
| --- | --- | --- | --- |

|  |  |  |  |
| --- | --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles | Home |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles | Office |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles | Home |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles | Office |

```
<template>
  <li-button @click="resetDateFilter">reset date filter</li-button>
  <li-button @click="clearFilter">reset all filters</li-button>
  <li-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <li-table-column
      prop="date"
      label="Date"
      sortable
      width="180"
      column-key="date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' },
      ]"
      :filter-multiple="false"
      :filter-method="filterHandler"
    />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" :formatter="formatter" />

    <li-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <li-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</li-tag>
      </template>
    </li-table-column>
  </li-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TableColumnCtx, TableInstance } from '@chehejia/liui-next';

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}

const tableRef = ref<TableInstance>();

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date']);
};
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter();
};
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};
const filterTag = (value: string, row: User) => {
  return row.tag === value;
};
const filterHandler = (value: string, row: User, column: TableColumnCtx<User>) => {
  const property = column['property'];
  return row[property] === value;
};

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
];
</script>
```

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。

通过 `slot` 可以获取到 row，column，$index 和 store（table 内部的状态管理）的数据，用法参考 demo。

| Date | Name | Operations |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | EditDelete |
| 2016-05-02 | Tom | EditDelete |
| 2016-05-04 | Tom | EditDelete |
| 2016-05-01 | Tom | EditDelete |

```
<template>
  <li-table :data="tableData" style="width: 100%">
    <li-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <li-icon><icon-attention-time-o /></li-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </li-table-column>
    <li-table-column label="Name" width="180">
      <template #default="scope">
        <li-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <li-tag>{{ scope.row.name }}</li-tag>
          </template>
        </li-popover>
      </template>
    </li-table-column>
    <li-table-column label="Operations">
      <template #default="scope">
        <li-button @click="handleEdit(scope.$index, scope.row)">Edit</li-button>
        <li-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</li-button>
      </template>
    </li-table-column>
  </li-table>
</template>

<script lang="ts" setup>
import { IconAttentionTimeO } from '@chehejia/liui-icons';

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
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
</script>
```

## 自定义表头

表头支持自定义。

通过设置 [slot](https://v3.vuejs.org/guide/component-slots.html) 来自定义表头。

| Date | Name |  |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | EditDelete |
| 2016-05-02 | John | EditDelete |
| 2016-05-04 | Morgan | EditDelete |
| 2016-05-01 | Jessy | EditDelete |

```
<template>
  <li-table :data="filterTableData" style="width: 100%">
    <li-table-column label="Date" prop="date" />
    <li-table-column label="Name" prop="name" />
    <li-table-column align="right">
      <template #header>
        <li-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <li-button @click="handleEdit(scope.$index, scope.row)">Edit</li-button>
        <li-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</li-button>
      </template>
    </li-table-column>
  </li-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

interface User {
  date: string;
  name: string;
  address: string;
}

const search = ref('');
const filterTableData = computed(() =>
  tableData.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())),
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
```

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

通过设置 `type="expand"` 和 slot 可以开启展开行功能，`li-table-column` 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 slot 相同。

switch parent border:switch child border:

|  | Date | Name |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
|  | 2016-05-03 | Tom |
|  | 2016-05-02 | Tom |
|  | 2016-05-04 | Tom |
|  | 2016-05-01 | Tom |
|  | 2016-05-08 | Tom |
|  | 2016-05-06 | Tom |
|  | 2016-05-07 | Tom |

```
<template>
  switch parent border: <li-switch v-model="parentBorder" /> switch child border: <li-switch v-model="childBorder" />
  <li-table :data="tableData" :border="parentBorder" style="width: 100%">
    <li-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">State: {{ props.row.state }}</p>
          <p m="t-0 b-2">City: {{ props.row.city }}</p>
          <p m="t-0 b-2">Address: {{ props.row.address }}</p>
          <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
          <h3>Family</h3>
          <li-table :data="props.row.family" :border="childBorder">
            <li-table-column label="Name" prop="name" />
            <li-table-column label="State" prop="state" />
            <li-table-column label="City" prop="city" />
            <li-table-column label="Address" prop="address" />
            <li-table-column label="Zip" prop="zip" />
          </li-table>
        </div>
      </template>
    </li-table-column>
    <li-table-column label="Date" prop="date" />
    <li-table-column label="Name" prop="name" />
  </li-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
];
</script>
```

## 树形数据与懒加载

支持树类型的数据的显示。当 row 中包含 `children` 字段时，被视为树形数据。渲染嵌套数据需要 prop 的 `row-key`。此外，子行数据可以异步加载。设置 Table 的 `lazy` 属性为 true 与加载函数 `load`。通过指定 row 中的 `hasChildren` 字段来指定哪些行是包含子节点。`children` 与 `hasChildren` 都可以通过 `tree-props` 配置。

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-02 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-04 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-01 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-01 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-01 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-03 | wangxiaohu | No. 189, Grove St, Los Angeles |

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-02 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-04 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-01 | wangxiaohu | No. 189, Grove St, Los Angeles |
| 2016-05-03 | wangxiaohu | No. 189, Grove St, Los Angeles |

```
<template>
  <div>
    <li-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
      <li-table-column prop="date" label="Date" sortable />
      <li-table-column prop="name" label="Name" sortable />
      <li-table-column prop="address" label="Address" sortable />
    </li-table>

    <li-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <li-table-column prop="date" label="Date" />
      <li-table-column prop="name" label="Name" />
      <li-table-column prop="address" label="Address" />
    </li-table>
  </div>
</template>
<script lang="ts" setup>
interface User {
  id: number;
  date: string;
  name: string;
  address: string;
  hasChildren?: boolean;
  children?: User[];
}

const load = (row: User, treeNode: unknown, resolve: (date: User[]) => void) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]);
  }, 1000);
};

const tableData: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const tableData1: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    hasChildren: true,
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
```

## 表尾合计行

若表格展示的是各类数字，可以在表尾显示各列的合计。

将 `show-summary` 设置为 `true` 就会在表格尾部展示合计行。默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过 `sum-text` 配置），其余列会将本列所有数值进行求合操作，并显示出来。当然，你也可以定义自己的合计逻辑。使用 `summary-method` 并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，具体可以参考本例中的第二个表格。

| ID | Name | Amount 1 | Amount 2 | Amount 3 |
| --- | --- | --- | --- | --- |

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| 12987122 | Tom | 234 | 3.2 | 10 |
| 12987123 | Tom | 165 | 4.43 | 12 |
| 12987124 | Tom | 324 | 1.9 | 9 |
| 12987125 | Tom | 621 | 2.2 | 17 |
| 12987126 | Tom | 539 | 4.1 | 15 |

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| 合计 |  | 1883 | 15.83 | 63 |

| ID | Name | Cost 1 ($) | Cost 2 ($) | Cost 3 ($) |
| --- | --- | --- | --- | --- |

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| 12987122 | Tom | 234 | 3.2 | 10 |
| 12987123 | Tom | 165 | 4.43 | 12 |
| 12987124 | Tom | 324 | 1.9 | 9 |
| 12987125 | Tom | 621 | 2.2 | 17 |
| 12987126 | Tom | 539 | 4.1 | 15 |

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Total Cost | N/A | $ 1883 | $ 15.83 | $ 63 |

```
<template>
  <li-table :data="tableData" border show-summary style="width: 100%">
    <li-table-column prop="id" label="ID" width="180" />
    <li-table-column prop="name" label="Name" />
    <li-table-column prop="amount1" sortable label="Amount 1" />
    <li-table-column prop="amount2" sortable label="Amount 2" />
    <li-table-column prop="amount3" sortable label="Amount 3" />
  </li-table>

  <li-table
    :data="tableData"
    border
    height="200"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px"
  >
    <li-table-column prop="id" label="ID" width="180" />
    <li-table-column prop="name" label="Name" />
    <li-table-column prop="amount1" label="Cost 1 ($)" />
    <li-table-column prop="amount2" label="Cost 2 ($)" />
    <li-table-column prop="amount3" label="Cost 3 ($)" />
  </li-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from '@chehejia/liui-next';

interface Product {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[];
  data: T[];
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = 'Total Cost';
      return;
    }
    const values = data.map((item) => Number(item[column.property]));
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!Number.isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0)}`;
    } else {
      sums[index] = 'N/A';
    }
  });

  return sums;
};

const tableData: Product[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
];
</script>
```

## 合并行或列

多行或多列共用一个数据时，可以合并行或列。

通过给 table 传入 `span-method` 方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行 `row`、当前列 `column`、当前行号 `rowIndex`、当前列号 `columnIndex` 四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表 `rowspan`，第二个元素代表 `colspan`。 也可以返回一个键名为 `rowspan` 和 `colspan` 的对象。

| ID | Name | Amount 1 | Amount 2 | Amount 3 |
| --- | --- | --- | --- | --- |

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| 12987122 | | 234 | 3.2 | 10 |
| 12987123 | Tom | 165 | 4.43 | 12 |
| 12987124 | | 324 | 1.9 | 9 |
| 12987125 | Tom | 621 | 2.2 | 17 |
| 12987126 | | 539 | 4.1 | 15 |

| ID | Name | Amount 1 | Amount 2 | Amount 3 |
| --- | --- | --- | --- | --- |

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| 12987122 | Tom | 234 | 3.2 | 10 |
| Tom | 165 | 4.43 | 12 |
| 12987124 | Tom | 324 | 1.9 | 9 |
| Tom | 621 | 2.2 | 17 |
| 12987126 | Tom | 539 | 4.1 | 15 |

```
<template>
  <div>
    <li-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%">
      <li-table-column prop="id" label="ID" width="180" />
      <li-table-column prop="name" label="Name" />
      <li-table-column prop="amount1" sortable label="Amount 1" />
      <li-table-column prop="amount2" sortable label="Amount 2" />
      <li-table-column prop="amount3" sortable label="Amount 3" />
    </li-table>

    <li-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <li-table-column prop="id" label="ID" width="180" />
      <li-table-column prop="name" label="Name" />
      <li-table-column prop="amount1" label="Amount 1" />
      <li-table-column prop="amount2" label="Amount 2" />
      <li-table-column prop="amount3" label="Amount 3" />
    </li-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from '@chehejia/liui-next';

interface User {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2];
    } else if (columnIndex === 1) {
      return [0, 0];
    }
  }
};

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }
};

const tableData: User[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
];
</script>
```

## 自定义索引

自定义 `type=index` 列的行号。

通过给 `type=index` 的列传入 index 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。也可以传入一个方法，它提供当前行的行号（从 `0` 开始）作为参数，返回值将作为索引展示。

|  | Date | Name | Address |
| --- | --- | --- | --- |

|  |  |  |  |
| --- | --- | --- | --- |
| 0 | 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2 | 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 4 | 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 6 | 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-table :data="tableData" style="width: 100%">
    <li-table-column type="index" :index="indexMethod" />
    <li-table-column prop="date" label="Date" width="180" />
    <li-table-column prop="name" label="Name" width="180" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
const indexMethod = (index: number) => {
  return index * 2;
};
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
];
</script>
```

## 表格布局

通过属性 [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) 可以指定表格中单元格、行和列的布局方式。

fixedauto

| Date | Name | Address |
| --- | --- | --- |

|  |  |  |
| --- | --- | --- |
| 2016-05-03 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-02 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-04 | Tom | No. 189, Grove St, Los Angeles |
| 2016-05-01 | Tom | No. 189, Grove St, Los Angeles |

```
<template>
  <li-radio-group v-model="tableLayout">
    <li-radio-button label="fixed" />
    <li-radio-button label="auto" />
  </li-radio-group>
  <li-table :data="tableData" :table-layout="tableLayout">
    <li-table-column prop="date" label="Date" />
    <li-table-column prop="name" label="Name" />
    <li-table-column prop="address" label="Address" />
  </li-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableLayout = ref('fixed');

const tableData = [
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
</script>
```

## Table API

### Table Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 显示的数据 | `array` | — |
| height | Table 的高度， 默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 `style.height` 的值，Table 的高度会受控于外部样式 | `string | number` | — |
| max-height | Table 的最大高度。 合法的值为数字或者单位为 px 的高度 | `string | number` | — |
| stripe | 是否为斑马纹 table | `boolean` | false |
| border | 是否带有纵向边框 | `boolean` | false |
| size | Table 的尺寸 | `string` 'large' | 'default' | 'small' | — |
| fit | 列的宽度是否自撑开 | `boolean` | true |
| show-header | 是否显示表头 | `boolean` | true |
| highlight-current-row | 是否要高亮当前行 | `boolean` | false |
| current-row-key | 当前行的 key，只写属性 | `string | number` | — |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className | `function({ row, rowIndex }) / string` | — |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style | `function({ row, rowIndex }) / object` | — |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className | `function({ row, column, rowIndex, columnIndex }) / string` | — |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style | `function({ row, column, rowIndex, columnIndex }) / object` | — |
| header-row-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className | `function({ row, rowIndex }) / string` | — |
| header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style | `function({ row, rowIndex }) / object` | — |
| header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className | `function({ row, column, rowIndex, columnIndex }) / string` | — |
| header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style | `function({ row, column, rowIndex, columnIndex }) / object` | — |
| row-key | 行数据的 Key，用来优化 Table 的渲染； 在使用`reserve-selection`功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | `function(row) | string` | — |
| empty-text | 空数据时显示的文本内容， 也可以通过 `#empty` 设置 | `string` | `No Data` |
| default-expand-all | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | `boolean` | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组 | `array` | — |
| default-sort | 默认的排序列的 prop 和顺序。 它的 `prop` 属性指定默认的排序的列，`order` 指定默认排序的顺序 | `object` { order: 'ascending} | { order: 'descending'} | 如果 `prop` 已配置, 同时 `order` 未配置, 那么 `order` 默认为升序 |
| tooltip-effect | tooltip `effect` 属性 | `string` 'dark' | 'light' | dark |
| show-summary | 是否在表尾显示合计行 | `boolean` | false |
| sum-text | 合计行第一列的文本 | `string` | 合计 |
| summary-method | 自定义的合计计算方法 | `function({ columns, data })` | — |
| span-method | 合并行或列的计算方法 | `function({ row, column, rowIndex, columnIndex })` | — |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行 | `boolean` | true |
| indent | 展示树形数据时，树节点的缩进 | `number` | 16 |
| lazy | 是否懒加载子节点数据 | `boolean` | — |
| load | 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 | `function(row, treeNode, resolve)` | — |
| tree-props | 渲染嵌套数据的配置选项 | `object` | `{ hasChildren: 'hasChildren', children: 'children'}` |
| table-layout | 设置表格单元、行和列的布局方式 | `string` 'fixed' | 'auto' | fixed |
| scrollbar-always-on | 总是显示滚动条 | `boolean` | false |
| flexible | 确保主轴的最小尺寸 | `boolean` | false |

### Table Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| cell-contextmenu | 当某个单元格被鼠标右键点击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | `{ column, prop, order }` |
| filter-change | column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows | expanded) |

### Table Methods

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| clearSelection | 用于多选表格，清空用户的选择 | — |
| getSelectionRows | 返回当前选中的行 |  |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否 | row, selected |
| toggleAllSelection | 用于多选表格，切换全选和全不选 | — |
| toggleRowExpansion | 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。 | row, expanded |
| setCurrentRow | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | — |
| clearFilter | 传入由`columnKey` 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器 | columnKeys |
| doLayout | 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局 | — |
| sort | 手动排序表格。 参数 `prop` 属性指定排序列，`order` 指定排序顺序。 | prop: string, order: string |
| scrollTo | 滚动到一组特定坐标 | (options: ScrollToOptions | number, yCoord?: number) |
| setScrollTop | 设置垂直滚动位置 | top |
| setScrollLeft | 设置水平滚动位置 | left |

### Table Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| — | 自定义默认内容 | Table-column |
| append | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 | — |
| empty | 当数据为空时自定义的内容 | — |

## TableColumn API

### TableColumn Props

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 对应列的类型。 如果设置了`selection`则显示多选框； 如果设置了`index` 则显示该行的索引（从 1 开始计算）； 如果设置了`expand` 则显示为一个可展开的按钮 | string | selection / index / expand | — |
| index | 如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引 | number / function(index) | — | — |
| label | 显示的标题 | string | — | — |
| column-key | column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — | — |
| prop | 字段名称 对应列内容的字段名， 也可以使用 `property`属性 | string | — | — |
| width | 对应列的宽度 | string / number | — | — |
| min-width | 对应列的最小宽度， 对应列的最小宽度， 与 `width` 的区别是 `width` 是固定的，`min-width` 会把剩余宽度按比例分配给设置了 `min-width` 的列 | string / number | — | — |
| fixed | 列是否固定在左侧或者右侧。 `true` 表示固定在左侧 | string / boolean | true / 'left' / 'right' | — |
| render-header | 列标题 Label 区域渲染使用的 Function | function({ column, $index }) | — | — |
| sortable | 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean / string | custom | false |
| sort-method | 指定数据按照哪个属性进行排序，仅当`sortable`设置为`true`的时候有效。 应该如同 Array.sort 那样返回一个 Number | function(a, b) | — | — |
| sort-by | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | function(row, index) / string / array | — | — |
| sort-orders | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序 | array | 数组中的元素需为以下三者之一：`ascending` 表示升序，`descending` 表示降序，`null` 表示还原为原始顺序 | ['ascending', 'descending', null] |
| resizable | 对应列是否可以通过拖动改变宽度（需要在 li-table 上设置 border 属性为真） | boolean | — | true |
| formatter | 用来格式化内容 | function(row, column, cellValue, index) | — | — |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | boolean | — | false |
| align | 对齐方式 | string | left / center / right | left |
| header-align | 表头对齐方式， 若不设置该项，则使用表格的对齐方式 | string | left / center / right | — |
| class-name | 列的 className | string | — | — |
| label-class-name | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | function(row, index) | — | — |
| reserve-selection | 仅对 `type=selection` 的列有效， 请注意， 需指定 `row-key` 来让这个功能生效。 | boolean | — | false |
| filters | 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性。 | `Array<{text: string, value: string}>` | — | — |
| filter-placement | 过滤弹出框的定位 | string | 与 Tooltip 的 `placement` 属性相同 | — |
| filter-multiple | 数据过滤的选项是否多选 | boolean | — | true |
| filter-method | 数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | function(value, row, column) | — | — |
| filtered-value | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 | array | — | — |

### TableColumn Slots

| 名称 | 说明 |
| --- | --- |
| — | 自定义列的内容 作用域参数为 `{ row, column, $index }` |
| header | 自定义表头的内容， 作用域参数为 `{ column, $index }` |

## 常见问题解答（FAQ）

#### 如何在表格中使用图像预览？

```
<li-table-column label="Thumbnail" width="180">
    <template #default="scope">
        <div style="display: flex; align-items: center">
            <li-image :preview-src-list="srcList"/>
        </div>
    </template>
</li-table-column>
```

注：由于固定列是通过 sticky 来实现的，如果表格中含有固定列，请在图像上添加 `preview-teleported` 属性。

#### 当使用 DOM 模板时，为什么列没有渲染？

典型问题： [#5046](https://github.com/element-plus/element-plus/issues/5046) [#5862](https://github.com/element-plus/element-plus/issues/5862) [#6919](https://github.com/element-plus/element-plus/issues/6919)

这是因为 HTML 定义只允许一些特定元素省略关闭标签，最常见的是 `<input>` 和 `<img>`。 对于任意其他元素，如果你省略了关闭标签，原生的 HTML 解析器会认为你从未关闭打开的标签。

详情请参阅 [Vue 文档](https://vuejs.org/guide/essentials/component-basics.html#self-closing-tags)。

最后修改日期： 2025-07-15
