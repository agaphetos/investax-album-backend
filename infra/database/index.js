const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../logging/logger')({});

const { db } = config;
const credentials = (db.username && db.password) ? `${db.username}:${db.password}@` : undefined;
const url = `${db.host}:${db.port}/${db.name}`;

const connectionString = `mongodb://${credentials || ''}${url}?${db.options}`;

mongoose.connect(connectionString, { useNewUrlParser: true });

const database = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
database.on('error', logger.error.bind(console, 'MongoDB connection error:'));

module.exports = database;
