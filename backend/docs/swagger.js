const swaggerAutogen = require('swagger-autogen')()

const doc = {
  openapi: "3.1.0", // present supported openapi version
  info: {
    title: "Rocketfy-backend", // short title.
    description: `
      Rocketfy backend API documentation.
    `, //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "David Vargas Monroy", // your name
      email: "davids.dvm@gmail.com", // your email
      url: "https://davidsdvm.com", // your website
    },
  },
};


const outputFile = './docs/swagger_output.json'
const endpointsFiles = ['./api/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../index.js')
})
