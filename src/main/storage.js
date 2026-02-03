/**
 * 存储模块
 * 负责文件系统操作：创建目录、保存截图、保存元数据
 */

const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');

class Storage {
  constructor() {
    this.capturesDir = null;
  }

  /**
   * Initialize storage directory
   * @param {string} customPath - Custom save path (optional)
   */
  init(customPath = '') {
    try {
      // Use custom path if provided and valid, otherwise use default
      if (customPath && customPath.trim()) {
        this.capturesDir = path.resolve(customPath);
        logger.info('Using custom save path:', this.capturesDir);
      } else {
        const userDataPath = app.getPath('userData');
        this.capturesDir = path.join(userDataPath, config.CAPTURES_DIR_NAME);
        logger.info('Using default save path:', this.capturesDir);
      }

      // Create directory if not exists
      if (!fs.existsSync(this.capturesDir)) {
        fs.mkdirSync(this.capturesDir, { recursive: true });
        logger.info('Created captures directory:', this.capturesDir);
      } else {
        logger.info('Captures directory exists:', this.capturesDir);
      }

      return this.capturesDir;
    } catch (error) {
      logger.error('Failed to initialize storage directory:', error.message);
      // Fall back to default path
      const userDataPath = app.getPath('userData');
      this.capturesDir = path.join(userDataPath, config.CAPTURES_DIR_NAME);
      fs.mkdirSync(this.capturesDir, { recursive: true });
      logger.warn('Falling back to default path:', this.capturesDir);
      return this.capturesDir;
    }
  }

  /**
   * Generate unique filename (based on timestamp)
   */
  generateFileName() {
    const timestamp = Date.now();
    const dateStr = new Date(timestamp).toISOString().replace(/[:.]/g, '-');
    return `${config.SCREENSHOT_PREFIX}${dateStr}_${timestamp}`;
  }

  /**
   * Save screenshot file
   * @param {Buffer} imageBuffer - Image binary data
   * @returns {Promise<string>} Saved file path
   */
  async saveImage(imageBuffer) {
    try {
      const fileName = this.generateFileName();
      const imagePath = path.join(this.capturesDir, `${fileName}.${config.IMAGE_FORMAT}`);

      await fs.promises.writeFile(imagePath, imageBuffer);
      logger.info('Screenshot saved:', imagePath);

      return imagePath;
    } catch (error) {
      logger.error('Failed to save screenshot:', error.message);
      throw error;
    }
  }

  /**
   * Save metadata (legacy method, kept for backward compatibility)
   * @param {string} imagePath - Image path
   * @param {string} clipboardText - Clipboard text
   * @returns {Promise<string>} Metadata file path
   */
  async saveMetadata(imagePath, clipboardText = '') {
    try {
      const metadata = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        imagePath: imagePath,
        clipboardText: clipboardText || ''
      };

      const baseFileName = path.basename(imagePath, path.extname(imagePath));
      const metadataPath = path.join(this.capturesDir, `${baseFileName}${config.METADATA_SUFFIX}`);

      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Metadata saved:', metadataPath);

      return metadataPath;
    } catch (error) {
      logger.error('Failed to save metadata:', error.message);
      throw error;
    }
  }

  /**
   * Save a complete record (screenshot + clipboard data + metadata)
   * @param {string} imagePath - Screenshot image path
   * @param {Object} clipboardData - Clipboard data object with types, text, image
   * @returns {Promise<Object>} Object containing metadataPath and clipboardImagePath
   */
  async saveRecord(imagePath, clipboardData) {
    try {
      const recordId = Date.now();
      const baseFileName = path.basename(imagePath, path.extname(imagePath));

      // Save clipboard image if present
      let clipboardImagePath = null;
      if (clipboardData.image) {
        const clipboardFileName = `clipboard_${recordId}.png`;
        clipboardImagePath = path.join(this.capturesDir, clipboardFileName);
        await fs.promises.writeFile(clipboardImagePath, clipboardData.image);
        logger.info('Clipboard image saved:', clipboardImagePath);
      }

      // Prepare initial note content (start with clipboard text if available)
      const initialNoteText = clipboardData.text || '';

      // Create metadata with new structure
      const metadata = {
        id: recordId,
        createdAt: new Date().toISOString(),
        imagePath: imagePath,
        clipboard: {
          types: clipboardData.types,
          text: clipboardData.text || null,
          imagePath: clipboardImagePath || null
        },
        note: {
          text: initialNoteText,
          updatedAt: new Date().toISOString()
        }
      };

      const metadataPath = path.join(this.capturesDir, `${baseFileName}${config.METADATA_SUFFIX}`);
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Record metadata saved:', metadataPath);

      return {
        metadataPath,
        clipboardImagePath
      };
    } catch (error) {
      logger.error('Failed to save record:', error.message);
      throw error;
    }
  }

  /**
   * Update note content in metadata
   * @param {string} metadataPath - Path to metadata file
   * @param {string} noteText - Updated note text
   * @returns {Promise<boolean>} Success status
   */
  async updateNote(metadataPath, noteText) {
    try {
      // Read existing metadata
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);

      // Update note field
      metadata.note = {
        text: noteText,
        updatedAt: new Date().toISOString()
      };

      // Write back to file
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Note updated in metadata:', metadataPath);

      return true;
    } catch (error) {
      logger.error('Failed to update note:', error.message);
      return false;
    }
  }

  /**
   * Load metadata from file
   * @param {string} metadataPath - Path to metadata file
   * @returns {Promise<Object>} Metadata object
   */
  async loadMetadata(metadataPath) {
    try {
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      logger.debug('Metadata loaded:', metadataPath);
      return metadata;
    } catch (error) {
      logger.error('Failed to load metadata:', error.message);
      throw error;
    }
  }

  /**
   * Get captures directory path
   */
  getCapturesDir() {
    return this.capturesDir;
  }
}

// 导出单例
module.exports = new Storage();
