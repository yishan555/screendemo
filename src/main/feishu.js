/**
 * 飞书机器人管理模块
 * 负责与飞书API交互，包括接收消息、发送消息等
 */

const lark = require('@larksuiteoapi/node-sdk');
const logger = require('./logger');
const storage = require('./storage');
const configManager = require('./configManager');

class FeishuManager {
  constructor() {
    this.client = null;
    this.wsClient = null;
    this.enabled = false;
    this.config = null;
    this.pushTimer = null; // Timer for scheduled push
    this.lastScheduledPushes = {}; // Track last push times
  }

  /**
   * 初始化飞书客户端
   */
  initialize() {
    const feishuConfig = configManager.get('feishu');

    if (!feishuConfig || !feishuConfig.enabled) {
      logger.info('Feishu integration is disabled');
      this.enabled = false;
      return false;
    }

    if (!feishuConfig.appId || !feishuConfig.appSecret) {
      logger.warn('Feishu configuration incomplete: missing appId or appSecret');
      this.enabled = false;
      return false;
    }

    this.config = feishuConfig;

    try {
      // 创建飞书客户端
      this.client = new lark.Client({
        appId: feishuConfig.appId,
        appSecret: feishuConfig.appSecret,
        appType: lark.AppType.SelfBuild,
        domain: lark.Domain.Feishu
      });

      logger.info('Feishu client initialized successfully');

      // 如果启用WebSocket接收消息，则连接
      if (feishuConfig.enableReceiveMessages) {
        this.connectWebSocket();
      }

      // 启动定时推送检查
      if (feishuConfig.enableScheduledPush) {
        this.startScheduledPushCheck();
      }

      this.enabled = true;
      return true;
    } catch (error) {
      logger.error('Failed to initialize Feishu client:', error.message);
      this.enabled = false;
      return false;
    }
  }

  /**
   * 连接飞书WebSocket接收消息
   */
  connectWebSocket() {
    if (!this.client) {
      logger.error('Feishu client not initialized');
      return;
    }

    try {
      // 创建EventDispatcher并注册事件监听器
      const eventDispatcher = new lark.EventDispatcher({}).register({
        // 监听「接收消息 im.message.receive_v1」
        'im.message.receive_v1': async (data) => {
          try {
            logger.info('Received Feishu message via EventDispatcher');
            await this.handleIncomingMessage(data);
            return {}; // 返回空对象表示处理成功
          } catch (error) {
            logger.error('Error handling incoming message:', error.message);
            return { error: error.message };
          }
        }
      });

      // 创建WebSocket客户端
      this.wsClient = new lark.WSClient({
        appId: this.config.appId,
        appSecret: this.config.appSecret,
        loggerLevel: lark.LoggerLevel.info
      });

      // 启动WebSocket客户端并传入eventDispatcher
      this.wsClient.start({ eventDispatcher });
      logger.info('Feishu WebSocket client started, waiting for connection...');
      logger.info('Once connected, console will show: [info]: [ "[ws]", "ws client ready" ]');
    } catch (error) {
      logger.error('Failed to connect Feishu WebSocket:', error.message);
    }
  }

  /**
   * 处理接收到的飞书消息
   */
  async handleIncomingMessage(data) {
    logger.info('Received Feishu message:', data);

    // event_type may be at root or under header
    const event = data.header?.event_type || data.event_type || data.event?.type;
    logger.debug('Parsed event type:', event);

    // 只处理私聊消息
    if (event !== 'im.message.receive_v1') {
      logger.debug('Ignoring non-receive event:', event);
      return;
    }

    // message may be at root or under event
    const message = data.event?.message || data.message;
    if (!message) {
      logger.warn('No message object found in Feishu event');
      return;
    }

    // 提取消息内容
    const messageType = message.message_type;
    const content = message.content ? JSON.parse(message.content) : {};
    const senderId = data.event?.sender?.sender_id?.user_id;
    const chatId = message.chat_id;

    // 如果配置了目标用户，检查是否来自目标用户
    if (this.config.targetUserId && senderId !== this.config.targetUserId) {
      logger.info('Message from non-target user (senderId=%s) while targetUserId is %s; continuing to create record anyway', senderId, this.config.targetUserId);
      // previously we returned here and ignored messages from other users;
      // now we simply log the mismatch but still proceed so every incoming
      // message becomes a note. The setting can still be used elsewhere
      // (e.g. auto-reply or grouping) but not to block record creation.
    }

    // 提取文本内容
    let noteText = '';
    if (messageType === 'text') {
      noteText = content.text || '';
    } else if (messageType === 'post') {
      // 富文本消息
      noteText = this.extractPostContent(content);
    } else {
      noteText = `[${messageType} message]`;
    }

    // prefix with indicator
    if (noteText && noteText.length > 0) {
      noteText = `【飞书】${noteText}`;
    } else {
      noteText = '【飞书】(无内容)';
    }

    logger.info('Feishu generated noteText:', noteText);

    // 创建Record
    try {
      const metadata = await storage.createNoteOnlyRecord(noteText);
      logger.info('Created record from Feishu message:', metadata.metadataPath);

      // 如果启用自动回复
      if (this.config.enableAutoReply) {
        await this.sendReply(chatId, '已收到并保存您的消息 ✅');
      }

      // 触发memo窗口刷新
      const memoWindow = require('./windows/memo');
      if (memoWindow.window && !memoWindow.window.isDestroyed()) {
        // if the renderer is still loading, wait until it's ready
        if (memoWindow.window.webContents.isLoading()) {
          memoWindow.window.webContents.once('did-finish-load', () => {
            memoWindow.window.webContents.send('memo:refresh-list');
          });
        } else {
          memoWindow.window.webContents.send('memo:refresh-list');
        }
      }
    } catch (error) {
      logger.error('Failed to create record from message:', error.message);

      if (this.config.enableAutoReply) {
        await this.sendReply(chatId, '保存消息失败，请稍后重试 ❌');
      }
    }
  }

  /**
   * 提取富文本消息内容
   */
  extractPostContent(content) {
    try {
      const post = content.post;
      if (!post) return '';

      // 遍历所有语言版本，取第一个
      const langs = Object.keys(post);
      if (langs.length === 0) return '';

      const langContent = post[langs[0]];
      if (!langContent.content || !Array.isArray(langContent.content)) return '';

      // 提取所有段落的文本
      let text = '';
      for (const paragraph of langContent.content) {
        if (paragraph && Array.isArray(paragraph)) {
          for (const element of paragraph) {
            if (element.tag === 'text') {
              text += element.text || '';
            }
          }
          text += '\n';
        }
      }
      return text.trim();
    } catch (error) {
      logger.error('Error extracting post content:', error.message);
      return '';
    }
  }

  /**
   * 发送回复消息
   */
  async sendReply(chatId, text) {
    if (!this.client || !this.enabled) {
      logger.warn('Cannot send reply: Feishu client not enabled');
      return false;
    }

    try {
      await this.client.im.message.create({
        params: {
          receive_id_type: 'chat_id'
        },
        data: {
          receive_id: chatId,
          msg_type: 'text',
          content: JSON.stringify({ text })
        }
      });

      logger.info('Sent reply to chat:', chatId);
      return true;
    } catch (error) {
      logger.error('Failed to send reply:', error.message);
      return false;
    }
  }

  /**
   * 手动推送Record到飞书
   */
  async pushRecord(record) {
    if (!this.client || !this.enabled) {
      logger.warn('Cannot push record: Feishu client not enabled');
      return { success: false, error: 'Feishu client not enabled' };
    }

    if (!this.config.targetUserId && !this.config.targetChatId) {
      logger.warn('Cannot push record: No target user or chat configured');
      return { success: false, error: 'No target user or chat configured' };
    }

    try {
      // 构建消息内容
      const noteText = record.note?.text || '(No content)';
      const hasSchedule = record.schedule?.startAt || record.schedule?.dueAt;

      let messageText = noteText;

      if (hasSchedule) {
        messageText += '\n\n';
        if (record.schedule.startAt) {
          const startTime = new Date(record.schedule.startAt).toLocaleString('zh-CN');
          messageText += `📅 开始时间: ${startTime}\n`;
        }
        if (record.schedule.dueAt) {
          const dueTime = new Date(record.schedule.dueAt).toLocaleString('zh-CN');
          messageText += `⏰ 截止时间: ${dueTime}`;
        }
      }

      // 确定接收者ID类型和ID
      let receiveIdType, receiveId;
      if (this.config.targetChatId) {
        receiveIdType = 'chat_id';
        receiveId = this.config.targetChatId;
      } else if (this.config.targetUserId) {
        receiveIdType = 'user_id';
        receiveId = this.config.targetUserId;
      } else {
        receiveIdType = 'open_id';
        receiveId = this.config.targetOpenId;
      }

      // 发送消息
      await this.client.im.message.create({
        params: {
          receive_id_type: receiveIdType
        },
        data: {
          receive_id: receiveId,
          msg_type: 'text',
          content: JSON.stringify({ text: messageText })
        }
      });

      logger.info('Successfully pushed record to Feishu');
      return { success: true };
    } catch (error) {
      logger.error('Failed to push record to Feishu:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Push all incomplete records to Feishu
   */
  async pushAllIncomplete() {
    if (!this.client || !this.enabled) {
      logger.warn('Cannot push records: Feishu client not enabled');
      return { success: false, error: 'Feishu client not enabled' };
    }

    try {
      // Determine push scope
      const scope = this.config.pushScope || 'today_all_records';

      // Load all records and filter according to scope
      const allRecords = await storage.listAllRecords('all');
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const isToday = (dt) => {
        if (!dt) return false;
        const d = new Date(dt);
        return d >= todayStart && d < new Date(todayStart.getTime() + 24 * 3600 * 1000);
      };

      let records = [];
      if (scope === 'today_undo') {
        records = allRecords.filter(r => r.status === 'todo' && isToday(r.createdAt));
      } else if (scope === 'all_undo') {
        records = allRecords.filter(r => r.status === 'todo');
      } else { // today_all_records
        records = allRecords.filter(r => isToday(r.createdAt));
      }

      // If no records to push
      if (!records || records.length === 0) {
        logger.info('No records matched push scope:', scope);
        return { success: true, count: 0, total: 0 };
      }

      // Sorting: for todo records, dueAt asc then createdAt desc for no-due
      const sortTodo = (a, b) => {
        const aDue = a.schedule?.dueAt ? new Date(a.schedule.dueAt).getTime() : null;
        const bDue = b.schedule?.dueAt ? new Date(b.schedule.dueAt).getTime() : null;
        if (aDue && bDue) return aDue - bDue;
        if (aDue && !bDue) return -1;
        if (!aDue && bDue) return 1;
        // no due: newer first
        return new Date(b.createdAt) - new Date(a.createdAt);
      };

      // For grouping when scope includes done
      let todoList = [];
      let doneList = [];
      for (const r of records) {
        if (r.status === 'todo') todoList.push(r);
        else doneList.push(r);
      }

      todoList.sort(sortTodo);

      // done: keep creation order (newest first)
      doneList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Build display lines according to scope template
      const lines = [];
      const formatEntry = (r, idx, includeTime, isDone) => {
        // time prefix
        let timePrefix = '';
        const nowMs = Date.now();
        if (includeTime && r.schedule?.dueAt) {
          const diffH = (new Date(r.schedule.dueAt).getTime() - nowMs) / (1000 * 60 * 60);
          const absH = Math.abs(diffH).toFixed(1);
          if (diffH < 0) {
            timePrefix = `(已超时 ${absH}h)`;
          } else {
            timePrefix = `(剩余 ${absH}h)`;
          }
        }

        // symbol
        let symbol = '';
        if (!isDone && r.schedule?.dueAt) {
          const diffH = (new Date(r.schedule.dueAt).getTime() - nowMs) / (1000 * 60 * 60);
          if (diffH < 0 || (diffH > 0 && diffH < 2)) {
            symbol = '⏰ ';
          }
        }

        // text truncation
        let text = (r.note?.text || '(无备注)').replace(/\n/g, ' ');
        if (text.length > 30) text = text.slice(0, 30) + '...';

        // done formatting
        if (isDone) {
          text = `✅${text}`;
        }

        return `${idx}. ${symbol}${timePrefix}${text}`;
      };

      // Build content according to templates
      const headerTime = `${String(now.getFullYear()).padStart(4,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

      if (scope === 'all_undo' || scope === 'today_undo') {
        const title = `**📝 Memo Reminders**\n**Time:** ${headerTime}\n${scope === 'all_undo' ? 'All Undo' : 'Today Undo'}\n\n`;
        // list todoList
        todoList.forEach((r, i) => {
          lines.push(formatEntry(r, i+1, true, false));
        });

        // one message may contain header + lines
        let content = title + lines.map(l => l.replace(/^\d+\. /, (m)=> m)).join('\n');
        // but ensure numbering with 1.,2., etc
        content = title + todoList.map((r,i)=> formatEntry(r,i+1,true,false)).join('\n');

        // chunk and send
        const pages = this.splitIntoPages(content);
        const results = await this.sendPagedMessages(pages, `${scope === 'all_undo' ? 'Memo Reminders' : 'Memo Reminders'}`);
        return { success: true, count: todoList.length, total: records.length, pages: results.length };
      } else {
        // today_all_records template: TODO then DONE
        const title = `${headerTime}\nToday All Records\n\n`;

        const todoLines = todoList.map((r,i) => formatEntry(r, i+1, true, false));
        const doneLines = doneList.map((r,i) => formatEntry(r, i+1, false, true));

        let content = title + `【TODO】\n` + (todoLines.length ? todoLines.join('\n') : '（无）') + '\n\n' + `【DONE】\n` + (doneLines.length ? doneLines.join('\n') : '（无）');

        const pages = this.splitIntoPages(content);
        const results = await this.sendPagedMessages(pages, 'Memo Summary');
        return { success: true, count: records.length, total: records.length, pages: results.length };
      }
    } catch (error) {
      logger.error('Failed to push all incomplete records:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Split content into pages by approx char limit (safeguard)
  splitIntoPages(content) {
    const maxChars = 3000; // safe per-message limit
    if (content.length <= maxChars) return [content];
    const pages = [];
    let pos = 0;
    while (pos < content.length) {
      pages.push(content.slice(pos, pos + maxChars));
      pos += maxChars;
    }
    return pages;
  }

  // Send paged messages with pagination header if multiple
  async sendPagedMessages(pages, baseTitle) {
    const results = [];
    const total = pages.length;

    // determine receive id
    let receiveIdType, receiveId;
    if (this.config.targetChatId) {
      receiveIdType = 'chat_id';
      receiveId = this.config.targetChatId;
    } else if (this.config.targetUserId) {
      receiveIdType = 'user_id';
      receiveId = this.config.targetUserId;
    } else {
      receiveIdType = 'open_id';
      receiveId = this.config.targetOpenId;
    }

    for (let i = 0; i < pages.length; i++) {
      const pageIndex = i + 1;
      let title = `**${baseTitle}**`;
      if (total > 1) title = `**${baseTitle} (${pageIndex}/${total})**`;
      const text = `${title}\n${pages[i]}`;
      try {
        await this.client.im.message.create({
          params: { receive_id_type: receiveIdType },
          data: { receive_id: receiveId, msg_type: 'text', content: JSON.stringify({ text }) }
        });
        results.push({ success: true });
      } catch (err) {
        logger.error('Failed to send Feishu paged message:', err.message);
        results.push({ success: false, error: err.message });
      }
    }
    return results;
  }

  /**
   * 启动定时推送检查
   */
  startScheduledPushCheck() {
    if (this.pushTimer) {
      clearInterval(this.pushTimer);
    }

    // 每分钟检查一次
    this.pushTimer = setInterval(() => {
      this.checkScheduledPush();
    }, 60000);

    // 立即执行一次检查
    setTimeout(() => this.checkScheduledPush(), 5000);

    logger.info('Scheduled push check started');
  }

  /**
   * 检查并执行定时推送
   */
  async checkScheduledPush() {
    if (!this.enabled || !this.config.enableScheduledPush) {
      return;
    }

    try {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      // Get configured push times
      const pushTimes = this.config.scheduledPushTimes || [];

      // Check if current time matches any configured push time
      if (pushTimes.includes(currentTime)) {
        logger.info(`Scheduled push time reached: ${currentTime}`);

        // Check if we've already pushed at this time today
        const lastPushKey = `lastScheduledPush_${currentTime}`;
        const lastPush = this.lastScheduledPushes?.[lastPushKey];
        const today = now.toDateString();

        if (lastPush === today) {
          logger.info('Already pushed at this time today, skipping');
          return;
        }

        // Push all incomplete records
        const result = await this.pushAllIncomplete();

        if (result.success || result.count > 0) {
          // Mark as pushed for today
          if (!this.lastScheduledPushes) {
            this.lastScheduledPushes = {};
          }
          this.lastScheduledPushes[lastPushKey] = today;
          logger.info(`Scheduled push completed: ${result.count}/${result.total} records pushed`);
        }
      }
    } catch (error) {
      logger.error('Error in scheduled push check:', error.message);
    }
  }

  /**
   * 停止飞书服务
   */
  stop() {
    if (this.wsClient) {
      try {
        this.wsClient.stop();
        logger.info('Feishu WebSocket stopped');
      } catch (error) {
        logger.error('Error stopping WebSocket:', error.message);
      }
    }

    if (this.pushTimer) {
      clearInterval(this.pushTimer);
      this.pushTimer = null;
    }

    this.enabled = false;
    this.client = null;
    this.wsClient = null;
  }

  /**
   * 重新加载配置
   */
  reload() {
    this.stop();
    this.initialize();
  }
}

// 导出单例
module.exports = new FeishuManager();
