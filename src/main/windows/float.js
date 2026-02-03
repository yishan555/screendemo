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
      this.window.show();
      return;
    }

    // 获取鼠标位置
    const cursorPoint = screen.getCursorScreenPoint();
    const x = cursorPoint.x + config.FLOAT_OFFSET.x;
    const y = cursorPoint.y + config.FLOAT_OFFSET.y;

    this.window = new BrowserWindow({
      width: config.FLOAT_WINDOW.width,
      height: config.FLOAT_WINDOW.height,
      x: x,
      y: y,
      resizable: config.FLOAT_WINDOW.resizable,
      frame: config.FLOAT_WINDOW.frame,
      alwaysOnTop: config.FLOAT_WINDOW.alwaysOnTop,
      skipTaskbar: config.FLOAT_WINDOW.skipTaskbar,
      transparent: config.FLOAT_WINDOW.transparent,
      backgroundColor: config.FLOAT_WINDOW.backgroundColor,
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

    // 窗口关闭事件
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

    logger.info('Float window created');
  }

  /**
   * Show float window and pass screenshot data
   * @param {Object} data - Data object containing imagePath, clipboardText
   */
  show(data) {
    this.captureData = data;

    if (!this.window || this.window.isDestroyed()) {
      this.create();
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
   * Send screenshot data to renderer process
   */
  sendCaptureData() {
    if (this.window && !this.window.isDestroyed() && this.captureData) {
      this.window.webContents.send('capture-data', this.captureData);
      logger.debug('Screenshot data sent to float window');
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
   * Close float window
   */
  close() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.close();
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
    ipcMain.handle('save-note', async (event, { metadataPath, noteText }) => {
      logger.info('Saving note to metadata:', metadataPath);
      try {
        const success = await storage.updateNote(metadataPath, noteText);
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

    logger.debug('Float window IPC listeners setup');
  }
}

// 导出单例
module.exports = new FloatWindow();
