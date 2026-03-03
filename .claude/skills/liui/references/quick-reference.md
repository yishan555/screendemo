# LiUI Component Quick Reference

Complete list of all LiUI components organized by category.

## Component Categories

### Basic Components

Layout and basic UI elements:

- **Button**: LiButton, LiButtonGroup
- **Icon**: Icon (use with `@chehejia/liui-icons`)
- **Link**: LiLink
- **Text**: LiText
- **Layout**:
  - LiContainer, LiHeader, LiAside, LiMain, LiFooter
  - LiRow, LiCol (24-column grid system)
- **Scrollbar**: LiScrollbar
- **Transition**: LiTransition

### Form Components

Input and form validation:

- **Text Input**: LiInput, LiInputNumber
- **Selection**:
  - LiSelect, LiAutocomplete, LiCascader
  - LiCheckbox, LiRadio
- **Pickers**:
  - LiDatePicker, LiTimePicker, LiTimeSelect
- **Interactive**:
  - LiRate, LiSlider, LiSwitch
- **Advanced**:
  - LiSearch, LiTransfer, LiUpload
- **Form Control**: LiForm, LiFormItem

**Form validation**: Use `prop` attribute on LiFormItem to enable validation rules.

### Data Display Components

Tables, cards, and data visualization:

- **Table**: LiTable, LiTableColumn, LiPagination
- **Tags**: LiTag, LiCheckTag, LiStatusTag
- **Progress**: LiProgress
- **Card**: LiCard
- **Calendar**: LiCalendar
- **Avatar**: LiAvatar
- **Badge**: LiBadge
- **Empty**: LiEmpty
- **Image**: LiImage
- **Carousel**: LiCarousel, LiCarouselItem
- **Collapse**: LiCollapse, LiCollapseItem
- **Tree**: LiTree
- **Timeline**: LiTimeline, LiTimelineItem

### Navigation Components

Menus, breadcrumbs, and navigation:

- **Menu**: LiMenu, LiSubMenu, LiMenuItem, LiMenuItemGroup
- **Breadcrumb**: LiBreadcrumb, LiBreadcrumbItem
- **Dropdown**: LiDropdown, LiDropdownMenu, LiDropdownItem
- **Tabs**: LiTabs, LiTabPane
- **Steps**: LiSteps, LiStep
- **Anchor**: LiAnchor, LiAnchorItem
- **PageHeader**: LiPageHeader
- **Backtop**: LiBacktop

### Feedback Components

Alerts, dialogs, and notifications:

- **Alert**: LiAlert
- **Modal**: LiDialog, LiDrawer
- **Services**:
  - LiMessage (toast notifications)
  - LiMessageBox (confirm dialogs)
  - LiNotification (corner notifications)
- **Popovers**: LiPopover, LiPopconfirm, LiTooltip
- **Loading**: LiLoading

**Service imports**: Message, MessageBox, and Loading are imported as services, not components.

### Chart Components

Data visualization charts (require explicit width/height on container):

- **Bar Charts**: LiBar, LiBarStack
- **Line Chart**: LiLine
- **Pie Charts**: LiPie, LiDonut
- **Funnel Chart**: LiFunnel
- **Radar Chart**: LiRadar
- **Combined**: LiCombin (multiple chart types)

**Important**: All chart components require explicit width and height on their container element.

## Standard Conventions Reference

### Size System
All components support: `'large' | 'default' | 'small'`

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

### Grid System
Use LiRow and LiCol with 24-column system:
```vue
<LiRow :gutter="20">
  <LiCol :span="12" :xs="24" :md="12">Left</LiCol>
  <LiCol :span="12" :xs="24" :md="12">Right</LiCol>
</LiRow>
```

Total `:span` values should sum to 24.

## Import Patterns

### Components
```typescript
import { LiButton, LiInput, LiForm, LiFormItem } from '@chehejia/liui-next'
```

### Icons
```typescript
import {
  IconBasicDeleteO,
  IconBasicSearchO,
  IconEditTextEditingO,
  IconCloudUpO,
} from '@chehejia/liui-icons'
```

### Types
```typescript
import type { FormInstance, FormRules } from '@chehejia/liui-next'
```

### Services
```typescript
import { LiMessage, LiMessageBox, LiLoading } from '@chehejia/liui-next'
```

## Common Patterns

### Form with Validation
```vue
<LiForm :model="form" :rules="rules" ref="formRef">
  <LiFormItem label="Username" prop="username">
    <LiInput v-model="form.username" />
  </LiFormItem>
</LiForm>
```

Note: `prop` attribute is required on LiFormItem for validation to work.

### Responsive Layout
```vue
<LiRow :gutter="16">
  <LiCol :span="24" :md="12" :lg="8">Column 1</LiCol>
  <LiCol :span="24" :md="12" :lg="8">Column 2</LiCol>
  <LiCol :span="24" :md="24" :lg="8">Column 3</LiCol>
</LiRow>
```

### Service Notifications
```typescript
// Success message
LiMessage.success('Operation successful')

// Confirm dialog
LiMessageBox.confirm('Are you sure?', 'Confirm', {
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  type: 'warning'
}).then(() => {
  // Confirmed
}).catch(() => {
  // Cancelled
})

// Loading
const loading = LiLoading.service({ fullscreen: true })
// ... async operation
loading.close()
```
