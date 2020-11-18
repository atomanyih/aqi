import {Model} from "objection";

export default class TemperatureHumidityReading extends Model {
  id!: number
  temperature!: number // celcius
  humidity!: number // percentage (0-100)
  readAt!: number

  static get tableName() {
    return 'temperature_humidity_readings'
  }
}