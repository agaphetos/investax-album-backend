class ListPhotos {
  constructor({ PhotosRepository, logger }) {
    this.PhotosRepository = PhotosRepository;
    this.logger = logger;
    this.serverHost = `${process.env.SERVER_URL}:${process.env.PORT}/photos`;
  }

  async execute(data) {
    this.logger.info(data);
    const { skip, limit } = data;

    const result = await this.PhotosRepository.list(skip, limit);
    const documents = result.documents.map((item) => ({
      ...item.toJSON(),
      raw: `${item.path.replace('/albums', `${this.serverHost}`)}`,
    }));

    return {
      ...result,
      documents,
    };
  }
}

module.exports = ListPhotos;
