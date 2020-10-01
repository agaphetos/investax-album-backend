const express = require('express');

const config = require('../../config');
const logger = require('../../infra/logging/logger')({});
const router = require('./router');

const app = express();
app.use('/', router);

function start() {
  return new Promise((resolve) => {
    const http = app.listen(config.web.port, () => {
      const { port } = http.address();
      logger.info(`[p ${process.pid}] Listening at port ${port}`);
      resolve();
    });
  });
}

module.exports = {
  start,
};
