const formidable = require('formidable');

const {
  ListPhotos, Upload, DeletePhoto, DeletePhotos,
} = require('../../../app/album');

const PhotosRepository = require('../../../infra/repositories/PhotosRepository');
const FileService = require('../../../infra/services/FileService');
const logger = require('../../../infra/logging/logger')({});
const { Photos } = require('../../../infra/database/models');

const photosRepository = new PhotosRepository({ logger, Photos });
const fileService = new FileService({ logger });

const listPhotosOperation = new ListPhotos({
  PhotosRepository: photosRepository,
  logger,
});

const uploadOperation = new Upload({
  PhotosRepository: photosRepository,
  FileService: fileService,
  logger,
});

const deletePhotoOperation = new DeletePhoto({
  PhotosRepository: photosRepository,
  FileService: fileService,
  logger,
});

const deletePhotosOperation = new DeletePhotos({
  PhotosRepository: photosRepository,
  FileService: fileService,
  logger,
});

async function listPhotos(req, res, next) {
  try {
    const data = req.body;
    const result = await listPhotosOperation.execute(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function upload(req, res, next) {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      const result = await uploadOperation.execute({
        ...fields,
        files: files.documents,
      });
      res.status(200).json({ message: 'OK', data: result });
    });
  } catch (error) {
    next(error);
  }
}

async function deletePhoto(req, res, next) {
  try {
    await deletePhotoOperation.execute(req.params);
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
}

async function deletePhotos(req, res, next) {
  try {
    await deletePhotosOperation.execute(req.body);
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listPhotos,
  upload,
  deletePhoto,
  deletePhotos,
};
