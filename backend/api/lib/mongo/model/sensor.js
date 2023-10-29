const mongoose = require('../mongo');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const modelName = "sensor";
const schemaDefinition = require('../schema/' + modelName);
const schemaInstance = mongoose.Schema(schemaDefinition);
schemaInstance.plugin(AutoIncrement, { inc_field: 'sensor_id' });
const modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;
