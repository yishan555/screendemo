# Changelog

## Version 1.1.0 - 2026-01-16

### 新增功能

#### 1. 输出目录改为 `newprd/`
所有生成的文件现在都放在 `newprd/` 目录下，包括：
- `newprd/[filename]-refined.md` - 精炼后的PRD
- `newprd/prdimages/` - 所有下载的图片
- `newprd/prd-clarifications.md` - 澄清问题记录
- `newprd/prd-refine-summary.md` - 处理摘要
- `newprd/[original].backup` - 原始PRD备份

**原因**: 集中管理所有输出文件，避免污染项目根目录

#### 2. 支持特殊格式的图片URL
图片下载脚本 `download_images.py` 现在支持以下特殊URL格式：

- **百度BOS链接**:
  ```
  https://bj.bcebos.com/prod-public-open/cfe-global/images/XdxlwtzcNhSMaPbGWFncm5UJnAy-20251027-c8t9nfpydlnz
  ```

- **内部服务链接**:
  ```
  https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2cedb0a2-29e8-40ce-9a84-81cf006d62c9.jpg
  ```

- **查询参数中包含扩展名的URL**:
  自动从URL内容推断图片格式

**原因**: 解决之前无法识别和下载内部系统图片链接的问题

### 改进

#### `is_image_url()` 函数增强
- 新增对 `bcebos.com` 的识别
- 新增对 `feishu-service`、`cfe-doc-backend` 的识别
- 支持从URL内容推断图片格式（jpg, jpeg, png等）
- 不再仅依赖文件扩展名判断

#### `generate_filename()` 函数改进
- 智能推断图片扩展名
- 从URL查询参数中提取格式信息
- 当无法确定格式时，默认使用 `.png`

### 文档更新

更新了以下文档以反映新变化：
- `SKILL.md` - 主技能定义文档
- `README.md` - 使用说明
- `CHANGELOG.md` - 本文档

### 测试

已通过以下URL格式测试：
- ✓ 百度BOS图片链接
- ✓ 内部服务图片链接
- ✓ 标准图片URL（带扩展名）
- ✗ 非图片URL（正确拒绝）

### 使用示例

```bash
# 运行skill
/prd-refine 【DFX】DTS数据管理 PRD_副本.md

# 手动运行图片下载脚本
python scripts/download_images.py "【DFX】DTS数据管理 PRD_副本.md" newprd/prdimages/

# 检查输出
ls -la newprd/
ls -la newprd/prdimages/
```

### 向后兼容性

- ⚠️ 输出目录从根目录改为 `newprd/` 目录
- ⚠️ 图片目录从 `prdimages/` 改为 `newprd/prdimages/`
- ✓ 所有其他功能保持兼容

### 已知问题

无

### 下一步计划

- 考虑添加并发下载支持以提高大量图片的下载速度
- 添加图片格式转换选项
- 支持更多内部服务URL格式

---

## Version 1.0.0 - 初始版本

初始发布，包含基本的PRD精炼和场景分解功能。
