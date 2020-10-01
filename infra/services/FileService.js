const fs = require('fs');

class FileService {
  constructor({ logger }) {
    this.logger = logger;
  }

  saveTempFile(fileTempPath, savePath) {
    this.logger.info(fileTempPath, savePath);
    fs.renameSync(fileTempPath, savePath);
  }

  deleteFile(filePath) {
    this.logger.info(filePath);
    fs.unlinkSync(filePath);
  }
}

module.exports = FileService;
