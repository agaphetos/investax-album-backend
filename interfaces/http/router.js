const { Router, static: staticFiles } = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const logger = require('../../infra/logging/logger')({});

const { errorHandler, loggerMiddleware } = require('./middlewares');
const { healthController, photosController } = require('./controllers');

const router = Router();

// add basic middlewares
router
  .use(methodOverride('_method'))
  .use(cors())
  .use(bodyParser.json())
  .use(compression())
  .use(loggerMiddleware({ logger }));

// initialize routers for controller
const healthRouter = Router();
healthRouter.get('/', healthController.check);

const photosRouter = Router();
photosRouter.post('/list', photosController.listPhotos);
photosRouter.put('/', photosController.upload);
photosRouter.delete('/:album/:fileName', photosController.deletePhoto);
photosRouter.delete('/', photosController.deletePhotos);

// add application router
router
  .use('/health', healthRouter)
  .use('/photos', staticFiles('albums'))
  .use('/photos', photosRouter);

// add error handler
router
  .use(errorHandler);

module.exports = router;
