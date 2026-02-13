/**
 * 浮窗管理模块
 * 负责创建和管理浮窗窗口
 */

const { BrowserWindow, screen, ipcMain, shell } = require('electron');
const path = require('path');
const config = require('../config');
const logger = require('../logger');
const storage = require('../storage');
const capture = require('../capture');

class FloatWindow {
  constructor() {
    this.window = null;
    this.captureData = null;
  }

  /**
   * 创建浮窗
   */
  create() {
    if (this.window && !this.window.isDestroyed()) {
      // Window already exists, just ensure it's ready
      return;
    }

    // 获取鼠标位置（如果没有窗口，使用屏幕中心）
    let x, y;
    try {
      const cursorPoint = screen.getCursorScreenPoint();
      x = cursorPoint.x + config.FLOAT_OFFSET.x;
      y = cursorPoint.y + config.FLOAT_OFFSET.y;
    } catch (e) {
      // Fallback to screen center if cursor position fails
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.workAreaSize;
      x = Math.floor((width - config.FLOAT_WINDOW.width) / 2);
      y = Math.floor((height - config.FLOAT_WINDOW.height) / 2);
    }

    this.window = new BrowserWindow({
      width: config.FLOAT_WINDOW.width,
      height: config.FLOAT_WINDOW.height,
      x: x,
      y: y,
      show: false,  // 不立即显示，等内容加载完成后再显示
      resizable: config.FLOAT_WINDOW.resizable,
      frame: config.FLOAT_WINDOW.frame,
      alwaysOnTop: config.FLOAT_WINDOW.alwaysOnTop,
      skipTaskbar: config.FLOAT_WINDOW.skipTaskbar,
      transparent: config.FLOAT_WINDOW.transparent,
      backgroundColor: '#667eea',  // 使用渐变主色调，避免白屏
      minWidth: config.FLOAT_WINDOW.width,  // 限制最小宽度
      maxWidth: config.FLOAT_WINDOW.width,  // 限制最大宽度（防止用户手动拉宽）
      minHeight: 250,  // 最小高度
      maxHeight: 700,  // 最大高度
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: false
      }
    });

    // 确保窗口始终在最上层 (screen-saver 级别)
    this.window.setAlwaysOnTop(true, 'screen-saver');

    // 加载页面
    const htmlPath = path.join(__dirname, '../../renderer/float.html');
    this.window.loadFile(htmlPath);

    // 页面加载完成后标记为就绪（但不显示）
    this.window.once('ready-to-show', () => {
      this.isReady = true;
      logger.info('Float window content loaded and ready');
    });

    // 窗口关闭事件（实际上不会触发，因为我们用 hide）
    this.window.on('closed', () => {
      this.window = null;
      this.captureData = null;
    });

    // 监听窗口恢复事件,确保从任务栏恢复时重新应用最上层设置
    this.window.on('restore', () => {
      this.window.setAlwaysOnTop(true, 'screen-saver');
      this.window.focus();
      logger.info('Float window restored from taskbar, re-applied always-on-top');
    });

    logger.info('Float window created (pre-initialized)');
  }

  /**
   * Initialize - pre-create window for faster display
   */
  initialize() {
    logger.info('Pre-creating float window for performance...');
    this.create();
  }

  /**
   * Show float window and pass screenshot data
   * @param {Object} data - Data object containing imagePath, clipboardText
   */
  show(data) {
    this.captureData = data;
    this.isEditMode = false; // Mark as new capture mode

    if (!this.window || this.window.isDestroyed()) {
      this.create();
    }

    // Update window position to current mouse location
    try {
      const cursorPoint = screen.getCursorScreenPoint();
      const x = cursorPoint.x + config.FLOAT_OFFSET.x;
      const y = cursorPoint.y + config.FLOAT_OFFSET.y;
      this.window.setPosition(x, y);
    } catch (e) {
      logger.warn('Failed to update window position:', e.message);
    }

    // Send data after page finishes loading
    if (this.window.webContents.isLoading()) {
      this.window.webContents.once('did-finish-load', () => {
        this.sendCaptureData();
      });
    } else {
      this.sendCaptureData();
    }

    this.window.show();
    this.window.focus();
    // 确保显示时位于最上层
    this.window.setAlwaysOnTop(true, 'screen-saver');
  }

  /**
   * Show float window for editing existing record
   * @param {Object} record - Existing record to edit
   */
  showForEdit(record) {
    this.captureData = record;
    this.isEditMode = true; // Mark as edit mode

    if (!this.window || this.window.isDestroyed()) {
      this.create();
    }

    // Update window position to current mouse location
    try {
      const cursorPoint = screen.getCursorScreenPoint();
      const x = cursorPoint.x + config.FLOAT_OFFSET.x;
      const y = cursorPoint.y + config.FLOAT_OFFSET.y;
      this.window.setPosition(x, y);
    } catch (e) {
      logger.warn('Failed to update window position:', e.message);
    }

    // Send data after page finishes loading
    if (this.window.webContents.isLoading()) {
      this.window.webContents.once('did-finish-load', () => {
        this.sendEditData();
      });
    } else {
      this.sendEditData();
    }

    this.window.show();
    this.window.focus();
    // 确保显示时位于最上层
    this.window.setAlwaysOnTop(true, 'screen-saver');
  }

  /**
   * Send screenshot data to renderer process
   */
  sendCaptureData() {
    if (this.window && !this.window.isDestroyed() && this.captureData) {
      this.window.webContents.send('capture-data', this.captureData);
      logger.debug('Screenshot data sent to float window');
    }
  }

  /**
   * Send edit data to renderer process
   */
  sendEditData() {
    if (this.window && !this.window.isDestroyed() && this.captureData) {
      this.window.webContents.send('edit-data', this.captureData);
      logger.debug('Edit data sent to float window');
    }
  }

  /**
   * Hide float window
   */
  hide() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.hide();
    }
  }

  /**
   * Minimize float window
   */
  minimize() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.minimize();
      logger.info('Float window minimized');
    }
  }

  /**
   * Restore float window
   */
  restore() {
    if (this.window && !this.window.isDestroyed()) {
      if (this.window.isMinimized()) {
        this.window.restore();
      }
      this.window.show();
      this.window.focus();
      // 确保恢复时位于最上层
      this.window.setAlwaysOnTop(true, 'screen-saver');
      logger.info('Float window restored');
    }
  }

  /**
   * Close float window (hide instead of destroy for reuse)
   */
  close() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.hide();
      logger.info('Float window hidden (reusable)');
    }
  }

  /**
   * Destroy float window completely (only used on app quit)
   */
  destroy() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.close();
      this.window = null;
      this.captureData = null;
      logger.info('Float window destroyed');
    }
  }

  /**
   * Setup IPC listeners
   */
  setupIPC() {
    // Open image
    ipcMain.on('open-image', (event, imagePath) => {
      logger.info('Opening image:', imagePath);
      shell.openPath(imagePath).then((error) => {
        if (error) {
          logger.error('Failed to open image:', error);
        }
      });
    });

    // Copy text to clipboard
    ipcMain.on('copy-text', (event, text) => {
      logger.info('Copying text to clipboard');
      capture.writeClipboard(text);
    });

    // Open memo window
    ipcMain.on('open-memo', () => {
      logger.info('Opening memo window from float window');
      const memoWindow = require('./memo');
      memoWindow.show();
    });

    // Open save directory
    ipcMain.on('open-directory', () => {
      const dir = storage.getCapturesDir();
      logger.info('Opening save directory:', dir);
      shell.openPath(dir).then((error) => {
        if (error) {
          logger.error('Failed to open directory:', error);
        }
      });
    });

    // Save note to metadata
    ipcMain.handle('save-note', async (event, { metadataPath, noteText, isEditMode = false }) => {
      logger.info('Saving note to metadata:', metadataPath, isEditMode ? '(edit mode)' : '(new capture)');
      try {
        const success = await storage.updateNote(metadataPath, noteText, isEditMode);
        if (success) {
          logger.info('Note saved successfully');
        } else {
          logger.error('Failed to save note');
        }
        return success;
      } catch (error) {
        logger.error('Error saving note:', error.message);
        return false;
      }
    });

    // Close float window
    ipcMain.on('close-float', () => {
      logger.info('Closing float window');
      this.close();
    });

    // Minimize float window
    ipcMain.on('minimize-float', () => {
      logger.info('Minimizing float window');
      this.minimize();
    });

    // Adjust float window height
    ipcMain.on('adjust-float-height', (event, height) => {
      if (this.window && !this.window.isDestroyed()) {
        const currentSize = this.window.getSize();
        const newHeight = Math.min(Math.max(height, 250), 700); // Min 250px, Max 700px
        this.window.setSize(currentSize[0], newHeight);
        logger.debug(`Float window height adjusted to: ${newHeight}px`);
      }
    });

    // Toggle DevTools for float window
    ipcMain.on('toggle-devtools-float', () => {
      if (this.window && !this.window.isDestroyed()) {
        if (this.window.webContents.isDevToolsOpened()) {
          this.window.webContents.closeDevTools();
        } else {
          this.window.webContents.openDevTools({ mode: 'detach' });
        }
      }
    });

    logger.debug('Float window IPC listeners setup');
  }
}

// 导出单例
module.exports = new FloatWindow();
