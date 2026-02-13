/**
 * Electron 主进程入口
 * 初始化应用、托盘、快捷键等模块
 */

const { app, BrowserWindow } = require('electron');
const logger = require('./logger');
const config = require('./config');
const configManager = require('./configManager');
const storage = require('./storage');
const tray = require('./tray');
const shortcut = require('./shortcut');
const floatWindow = require('./windows/float');
const settingsWindow = require('./windows/settings');
const memoWindow = require('./windows/memo');
const capture = require('./capture');

// 确保单实例运行
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  logger.warn('Application already running, exiting current instance');
  app.quit();
} else {
  // When trying to start second instance, focus first instance
  app.on('second-instance', () => {
    logger.info('Second instance detected');
  });

  // Application initialization
  app.whenReady().then(() => {
    try {
      // 0. Initialize logger system (in project root)
      const projectRoot = app.getAppPath();
      logger.init(projectRoot);

      logger.info('========================================');
      logger.info('Screenshot Tool Starting...');
      logger.info('========================================');

      // 1. Initialize configuration manager
      const userConfig = configManager.init();
      logger.info('User config loaded:', userConfig);

      // 2. Initialize storage directory (with custom path if set)
      const capturesDir = storage.init(userConfig.customSavePath);
      logger.info('Captures directory:', capturesDir);

      // 3. Create tray icon
      tray.create();

      // 4. Set tray screenshot callback (avoid circular dependency)
      tray.setOnCaptureRequest(() => {
        shortcut.handleCaptureShortcut();
      });

      // 5. Register global shortcut (using user config)
      const shortcutRegistered = shortcut.register(userConfig.shortcut);
      if (!shortcutRegistered) {
        logger.warn('Shortcut registration failed, but app continues running');
      }

      // 6. Setup float window IPC listeners
      floatWindow.setupIPC();

      // 7. Setup settings window IPC listeners
      settingsWindow.setupIPC();

      // 8. Setup memo window IPC listeners
      memoWindow.setupIPC();

      logger.info('========================================');
      logger.info('Screenshot Tool Ready');
      logger.info('Shortcut:', userConfig.shortcut);
      logger.info('Captures directory:', capturesDir);
      logger.info('========================================');

      // 9. Pre-create float window for performance (after 2 seconds)
      setTimeout(() => {
        logger.info('Pre-creating float window...');
        floatWindow.initialize();
      }, 2000);

    } catch (error) {
      logger.error('Application initialization failed:', error.message);
      logger.error(error.stack);
      app.quit();
    }
  });

  // When all windows are closed (except on macOS)
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // But this is a tray app, we don't quit
    // if (process.platform !== 'darwin') {
    //   app.quit();
    // }
    logger.debug('All windows closed, but app continues (tray mode)');
  });

  // On macOS, clicking dock icon when no windows are open
  app.on('activate', () => {
    // Tray app doesn't need main window
    logger.debug('Application activate event');
  });

  // Cleanup before quit
  app.on('will-quit', () => {
    logger.info('Application shutting down, cleaning up resources...');
    shortcut.unregisterAll();
    floatWindow.destroy(); // Destroy float window on app quit
    tray.destroy();
    logger.shutdown(); // Close logger system
  });

  // Catch unhandled exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception:', error.message);
    logger.error(error.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise rejection:', reason);
  });
}
