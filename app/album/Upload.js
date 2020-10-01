const path = require('path');

class Upload {
  constructor({ PhotosRepository, FileService, logger }) {
    this.PhotosRepository = PhotosRepository;
    this.FileService = FileService;
    this.logger = logger;
    this.albumDirectory = path.join(process.cwd(), 'albums');
  }

  async execute(data) {
    this.logger.info(data);
    const { album, files } = data;

    if (files instanceof Array) {
      const savedFiles = files.map(async (file) => {
        const filePath = `/albums/${album.toLowerCase()}/${file.name}`;
        const saveFilePath = `${this.albumDirectory}/${album.toLowerCase()}/${file.name}`;
        this.FileService.saveTempFile(file.path, saveFilePath);
        return this.PhotosRepository.savePhoto(album, file.name, filePath);
      });

      const records = await Promise.all(savedFiles);

      this.logger.info(records);

      return records;
    }

    const filePath = `/albums/${album.toLowerCase()}/${files.name}`;
    const saveFilePath = `${this.albumDirectory}/${album.toLowerCase()}/${files.name}`;
    this.FileService.saveTempFile(files.path, saveFilePath);
    return this.PhotosRepository.savePhoto(album, files.name, filePath);
  }
}

module.exports = Upload;
