const mongoose = require('mongoose');
const { config } = require('../../../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.eqjgcd1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// Set up the MongoDB connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the connection for use in other parts of your application
module.exports = mongoose;
