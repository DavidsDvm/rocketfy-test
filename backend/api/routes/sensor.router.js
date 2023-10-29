const express = require('express');
const passport = require('passport');

const SensorService = require('../services/sensor.service');
const validatorHandler = require('../utils/middleware/validator.handler');
const {
  createSensorSchema, getSensorSchema, addDataSensorSchema
} = require('../utils/schema/sensor.schema');

const router = express.Router();
const service = new SensorService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const sensors = await service.getAll();
      res.json(sensors);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSensorSchema, 'params'),
  async (req, res, next) => {
    try {
      const sensor = await service.getById(req.params.id);
      res.json(sensor);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createSensorSchema, 'body'),
  async (req, res, next) => {
    try {
      const sensor = await service.create(req.body);
      res.json(sensor);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/append/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addDataSensorSchema, 'body'),
  validatorHandler(getSensorSchema, 'params'),
  async (req, res, next) => {
    try {
      const sensor = await service.appendData(req.params.id, req.body);
      res.json(sensor);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/generate/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSensorSchema, 'params'),
  async (req, res, next) => {
    try {
      const sensor = await service.generateData(req.params.id);
      res.json(sensor);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
