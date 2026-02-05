/**
 * 应用配置常量
 */

module.exports = {
  // 全局快捷键
  GLOBAL_SHORTCUT: 'CommandOrControl+Shift+X',

  // 保存目录名
  CAPTURES_DIR_NAME: 'captures',

  // 浮窗配置
  FLOAT_WINDOW: {
    width: 480,
    height: 620,
    resizable: true,  // 允许代码动态调整高度
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: false,  // 允许在任务栏显示
    transparent: false,
    backgroundColor: '#ffffff'
  },

  // 浮窗偏移量（相对于鼠标位置）
  FLOAT_OFFSET: {
    x: 20,
    y: 20
  },

  // 截图文件名格式
  SCREENSHOT_PREFIX: 'capture_',

  // 元数据文件后缀
  METADATA_SUFFIX: '.json',

  // 图片格式
  IMAGE_FORMAT: 'png',

  // 剪贴板文本最大长度（用于摘要显示）
  CLIPBOARD_MAX_LENGTH: 200,

  // 日志级别
  LOG_LEVEL: 'info' // 'debug' | 'info' | 'warn' | 'error'
};
