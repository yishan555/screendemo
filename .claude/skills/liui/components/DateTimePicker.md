# DateTimePicker 日期时间选择器

Maintainer: 刘振兴

1. [日期和时间点](#日期和时间点)
2. [日期时间格式](#日期时间格式)
3. [日期和时间范围](#日期和时间范围)
4. [默认的起始与结束时刻](#默认的起始与结束时刻)
5. [DateTimePicker API](#datetimepicker-api)
   1. [DateTimePicker Props](#datetimepicker-props)
   2. [DateTimePicker Events](#datetimepicker-events)
   3. [DateTimePicker Methods](#datetimepicker-methods)
   4. [DateTimePicker Slots](#datetimepicker-slots)

在同一个选择器里选择日期和时间

TIP

日期时间选择器来自日期选择器和时间选择器的组合。 关于属性的更详细解释，请参阅日期选择器和时间选择器。

TIP

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (例如: [VitePress](https://vitepress.vuejs.org/)).

## 日期和时间点

通过设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。 快捷方式的使用方法与 Date Picker 相同。

Default

With shortcuts

With default time

```
<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <li-date-picker v-model="value1" type="datetime" placeholder="Select date and time" />
    </div>
    <div class="block">
      <span class="demonstration">With shortcuts</span>
      <li-date-picker v-model="value2" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts" />
    </div>
    <div class="block">
      <span class="demonstration">With default time</span>
      <li-date-picker v-model="value3" type="datetime" placeholder="Select date and time" :default-time="defaultTime" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

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
</script>
<style scoped>
.demo-datetime-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-datetime-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-datetime-picker .block:last-child {
  border-right: none;
}

.demo-datetime-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 日期时间格式

使用`format`指定输入框的格式。 使用`value-format`指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

WARNING

请一定要注意传入参数的大小写是否正确

Emits 出 Date 对象

Value:

使用 value-format 格式化输出的时间

Value：

时间戳

Value：

格式化时间

Value：

```
<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">Emits 出 Date 对象</span>
      <div class="demonstration">Value: {{ value1 }}</div>
      <li-date-picker v-model="value1" type="datetime" placeholder="Pick a Date" format="YYYY/MM/DD HH:mm:ss" />
    </div>
    <div class="block">
      <span class="demonstration">使用 value-format 格式化输出的时间</span>
      <div class="demonstration">Value：{{ value2 }}</div>
      <li-date-picker
        v-model="value2"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="YYYY-MM-DD h:m:s a"
      />
    </div>
    <div class="block">
      <span class="demonstration">时间戳</span>
      <div class="demonstration">Value：{{ value3 }}</div>
      <li-date-picker
        v-model="value3"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="x"
      />
    </div>
    <div class="block">
      <span class="demonstration">格式化时间</span>
      <div class="demonstration">Value：{{ value4 }}</div>
      <li-date-picker
        v-model="value4"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm"
        value-format="YYYY-MM-DD h:m"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
</script>
<style scoped>
.demo-datetime-picker {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.demo-datetime-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.demo-datetime-picker .block:last-child {
  border-right: none;
}

.demo-datetime-picker .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 日期和时间范围

设置`type`为`datetimerange`即可选择日期和时间范围

Default

~

With shortcuts

~

```
<template>
  <div class="block">
    <span class="demonstration">Default</span>
    <li-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="~"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
  </div>
  <div class="block">
    <span class="demonstration">With shortcuts</span>
    <li-date-picker
      v-model="value2"
      type="datetimerange"
      :shortcuts="shortcuts"
      range-separator="~"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<[Date, Date]>([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]);
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
.block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## 默认的起始与结束时刻

使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的`00:00:00`作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束日期时所使用的具体时刻。 我们可以使用 `default-time` 属性来控制它。 `default-time`接受一个数组，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。 第一项控制开始日期的时间值，第二项控制结束日期的时间值。

Start and end date time 12:00:00

~

Start date time 12:00:00, end date time 08:00:00

~

```
<template>
  <div class="block">
    <span class="demonstration">Start and end date time 12:00:00</span>
    <li-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime1"
    />
  </div>
  <div class="block">
    <span class="demonstration">Start date time 12:00:00, end date time 08:00:00</span>
    <li-date-picker
      v-model="value2"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime2"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');

const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
const defaultTime2: [Date, Date] = [new Date(2000, 1, 1, 12, 0, 0), new Date(2000, 2, 1, 8, 0, 0)]; // '12:00:00', '08:00:00'
</script>
<style scoped>
.block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--li-border-color);
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--li-text-color-secondary);
}
</style>
```

## DateTimePicker API

### DateTimePicker Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2 | `Date` / `number` / `string` / `Array` | — |
| readonly | 只读 | `boolean` | false |
| disabled | 禁用 | `boolean` | false |
| editable | 文本框可输入 | `boolean` | true |
| clearable | 是否显示清除按钮 | `boolean` | true |
| size | 输入框尺寸 | `enum` large | default | small | default |
| placeholder | 非范围选择时的占位内容 | `string` | — |
| start-placeholder | 范围选择时开始日期的占位内容 | `string` | — |
| end-placeholder | 范围选择时结束日期的占位内容 | `string` | — |
| time-arrow-control | 是否使用箭头按钮选择时间 | `boolean` | false |
| type | 显示类型 | `enum` date | dates | datetime | week | month | quarter | year | daterange | datetimerange | weekrange | monthrange | quarterrange | yearrange | date |
| format | 显示在输入框中的格式 | `string` | YYYY-MM-DD HH:mm:ss |
| popper-class | DateTimePicker 下拉框的类名 | `string` | — |
| range-separator | 选择范围时的分隔符 | `string` | '-' |
| default-value | 可选，选择器打开时默认显示的时间 | `Date` / `[Date, Date]` | — |
| default-time | 选择日期后的默认时间值 | `Date` / `[Date, Date]` | `00:00:00` |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | `string` | — |
| id | 等价于原生 input `id` 属性 | `string` / `[string, string]` | — |
| name | 等价于原生 input `name` 属性 | `string` | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | `boolean` | false |
| prefix-icon | 自定义前缀图标 | `string | Component` | Date |
| clear-icon | 自定义清除图标 | `string | Component` | CircleClose |
| shortcuts | 设置快捷选项，需要传入数组对象 | `object` [{ text: string, value: date / function }] | — |
| disabled-date | 一个用来判断该日期是否被禁用的函数 | `Function` (Date)=> void | — |
| cell-class-name | 设置自定义类名 | `Function`(Date) | — |
| teleported | 是否将 datetime-picker 的下拉列表插入至 body 元素 | `enum` true | false | true |

### DateTimePicker Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | value |
| blur | 在组件 Input 失去焦点时触发 | `(e: FocusEvent)` |
| focus | 在组件 Input 获得焦点时触发 | `(e: FocusEvent)` |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 选中日历日期后会执行的回调，只有当 `datetimerange` 才生效 | [Date, Date] |
| visible-change | 当 DateTimePicker 的下拉列表出现/消失时触发 | 出现时为 true，隐藏时为 false |

### DateTimePicker Methods

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | — |

### DateTimePicker Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义单元格内容 |
| range-separator | 自定义范围分割符内容 |

最后修改日期： 2025-07-15
