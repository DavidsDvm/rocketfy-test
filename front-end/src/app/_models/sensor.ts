export interface Sensor {
  sensor_id: Number,
  sensor_name: String,
  sensor_image: String,
  data: [{
    timestamp?: Date,
    temperature?: Number,
    humidity?: Number,
    pressure?: Number,
    wind_speed?: Number,
    noise_level?: Number,
    air_quality?: Number,
  }]
  averageData?: {
    temperature?: Number,
    humidity?: Number,
    pressure?: Number,
    wind_speed?: Number,
    noise_level?: Number,
    air_quality?: Number,
  },
  standardDeviationData?: {
    temperature?: Number,
    humidity?: Number,
    pressure?: Number,
    wind_speed?: Number,
    noise_level?: Number,
    air_quality?: Number,
  },
}
