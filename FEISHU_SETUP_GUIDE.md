# 飞书机器人 WebSocket 长连接配置指南

## 修改说明

已根据飞书官方文档修正 WebSocket 客户端实现：

### 主要变更
- ✅ 使用 `EventDispatcher` 注册事件监听器（符合官方标准）
- ✅ 通过 `wsClient.start({ eventDispatcher })` 启动客户端
- ✅ 注册 `im.message.receive_v1` 事件接收私聊消息
- ✅ SDK 版本：@larksuiteoapi/node-sdk@1.59.0

---

## Step 1：飞书开放平台配置

### 1.1 创建企业自建应用
1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 点击「创建企业自建应用」
3. 填写应用名称和描述

### 1.2 获取凭证信息
1. 进入应用详情页
2. 左侧菜单：**基础信息 > 凭证与基础信息**
3. 记录以下信息：
   - `App ID`
   - `App Secret`

### 1.3 配置应用权限
1. 左侧菜单：**权限管理**
2. 搜索并开通以下权限：
   - `im:message` - 获取与发送单聊、群组消息
   - `im:message:send_as_bot` - 以应用的身份发消息
3. 点击「发布版本」使权限生效

### 1.4 配置事件订阅（暂不保存）
1. 左侧菜单：**事件与回调 > 回调配置**
2. **订阅方式**：选择「使用长连接接收事件」
3. **添加事件**：勾选以下事件
   - `im.message.receive_v1` - 接收消息
4. ⚠️ **先不要点击「保存」** - 需要等本地程序连接成功后才能保存

---

## Step 2：本地应用配置

### 2.1 启动应用
1. 运行你的 Electron 应用
   ```bash
   npm start
   # 或
   npm run dev
   ```

### 2.2 打开设置界面
1. 在应用中打开「Settings」窗口
2. 找到「Feishu Integration」配置区域

### 2.3 填写配置信息
填写以下信息（从 Step 1.2 获取）：

| 配置项 | 说明 | 示例 |
|--------|------|------|
| **Enable Feishu Integration** | 启用飞书集成 | ✅ 勾选 |
| **App ID** | 应用 ID | `cli_a1234567890abcde` |
| **App Secret** | 应用密钥 | `xxxxxxxxxxxxxxxxxxxxx` |
| **Target User ID** | 目标用户 ID（推荐方式） <br>*(仅影响自动回复/发送，入站消息均会保存)* | `7g2aac8g` |
| **Enable Receive Messages** | 启用消息接收 | ✅ 勾选 |
| **Enable Auto Reply** | 启用自动回复 | ✅ 勾选（可选）|
| **Enable Scheduled Push** | 启用定时推送 | ✅ 勾选（可选）|
| **Daily Push Times** | 每日推送时间 | `09:00`, `18:00` |

### 2.4 如何获取 Target User ID？

#### 方法一：通过飞书后台获取（推荐）
1. 访问 [飞书管理后台](https://feishu.cn/admin/)
2. 左侧菜单：**组织架构 > 成员管理**
3. 找到目标用户，点击查看详情
4. 复制「用户 ID」字段

#### 方法二：通过 API 获取
参考文档：https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/list

### 2.5 保存配置
点击「Save Settings」保存配置

---

## Step 3：验证连接状态

### 3.1 检查日志输出
启动应用后，观察控制台日志：

#### ✅ 成功连接的标志：
```
[info] Feishu WebSocket client started, waiting for connection...
[info] Once connected, console will show: [info]: [ "[ws]", "ws client ready" ]
[info]: [ "[ws]", "ws client ready" ]  ← 这条是关键！
```

#### ❌ 连接失败的标志：
```
[error] Failed to connect Feishu WebSocket: ...
[warn] Feishu integration is disabled
[error] Feishu client not initialized
```

### 3.2 网络要求
确保你的机器能访问：
- **域名**：`open.feishu.cn`
- **端口**：`443` (HTTPS/WSS)

测试连接：
```bash
# Windows PowerShell
Test-NetConnection -ComputerName open.feishu.cn -Port 443

# Linux/Mac
curl -I https://open.feishu.cn
```

---

## Step 4：保存飞书平台事件订阅

### ⚠️ 重要提示
只有在 **Step 3.1 看到 `"ws client ready"` 日志** 后，才能执行此步骤！

### 4.1 回到飞书开放平台
1. 进入应用详情页
2. 左侧菜单：**事件与回调 > 回调配置**
3. 确认已勾选 `im.message.receive_v1` 事件
4. 点击「保存」按钮

### 4.2 验证保存成功
- ✅ 保存成功：平台会显示「保存成功」提示
- ❌ 保存失败：提示「未检测到长连接」或「连接失败」
  - **原因**：本地 WebSocket 客户端未连接或已断开
  - **解决**：返回 Step 3 检查连接状态

---

## Step 5：测试消息接收

### 5.1 发送测试消息
1. 在飞书客户端中，找到你创建的机器人
2. 发送一条测试消息，例如：`测试消息接收`

### 5.2 观察应用行为
#### ✅ 成功接收的标志：
1. **控制台日志**：
   ```
   [info] Received Feishu message via EventDispatcher
   [info] Created record from Feishu message: ...
   ```

2. **应用行为**：
   - Memo 窗口自动刷新
   - 列表中出现新的 Record
   - 内容为你发送的消息文本

3. **飞书机器人回复**（如果启用了自动回复）：
   ```
   已收到并保存您的消息 ✅
   ```

#### ❌ 未接收到消息：
检查以下项：
1. ✅ 飞书平台事件订阅已保存成功？
2. ✅ WebSocket 连接状态正常（`ws client ready`）？
3. ✅ Target User ID 配置正确？
4. ✅ 消息来源用户与 Target User ID 匹配？

---

## Step 6：测试推送功能

### 6.1 测试手动推送
1. 在 Memo 窗口中，确保有未完成的 Record
2. 点击右上角的 📤 按钮
3. 观察结果：
   - ✅ 按钮变为 ✅，显示推送成功提示
   - 飞书机器人发送消息到你的私聊窗口

### 6.2 测试定时推送
1. 修改设置中的 Daily Push Times 为当前时间的下一分钟
   - 例如：当前 14:23，设置为 `14:24`
2. 等待一分钟
3. 观察控制台日志：
   ```
   [info] Scheduled push time reached: 14:24
   [info] Pushed 3/3 incomplete records to Feishu
   ```
4. 检查飞书消息，应该收到所有未完成的 Record

---

## 常见问题排查

### Q1: 显示 "ws client ready" 但收不到消息
**可能原因**：
1. 飞书平台事件订阅未保存成功
2. Target User ID 不匹配
3. 消息权限未开通

**解决方法**：
1. 重新保存事件订阅配置
2. 检查 Target User ID 是否正确
3. 确认已开通 `im:message` 权限

### Q2: 连接一段时间后断开
**可能原因**：
1. 网络不稳定
2. 防火墙阻止连接

**解决方法**：
1. 检查网络连接
2. 确认防火墙允许访问 `open.feishu.cn:443`

### Q3: 推送失败 "No target user or chat configured"
**可能原因**：
未配置 Target User ID / Open ID / Chat ID

**解决方法**：
至少配置以下之一：
- Target User ID（推荐）
- Target Open ID
- Target Chat ID

### Q4: 配置保存后重启丢失
**已修复**：v2.2.0 已修复此问题，配置会正确持久化

---

## 日志级别调整

如需更详细的调试日志，可以修改 `src/main/feishu.js`：

```javascript
// 当前：info 级别
loggerLevel: lark.LoggerLevel.info

// 改为：debug 级别
loggerLevel: lark.LoggerLevel.debug
```

---

## 技术架构说明

### WebSocket 连接流程
```
1. 应用启动 (app.on('ready'))
   ↓
2. 延迟 4 秒后初始化 Feishu (index.js)
   ↓
3. 读取配置 (configManager)
   ↓
4. 创建 HTTP Client (lark.Client)
   ↓
5. 创建 EventDispatcher 注册事件
   ↓
6. 创建 WSClient
   ↓
7. 调用 wsClient.start({ eventDispatcher })
   ↓
8. 等待连接建立 → 打印 "ws client ready"
   ↓
9. 飞书平台推送事件 → EventDispatcher 分发 → handleIncomingMessage
```

### 事件处理流程
```
飞书平台推送消息
  ↓
EventDispatcher 接收 (im.message.receive_v1)
  ↓
handleIncomingMessage() 处理
  ↓
  ├─ 检查消息类型 (text/post)
  ├─ 提取文本内容
  ├─ 创建 Record (storage.createNoteOnlyRecord)
  ├─ 发送自动回复（可选）
  └─ 刷新 Memo 窗口
```

---

## 下一步

1. ✅ 按照本指南完成所有配置步骤
2. ✅ 观察控制台日志，确认连接成功
3. ✅ 在飞书平台保存事件订阅
4. ✅ 发送测试消息验证功能
5. ✅ 测试推送功能
6. ✅ 根据实际需求调整配置

如有问题，请查看控制台日志并参考「常见问题排查」章节。
