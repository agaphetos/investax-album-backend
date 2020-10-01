const { Schema } = require('mongoose');
const database = require('..');

const Photos = database.model('photos', new Schema({
  album: String,
  name: String,
  path: String,
}, { versionKey: false }));

module.exports = Photos;
