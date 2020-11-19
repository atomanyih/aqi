import {promises as DHTSensor, SensorType} from 'node-dht-sensor';
import TemperatureHumidityReading from "../models/TemperatureHumidityReading";
import logger from "./logger";

export const readSensor = async () => {
  const res = await DHTSensor.read(SensorType.DHT22, 4);

  return TemperatureHumidityReading.query().insert({
    temperature: res.temperature,
    humidity: res.humidity,
    readAt: Date.now(),
  })
}

export default (intervalMs: number) => {
  setInterval(async () => {
    try {
      const reading = await readSensor()

      logger.debug('Inserted temperature/humidity reading', {
        data: JSON.stringify(reading)
      });
    } catch (err) {
      logger.error("Failed to read DHT22 sensor data:", {
        error: err
      });
    }
  }, intervalMs)
}