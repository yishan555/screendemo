# Scrollbar 滚动条

Maintainer: 陈尚书

1. [基础用法](#基础用法)
2. [尺寸](#尺寸)
3. [横向滚动](#横向滚动)
4. [最大高度](#最大高度)
5. [手动滚动](#手动滚动)
6. [Scrollbar API](#scrollbar-api)
   1. [Scrollbar Props](#scrollbar-props)
   2. [Scrollbar Events](#scrollbar-events)
   3. [Scrollbar Slots](#scrollbar-slots)
   4. [Scrollbar Methods](#scrollbar-methods)

用于替换浏览器原生滚动条。

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

```
<template>
  <li-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </li-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  margin: 10px;

  color: var(--li-color-primary);
  text-align: center;

  background: var(--li-color-primary-light-9);
  border-radius: 4px;
}
</style>
```

## 尺寸

ē 阿 páng 房宫赋 六王毕，四海一，蜀山兀，阿房出。覆压三百余里，隔离天日。骊山北构而西折，直走咸阳。二川溶溶，流入宫墙。五步一楼，十步一阁。廊腰 màn 缦回，檐牙高啄。各抱地势，钩心斗角。盘盘焉，囷囷焉，蜂房水涡，矗不知其几千万落。长桥卧波，未云何龙？复道行空，不霁何虹？高低冥迷，不知西东。歌台暖响，春光融融。舞殿冷袖，风雨凄凄。一日之内，一宫之间，而气候不齐。 妃 pín 嫔 yìng 媵 qiáng 嫱，王子皇孙，辞楼下殿， niǎn 辇来于秦，朝歌夜弦，为秦宫人。明星荧荧，开妆镜也。绿云扰扰，梳晓鬟也。渭流涨腻，弃脂水也。烟斜雾横，焚椒兰也。雷霆乍惊，宫车过也。辘辘远听，杳不知其所之也。一肌一容，尽态极 yán 妍，缦立远视，而望幸焉。有不见者，三十六年。 燕赵之收藏，韩魏之经营，齐楚之精英，几世几年， piāo 剽掠其人，倚叠如山。一旦不能有，输来其间。鼎 chēng 铛玉石，金块珠砾，弃掷 lǐ 逦 yǐ 迤，秦人视之，亦不甚惜。 嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽 zī 锱 zhū 铢，用之如泥沙？使负栋之柱，多于南亩之农夫。架梁之椽，多于机上之工女。钉头磷磷，多于在 yǔ 庾之粟粒。瓦缝参差，多于周身之帛缕。直栏横 jiàn 槛，多于九土之城郭。管弦 ōu 呕 yā 哑，多于市人之言语。使天下之人，不敢言而敢怒。独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！ 呜呼！灭六国者，六国也，非秦也。族秦者，秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦。使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之。后人哀之而不鉴之，亦使后人而复哀后人也。

  

SmallDefaultLarge

```
<template>
  <li-scrollbar height="300px" :size="size" always>
    <div class="overflow-content">
      ē 阿 páng 房宫赋
      六王毕，四海一，蜀山兀，阿房出。覆压三百余里，隔离天日。骊山北构而西折，直走咸阳。二川溶溶，流入宫墙。五步一楼，十步一阁。廊腰
      màn
      缦回，檐牙高啄。各抱地势，钩心斗角。盘盘焉，囷囷焉，蜂房水涡，矗不知其几千万落。长桥卧波，未云何龙？复道行空，不霁何虹？高低冥迷，不知西东。歌台暖响，春光融融。舞殿冷袖，风雨凄凄。一日之内，一宫之间，而气候不齐。
      妃 pín 嫔 yìng 媵 qiáng 嫱，王子皇孙，辞楼下殿， niǎn
      辇来于秦，朝歌夜弦，为秦宫人。明星荧荧，开妆镜也。绿云扰扰，梳晓鬟也。渭流涨腻，弃脂水也。烟斜雾横，焚椒兰也。雷霆乍惊，宫车过也。辘辘远听，杳不知其所之也。一肌一容，尽态极
      yán 妍，缦立远视，而望幸焉。有不见者，三十六年。 燕赵之收藏，韩魏之经营，齐楚之精英，几世几年， piāo
      剽掠其人，倚叠如山。一旦不能有，输来其间。鼎 chēng 铛玉石，金块珠砾，弃掷 lǐ 逦 yǐ 迤，秦人视之，亦不甚惜。
      嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽 zī 锱 zhū
      铢，用之如泥沙？使负栋之柱，多于南亩之农夫。架梁之椽，多于机上之工女。钉头磷磷，多于在 yǔ
      庾之粟粒。瓦缝参差，多于周身之帛缕。直栏横 jiàn 槛，多于九土之城郭。管弦 ōu 呕 yā
      哑，多于市人之言语。使天下之人，不敢言而敢怒。独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！
      呜呼！灭六国者，六国也，非秦也。族秦者，秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦。使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之。后人哀之而不鉴之，亦使后人而复哀后人也。
    </div>
  </li-scrollbar>
  <br />
  <li-button-group>
    <li-button :type="size === 'small' ? 'primary' : ''" @click="size = 'small'">Small</li-button>
    <li-button :type="size === '' ? 'primary' : ''" @click="size = ''">Default</li-button>
    <li-button :type="size === 'large' ? 'primary' : ''" @click="size = 'large'">Large</li-button>
  </li-button-group>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { ScrollbarProps } from '@chehejia/liui-next';

const size = ref<ScrollbarProps['size']>('');
</script>
<style scoped>
.li-scrollbar {
  max-width: 300px;
  border: 1px solid lightgrey;
}

.overflow-content {
  width: 500px;
  padding: 1em;

  font-family: SimSong, serif;
  line-height: 2em;
  color: gray;
}
</style>
```

## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

43

44

45

46

47

48

49

50

```
<template>
  <li-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </li-scrollbar>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 50px;
  margin: 10px;

  color: var(--li-color-danger);
  text-align: center;

  background: var(--li-color-danger-light-9);
  border-radius: 4px;
}
</style>
```

## 最大高度

当元素高度超过最大高度，才会显示滚动条。

Add ItemDelete Item

1

2

3

```
<template>
  <li-button @click="add">Add Item</li-button>
  <li-button @click="onDelete">Delete Item</li-button>
  <li-scrollbar max-height="400px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </li-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const count = ref(3);

const add = () => {
  count.value++;
};
const onDelete = () => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  margin: 10px;

  color: var(--li-color-primary);
  text-align: center;

  background: var(--li-color-primary-light-9);
  border-radius: 4px;
}
</style>
```

## 手动滚动

通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

```
<template>
  <li-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </li-scrollbar>

  <li-slider v-model="value" :max="max" :format-tooltip="formatTooltip" @input="inputSlider" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { LiScrollbar } from '@chehejia/liui-next';

const max = ref(0);
const value = ref(0);
const innerRef = ref<HTMLDivElement>();
const scrollbarRef = ref<InstanceType<typeof LiScrollbar>>();

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380;
});

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value);
};
const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
};
const formatTooltip = (value: number) => {
  return `${value} px`;
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  margin: 10px;

  color: var(--li-color-primary);
  text-align: center;

  background: var(--li-color-primary-light-9);
  border-radius: 4px;
}

.li-slider {
  margin-top: 20px;
}
</style>
```

## Scrollbar API

### Scrollbar Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 滚动条高度 | `string` / `number` | — |
| max-height | 滚动条最大高度 | `string` / `number` | — |
| native | 是否使用原生滚动条样式 | `boolean` | false |
| wrap-style | 包裹容器的自定义样式 | `string` / `object` CSSSProperties | CSSSProperties[] | string[] | — |
| wrap-class | 包裹容器的自定义类名 | `string` | — |
| view-style | 视图的自定义样式 | `string` / `object` CSSSProperties | CSSSProperties[] | string[] | — |
| view-class | 视图的自定义类名 | `string` | — |
| noresize | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean` | false |
| tag | 视图的元素标签 | `string` | div |
| always | 滚动条总是显示 | `boolean` | false |
| min-size | 滚动条最小尺寸 | `number` | 20 |

### Scrollbar Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `Function` ({ scrollLeft: number, scrollTop: number }) => void |

### Scrollbar Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

### Scrollbar Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| handleScroll | 触发滚动事件 | `Function` () => void |
| scrollTo | 滚动到一组特定坐标 | `Function` (options: ScrollToOptions | number, yCoord?: number) => void |
| setScrollTop | 设置滚动条到顶部的距离 | `Function` (scrollTop: number) => void |
| setScrollLeft | 设置滚动条到左边的距离 | `Function` (scrollLeft: number) => void |
| update | 手动更新滚动条状态 | `Function` () => void |
| wrapRef | 滚动条包裹的 ref 对象 | `object` Ref<HTMLDivElement> |

最后修改日期： 2025-07-15
