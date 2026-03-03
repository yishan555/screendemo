# Timeline 时间线

Maintainer: 徐鑫

1. [基础用法](#基础用法)
2. [空心点](#空心点)
3. [类型](#类型)
4. [⾃定义节点样式](#⾃定义节点样式)
5. [⾃定义时间戳](#⾃定义时间戳)
6. [垂直居中](#垂直居中)
7. [Timeline API](#timeline-api)
   1. [Timeline Slots](#timeline-slots)
8. [TimelineItem API](#timelineitem-api)
   1. [TimelineItem Props](#timelineitem-props)
   2. [TimelineItem Slots](#timelineitem-slots)

可视化地呈现时间流信息。

## 基础用法

Timeline 可拆分成多个按照时间戳排列的活动， 时间戳是其区分于其他控件的重要特征， 使用时注意与 Steps 步骤条等区分。

* Event start

  2018-04-15
* Approved

  2018-04-13
* Success

  2018-04-11

```
<template>
  <li-timeline>
    <li-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
      {{ activity.content }}
    </li-timeline-item>
  </li-timeline>
</template>

<script lang="ts" setup>
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
];
</script>
```

## 空心点

* Event start

  2018-04-15
* Approved

  2018-04-13
* Success

  2018-04-11

```
<template>
  <li-timeline>
    <li-timeline-item v-for="(activity, index) in activities" :key="index" hollow :timestamp="activity.timestamp">
      {{ activity.content }}
    </li-timeline-item>
  </li-timeline>
</template>
<script lang="ts" setup>
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
];
</script>
```

## 类型

* primary

  2015
* success

  2016
* warning

  2017
* danger

  2018
* info

  2019
* -

  2020

* primary

  2015
* success

  2016
* warning

  2017
* danger

  2018
* info

  2019
* -

  2020

* primary

  2015
* success

  2016
* warning

  2017
* danger

  2018
* info

  2019
* -

  2020

```
<template>
  <li-row>
    <li-col :span="5">
      <li-timeline>
        <li-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :type="activity.type"
          :timestamp="activity.timestamp"
        >
          {{ activity.type || '-' }}
        </li-timeline-item>
      </li-timeline>
    </li-col>
    <li-col :span="5">
      <li-timeline>
        <li-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          hollow
          :type="activity.type"
          :timestamp="activity.timestamp"
        >
          {{ activity.type || '-' }}
        </li-timeline-item>
      </li-timeline>
    </li-col>

    <li-col :span="5">
      <li-timeline>
        <li-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :type="activity.type"
          :icon="activity.icon"
          :timestamp="activity.timestamp"
        >
          {{ activity.type || '-' }}
        </li-timeline-item>
      </li-timeline>
    </li-col>
  </li-row>
</template>

<script lang="ts" setup>
import { IconBasicStarF } from '@chehejia/liui-icons';

const activities = [
  {
    content: 'Step A',
    type: 'primary',
    timestamp: '2015',
    icon: IconBasicStarF,
  },
  {
    content: 'Step B',
    type: 'success',
    timestamp: '2016',
    icon: IconBasicStarF,
  },
  {
    content: 'Step C',
    type: 'warning',
    timestamp: '2017',
    icon: IconBasicStarF,
  },
  {
    content: 'Step D',
    type: 'danger',
    timestamp: '2018',
    icon: IconBasicStarF,
  },
  {
    content: 'Step E',
    type: 'info',
    timestamp: '2019',
    icon: IconBasicStarF,
  },
  {
    content: 'Step F',
    timestamp: '2020',
    icon: IconBasicStarF,
  },
];
</script>
```

## ⾃定义节点样式

可根据实际场景⾃定义节点类型、图标，或直接自定义 `dot` 插槽。

* Custom icon

  2018-04-12 20:46
* Custom color

  2018-04-03 20:46
* Custom size

  2018-04-03 20:46
* Custom hollow

  2018-04-03 20:46
* Default node

  2018-04-03 20:46

* 1.

  Event start

  2018-04-15
* Approved

  2018-04-15
* Success

  2018-04-15

```
<template>
  <li-row>
    <li-col :span="12">
      <li-timeline>
        <li-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </li-timeline-item>
      </li-timeline>
    </li-col>
    <li-col :span="12">
      <li-timeline>
        <li-timeline-item timestamp="2018-04-15">
          Event start
          <template #dot> 1.</template>
        </li-timeline-item>
        <li-timeline-item timestamp="2018-04-15">
          Approved
          <template #dot>
            <li-icon><icon-basic-star-f /></li-icon>
          </template>
        </li-timeline-item>
        <li-timeline-item timestamp="2018-04-15">
          Success
          <template #dot>
            <div class="underline-timeline-dot">
              <li-icon><icon-basic-heart-o /></li-icon>
            </div>
          </template>
        </li-timeline-item>
      </li-timeline>
    </li-col>
  </li-row>
</template>

<script lang="ts" setup>
import { IconBasicHeartO, IconBasicMoreO, IconBasicStarF } from '@chehejia/liui-icons';

const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    type: 'primary',
    icon: IconBasicMoreO,
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
  },
];
</script>
<style>
.underline-timeline-dot {
  height: 24px;
  font-size: 16px;
  text-align: center;
  border-bottom: 2px solid springgreen;
  color: darkgreen;
}
</style>
```

## ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

* 2018/4/12

  #### Update Github template

  Tom committed 2018/4/12 20:46
* 2018/4/3

  #### Update Github template

  Tom committed 2018/4/3 20:46
* 2018/4/2

  #### Update Github template

  Tom committed 2018/4/2 20:46

```
<template>
  <li-timeline>
    <li-timeline-item timestamp="2018/4/12" placement="top">
      <li-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </li-card>
    </li-timeline-item>
    <li-timeline-item timestamp="2018/4/3" placement="top">
      <li-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </li-card>
    </li-timeline-item>
    <li-timeline-item timestamp="2018/4/2" placement="top">
      <li-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </li-card>
    </li-timeline-item>
  </li-timeline>
</template>
```

## 垂直居中

垂直居中样式的 Timeline-Item

* 2018/4/12

  #### Update Github template

  Tom committed 2018/4/12 20:46
* 2018/4/3

  #### Update Github template

  Tom committed 2018/4/3 20:46
* 2018/4/2

  Event start
* 2018/4/2

  Event end

```
<template>
  <li-timeline>
    <li-timeline-item center timestamp="2018/4/12" placement="top">
      <li-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </li-card>
    </li-timeline-item>
    <li-timeline-item timestamp="2018/4/3" placement="top">
      <li-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </li-card>
    </li-timeline-item>
    <li-timeline-item center timestamp="2018/4/2" placement="top"> Event start </li-timeline-item>
    <li-timeline-item timestamp="2018/4/2" placement="top"> Event end </li-timeline-item>
  </li-timeline>
</template>
```

## Timeline API

### Timeline Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| — | 自定义时间线内容 | Timeline-Item |

## TimelineItem API

### TimelineItem Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| timestamp | 时间戳 | string | — | — |
| hide-timestamp | 是否隐藏时间戳 | boolean | — | false |
| center | 是否垂直居中 | boolean | — | false |
| placement | 时间戳位置 | string | top / bottom | bottom |
| type | 节点类型 | string | primary / success / warning / danger / info | — |
| icon | 自定义图标 | `string | Component` | — | — |
| hollow | 是否空心点 | boolean | — | false |

### TimelineItem Slots

| 插槽名 | 说明 |
| --- | --- |
| — | Timeline-Item 的内容 |
| dot | 自定义节点 |

最后修改日期： 2025-07-15
