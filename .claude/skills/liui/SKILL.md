---
name: liui
description: Generate Vue 3 code using LiUI component library (一套基于Vue 3的UI组件库) with proper conventions and best practices. Use when the user mentions LiUI components, needs Vue UI with LiUI-specific components (LiButton, LiTable, LiForm, etc.), or explicitly requests LiUI. Provides 60+ component patterns, import conventions, and LiUI-specific guidelines.
---

# LiUI Component Library

Guide for creating Vue 3 applications using the LiUI component library with proper conventions and best practices.

## When to Use This Skill

Use this skill when:
- User explicitly mentions "LiUI" or LiUI components
- Working with `@chehejia/liui-next` or `@chehejia/liui-icons` packages
- Building Vue interfaces that require LiUI-specific patterns

**For general Vue 3 development**: Use the `vue` skill for Composition API patterns, component architecture, props/emits, composables, and testing. This skill extends those patterns with LiUI-specific conventions.

## Quick Reference

| Working on...                  | Load file                                    |
| ------------------------------ | -------------------------------------------- |
| Component overview & patterns  | [references/quick-reference.md](references/quick-reference.md) |
| **Layout & styling patterns**  | **[references/layout-best-practices.md](references/layout-best-practices.md)** |
| Specific component details     | components/*.md                              |
| General Vue patterns           | Use `vue` skill                              |

## Core Principles

Follow these LiUI-specific principles (combine with general Vue 3 patterns from the `vue` skill):

1. **Component-First**: Use LiUI components instead of native HTML elements
2. **Consistency**: Follow LiUI's standard type, size, and status conventions
3. **Icons**: Always import from `@chehejia/liui-icons` package (not generic icon libraries)
4. **Form Validation**: Leverage LiUI's built-in validation system
5. **Responsive**: Use LiUI's 24-column grid system with breakpoints (xs/sm/md/lg/xl)
6. **Layout System**: Use the standardized layout classes (`.a-page`, `.a-card`, `.a-table`, etc.) - see [Layout Best Practices](references/layout-best-practices.md)
7. **Standards First**: Always check existing layout patterns before writing code. DO NOT create custom layouts.

## Code Generation Workflow

**⚠️ MANDATORY: Follow this workflow for every code generation request:**

1. **Identify page type**: Table page? Form page? Dynamic form? Detail page?
2. **Read layout standards**: Open [references/layout-best-practices.md](references/layout-best-practices.md)
3. **Find matching pattern**: Look in section "七、典型布局模式" (Typical Layout Patterns)
4. **Use exact structure**: Copy the standard pattern structure
5. **Fill in details**: Add specific fields, data, and logic
6. **Verify compliance**: Check against "十、AI 生成代码检查清单" (AI Code Generation Checklist)

**Never skip steps 2-3. If you cannot find a matching pattern, ask the user before improvising.**

## Standard Conventions

### Size System
All components use: `'large' | 'default' | 'small'`

### Type System
Standard types: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'text'`

### v-model Patterns
- Single: `v-model="value"`
- Multiple: `v-model:page-size`, `v-model:current-page`, `v-model:visible`

### Responsive Breakpoints
- xs: <768px
- sm: ≥768px
- md: ≥992px
- lg: ≥1200px
- xl: ≥1920px

## Import Patterns

```typescript
// Components
import { LiButton, LiInput, LiForm, LiFormItem } from '@chehejia/liui-next'

// Icons
import {
  IconBasicDeleteO,
  IconBasicSearchO,
  IconEditTextEditingO,
  IconCloudUpO,
} from '@chehejia/liui-icons'

// Types
import type { FormInstance, FormRules } from '@chehejia/liui-next'

// Services
import { LiMessage, LiMessageBox, LiLoading } from '@chehejia/liui-next'
```

## Common Components

| File                                                     | Topics                                  |
| -------------------------------------------------------- | --------------------------------------- |
| **[references/quick-reference.md](references/quick-reference.md)** | All components organized by category    |
| **components/*.md**                                     | Per-component docs (Button, Dialog...)  |


## Common Gotchas

1. **v-model binding**: Always use v-model, don't mix with direct prop binding
2. **Chart dimensions**: Charts need explicit width/height on container
3. **Form validation**: Must use `prop` on FormItem for validation to work
4. **Icon imports**: Import from `@chehejia/liui-icons`, not generic icon libraries
5. **Type consistency**: Use standard values (primary, success, warning, etc.)
6. **Responsive cols**: Total span should sum to 24 in grid system

## Component Reference

For complete component lists and API details, see [references/quick-reference.md](references/quick-reference.md).

Common component categories:
- **Basic**: Button, Icon, Link, Layout components (Row, Col, Container...)
- **Form**: Input, Select, DatePicker, Upload, Form validation
- **Data Display**: Table, Pagination, Tag, Card, Tree, Timeline
- **Navigation**: Menu, Breadcrumb, Dropdown, Tabs, Steps
- **Feedback**: Alert, Dialog, Message, Tooltip, Loading
- **Charts**: LiBar, LiLine, LiPie, LiRadar, etc.

## Generation Guidelines

When generating LiUI code:

### 1. Layout Structure (CRITICAL - Must Follow)

**⚠️ IMPORTANT: LiUI has strict internal layout standards. DO NOT improvise or create custom layouts.**

**Before writing any layout code:**
1. **ALWAYS read** [references/layout-best-practices.md](references/layout-best-practices.md) first
2. **Search for matching pattern** in section "七、典型布局模式" (Typical Layout Patterns)
3. **Use the exact structure** from the standard patterns
4. **Only deviate** if NO matching pattern exists

**Standard Layout Patterns (MUST use these):**

| Page Type | Pattern | Reference Section |
|-----------|---------|-------------------|
| Table page with query | `.a-page > .a-table.is-full > .a-block.a-table-query + .a-table-main.a-card` | Section 7.2 |
| Form page | `.a-page > .a-card > .a-header + .li-form + .a-block > .is-right` | Section 7.1 |
| Dynamic form (sub-form) | `.a-card > .a-sub-form + .a-card.is-dark` | Section 7.3 |
| Two-column layout | `.li-form > .fn-w-6 + .fn-w-6 + .fn-w-full` | Section 7.4 |

**Query Area Structure (MUST follow exactly):**
```vue
<div class="a-block a-table-query">
  <li-form inline label-position="top">
    <!-- Query fields -->
  </li-form>
  <div class="a-table-query-operation">
    <li-button type="secondary">查询</li-button>
    <li-button>重置</li-button>
  </div>
</div>
```

**Common Layout Classes (Use these, not custom CSS):**
- Page wrapper: `.a-page` (always outermost)
- Cards: `.a-card` (white) or `.a-card.is-dark` (gray background)
- Titles: `.a-header` (main) or `.a-sub-header` (secondary)
- Tables: `.a-table.is-full > .a-table-query + .a-table-main.a-card`
- Blocks: `.a-block` (generic container) + `.is-right` (right align)
- Widths: `.fn-w-6`, `.fn-w-full` (12-grid system)

**Do NOT:**
- ❌ Create custom container classes or divs without standard classes
- ❌ Write custom flex/grid CSS when standard classes exist
- ❌ Put query buttons inside `<li-form-item>` (use `.a-table-query-operation` instead)
- ❌ Omit `.a-block` from `.a-table-query`
- ❌ Use custom styles for spacing (use `.is-loose`, `gap` from standard classes)

### 2. Component Usage

2. Import all necessary components and icons at the top
3. Follow standard size, type, and status conventions
4. Include form validation for user inputs with proper `prop` attributes
5. Provide loading states for async operations (`:loading="loading"` on buttons)
6. Add proper TypeScript types for refs and data (see `vue` skill for patterns)
7. Include success/error messages for user feedback
8. Use v-model consistently for two-way binding
9. Ensure chart containers have explicit dimensions
10. **Form components must have `clearable` attribute** (input, select, cascader, etc.)
11. **Query forms use `inline` + `label-position="top"`** for table search areas
12. **Query buttons use `type="secondary"`** for primary query button

**General Vue 3 patterns** (Composition API, props/emits, reactive refs, etc.): Refer to the `vue` skill.

**LiUI components and APIs**: See [references/quick-reference.md](references/quick-reference.md) for complete component lists.

**Layout and styling patterns**: See [references/layout-best-practices.md](references/layout-best-practices.md) for page structure, container classes, and typical layouts.

## Critical Reminders

**🚨 BEFORE generating ANY LiUI code:**

1. **Layout patterns are MANDATORY standards, not suggestions**
   - These are internal company standards that must be followed
   - Non-compliance will require rework
   - Always use standard patterns from layout-best-practices.md

2. **When to use standard patterns vs. custom code:**
   - ✅ **Use standard pattern**: Table page, form page, query form, dynamic form, detail page
   - ⚠️ **Check first, then ask**: Unusual layouts, complex nested structures
   - ❌ **Never improvise**: Don't create custom layout CSS without checking standards first

3. **Red flags that indicate you're not following standards:**
   - Writing custom flex/grid CSS in `<style>` section
   - Creating wrapper divs without standard classes (`.a-*`, `.fn-*`, `.is-*`)
   - Putting query buttons inside `<li-form-item>`
   - Using non-standard container structures

4. **How to verify your code:**
   - Check against "十、AI 生成代码检查清单" in layout-best-practices.md
   - Every layout should match a pattern from "七、典型布局模式"
   - If you wrote custom CSS, ask yourself: "Is there a standard class for this?"

**Remember**: LiUI provides a complete, cohesive UI system with strict internal standards. Combine LiUI-specific patterns from this skill with general Vue 3 best practices from the `vue` skill to create professional, standards-compliant applications.
