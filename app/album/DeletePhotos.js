const path = require('path');

class DeletePhoto {
  constructor({ PhotosRepository, FileService, logger }) {
    this.PhotosRepository = PhotosRepository;
    this.FileService = FileService;
    this.logger = logger;
  }

  async execute(data) {
    this.logger.info(data);

    data.forEach(async (item) => {
      const { album, documents } = item;
      const photos = documents.split(',')
        .map((document) => ({
          album,
          name: document.trim(),
        }));

      this.logger.info(photos);

      photos.forEach(async (photo) => {
        const result = await this.PhotosRepository.getPhoto(photo.album, photo.name);
        if (result) {
          const { _id: id, path: filePath } = result;
          const photoFilePath = path.join(process.cwd(), filePath);
          this.FileService.deleteFile(photoFilePath);
          await this.PhotosRepository.deletePhotoById(id);
        }
      });
    });
  }
}

module.exports = DeletePhoto;
