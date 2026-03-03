# Form 表单

Maintainer: 段扬帅

1. [典型表单](#典型表单)
2. [行内表单](#行内表单)
3. [对齐方式](#对齐方式)
4. [表单校验](#表单校验)
5. [自定义校验规则](#自定义校验规则)
6. [添加/删除表单项](#添加-删除表单项)
7. [数字类型验证](#数字类型验证)
8. [尺寸控制](#尺寸控制)
9. [无障碍](#无障碍)
10. [字段说明](#字段说明)
11. [信息和错误提示](#信息和错误提示)
12. [只读样式](#只读样式)
13. [Form API](#form-api)
    1. [Form Props](#form-props)
    2. [Form Methods](#form-methods)
    3. [Form Events](#form-events)
    4. [Form Slots](#form-slots)
14. [FormItem API](#formitem-api)
    1. [FormItem Props](#formitem-props)
    2. [FormItem Slots](#formitem-slots)
    3. [FormItem Methods](#formitem-methods)

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

TIP

Form 组件已经从 2. x 的 Float 布局升级为 Flex 布局。

## 典型表单

最基础的表单包括各种输入表单项，比如`input`、`select`、`radio`、`checkbox`等。

在每一个 `form` 组件中，你需要一个 `form-item` 字段作为输入项的容器，用于获取值与验证值。

Activity name

Activity zone

Activity time

-

Instant delivery

Activity type

Online activitiesPromotion activitiesOffline activitiesSimple brand exposure

Resources

SponsorVenue

Activity form

CreateCancel

```
<template>
  <li-form :model="form" label-width="120px">
    <li-form-item label="Activity name">
      <li-input v-model="form.name" />
    </li-form-item>
    <li-form-item label="Activity zone">
      <li-select v-model="form.region" placeholder="please select your zone">
        <li-option label="Zone one" value="shanghai" />
        <li-option label="Zone two" value="beijing" />
      </li-select>
    </li-form-item>
    <li-form-item label="Activity time">
      <li-col :span="11">
        <li-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
      </li-col>
      <li-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </li-col>
      <li-col :span="11">
        <li-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
      </li-col>
    </li-form-item>
    <li-form-item label="Instant delivery">
      <li-switch v-model="form.delivery" />
    </li-form-item>
    <li-form-item label="Activity type">
      <li-checkbox-group v-model="form.type">
        <li-checkbox label="Online activities" name="type" />
        <li-checkbox label="Promotion activities" name="type" />
        <li-checkbox label="Offline activities" name="type" />
        <li-checkbox label="Simple brand exposure" name="type" />
      </li-checkbox-group>
    </li-form-item>
    <li-form-item label="Resources">
      <li-radio-group v-model="form.resource">
        <li-radio label="Sponsor" />
        <li-radio label="Venue" />
      </li-radio-group>
    </li-form-item>
    <li-form-item label="Activity form">
      <li-input v-model="form.desc" type="textarea" />
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="onSubmit">Create</li-button>
      <li-button>Cancel</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
```

TIP

[W3C](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2) 标准定义：

> *当一个表单中只有一个单行文本输入字段时， 用户代理人应该在该字段中接受输入作为提交表单的请求。* 如果希望阻止这一默认行为，可以在 `<li-form>` 标签上添加 `@submit.prevent`。

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

Approved by

Activity zone

Query

```
<template>
  <li-form inline :model="formInline" class="demo-form-inline">
    <li-form-item label="Approved by">
      <li-input v-model="formInline.user" placeholder="Approved by" />
    </li-form-item>
    <li-form-item label="Activity zone">
      <li-select v-model="formInline.region" placeholder="Activity zone">
        <li-option label="Zone one" value="shanghai" />
        <li-option label="Zone two" value="beijing" />
      </li-select>
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="onSubmit">Query</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formInline = reactive({
  user: '',
  region: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
```

## 对齐方式

根据你们的设计情况，来选择最佳的标签对齐方式。

通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`， 当设为 `top` 时标签会置于表单域的顶部

LeftRightTop

Name

Activity zone

Activity form

```
<template>
  <li-radio-group v-model="labelPosition" label="label position">
    <li-radio-button label="left">Left</li-radio-button>
    <li-radio-button label="right">Right</li-radio-button>
    <li-radio-button label="top">Top</li-radio-button>
  </li-radio-group>
  <div style="margin: 20px" />
  <li-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
    <li-form-item label="Name">
      <li-input v-model="formLabelAlign.name" />
    </li-form-item>
    <li-form-item label="Activity zone">
      <li-input v-model="formLabelAlign.region" />
    </li-form-item>
    <li-form-item label="Activity form">
      <li-input v-model="formLabelAlign.type" />
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const labelPosition = ref('right');

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
});
</script>
```

## 表单校验

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

Activity name

Activity zone

Activity count

Activity time

-

Instant delivery

Activity type

Online activitiesPromotion activitiesOffline activitiesSimple brand exposure

Resources

SponsorshipVenue

Activity form

Create Reset

```
<template>
  <li-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <li-form-item label="Activity name" prop="name">
      <li-input v-model="ruleForm.name" />
    </li-form-item>
    <li-form-item label="Activity zone" prop="region">
      <li-select v-model="ruleForm.region" placeholder="Activity zone">
        <li-option label="Zone one" value="shanghai" />
        <li-option label="Zone two" value="beijing" />
      </li-select>
    </li-form-item>
    <li-form-item label="Activity count" prop="count">
      <li-select-v2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
    </li-form-item>
    <li-form-item label="Activity time" required>
      <li-col :span="11">
        <li-form-item prop="date1">
          <li-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </li-form-item>
      </li-col>
      <li-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </li-col>
      <li-col :span="11">
        <li-form-item prop="date2">
          <li-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time" style="width: 100%" />
        </li-form-item>
      </li-col>
    </li-form-item>
    <li-form-item label="Instant delivery" prop="delivery">
      <li-switch v-model="ruleForm.delivery" />
    </li-form-item>
    <li-form-item label="Activity type" prop="type">
      <li-checkbox-group v-model="ruleForm.type">
        <li-checkbox label="Online activities" name="type" />
        <li-checkbox label="Promotion activities" name="type" />
        <li-checkbox label="Offline activities" name="type" />
        <li-checkbox label="Simple brand exposure" name="type" />
      </li-checkbox-group>
    </li-form-item>
    <li-form-item label="Resources" prop="resource">
      <li-radio-group v-model="ruleForm.resource">
        <li-radio label="Sponsorship" />
        <li-radio label="Venue" />
      </li-radio-group>
    </li-form-item>
    <li-form-item label="Activity form" prop="desc">
      <li-input v-model="ruleForm.desc" type="textarea" />
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="submitForm(ruleFormRef)"> Create </li-button>
      <li-button @click="resetForm(ruleFormRef)">Reset</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@chehejia/liui-next';

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>
```

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

本例还使用`status-icon`属性为输入框添加了表示校验结果的反馈图标。

Password

Confirm

Age

SubmitReset

```
<template>
  <li-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <li-form-item label="Password" prop="pass">
      <li-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </li-form-item>
    <li-form-item label="Confirm" prop="checkPass">
      <li-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </li-form-item>
    <li-form-item label="Age" prop="age">
      <li-input v-model.number="ruleForm.age" />
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="submitForm(ruleFormRef)">Submit</li-button>
      <li-button @click="resetForm(ruleFormRef)">Reset</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@chehejia/liui-next';

const ruleFormRef = ref<FormInstance>();

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'));
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass', () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
});

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
```

TIP

自定义的校验回调函数必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

## 添加/删除表单项

除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。

Email

Domain0

Delete

SubmitNew domainReset

```
<template>
  <li-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
    <li-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <li-input v-model="dynamicValidateForm.email" />
    </li-form-item>
    <li-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'Domain' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
    >
      <li-input v-model="domain.value" />
      <li-button class="mt-2" @click.prevent="removeDomain(domain)">Delete</li-button>
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="submitForm(formRef)">Submit</li-button>
      <li-button @click="addDomain">New domain</li-button>
      <li-button @click="resetForm(formRef)">Reset</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from '@chehejia/liui-next';

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  domains: DomainItem[];
  email: string;
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
});

interface DomainItem {
  key: number;
  value: string;
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
```

## 数字类型验证

数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符。

age

SubmitReset

```
<template>
  <li-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
    <li-form-item
      label="age"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' },
      ]"
    >
      <li-input v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="submitForm(formRef)">Submit</li-button>
      <li-button @click="resetForm(formRef)">Reset</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from '@chehejia/liui-next';

const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: '',
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
```

TIP

当一个 `li-form-item` 嵌套在另一个 `li-form-item`时，其标签宽度将是 `0`。 如果需要可以为 `li-form-item` 单独设置 `label-width` 属性。

## 尺寸控制

表单中的所有子组件都继承了该表单的 `size` 属性。 同样，form-item 也有一个 `size` 属性。

如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的 `size` 属性，直接为这个表单项或表单组件设置自己的 size 属性即可。

largedefaultsmall

LeftRightTop

  

Activity name

Activity zone

Activity time

-

Activity type

Online activitiesPromotion activities

Resources

SponsorVenue

CreateCancel

```
<template>
  <div>
    <li-radio-group v-model="size" label="size control">
      <li-radio-button label="large">large</li-radio-button>
      <li-radio-button label="default">default</li-radio-button>
      <li-radio-button label="small">small</li-radio-button>
    </li-radio-group>
    <li-radio-group v-model="labelPosition" label="position control">
      <li-radio-button label="left">Left</li-radio-button>
      <li-radio-button label="right">Right</li-radio-button>
      <li-radio-button label="top">Top</li-radio-button>
    </li-radio-group>
  </div>
  <br />
  <li-form ref="form" :model="sizeForm" label-width="auto" :label-position="labelPosition" :size="size">
    <li-form-item label="Activity name">
      <li-input v-model="sizeForm.name" />
    </li-form-item>
    <li-form-item label="Activity zone">
      <li-select v-model="sizeForm.region" placeholder="please select your zone">
        <li-option label="Zone one" value="shanghai" />
        <li-option label="Zone two" value="beijing" />
      </li-select>
    </li-form-item>
    <li-form-item label="Activity time">
      <li-col :span="11">
        <li-date-picker
          v-model="sizeForm.date1"
          type="date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </li-col>
      <li-col class="text-center" :span="1" style="margin: 0 0.5rem">-</li-col>
      <li-col :span="11">
        <li-time-picker v-model="sizeForm.date2" label="Pick a time" placeholder="Pick a time" style="width: 100%" />
      </li-col>
    </li-form-item>
    <li-form-item label="Activity type">
      <li-checkbox-group v-model="sizeForm.type">
        <li-checkbox-button label="Online activities" name="type" />
        <li-checkbox-button label="Promotion activities" name="type" />
      </li-checkbox-group>
    </li-form-item>
    <li-form-item label="Resources">
      <li-radio-group v-model="sizeForm.resource">
        <li-radio border label="Sponsor" />
        <li-radio border label="Venue" />
      </li-radio-group>
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="onSubmit">Create</li-button>
      <li-button>Cancel</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const size = ref('default');
const labelPosition = ref('right');

const sizeForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

function onSubmit() {
  console.log('submit!');
}
</script>

<style>
.li-radio-group {
  margin-right: 12px;
}
</style>
```

## 无障碍

当在 `li-form-item` 内只有一个输入框（或相关的控制部件，如选择或复选框），表单项的标签将自动附加在那个输入框上。 然而，如果同时有多个输入框在 `li-form-item`内， 表单项将被分配为 [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) [组](https://www.w3.org/TR/wai-aria/#group) 的角色。 在这种情况下，需要手动给每个 input 指定访问标签。

"Full Name" label is automatically attached to the input:

Full Name

"Your Information" serves as a label for the group of inputs.   
 You must specify labels on the individal inputs. Placeholders are not replacements for using the "label" attribute.

Your Information

```
<template>
  <li-form label-position="left" label-width="150px" style="max-width: 460px">
    <li-space fill>
      <li-alert type="info" show-icon :closable="false">
        <p>"Full Name" label is automatically attached to the input:</p>
      </li-alert>
      <li-form-item label="Full Name">
        <li-input v-model="formAccessibility.fullName" />
      </li-form-item>
    </li-space>
    <li-space fill>
      <li-alert type="info" show-icon :closable="false">
        <p>
          "Your Information" serves as a label for the group of inputs. <br />
          You must specify labels on the individal inputs. Placeholders are not replacements for using the "label"
          attribute.
        </p>
      </li-alert>
      <li-form-item label="Your Information">
        <li-row :gutter="20">
          <li-col :span="12">
            <li-input v-model="formAccessibility.firstName" label="First Name" placeholder="First Name" />
          </li-col>
          <li-col :span="12">
            <li-input v-model="formAccessibility.lastName" label="Last Name" placeholder="Last Name" />
          </li-col>
        </li-row>
      </li-form-item>
    </li-space>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formAccessibility = reactive({
  fullName: '',
  firstName: '',
  lastName: '',
});
</script>
```

## 字段说明

活动名称

活动区域

立即创建 重置

```
<template>
  <li-form ref="tooltipFormRef" :model="tooltipForm" :rules="rules" label-width="100px" class="demo-tooltipForm">
    <li-form-item label="活动名称" prop="name" tooltip="此次活动名称">
      <li-input v-model="tooltipForm.name" />
    </li-form-item>
    <li-form-item label="活动区域" prop="region" tooltip="此次活动区域" tooltip-effect="light">
      <li-select v-model="tooltipForm.region" placeholder="请选择活动区域">
        <li-option label="区域一" value="shanghai" />
        <li-option label="区域二" value="beijing" />
      </li-select>
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="submitForm(tooltipFormRef)"> 立即创建 </li-button>
      <li-button @click="resetForm(tooltipFormRef)">重置</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@chehejia/liui-next';

const tooltipFormRef = ref<FormInstance>();

const tooltipForm = reactive({
  name: '',
  region: '',
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  region: [
    {
      required: true,
      message: '请选择活动区域',
      trigger: 'change',
    },
  ],
});

const submitForm = async (tooltipFormRef) => {
  console.log('submit!', tooltipFormRef);
  await tooltipFormRef.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (tooltipFormRef) => {
  tooltipFormRef.resetFields();
};
</script>
```

## 信息和错误提示

需要显示辅助信息和错误提示的表单，辅助信息显示在输入框 / 下拉框下方，当有错误提示时，错误提示内容替换辅助信息显示。

活动名称

此次活动名称

活动区域

此次活动区域

立即创建 重置

```
<template>
  <li-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <li-form-item label="活动名称" prop="name" description="此次活动名称">
      <li-input v-model="ruleForm.name" />
    </li-form-item>
    <li-form-item label="活动区域" prop="region" description="此次活动区域">
      <li-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <li-option label="区域一" value="shanghai" />
        <li-option label="区域二" value="beijing" />
      </li-select>
    </li-form-item>
    <li-form-item>
      <li-button type="primary" @click="onSubmit(ruleFormRef)"> 立即创建 </li-button>
      <li-button @click="resetForm(ruleFormRef)">重置</li-button>
    </li-form-item>
  </li-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@chehejia/liui-next';

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  name: '',
  region: '',
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  region: [
    {
      required: true,
      message: '请选择活动区域',
      trigger: 'change',
    },
  ],
});

const onSubmit = async (ruleFormRef) => {
  console.log('submit!', ruleFormRef);
  await ruleFormRef.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (ruleFormRef) => {
  ruleFormRef.resetFields();
};
</script>
```

## 只读样式

标题

406#左右两侧靠背

右对齐

BIR-X01-Pre

提出人

标题

406#左右两侧靠背

右对齐

BIR-X01-Pre

提出人

曹中山

右对齐

BIR-X01-Pre-PPV-1352

右对齐

BIR-X01-Pre-PPV-1352

标题

406#左右

右对齐

BIR-X01

提出人

曹中山

标题

标题

提出人

曹中山

```
<template>
  <li-form label-width="100px" readonly class="demo-ruleForm-read-only">
    <li-form-item class="item-3" label="标题">
      <span>406#左右两侧靠背</span>
    </li-form-item>
    <li-form-item class="item-3" label="右对齐">
      <span>BIR-X01-Pre</span>
    </li-form-item>
    <li-form-item class="item-3" label="提出人">
      <li-input />
    </li-form-item>
    <li-form-item class="item-3" label="标题">
      <span>406#左右两侧靠背</span>
    </li-form-item>
    <li-form-item class="item-3" label="右对齐">
      <span>BIR-X01-Pre</span>
    </li-form-item>
    <li-form-item class="item-3" label="提出人">
      <span>曹中山</span>
    </li-form-item>
    <li-form-item class="item-2" label="右对齐">
      <span>BIR-X01-Pre-PPV-1352</span>
    </li-form-item>
    <li-form-item class="item-2" label="右对齐">
      <span>BIR-X01-Pre-PPV-1352</span>
    </li-form-item>
    <li-form-item class="item-4" label="标题">
      <span>406#左右</span>
    </li-form-item>
    <li-form-item class="item-4" label="右对齐">
      <span>BIR-X01</span>
    </li-form-item>
    <li-form-item class="item-4" label="提出人">
      <span>曹中山</span>
    </li-form-item>
    <li-form-item class="item-4" label="标题">
      <span>标题</span>
    </li-form-item>
    <li-form-item class="item-1" label="提出人">
      <span>曹中山</span>
    </li-form-item>
  </li-form>
</template>

<style lang="scss">
.demo-ruleForm-read-only {
  display: flex;
  flex-wrap: wrap;
}

.li-form-item.item-1 {
  width: 100%;
  margin-right: 0;
}

.li-form-item.item-2 {
  width: calc(100% / 2);
  margin-right: 0;
}

.li-form-item.item-3 {
  width: calc(100% / 3);
  margin-right: 0;
}

.li-form-item.item-4 {
  width: calc(100% / 4);
  margin-right: 0;
}
</style>
```

## Form API

### Form Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 表单数据对象 | `Record<string, any>` | — |
| `rules` | 表单验证规则 | `FormRules` | — |
| `inline` | 行内表单模式 | `boolean` | `false` |
| `label-position` | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `label-width` 属性 | `enum` 'left' | 'right' | 'top' | `'right'` |
| `label-width` | 标签的长度，例如 `'50px'`。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 `auto`。 | `string | number` | — |
| `label-suffix` | 表单域标签的后缀 | `string` | — |
| `hide-required-asterisk` | 是否隐藏必填字段标签旁边的红色星号。 | `boolean` | `false` |
| `require-asterisk-position` | 星号的位置。 | `enum` 'left' | 'right' | `'left'` |
| `show-message` | 是否显示校验错误信息 | `boolean` | `true` |
| `inline-message` | 是否以行内形式展示校验信息 | `boolean` | `false` |
| `status-icon` | 是否在输入框中显示校验结果反馈图标 | `boolean` | `false` |
| `validate-on-rule-change` | 是否在 `rules` 属性改变后立即触发一次验证 | `boolean` | `true` |
| `size` | 用于控制该表单内组件的尺寸 | `enum` 'large' | 'default' | 'small' | — |
| `disabled` | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性 | `boolean` | `false` |
| `scroll-to-error` | 当校验失败时，滚动到第一个错误表单项 | `boolean` | `false` |
| `readonly` | 是否只读，如果为 true 表单行之间会更紧凑 | `boolean` | `false` |

### Form Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `validate` | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `Function` (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void> |
| `validateField` | 验证具体的某个字段。 | `Function` (props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void> |
| `resetFields` | 重置该表单项，将其值重置为初始值，并移除校验结果 | `Function` (props?: Arrayable<FormItemProp>) => void |
| `scrollToField` | 滚动到指定的字段 | `Function` (prop: FormItemProp) => void |
| `clearValidate` | 清理某个字段的表单验证信息。 | `Function` (props?: Arrayable<FormItemProp>) => void |

### Form Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| `validate` | 任一表单项被校验后触发 | `Function` (prop: FormItemProp, isValid: boolean, message: string) => void |

### Form Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| - | 自定义默认内容 | FormItem |

## FormItem API

### FormItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | `model` 的键名。 它可以是一个路径数组(例如 `['a', 'b', 0]`)。 在定义了 `validate`、`resetFields` 的方法时，该属性是必填的 | `string | string[]` | — |
| `label` | 标签文本 | `string` | — |
| `label-width` | 标签宽度，例如 `'50px'`。 可以使用 `auto`。 | `string | number` | — |
| `required` | 是否为必填项，如不设置，则会根据校验规则确认 | `boolean` | `false` |
| `rules` | 表单验证规则, 具体配置见[下表](#formitemrule), 更多内容可以参考[async-validator](https://github.com/yiminghe/async-validator) | `FormItemRule | FormItemRule[]` | — |
| `error` | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。 | `string` | — |
| `show-message` | 是否显示校验错误信息 | `boolean` | `true` |
| `inline-message` | 是否在行内显示校验信息 | `boolean` | `false` |
| `size` | 用于控制该表单域下组件的默认尺寸 | `enum` 'large' | 'default' | 'small' | `'default'` |
| `description` | 字段描述信息 | `string` | — |
| `tooltip` | label 字段说明 | `string` | — |
| `tooltip-effect` | 字段说明颜色主题 | `enum` 'dark' | 'light' | `'dark'` |

#### FormItem Events

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `trigger` | 验证逻辑的触发方式 | `'blur' | 'change'` | — |

### FormItem Slots

| 名称 | 说明 | 插槽作用域 |
| --- | --- | --- |
| — | 表单的内容。 | — |
| `label` | 标签位置显示的内容 | `{ label }` |
| `error` | 验证错误信息的显示内容 | `{ error }` |

### FormItem Methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `resetField` | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | `Function` () => void |
| `clearValidate` | 移除该表单项的校验结果 | `Function` () => void |

最后修改日期： 2025-07-15
