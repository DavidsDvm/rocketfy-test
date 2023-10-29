const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../../config/config');
const UserService = require('../services/user.service');
const service = new UserService;

class authService {
  async getUser(email, password) {
    const user = await service.getByEmail(email);
    if (!user) {
      throw boom.unauthorized('Invalid email or password');
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      throw boom.unauthorized('Invalid password');
    }
    return user;
  }

  signToken(user) {
    const payload = {
      id: user.id,
      role: user.rolId
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });
    return {
      user,
      token
    }
  }

  verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
  }

  async signInWithToken(token) {
    const { id } = this.verifyToken(token);
    const user = await service.getById(id);
    if (!user) {
      throw boom.unauthorized('Invalid token');
    }
    return this.signToken(user);
  }

  async getUserByToken(token) {
    const { id } = this.verifyToken(token);
    const user = await service.getById(id);
    if (!user) {
      throw boom.unauthorized('Invalid token');
    }
    delete user.dataValues.password;
    delete user.dataValues.state;
    return user;
  }
};

module.exports = authService;
