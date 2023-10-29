require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const cors = require('cors');

const routerApi = require("./api/routes/index");
// const docs = require('./docs/swagger_output.json');
const { errorHandler, boomErrorHandler } = require('./api/utils/middleware/error.handler');
const i18n = require('./config/i18n.config');

const app = express();

app.use(express.json());
app.use(cors());

routerApi(app);

// Error management
app.use(boomErrorHandler);
app.use(errorHandler);

// Authentication
require('./api/utils/auth')

// Documnentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

// i18n (multilanguaje support)
app.use(i18n.init);

module.exports = app;
