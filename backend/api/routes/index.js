const express = require("express");

const userRouter = require("./user.router");
const authRouter = require('./auth.router');
const sensorRouter = require('./sensor.router');
const { checkLanguage } = require('../utils/middleware/language-check.handler')

function routerApi(app) {
  // middleware to change language
  app.use(checkLanguage);

  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", userRouter);
  router.use("/auth", authRouter);
  router.use("/sensor", sensorRouter);
}

module.exports = routerApi;
