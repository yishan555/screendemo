# Calendar 日历

Maintainer: 刘振兴

1. [基础用法](#基础用法)
2. [自定义内容](#自定义内容)
3. [范围](#范围)
4. [自定义日历头部](#自定义日历头部)
5. [国际化](#国际化)
6. [Calendar API](#calendar-api)
   1. [Calendar Props](#calendar-props)
   2. [Calendar Slots](#calendar-slots)

显示日期。

## 基础用法

设置 `value` 来指定当前显示的月份。 如果 `value` 未指定，则显示当月。 `value` 支持 `v-model` 双向绑定。

2026 年 1 月

上个月今天下个月

日 | 一 | 二 | 三 | 四 | 五 | 六 || 28 | 29 | 30 | 31 | 1 | 2 | 3 |
| 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 11 | 12 | 13 | 14 | 15 | 16 | 17 |
| 18 | 19 | 20 | 21 | 22 | 23 | 24 |
| 25 | 26 | 27 | 28 | 29 | 30 | 31 |

```
<template>
  <li-calendar v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(new Date());
</script>
```

## 自定义内容

通过设置名为 `date-cell` 的 `scoped-slot` 来自定义日历单元格中显示的内容。 在 `scoped-slot` 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。 详情解释参考下方的 API 文档。

2026 年 1 月

上个月今天下个月

日 | 一 | 二 | 三 | 四 | 五 | 六 || 12-28 | 12-29 | 12-30 | 12-31 | 01-01 | 01-02 | 01-03 |
| 01-04 | 01-05 | 01-06 | 01-07 | 01-08 | 01-09 | 01-10 |
| 01-11 | 01-12 | 01-13 | 01-14 | 01-15 | 01-16 | 01-17 |
| 01-18 | 01-19 | 01-20 | 01-21 | 01-22 | 01-23 | 01-24 |
| 01-25 | 01-26 | 01-27 | 01-28 | 01-29 | 01-30 | 01-31 |

```
<template>
  <li-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </li-calendar>
</template>

<style scoped>
.is-selected {
  color: #1989fa;
}
</style>
```

## 范围

设置 `range` 属性指定日历的显示范围。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。

2019 年 3 月

日 | 一 | 二 | 三 | 四 | 五 | 六 || 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 10 | 11 | 12 | 13 | 14 | 15 | 16 |
| 17 | 18 | 19 | 20 | 21 | 22 | 23 |
| 24 | 25 | 26 | 27 | 28 | 29 | 30 |

```
<template>
  <li-calendar :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]" />
</template>
```

## 自定义日历头部

Custom header content2026 年 1 月

Previous Year  Previous Month Today Next Month  Next Year

日 | 一 | 二 | 三 | 四 | 五 | 六 || 28 | 29 | 30 | 31 | 1 | 2 | 3 |
| 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 11 | 12 | 13 | 14 | 15 | 16 | 17 |
| 18 | 19 | 20 | 21 | 22 | 23 | 24 |
| 25 | 26 | 27 | 28 | 29 | 30 | 31 |

```
<template>
  <li-calendar ref="calendar">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span>{{ date }}</span>
      <li-button-group>
        <li-button size="small" @click="selectDate('prev-year')"> Previous Year </li-button>
        <li-button size="small" @click="selectDate('prev-month')"> Previous Month </li-button>
        <li-button size="small" @click="selectDate('today')">Today</li-button>
        <li-button size="small" @click="selectDate('next-month')"> Next Month </li-button>
        <li-button size="small" @click="selectDate('next-year')"> Next Year </li-button>
      </li-button-group>
    </template>
  </li-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const calendar = ref();
const selectDate = (val: string) => {
  calendar.value.selectDate(val);
};
</script>
```

## 国际化

由于 LiUI 的默认语言为英语，如果你需要设置其它的语言，请参考[全局配置](../guide/config-provider)文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等）也都是通过国际化来配置的。

2023 年 4 月

日 | 一 | 二 | 三 | 四 | 五 | 六 || 30 | 1 | 2 | 3 | 4 | 5 | 6 |

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| 7 | 8 | 9 | 10 | 11 | 12 | 13 |

```
<template>
  <li-config-provider :locale="zhCn">
    <li-calendar :range="[new Date(2023, 4, 1), new Date(2023, 4, 7)]" />
  </li-config-provider>
</template>

<script lang="ts" setup>
import zhCn from '@chehejia/liui-next/dist/locale/zh-cn';
// import zhCn from '@chehejia/liui-next/dist/locale/zh-cn.mjs'
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
</script>
```

## Calendar API

### Calendar Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value / v-model` | 选中项绑定值 | `Date` | — |
| `range` | 时间范围，包括开始时间与结束时间。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。 | `[Date, Date]` | — |

### Calendar Slots

| 插槽名 | 说明 | 类型 |
| --- | --- | --- |
| `date-cell` | `type` 表示该日期的所属月份，可选值有 prev-month、current-month 和 next-month；`isSelected` 标明该日期是否被选中；`day` 是格式化的日期，格式为 yyyy-MM-dd；`date` 是单元格的日期 | `{ type: 'prev-month' | 'current-month' | 'next-month', isSelected: boolean, day: string, date: Date }` |
| `header` | 卡片标题内容 | — |

最后修改日期： 2025-07-15
