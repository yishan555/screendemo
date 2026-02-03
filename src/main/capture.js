/**
 * 截图模块
 * 负责执行全屏截图、读取剪贴板、保存数据
 */

const screenshot = require('screenshot-desktop');
const { clipboard } = require('electron');
const logger = require('./logger');
const storage = require('./storage');

class Capture {
  /**
   * Execute fullscreen screenshot and save
   * @returns {Promise<Object>} Object containing imagePath, clipboard data, metadataPath
   */
  async execute() {
    try {
      logger.info('Starting screenshot...');

      // 1. Capture primary screen screenshot
      const imageBuffer = await this.captureScreen();
      if (!imageBuffer) {
        throw new Error('Screenshot failed: No image data received');
      }

      // 2. Capture clipboard content (text and/or image)
      const clipboardData = await this.captureClipboard();

      // 3. Save screenshot
      const imagePath = await storage.saveImage(imageBuffer);

      // 4. Save clipboard data and metadata
      const result = await storage.saveRecord(imagePath, clipboardData);

      // Update clipboard data with saved image path
      const clipboardForUI = {
        types: clipboardData.types,
        text: clipboardData.text,
        imagePath: result.clipboardImagePath  // Use the saved file path instead of buffer
      };

      logger.info('Screenshot completed:', {
        imagePath,
        clipboardTypes: clipboardData.types,
        hasClipboardText: !!clipboardData.text,
        hasClipboardImage: !!clipboardData.image
      });

      return {
        imagePath,
        clipboardText: clipboardData.text || '',  // Keep for backward compatibility
        clipboard: clipboardForUI,  // Send clipboard data with file path instead of buffer
        metadataPath: result.metadataPath,
        clipboardImagePath: result.clipboardImagePath
      };
    } catch (error) {
      logger.error('Screenshot execution failed:', error.message);
      throw error;
    }
  }

  /**
   * Capture screen screenshot
   * @returns {Promise<Buffer>} Image Buffer
   */
  async captureScreen() {
    try {
      // screenshot-desktop captures primary screen by default
      // Returns Buffer or Array<Buffer> (for multiple screens)
      const imgBuffer = await screenshot({ format: 'png' });

      // If returns array (multiple screens), take first one
      if (Array.isArray(imgBuffer)) {
        logger.debug('Multiple screens detected, using primary screen');
        return imgBuffer[0];
      }

      return imgBuffer;
    } catch (error) {
      logger.error('Screen capture failed:', error.message);
      throw error;
    }
  }

  /**
   * Capture clipboard content (text and/or image)
   * @returns {Promise<Object>} Object containing types, text, and image buffer
   */
  async captureClipboard() {
    try {
      const formats = clipboard.availableFormats();
      logger.debug('Available clipboard formats:', formats);

      const clipboardData = {
        types: [],
        text: null,
        image: null
      };

      // Check for text
      const text = clipboard.readText();
      if (text && text.trim()) {
        clipboardData.types.push('text');
        clipboardData.text = text;
        logger.debug('Captured clipboard text:', `${text.length} characters`);
      }

      // Check for image
      const image = clipboard.readImage();
      if (!image.isEmpty()) {
        clipboardData.types.push('image');
        clipboardData.image = image.toPNG();  // Convert to PNG buffer
        const size = clipboardData.image.length;
        logger.debug('Captured clipboard image:', `${(size / 1024).toFixed(2)} KB`);
      }

      logger.info('Clipboard capture completed:', {
        types: clipboardData.types,
        hasText: !!clipboardData.text,
        hasImage: !!clipboardData.image
      });

      return clipboardData;
    } catch (error) {
      logger.error('Failed to capture clipboard:', error.message);
      return {
        types: [],
        text: null,
        image: null
      };
    }
  }

  /**
   * Read clipboard text content (kept for backward compatibility)
   * @returns {string} Clipboard text
   */
  readClipboard() {
    try {
      const text = clipboard.readText();
      logger.debug('Read clipboard text:', text ? `${text.length} characters` : 'empty');
      return text || '';
    } catch (error) {
      logger.error('Failed to read clipboard:', error.message);
      return '';
    }
  }

  /**
   * Write text to clipboard
   * @param {string} text - Text to write
   */
  writeClipboard(text) {
    try {
      clipboard.writeText(text);
      logger.debug('Text written to clipboard');
    } catch (error) {
      logger.error('Failed to write clipboard:', error.message);
    }
  }
}

// 导出单例
module.exports = new Capture();
