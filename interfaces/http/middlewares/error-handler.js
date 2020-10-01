const logger = require('../../../infra/logging/logger')({});

module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
};
