const express = require('express');
const passport = require('passport');

const UserService = require('../services/user.service');
const validatorHandler = require('../utils/middleware/validator.handler');
const {
  createUserSchema,
  getEmailSchema,
  getUserSchema,
} = require('../utils/schema/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const users = await service.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = await service.getById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/email/:email',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getEmailSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = await service.getByEmail(req.params.email);
      res.json(user);
    } catch (error) {
      next(error);
    }
});

router.post(
  '/create',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await service.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
