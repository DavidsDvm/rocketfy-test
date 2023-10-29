const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const lastname = Joi.string().min(3).max(50);
const email = Joi.string().email();
const password = Joi.string().min(5);
const jwtToken = Joi.string().min(5);

const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname,
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  lastname: lastname,
  email: email,
  password: password,
});

const getEmailSchema = Joi.object({
  email: email.required()
});

const getUserSchema = Joi.object({
  id: id.required()
});

const getUserLogin = Joi.object({
  email: email.required(),
  password: password.required()
})

const getUserToken = Joi.object({
  accessToken: jwtToken.required()
})

module.exports = { createUserSchema, updateUserSchema, getEmailSchema, getUserSchema, getUserLogin, getUserToken };
