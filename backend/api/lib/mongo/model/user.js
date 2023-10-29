const mongosee = require('../mongo');

const modelName = "user";
const schemaDefinition = require('../schema/' + modelName);
const schemaInstance = mongosee.Schema(schemaDefinition);
const modelInstance = mongosee.model(modelName, schemaInstance);

module.exports = modelInstance;
