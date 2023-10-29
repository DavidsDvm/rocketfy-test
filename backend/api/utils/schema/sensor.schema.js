const Joi = require('joi');

const sensor_id = Joi.number().integer();
const sensor_name = Joi.string().min(3).max(50);
const sensor_image = Joi.string().min(3);
const data = Joi.array().items(Joi.object({
  timestamp: Joi.date(),
  temperature: Joi.number(),
  humidity: Joi.number(),
  pressure: Joi.number(),
  wind_speed: Joi.number(),
  noise_level: Joi.number(),
  air_quality: Joi.string(),
}));

const createSensorSchema = Joi.object({
  sensor_name: sensor_name.required(),
  sensor_image: sensor_image.required(),
  data: data.required(),
});

const updateSensorSchema = Joi.object({
  sensor_name: sensor_name,
  sensor_image: sensor_image,
  data: data,
});

const addDataSensorSchema = Joi.object({
  data: data.required(),
});

const getSensorSchema = Joi.object({
  id: sensor_id.required()
});

module.exports = { createSensorSchema, addDataSensorSchema, getSensorSchema };
