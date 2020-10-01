class PhotosRepository {
  constructor({ logger, Photos }) {
    this.logger = logger;
    this.model = Photos;
  }

  async list(skip = 0, limit = 5) {
    const count = await this.model.countDocuments();
    const documents = await this.model.find().skip(skip).limit(limit);

    this.logger.info({ count, documents });
    return {
      documents, count, skip, limit,
    };
  }

  async getPhoto(album, filename) {
    const document = await this.model.findOne({
      album: album.charAt(0).toUpperCase() + album.slice(1),
      name: filename,
    });

    return document;
  }

  async savePhoto(album, name, path) {
    const photo = new this.model({ album, name, path });
    await photo.save();

    return photo;
  }

  async deletePhotoById(id) {
    await this.model.deleteOne({ _id: id });
  }
}

module.exports = PhotosRepository;
