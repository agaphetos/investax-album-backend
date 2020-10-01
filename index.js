const server = require('./interfaces/http/server');
const logger = require('./infra/logging/logger')({});

server.start().catch((error) => {
  logger.info(error);
  process.exit();
});
