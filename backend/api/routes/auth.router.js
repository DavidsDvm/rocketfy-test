const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');
const validatorHandler = require('../utils/middleware/validator.handler');
const { getUserLogin, getUserToken } = require('../utils/schema/user.schema');

const router = express.Router();
const service = new AuthService;

router.get('/user',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await service.getUserByToken(req.headers.authorization.split(' ')[1]);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login',
  validatorHandler(getUserLogin, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    /*  #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/UserLogin" },
      }
    */
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/sign-in-with-token',
  validatorHandler(getUserToken, 'body'),
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    /*  #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/UserToken" },
      }
    */
    try {
      const accessToken = req.body.accessToken;
      const response = await service.signInWithToken(accessToken);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;