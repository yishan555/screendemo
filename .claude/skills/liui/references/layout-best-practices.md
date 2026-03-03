# LiUI 布局与样式最佳实践

本文档定义了基于 LiUI 组件库的页面布局和样式规范，提供了一套标准化的 CSS 类名体系和使用模式。

## 核心理念

- **Flexbox 布局**：所有容器默认使用 flex 布局，通过 `gap` 控制间距
- **语义化类名**：使用 `.a-*` 前缀表示应用级布局组件，`.fn-*` 表示功能类，`.is-*` 表示状态修饰符
- **组合优先**：通过组合基础类名实现复杂布局，避免写自定义样式
- **响应式栅格**：基于 12 栅格系统进行宽度控制

## 快速参考：类名速记

AI 在生成代码时可以使用以下速记方式理解布局结构：

```
.a-page > .a-card > .a-header + .fn-w-full
```

**解读：** 页面容器包含卡片，卡片内有标题和全宽内容块

```
.a-page > .a-table.is-full > .a-table-query + .a-table-main.a-card
```

**解读：** 页面包含可撑满的表格组件，表格包含查询区和主体区（白色卡片）

## 一、布局容器类

### 1.1 页面容器 `.a-page`

**用途：** Vue 页面的最外层容器，所有页面内容的根元素

**特性：**
- Flex 布局，`row wrap`，默认 `gap: 16px`
- 内边距：`padding: 16px`
- 自动滚动：`overflow: auto`
- 子元素按钮间距：自动使用容器 gap，无需额外 margin

**修饰符：**
- 当内部有 `.is-full` 元素时，自动转为 `column` 布局以支持内容撑满

**示例：**
```vue
<template>
  <div class="a-page">
    <!-- 页面内容 -->
  </div>
</template>
```

**典型场景：**
- 基础页面：`.a-page > .a-card`
- 表格页面：`.a-page > .a-table.is-full`
- 多卡片布局：`.a-page > .a-card + .a-card`

---

### 1.2 卡片容器 `.a-card`

**用途：** 白色背景的卡片容器，最常用的内容分组容器

**特性：**
- Flex 布局，`row wrap`，默认 `gap: 8px`
- 内边距：`padding: 12px 16px`
- 圆角：`border-radius: 8px`
- 阴影：`box-shadow: var(--li-elevation-100)`
- 宽度：默认 `width: 100%`

**修饰符：**
- `.is-dark`：灰色背景卡片（`background: var(--li-color-on-light-100)`），无阴影
- `.is-loose`：较宽间距（`gap: 16px`）
- `.is-full`：内部可滚动，自动撑满剩余高度（`overflow: auto; flex: 1`）

**示例：**
```vue
<!-- 白色卡片 -->
<div class="a-card">
  <div class="a-header">标题</div>
  <div class="fn-w-full">内容</div>
</div>

<!-- 灰色卡片（常用于嵌套或子表单） -->
<div class="a-card is-dark">
  <div class="fn-w-full">灰色背景内容</div>
</div>

<!-- 可滚动卡片 -->
<div class="a-card is-full">
  <!-- 大量内容会自动滚动 -->
</div>
```

**典型场景：**
- 表单容器：`.a-card > .a-header + .li-form`
- 详情展示：`.a-card > .a-sub-header + .fn-w-full`
- 嵌套卡片：`.a-card > .a-card.is-dark`

---

### 1.3 区块容器 `.a-block`

**用途：** 通用的内容分组容器，不带背景色和阴影，仅提供布局能力

**特性：**
- Flex 布局，`row wrap`，默认 `gap: 8px`
- 宽度：默认 `width: 100%`
- 无背景、无边框、无内边距

**修饰符：**
- `.is-loose`：较宽间距（`gap: 16px`）
- `.is-full`：内部可滚动，自动撑满剩余高度

**示例：**
```vue
<!-- 按钮组容器 -->
<div class="a-block">
  <div class="is-right">
    <li-button>取消</li-button>
    <li-button type="primary">确定</li-button>
  </div>
</div>

<!-- 内容分组 -->
<div class="a-block is-loose">
  <div class="fn-w-6">左侧内容</div>
  <div class="fn-w-6">右侧内容</div>
</div>
```

**典型场景：**
- 按钮组：`.a-block > .is-right`
- 简单分栏：`.a-block.is-nowrap > .fn-w-6 + .fn-w-6`
- 表格底部：`.a-block > .li-pagination.is-right`

---

## 二、标题类

### 2.1 主标题 `.a-header`

**用途：** 卡片或区块的主标题

**特性：**
- Flex 布局，垂直居中
- 宽度：`width: 100%`
- 高度：`height: 32px`
- 字体：`font: var(--li-font-sub-heading)`（加粗样式）

**示例：**
```vue
<div class="a-card">
  <div class="a-header">
    标题文字
    <div class="is-right">
      <li-button>操作按钮</li-button>
    </div>
  </div>
</div>
```

---

### 2.2 子标题 `.a-sub-header`

**用途：** 卡片内部的次级标题

**特性：**
- Flex 布局，垂直居中
- 宽度：`width: 100%`
- 字体：`font: var(--li-font-body-strong)`（稍微加粗）

**示例：**
```vue
<div class="a-card">
  <div class="a-header">主标题</div>
  <div class="a-sub-header">子标题</div>
  <div class="fn-w-full">内容</div>
</div>
```

**必填标识：**
```vue
<div class="a-sub-header">
  <span class="is-asterisk">*</span>必填项标题
</div>
```

---

## 三、表格布局类

### 3.1 表格组件 `.a-table`

**用途：** 包裹查询、表格主体和分页的完整表格组件容器

**特性：**
- Flex 布局，`column`，`gap: 16px`
- 宽度：`width: 100%`

**修饰符：**
- `.is-full`：表格自动撑满剩余高度，内部滚动

**示例：**
```vue
<div class="a-table is-full">
  <div class="a-table-query">...</div>
  <div class="a-table-main a-card">
    <li-table>...</li-table>
  </div>
</div>
```

---

### 3.2 表格查询区 `.a-table-query`

**用途：** 表格顶部的查询条件区域

**特性：**
- Flex 布局，`gap: 16px`
- 默认 4 列布局（每列 `flex: 0 0 calc((100% - 48px) / 4)`）
- 配合 `inline` + `label-position="top"` 的 `li-form` 使用

**修饰符：**
- `.is-loose`：3 列布局（每列 `flex: 0 0 calc((100% - 32px) / 3)`）
- `.a-table-query-folded`：折叠模式，只显示一行

**子元素：**
- `.a-table-query-operation`：右侧操作按钮组容器

**示例：**
```vue
<div class="a-block a-table-query">
  <li-form inline label-position="top">
    <li-form-item label="用户名">
      <li-input clearable />
    </li-form-item>
    <!-- 更多查询项 -->
  </li-form>
  <div class="a-table-query-operation">
    <li-button type="secondary">查询</li-button>
    <li-button>重置</li-button>
  </div>
</div>
```

---

### 3.3 表格主体 `.a-table-main`

**用途：** 包裹表格、工具栏和分页的主体区域

**特性：**
- Flex 布局，`column`，`gap: 8px`
- 通常配合 `.a-card` 使用，形成白色背景

**子元素：**
- `.a-table-toolbar`：表格上方工具栏

**示例：**
```vue
<div class="a-table-main a-card" v-loading="loading">
  <!-- 工具栏 -->
  <div class="a-block">
    <div class="is-right">
      <li-button>导出</li-button>
      <li-button type="primary">新增</li-button>
    </div>
  </div>

  <!-- 表格 -->
  <li-table :data="tableData">...</li-table>

  <!-- 分页 -->
  <div class="a-block">
    <li-pagination class="is-right" />
  </div>
</div>
```

---

### 3.4 表格工具栏 `.a-table-toolbar`

**用途：** 表格上方的操作按钮区域（可选）

**特性：**
- `gap: 16px`
- 内部元素宽度自动调整

**示例：**
```vue
<div class="a-table-toolbar">
  <li-button>批量删除</li-button>
  <div class="is-right">
    <li-button>导出</li-button>
  </div>
</div>
```

---

## 四、表单布局类

### 4.1 子表单 `.a-sub-form`

**用途：** 用于动态表单、嵌套表单等场景的表单容器

**特性：**
- Flex 布局，`row wrap`
- 宽度：`width: 100%`
- 表单项默认下边距：`margin-bottom: 16px`

**使用场景：**
- 动态添加/删除的表单项组
- 灰色卡片内的多列表单

**示例：**
```vue
<li-form-item prop="memberList" label-width="0">
  <div v-for="(item, index) in memberList" :key="index" class="a-card is-dark">
    <div class="a-sub-header">
      成员信息
      <div class="is-right">
        <li-button text :icon="IconDelete" @click="handleDelete(index)" />
      </div>
    </div>

    <div class="a-sub-form">
      <li-form-item label="姓名" class="fn-w-6" :prop="`memberList.${index}.name`">
        <li-input v-model="item.name" clearable />
      </li-form-item>
      <li-form-item label="角色" class="fn-w-6" :prop="`memberList.${index}.role`">
        <li-select v-model="item.role" clearable />
      </li-form-item>
    </div>
  </div>

  <div class="a-block">
    <li-button text type="primary" :icon="IconAdd" @click="handleAdd">新增成员</li-button>
  </div>
</li-form-item>
```

---

## 五、功能类 `.fn-*`

### 5.1 宽度控制类

基于 12 栅格系统的宽度控制，需要配合 `.is-nowrap` 使用以避免换行。

**类名列表：**
- `.fn-w-1` ~ `.fn-w-12`：占 1~12 个栅格（`.fn-w-12` = `width: 100%`）
- `.fn-w-full`：强制宽度 100%（用于 flex wrap 场景）
- `.fn-w-unset`：恢复默认宽度

**示例：**
```vue
<!-- 两列等宽布局 -->
<div class="a-block is-nowrap">
  <li-button class="fn-w-6">左侧</li-button>
  <li-button class="fn-w-6">右侧</li-button>
</div>

<!-- 1:11 分栏 -->
<div class="a-card is-nowrap">
  <div class="fn-w-1">图标</div>
  <div class="fn-w-11">内容</div>
</div>

<!-- 表单两列布局 -->
<li-form>
  <li-form-item label="姓名" class="fn-w-6">
    <li-input />
  </li-form-item>
  <li-form-item label="性别" class="fn-w-6">
    <li-select />
  </li-form-item>
  <li-form-item label="备注" class="fn-w-full">
    <li-input type="textarea" />
  </li-form-item>
</li-form>
```

**注意事项：**
- 栅格布局必须在 `.is-nowrap` 容器内使用
- 如果容器有 `gap`，总宽度可能超过 100% 导致换行

---

### 5.2 其他功能类

- `.fn-flex-1`：`flex: 1`，自动占满剩余空间
- `.fn-ellipsis-2`：文本超出两行显示省略号
- `.fn-ellipsis-3`：文本超出三行显示省略号

**示例：**
```vue
<!-- 左侧固定，右侧自适应 -->
<div class="a-block is-nowrap">
  <div class="fn-w-2">标签</div>
  <div class="fn-flex-1">内容</div>
</div>

<!-- 文本省略 -->
<div class="fn-w-full fn-ellipsis-2">
  很长的文本内容...
</div>
```

---

## 六、状态修饰符 `.is-*`

### 6.1 通用修饰符

- `.is-nowrap`：强制不换行（`flex-flow: row nowrap`）
- `.is-column`：纵向排列（`flex-flow: column nowrap`）
- `.is-right`：元素右对齐（`margin-left: auto`）
- `.is-full`：撑满剩余高度并内部滚动（`overflow: auto; flex: 1`）
- `.is-asterisk`：必填标识（红色星号，`color: var(--li-color-error-700)`）

**示例：**
```vue
<!-- 右对齐按钮 -->
<div class="a-block">
  <div class="is-right">
    <li-button>取消</li-button>
    <li-button type="primary">确定</li-button>
  </div>
</div>

<!-- 纵向排列 -->
<div class="a-card is-column">
  <div>第一行</div>
  <div>第二行</div>
</div>
```

---

### 6.2 容器特定修饰符

- `.a-card.is-dark`：灰色背景卡片
- `.a-card.is-loose`：间距 16px 的卡片
- `.a-table.is-full`：表格撑满剩余高度
- `.a-table-query.is-loose`：3 列查询布局

---

## 七、典型布局模式

### 7.1 基础表单页

```vue
<template>
  <div class="a-page">
    <div class="a-card">
      <div class="a-header">用户信息</div>
      <li-form ref="formRef" label-width="90px" :model="formData">
        <li-form-item label="用户名" prop="userName">
          <li-input v-model="formData.userName" clearable />
        </li-form-item>
        <li-form-item label="性别" prop="sex">
          <li-radio-group v-model="formData.sex">
            <li-radio :label="0">男</li-radio>
            <li-radio :label="1">女</li-radio>
          </li-radio-group>
        </li-form-item>
        <li-form-item label="备注" prop="remark">
          <li-input v-model="formData.remark" type="textarea" />
        </li-form-item>
      </li-form>
      <div class="a-block">
        <div class="is-right">
          <li-button @click="handleReset">重置</li-button>
          <li-button type="primary" :loading="loading" @click="handleSubmit">提交</li-button>
        </div>
      </div>
    </div>
  </div>
</template>
```

**速记：** `.a-page > .a-card > .a-header + .li-form + .a-block > .is-right`

---

### 7.2 完整表格页

```vue
<template>
  <div class="a-page">
    <div class="a-table is-full">
      <!-- 查询区 -->
      <div class="a-block a-table-query">
        <li-form inline label-position="top">
          <li-form-item label="用户名">
            <li-input clearable />
          </li-form-item>
          <li-form-item label="状态">
            <li-select clearable />
          </li-form-item>
        </li-form>
        <div class="a-table-query-operation">
          <li-button type="secondary">查询</li-button>
          <li-button>重置</li-button>
        </div>
      </div>

      <!-- 表格主体 -->
      <div class="a-table-main a-card" v-loading="loading">
        <!-- 工具栏 -->
        <div class="a-block">
          <div class="is-right">
            <li-button>导出</li-button>
            <li-button type="primary" @click="handleAdd">新增</li-button>
          </div>
        </div>

        <!-- 表格 -->
        <li-table border :data="tableData">
          <li-table-column type="selection" width="50" />
          <li-table-column prop="userName" label="用户名" />
          <li-table-column fixed="right" label="操作" width="119">
            <template #default="{ row }">
              <li-button text type="primary" @click="handleEdit(row)">编辑</li-button>
              <li-button text type="danger" @click="handleDelete(row)">删除</li-button>
            </template>
          </li-table-column>
        </li-table>

        <!-- 分页 -->
        <div class="a-block">
          <li-pagination
            class="is-right"
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :total="total"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

**速记：** `.a-page > .a-table.is-full > .a-table-query + .a-table-main.a-card`

---

### 7.3 子表单（动态表单）

```vue
<template>
  <div class="a-page">
    <div class="a-card">
      <div class="a-header">项目信息</div>
      <li-form ref="formRef" label-width="90px" :model="formData">
        <li-form-item label="项目名称" class="fn-w-6">
          <li-input v-model="formData.name" clearable />
        </li-form-item>

        <div class="a-sub-header">
          <span class="is-asterisk">*</span>项目成员
        </div>

        <li-form-item prop="members" label-width="0">
          <div v-for="(item, index) in formData.members" :key="index" class="a-card is-dark">
            <div class="a-sub-header">
              成员 {{ index + 1 }}
              <div class="is-right">
                <li-button text :icon="IconDelete" @click="handleDelete(index)" />
              </div>
            </div>

            <div class="a-sub-form">
              <li-form-item label="姓名" class="fn-w-6" :prop="`members.${index}.name`">
                <li-input v-model="item.name" clearable />
              </li-form-item>
              <li-form-item label="角色" class="fn-w-6" :prop="`members.${index}.role`">
                <li-select v-model="item.role" clearable />
              </li-form-item>
            </div>
          </div>

          <div class="a-block">
            <li-button text type="primary" :icon="IconAdd" @click="handleAdd">新增成员</li-button>
          </div>
        </li-form-item>
      </li-form>
    </div>
  </div>
</template>
```

**速记：** `.a-card > .a-header + .li-form > .a-sub-header + .li-form-item > .a-card.is-dark > .a-sub-form`

---

### 7.4 两列布局

```vue
<template>
  <div class="a-page">
    <div class="a-card">
      <div class="a-header">基础信息</div>
      <li-form label-width="90px">
        <li-form-item label="姓名" class="fn-w-6">
          <li-input clearable />
        </li-form-item>
        <li-form-item label="年龄" class="fn-w-6">
          <li-input-number />
        </li-form-item>
        <li-form-item label="地址" class="fn-w-full">
          <li-input clearable />
        </li-form-item>
      </li-form>
    </div>
  </div>
</template>
```

**速记：** `.a-card > .li-form > .fn-w-6 + .fn-w-6 + .fn-w-full`

---

### 7.5 可滚动卡片

```vue
<template>
  <div class="a-page">
    <div class="a-card is-full">
      <div class="fn-w-full">内容 1</div>
      <div class="fn-w-full">内容 2</div>
      <!-- 更多内容会自动滚动 -->
    </div>
  </div>
</template>
```

**速记：** `.a-page > .a-card.is-full`

---

## 八、开发注意事项

### 8.1 组件样式继承规则

所有 LiUI 表单组件在 flex 容器中会自动 `width: 100%`，包括：
- `li-input`、`li-select`、`li-date-picker`、`li-cascader`
- `li-form`、`li-form-item`、`li-table`
- `li-card`、`li-tabs`、`li-tree` 等

### 8.2 按钮间距规则

- 全局按钮间距：`16px`
- 表格单元格内按钮间距：`8px`
- 表格单元格内文字按钮间距：`4px`
- 使用 flex 容器的 `gap` 时，按钮会自动使用容器间距

### 8.3 表单开发规范

1. **表单项必须有 clearable**：所有 `input`、`select`、`cascader` 等组件都应添加 `clearable` 属性
2. **查询表单使用 inline**：表格查询区的 `li-form` 必须添加 `inline` 和 `label-position="top"`
3. **子表单验证**：动态表单的 `prop` 使用 `` `memberList.${index}.name` `` 格式
4. **按钮加 loading**：所有调用接口的按钮都应绑定 `loading` 状态

### 8.4 表格开发规范

1. **列宽自适应，防止换行**：
   - 除序号列和操作列外，其他列**不要设置 width**，让列宽自适应内容
   - **所有列都必须添加 `show-overflow-tooltip`**，长文本自动显示省略号，鼠标悬停显示完整内容
   - 表格内容超宽时会自动出现横向滚动条
   ```vue
   <!-- ✅ 正确：列宽自适应，不换行 -->
   <li-table-column prop="productName" label="商品名称" show-overflow-tooltip />
   <li-table-column prop="shopName" label="店铺名称" show-overflow-tooltip />

   <!-- ❌ 错误：设置固定 width 或 min-width 可能导致内容换行或错行 -->
   <li-table-column prop="productName" label="商品名称" width="200" />
   ```

2. **操作列规范**：
   - 操作列使用 `fixed="right"` 固定在右侧
   - 如果操作按钮较多，**不要添加图标**，只使用纯文字按钮，避免换行
   - 操作列可以不设置宽度，让其自适应
   ```vue
   <!-- ✅ 正确：纯文字按钮，不换行 -->
   <li-table-column label="操作" fixed="right">
     <template #default="{ row }">
       <li-button type="text" size="small" @click="handleView(row)">查看</li-button>
       <li-button type="text" size="small" @click="handleEdit(row)">编辑</li-button>
       <li-button type="text" size="small" @click="handleDelete(row)">删除</li-button>
     </template>
   </li-table-column>

   <!-- ❌ 错误：带图标的按钮容易换行，影响美观 -->
   <li-table-column label="操作" width="180" fixed="right">
     <template #default="{ row }">
       <li-button type="text" size="small" @click="handleView(row)">
         <template #icon><icon-edit-text-editing-o /></template>
         查看
       </li-button>
       <!-- 更多按钮... -->
     </template>
   </li-table-column>
   ```

3. **金额列右对齐**：使用 `align="right"` 和格式化函数
   ```vue
   <li-table-column prop="price" label="价格(元)" align="right" show-overflow-tooltip>
     <template #default="{ row }">
       ¥{{ row.price.toFixed(2) }}
     </template>
   </li-table-column>
   ```

4. **选择列宽度 50**：`<li-table-column type="selection" width="50" />`

5. **序号列宽度 60**：`<li-table-column type="index" label="序号" width="60" align="center" />`


### 8.5 代码组织规范

推荐的 `<script setup>` 代码块顺序：

```typescript
/* 代码区块-import部分 */
import { ref, reactive } from 'vue';
import { LiMessage } from '@chehejia/liui-next';

/* 代码区块-定义变量 */
const loading = ref(false);
const formData = reactive({});

/* 代码区块-定义方法 */
const formatDate = () => {};

/* 代码区块-事件处理器 */
const handleSubmit = async () => {};

/* 代码区块-watch或watchEffect */
watch(() => {}, () => {});

/* 代码区块-生命周期 */
onMounted(() => {});
```

---

## 九、快速速记表（供 AI 使用）

| 速记表达式 | 含义 | 使用场景 |
|-----------|------|----------|
| `.a-page` | 页面容器 | 所有页面的最外层 |
| `.a-card` | 白色卡片 | 表单、详情、内容分组 |
| `.a-card.is-dark` | 灰色卡片 | 嵌套卡片、子表单 |
| `.a-block` | 无样式容器 | 按钮组、简单分组 |
| `.a-header` | 主标题 | 卡片标题 |
| `.a-sub-header` | 子标题 | 卡片内次级标题 |
| `.a-table.is-full` | 表格组件 | 完整表格页面 |
| `.a-table-query` | 查询区 | 表格顶部查询 |
| `.a-table-main.a-card` | 表格主体 | 表格+工具栏+分页 |
| `.a-sub-form` | 子表单 | 动态表单、嵌套表单 |
| `.fn-w-6` | 半宽（50%） | 两列布局 |
| `.fn-w-full` | 全宽（100%） | 强制占满一行 |
| `.is-right` | 右对齐 | 按钮组右对齐 |
| `.is-nowrap` | 不换行 | 栅格布局必须 |
| `.is-full` | 撑满可滚动 | 卡片/表格内部滚动 |

---

## 十、AI 生成代码检查清单

在生成 LiUI 页面代码时，确保：

- [ ] 最外层使用 `.a-page`
- [ ] 卡片使用 `.a-card`，嵌套卡片使用 `.is-dark`
- [ ] 标题使用 `.a-header` 或 `.a-sub-header`
- [ ] 表单组件添加 `clearable` 属性
- [ ] 表格使用 `.a-table.is-full` 结构
- [ ] 查询表单使用 `inline` + `label-position="top"`
- [ ] 按钮组使用 `.a-block > .is-right`
- [ ] 动态表单使用 `.a-sub-form` + `.a-card.is-dark`
- [ ] 栅格布局容器添加 `.is-nowrap`
- [ ] 接口按钮绑定 `loading` 状态
- [ ] **表格所有列添加 `show-overflow-tooltip`，防止文字换行**
- [ ] **表格列不设置 width（除序号、操作列），让其自适应内容**
- [ ] **操作列按钮不加图标，使用纯文字按钮避免换行**
- [ ] 金额列使用 `align="right"` + 格式化
- [ ] 操作列固定右侧 `fixed="right"`

---

**文档版本：** v1.1
**最后更新：** 2025-01-19
