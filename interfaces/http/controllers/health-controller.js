function check(req, res, next) {
  res.status(200).json({ message: 'OK' });
}

module.exports = {
  check,
};
