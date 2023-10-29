const boom = require('@hapi/boom');
const { PythonShell } = require('python-shell');

const Sensor = require('../lib/mongo/model/sensor');

class SensorService {
  constructor () {}

  async getAverageData(sensor) {
    // we assume that sensor.data is an array of objects
    const data = sensor.data;

    const averageData = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      wind_speed: 0,
      noise_level: 0,
    };

    data.forEach((element) => {
      averageData.temperature += element.temperature;
      averageData.humidity += element.humidity;
      averageData.pressure += element.pressure;
      averageData.wind_speed += element.wind_speed;
      averageData.noise_level += element.noise_level;
    });

    averageData.temperature /= data.length;
    averageData.humidity /= data.length;
    averageData.pressure /= data.length;
    averageData.wind_speed /= data.length;
    averageData.noise_level /= data.length;

    // if one of the data is NaN or undefined, we should remove it
    for (const property in averageData) {
      if (isNaN(averageData[property]) || averageData[property] === undefined) {
        delete averageData[property];
      }
    }

    return averageData;
  }

  async getStandardDeviationData(sensor) {
    // we assume that sensor.data is an array of objects
    const data = sensor.data;

    const standardDeviationData = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      wind_speed: 0,
      noise_level: 0,
    };

    const averageData = await this.getAverageData(sensor);

    data.forEach((element) => {
      standardDeviationData.temperature += Math.pow(element.temperature - averageData.temperature, 2);
      standardDeviationData.humidity += Math.pow(element.humidity - averageData.humidity, 2);
      standardDeviationData.pressure += Math.pow(element.pressure - averageData.pressure, 2);
      standardDeviationData.wind_speed += Math.pow(element.wind_speed - averageData.wind_speed, 2);
      standardDeviationData.noise_level += Math.pow(element.noise_level - averageData.noise_level, 2);
    });

    standardDeviationData.temperature /= data.length;
    standardDeviationData.humidity /= data.length;
    standardDeviationData.pressure /= data.length;
    standardDeviationData.wind_speed /= data.length;
    standardDeviationData.noise_level /= data.length;

    // if one of the data is NaN or undefined, we should remove it
    for (const property in standardDeviationData) {
      if (isNaN(standardDeviationData[property]) || standardDeviationData[property] === undefined) {
        delete standardDeviationData[property];
      }
    }

    return standardDeviationData;
  }

  async getAll() {
    const allSensors = await Sensor.find();
    const toReturnSensors = [];

    // Get calculated for each sensor
    for (let i = 0; i < allSensors.length; i++) {
      const sensor = allSensors[i];
      const averageData = await this.getAverageData(sensor);
      const standardDeviationData = await this.getStandardDeviationData(sensor);
      toReturnSensors.push({
        sensor_id: sensor.sensor_id,
        sensor_name: sensor.sensor_name,
        sensor_image: sensor.sensor_image,
        data: sensor.data,
        averageData,
        standardDeviationData,
      });
    }

    return toReturnSensors;
  }

  async getById(id) {
    const sensor = await Sensor.findOne({ sensor_id: id });

    if (!sensor) {
      throw boom.notFound('sensor not found');
    };

    // Get calculated for the sensor
    const averageData = await this.getAverageData(sensor);
    const standardDeviationData = await this.getStandardDeviationData(sensor);
    const response = {
      ...sensor._doc,
      averageData,
      standardDeviationData,
    };

    return response;
  }

  async create(data) {
    const newSensor = new Sensor(data);

    await newSensor.save();

    return newSensor;
  }

  async appendData(id, data) {
    const sensor = await Sensor.findOne({ sensor_id: id });
    if (!sensor) {
      throw boom.notFound('sensor not found');
    };

    sensor.data.push(...data.data);

    await sensor.save();

    return sensor;
  }

  async generateData(id) {
    const sensor = await Sensor.findOne({ sensor_id: id });
    const response = {
      ...sensor._doc,
    };
    if (!sensor) {
      throw boom.notFound('sensor not found');
    };

    const options = {
      mode: 'json',
      pythonPath: '/usr/bin/python3',
      scriptPath: 'public',
      args: ['--data', JSON.stringify(sensor.data)]
    };

    await PythonShell.run('generationData.py', options).then(async (results) => {
      response.data.push(...results[0]);

    }).catch((err) => {
      throw boom.badImplementation('error generating data');
    });

    return response;
  }
}

module.exports = SensorService;
