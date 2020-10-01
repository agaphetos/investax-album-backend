const path = require('path');

class DeletePhoto {
  constructor({ PhotosRepository, FileService, logger }) {
    this.PhotosRepository = PhotosRepository;
    this.FileService = FileService;
    this.logger = logger;
  }

  async execute(data) {
    this.logger.info(data);
    const { album, fileName } = data;

    const photo = await this.PhotosRepository.getPhoto(album, fileName);
    this.logger.info(photo);

    if (photo) {
      const { _id: id, path: filePath } = photo;
      const photoFilePath = path.join(process.cwd(), filePath);
      this.FileService.deleteFile(photoFilePath);
      await this.PhotosRepository.deletePhotoById(id);
    }
  }
}

module.exports = DeletePhoto;
