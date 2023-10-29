module.exports = {
  sensor_id: Number,
  sensor_name: String,
  sensor_image: String,
  data: [{
    timestamp: Date,
    temperature: Number,
    humidity: Number,
    pressure: Number,
    wind_speed: Number,
    noise_level: Number,
    air_quality: String,
  }]
}
