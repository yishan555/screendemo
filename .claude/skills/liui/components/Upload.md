# Upload 上传

Maintainer: 段扬帅

1. [基础用法](#基础用法)
2. [覆盖前一个文件](#覆盖前一个文件)
3. [用户头像](#用户头像)
4. [照片墙](#照片墙)
5. [自定义缩略图](#自定义缩略图)
6. [图片列表缩略图](#图片列表缩略图)
7. [上传文件列表控制](#上传文件列表控制)
8. [拖拽上传](#拖拽上传)
9. [手动上传](#手动上传)
10. [Upload API](#upload-api)
    1. [Upload Props](#upload-props)
    2. [Upload Slots](#upload-slots)
    3. [Upload Methods](#upload-methods)

通过点击或者拖拽上传文件。

## 基础用法

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

点击上传

仅支持上传一个文件，支持以下文件格式： jpg, jpeg, png, pdf, doc, csv, xls, xlsx, ppt, pptx

* li\_logo.svg
* li\_logo\_brand.svg

```
<template>
  <li-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://apidoc.chehejia.com/mock/875/upload"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <li-button type="secondary">点击上传</li-button>
    <template #tip>
      <div class="li-upload__tip">
        仅支持上传一个文件，支持以下文件格式： jpg, jpeg, png, pdf, doc, csv, xls, xlsx, ppt, pptx
      </div>
    </template>
  </li-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LiMessage, LiMessageBox } from '@chehejia/liui-next';

import type { UploadProps, UploadUserFile } from '@chehejia/liui-next';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'li_logo.svg',
    url: 'https://s.ampmake.com/fed/cdn/理想logo/0.0.2/white.svg',
  },
  {
    name: 'li_logo_brand.svg',
    url: 'https://s.ampmake.com/fed/cdn/理想logo/0.0.2/green.svg',
  },
]);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  LiMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return LiMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  );
};
</script>

<style>
.li-upload__tip {
  color: var(--li-color-on-light-700);
}
</style>
```

## 覆盖前一个文件

设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

选取文件

 上传到服务器 

只能上传jpg/png文件，且不超过500kb

```
<template>
  <li-upload
    ref="upload"
    class="upload-demo"
    action="https://apidoc.chehejia.com/mock/875/upload"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <li-button type="secondary">选取文件</li-button>
    </template>
    <li-button class="ml-3" type="secondary" @click="submitUpload"> 上传到服务器 </li-button>
    <template #tip>
      <div class="li-upload__tip text-warring">只能上传jpg/png文件，且不超过500kb</div>
    </template>
  </li-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { genFileId } from '@chehejia/liui-next';
import type { UploadInstance, UploadProps, UploadRawFile } from '@chehejia/liui-next';

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};
</script>

<style>
.text-warring {
  color: var(--li-color-warning-800) !important;
}
</style>
```

## 用户头像

在 `before-upload` 钩子中限制用户上传文件的格式和大小。

```
<template>
  <li-upload
    class="avatar-uploader"
    action="https://apidoc.chehejia.com/mock/875/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <li-icon v-else class="avatar-uploader-icon"><icon-basic-add-o /></li-icon>
  </li-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LiMessage } from '@chehejia/liui-next';
import { IconBasicAddO } from '@chehejia/liui-icons';

import type { UploadProps } from '@chehejia/liui-next';

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    LiMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    LiMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  display: block;
  width: 72px;
  height: 72px;
}
</style>

<style lang="scss">
.avatar-uploader .li-upload {
  cursor: pointer;

  position: relative;

  overflow: hidden;

  background: var(--li-color-on-light-100);
  border-radius: 8px;

  &:hover {
    background-color: var(--li-color-on-light-200);
  }
}

.li-icon.avatar-uploader-icon {
  width: 72px;
  height: 72px;

  font-size: 24px;
  line-height: 72px;
  color: rgba(42, 46, 60, 0.64);
  text-align: center;
}
</style>
```

## 照片墙

使用 `list-type` 属性来设定文件列表的样式。

* ![](https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100)
* ![](https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive)
* ![](https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100)
* ![](https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive)
* ![](https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100)
* ![](https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive)
* ![](https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100)
* ![](https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive)

```
<template>
  <li-upload
    v-model:file-list="fileList"
    action="https://apidoc.chehejia.com/mock/875/upload"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <li-icon><icon-basic-add-o /></li-icon>
  </li-upload>

  <li-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </li-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconBasicAddO } from '@chehejia/liui-icons';

import type { UploadProps, UploadUserFile } from '@chehejia/liui-next';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'L9.jpg',
    url: 'https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'L9.jpg',
    url: 'https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'L9.jpg',
    url: 'https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'L9.jpg',
    url: 'https://p.ampmake.com/lilibrary/20220916/sync20220916/caaacf81-28d3-465e-a3c1-5a1ab00e5196.jpg@d_progressive',
  },
]);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>
```

## 自定义缩略图

使用 `scoped-slot` 属性来改变默认的缩略图模板样式。

```
<template>
  <li-upload action="#" list-type="picture-card" :auto-upload="false">
    <li-icon><icon-basic-add-o /></li-icon>

    <template #file="{ file }">
      <div>
        <img class="li-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="li-upload-list__item-actions">
          <span class="li-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <li-icon><icon-basic-search-zoomin-o /></li-icon>
          </span>
          <span v-if="!disabled" class="li-upload-list__item-delete" @click="handleDownload(file)">
            <li-icon><icon-cloud-down-o /></li-icon>
          </span>
          <span v-if="!disabled" class="li-upload-list__item-delete" @click="handleRemove(file)">
            <li-icon><icon-basic-delete-o /></li-icon>
          </span>
        </span>
      </div>
    </template>
  </li-upload>

  <li-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </li-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { IconBasicAddO, IconBasicDeleteO, IconBasicSearchZoominO, IconCloudDownO } from '@chehejia/liui-icons';
import type { UploadFile } from '@chehejia/liui-next';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file: UploadFile) => {
  console.log(file);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};
</script>
```

## 图片列表缩略图

点击上传

只能上传jpg/png文件，且不超过500kb

* ![](https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100)

  food.jpeg
* ![](https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100)

  food2.jpeg

```
<template>
  <li-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://apidoc.chehejia.com/mock/875/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    list-type="picture"
  >
    <li-button type="secondary">点击上传</li-button>
    <template #tip>
      <div class="li-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </template>
  </li-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { UploadProps, UploadUserFile } from '@chehejia/liui-next';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
]);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file);
};
</script>
```

## 上传文件列表控制

通过 `on-change` 钩子函数来对上传文件的列表进行控制。

点击上传

只能上传jpg/png文件，且不超过500kb

* food.jpeg
* food2.jpeg

```
<template>
  <li-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://apidoc.chehejia.com/mock/875/upload"
    :on-change="handleChange"
  >
    <li-button type="secondary">点击上传</li-button>
    <template #tip>
      <div class="li-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </template>
  </li-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import type { UploadProps, UploadUserFile } from '@chehejia/liui-next';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
]);

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3);
};
</script>
```

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

将文件拖到此处，或 *点击上传*

只能上传jpg/png文件，且不超过500kb

```
<template>
  <li-upload class="upload-demo upload-dragger" drag action="https://apidoc.chehejia.com/mock/875/upload" multiple>
    <li-icon class="li-icon--upload"><icon-cloud-up-o /></li-icon>
    <div class="li-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
    <template #tip>
      <div class="li-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </template>
  </li-upload>
</template>

<script setup lang="ts">
import { IconCloudUpO } from '@chehejia/liui-icons';
</script>

<style scoped lang="scss">
.upload-dragger {
  width: 507px;
}

.li-upload__text {
  em {
    color: var(--li-color-link-800);
  }
}
</style>
```

## 手动上传

点击上传

 上传到服务器 

仅支持上传一个文件，支持以下文件格式：jpg, jpeg, png, pdf, doc, csv, xls, xlsx, ppt, pptx

```
<template>
  <li-upload
    ref="uploadRef"
    class="upload-demo"
    action="https://apidoc.chehejia.com/mock/875/upload"
    :auto-upload="false"
  >
    <template #trigger>
      <li-button type="secondary">点击上传</li-button>
    </template>

    <li-button class="ml-3" type="secondary" @click="submitUpload"> 上传到服务器 </li-button>

    <template #tip>
      <div class="li-upload__tip">
        仅支持上传一个文件，支持以下文件格式：jpg, jpeg, png, pdf, doc, csv, xls, xlsx, ppt, pptx
      </div>
    </template>
  </li-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { UploadInstance } from '@chehejia/liui-next';

const uploadRef = ref<UploadInstance>();

const submitUpload = () => {
  uploadRef.value!.submit();
};
</script>

<style scoped lang="scss">
.upload__tip {
  color: var('--li-color-on-light-700');
}
</style>
```

## Upload API

### Upload Props

| 名称 | 描述 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| `action` | 请求 URL | `string` | — | 是 |
| `headers` | 设置上传的请求头部 | `Headers | Record<string, any>` | — | 否 |
| `method` | 设置上传请求方法 | `string` | `'post'` | 否 |
| `multiple` | 是否支持多选文件 | `boolean` | `false` | 否 |
| `data` | 上传时附带的额外参数 | `Record<string, any>` | — | 否 |
| `name` | 上传的文件字段名 | `string` | `'file'` | 否 |
| `with-credentials` | 支持发送 cookie 凭证信息 | `boolean` | `false` | 否 |
| `show-file-list` | 是否显示已上传文件列表 | `boolean` | `true` | 否 |
| `drag` | 是否启用拖拽上传 | `boolean` | `false` | 否 |
| `accept` | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | `string` | — | 否 |
| `on-preview` | 点击文件列表中已上传的文件时的钩子 | `(uploadFile: UploadFile) => void` | — | 否 |
| `on-remove` | 文件列表移除文件时的钩子 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | — | 否 |
| `on-success` | 文件上传成功时的钩子 | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | — | 否 |
| `on-error` | 文件上传失败时的钩子 | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | — | 否 |
| `on-progress` | 文件上传时的钩子 | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | — | 否 |
| `on-change` | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | — | 否 |
| `on-exceed` | 当超出限制时，执行的钩子函数 | `(files: File[], uploadFiles: UploadFiles) => void` | — | 否 |
| `before-upload` | 上传文件之前的钩子，参数为上传的文件， 若返回`false`或者返回`Promise` 且被 reject，则停止上传。 | `(rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>` | — | 否 |
| `before-remove` | 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 `false`或者返回 `Promise`且被 reject，则停止删除。 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>` | — | 否 |
| `file-list` / `v-model:file-list` | 默认上传文件 | `UploadUserFile[]` | `[]` | 否 |
| `list-type` | 文件列表的类型 | `'text' | 'picture' | 'picture-card'` | `'text'` | 否 |
| `auto-upload` | 是否自动上传文件 | `boolean` | `true` | 否 |
| `http-request` | 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求 | `(options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>` | — | 否 |
| `disabled` | 是否禁用上传 | `boolean` | `false` | 否 |
| `limit` | 允许上传文件的最大数量 | `number` | — | 否 |
| `hide-trigger-on-disabled` | 是否当 form 表单中设置 disabled 时，隐藏删除按钮 | `boolean` | `false` | 否 |
| `animation` | 是否使用上传动画 | `boolean` | `true` | 是 |

### Upload Slots

| 名称 | 描述 | 类型 |
| --- | --- | --- |
| `default` | 自定义默认内容 | - |
| `trigger` | 触发文件选择框的内容 | - |
| `tip` | 提示说明文字 | - |
| `file` | 缩略图模板的内容 | `{ file: UploadFile }` |

### Upload Methods

| 名称 | 描述 | 类型 |
| --- | --- | --- |
| `abort` | 取消上传请求 | `(file: UploadFile) => void` |
| `submit` | 手动上传文件列表 | `() => void` |
| `clearFiles` | 清空已上传的文件列表（该方法不支持在 `before-upload` 中调用） | `(status?: Array<"ready" | "uploading" | "success" | "fail">) => void` |
| `handleStart` | 手动选择文件 | `(rawFile: UploadRawFile) => void` |
| `handleRemove` | 手动移除文件。 `file` 和`rawFile` 已被合并。 `rawFile` 将在 `v2.2.0` 中移除 | `(file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void` |

最后修改日期： 2025-07-15
