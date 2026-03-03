# DatePicker 日期选择器

Maintainer: 刘振兴

1. [选择某一天](#选择某一天)
2. [其他日期单位](#其他日期单位)
3. [选择一段时间](#选择一段时间)
4. [选择周范围](#选择周范围)
5. [选择月份范围](#选择月份范围)
6. [选择季度范围](#选择季度范围)
7. [选择年份范围](#选择年份范围)
8. [选择半年份范围](#选择半年份范围)
9. [默认值](#默认值)
10. [日期格式](#日期格式)
11. [默认显示日期](#默认显示日期)
12. [自定义内容](#自定义内容)
13. [国际化](#国际化)
14. [DatePicker API](#datepicker-api)
    1. [DatePicker Props](#datepicker-props)
    2. [DatePicker Events](#datepicker-events)
    3. [DatePicker Methods](#datepicker-methods)
    4. [DatePicker Slots](#datepicker-slots)

用于选择或输入日期。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/))。

## 选择某一天

以”日“为基本单位，基础的日期选择控件。

基本单位由 `type` 属性指定。 通过 `shortcuts` 配置快捷选项， 通过 `disabledDate` 函数，来设置禁用掉的日期。

largedefaultsmall

Default

Picker with quick options

```
<template>
  <li-radio-group v-model="size" label="size control" size="small">
    <li-radio-button label="large">large</li-radio-button>
    <li-radio-button label="default">default</li-radio-button>
    <li-radio-button label="small">small</li-radio-button>
  </li-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <li-date-picker v-model="value1" type="date" placeholder="Pick a day" :size="size" />
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <li-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref<'default' | 'large' | 'small'>('default');

const value1 = ref('');
const value2 = ref('');

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期。

Week

Month

Year

Dates

Quarter

half year

```
<template>
  <div class="demo-date-picker">
    <div class="container">
      <div class="block">
        <span class="demonstration">Week</span>
        <li-date-picker
          v-model="value1"
          type="week"
          format="[Week] ww"
          value-format="[Week] YYYY-ww"
          placeholder="Pick a week"
          @change="handleChange"
        />
      </div>
      <div class="block">
        <span class="demonstration">Month</span>
        <li-date-picker v-model="value2" type="month" placeholder="Pick a month" />
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">Year</span>
        <li-date-picker v-model="value3" type="year" placeholder="Pick a year" />
      </div>
      <div class="block">
        <span class="demonstration">Dates</span>
        <li-date-picker v-model="value4" type="dates" placeholder="Pick one or more dates" />
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">Quarter</span>
        <li-date-picker v-model="value5" type="quarter" placeholder="Pick a quarter" />
      </div>
      <div class="block">
        <span class="demonstration">half year</span>
        <li-date-picker v-model="value6" type="halfyear" format="YYYY-F[半年]" placeholder="Pick a quarter" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');

const handleChange = (value) => {
  console.log(value);
};
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .container {
  flex: 1;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .container .block {
  border-right: none;
}

.demo-date-picker .container .block:last-child {
  border-top: solid 1px var(--li-border-color);
}

.demo-date-picker .container:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 选择一段时间

你可以通过如下例子来学习如何设置一个日期范围选择器。

在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 `unlink-panels` 属性解除联动。

largedefaultsmall

Default

~

With quick options

~

```
<template>
  <li-radio-group v-model="size" label="size control" size="small">
    <li-radio-button label="large">large</li-radio-button>
    <li-radio-button label="default">default</li-radio-button>
    <li-radio-button label="small">small</li-radio-button>
  </li-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <li-date-picker
        v-model="value1"
        type="daterange"
        range-separator="~"
        start-placeholder="Start date"
        end-placeholder="End date"
        :size="size"
      />
    </div>
    <div class="block">
      <span class="demonstration">With quick options</span>
      <li-date-picker
        v-model="value2"
        type="daterange"
        unlink-panels
        range-separator="~"
        start-placeholder="Start date"
        end-placeholder="End date"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref<'default' | 'large' | 'small'>('default');

const value1 = ref('');
const value2 = ref('');

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 选择周范围

可在一个选择器中便捷地选择一个周范围。

在选择周范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前月份，可以使用`unlink-panels`属性解除联动。

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <li-date-picker
        v-model="value1"
        type="weekrange"
        range-separator="~"
        format="YYYY-ww周"
        value-format="YYYY-ww"
        start-placeholder="开始周"
        end-placeholder="结束周"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 选择月份范围

你当然还可以选择一个月的范围。

在选择月份范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlink-panels` 属性解除联动。

Default

~

With quick options

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <li-date-picker
        v-model="value1"
        type="monthrange"
        range-separator="~"
        start-placeholder="Start month"
        end-placeholder="End month"
      />
    </div>
    <div class="block">
      <span class="demonstration">With quick options</span>
      <li-date-picker
        v-model="value2"
        type="monthrange"
        unlink-panels
        range-separator="~"
        start-placeholder="Start month"
        end-placeholder="End month"
        :shortcuts="shortcuts"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');

const shortcuts = [
  {
    text: 'This month',
    value: [new Date(), new Date()],
  },
  {
    text: 'This year',
    value: () => {
      const end = new Date();
      const start = new Date(new Date().getFullYear(), 0);
      return [start, end];
    },
  },
  {
    text: 'Last 6 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      return [start, end];
    },
  },
];
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 选择季度范围

可在一个选择器中便捷地选择一个季度范围。

在选择季度范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前年份，可以使用`unlink-panels`属性解除联动。

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <li-date-picker
        v-model="value1"
        range-separator="~"
        type="quarterrange"
        format="YYYY-Q季度"
        start-placeholder="开始季度"
        end-placeholder="结束季度"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');

const handleChange = (value) => {
  console.log(value);
};
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 选择年份范围

可在一个选择器中便捷地选择一个年份范围。

在选择年份范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前年份，可以使用`unlink-panels`属性解除联动。

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <li-date-picker
        v-model="value1"
        type="yearrange"
        range-separator="~"
        format="YYYY 年"
        start-placeholder="开始年份"
        end-placeholder="结束年份"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 选择半年份范围

可在一个选择器中便捷地选择一个年份范围。

在选择年份范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前年份，可以使用`unlink-panels`属性解除联动。

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <li-date-picker
        v-model="value1"
        type="halfyearrange"
        range-separator="~"
        format="YYYY-F[半年]"
        start-placeholder="开始年份"
        end-placeholder="结束年份"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const value1 = ref([dayjs('2023-01-01'), dayjs('2023-12-31')]);

const handleChange = (vv) => {
  console.log(vv);
};
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--li-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
```

## 默认值

日期选择器会在用户未选择任何日期的时候默认展示当天的日期。 你也可以使用 `default-value` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。

如果类型是 `daterange`, `default-value` 则会设置左边窗口的默认值。

date

daterange

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">date</span>
      <li-date-picker v-model="value1" type="date" placeholder="Pick a date" :default-value="new Date(2010, 9, 1)" />
    </div>
    <div class="block">
      <span class="demonstration">daterange</span>
      <li-date-picker
        v-model="value2"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 日期格式

使用`format`指定输入框的格式。 使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

WARNING

请一定要注意传入参数的大小写是否正确。

Emits Date object

Value:

Use value-format

Value：

Timestamp

Value：

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Emits Date object</span>
      <div class="demonstration">Value: {{ value1 }}</div>
      <li-date-picker v-model="value1" type="date" placeholder="Pick a Date" format="YYYY-MM-DD" />
    </div>
    <div class="block">
      <span class="demonstration">Use value-format</span>
      <div class="demonstration">Value：{{ value2 }}</div>
      <li-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a Date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </div>
    <div class="block">
      <span class="demonstration">Timestamp</span>
      <div class="demonstration">Value：{{ value3 }}</div>
      <li-date-picker v-model="value3" type="date" placeholder="Pick a Date" format="YYYY-MM-DD" value-format="x" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 默认显示日期

在选择日期范围时，你可以指定起始日期和结束日期的默认时间。

默认情况下，开始日期和结束日期的时间部分都是选择日期当日的 `00:00:00`。 通过 `default-time` 可以分别指定开始日期和结束日期的具体时刻。 它接受最多两个日期对象的数组。 其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

Component value：

~

```
<template>
  <div class="demo-date-picker">
    <div class="block">
      <p>Component value：{{ value }}</p>
      <li-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        :default-time="defaultTime"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const defaultTime = ref<[Date, Date]>([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]);
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}
</style>
```

## 自定义内容

弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据。

```
<template>
  <div class="demo-date-picker">
    <li-date-picker v-model="value" type="date" placeholder="Pick a day" format="YYYY-MM-DD" value-format="YYYY-MM-DD">
      <template #default="cell">
        <div class="cell" :class="{ current: cell.isCurrent }">
          <span class="text">{{ cell.text }}</span>
          <span v-if="isHoliday(cell)" class="holiday" />
        </div>
      </template>
    </li-date-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('2021-10-29');
const holidays = ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'];

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format('YYYY-MM-DD'));
};
</script>

<style scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--li-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
```

更详细的数据类型，请查看下表。

```
interface DateCell {
  column: number
  customClass: string
  disabled: boolean
  end: boolean
  inRange: boolean
  row: number
  selected: Dayjs
  isCurrent: boolean
  isSelected: boolean
  start: boolean
  text: number
  timestamp: number
  date: Date
  dayjs: Dayjs
  type: 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
}
```

## 国际化

由于 LiUI 的默认语言为英语，如果你需要设置其它的语言，请参考[国际化](../guide/i18n)文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等）也都是通过国际化来配置的。

## DatePicker API

### DatePicker Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2 | `Date` / `number` / `string` / `Array` | — |
| readonly | 只读 | `boolean` | false |
| disabled | 禁用 | `boolean` | false |
| size | 输入框尺寸 | `enum` large | default | small | default |
| editable | 文本框可输入 | `boolean` | true |
| clearable | 是否显示清除按钮 | `boolean` | true |
| placeholder | 非范围选择时的占位内容 | `string` | — |
| start-placeholder | 范围选择时开始日期的占位内容 | `string` | — |
| end-placeholder | 范围选择时结束日期的占位内容 | `string` | — |
| type | 显示类型 | `enum` date | dates | datetime | week | month | quarter | year | daterange | datetimerange | weekrange | monthrange | quarterrange | yearrange | date |
| format | 显示在输入框中的格式 | `string` | YYYY-MM-DD |
| popper-class | DatePicker 下拉框的类名 | `string` | — |
| range-separator | 选择范围时的分隔符 | `string` | '-' |
| default-value | 可选，选择器打开时默认显示的时间 | `Date` / `[Date, Date]` | — |
| default-time | 范围选择时选中日期所使用的当日内具体时刻 | `Date` / `[Date, Date]` | — |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象, 当类型为 week、weekrange、quarter、quarterrange 类型时，YYYY 必传，如：YYYY-ww 或 YYYY-Q | `string` | — |
| id | 等价于原生 `id` 属性 | `string` / `[string, string]` | — |
| name | 等价于原生 `name` 属性 | `string` | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | `boolean` | false |
| prefix-icon | 自定义前缀图标 | `string | Component` | Date |
| clear-icon | 自定义清除图标 | `string | Component` | CircleClose |
| validate-event | 输入时是否触发表单的校验 | `boolean` | true |
| disabled-date | 一个用来判断该日期是否被禁用的函数 | `Function` | — |
| shortcuts | 设置快捷选项，需要传入数组对象 | `Array<{ text: string, value: Date | Function }>` | — |
| cell-class-name | 设置自定义类名 | `Function` Function(Date) | — |
| teleported | 是否将 date-picker 的下拉列表插入至 body 元素 | `enum` true | false | true |

### DatePicker Events

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | `Function` (val: typeof v-model) |
| blur | 在组件 Input 失去焦点时触发 | `Function` (e: FocusEvent) |
| focus | 在组件 Input 获得焦点时触发 | `Function` (e: FocusEvent) |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 `default-value` 来设置成其他的日期。 | `Function` (val: [Date, Date]) |
| panel-change | 当日期面板改变时触发。 | `Function` (date, mode, view) |
| visible-change | 当 DatePicker 的下拉列表出现/消失时触发 | `Function` (visibility: boolean) |

### DatePicker Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | — |
| handleOpen | 打开日期选择器弹窗 | — |
| handleClose | 关闭日期选择器弹窗 | — |

### DatePicker Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
| range-separator | 自定义范围分割符内容 |

最后修改日期： 2025-07-15
