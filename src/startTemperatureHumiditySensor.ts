import {promises as DHTSensor, SensorType} from 'node-dht-sensor';
import TemperatureHumidityReading from "../models/TemperatureHumidityReading";
import logger from "./logger";


export default (intervalMs: number) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.debug('initializing DHT sensor in fake mode')
    DHTSensor.initialize({
      test: {
        fake: {
          temperature: 1337,
          humidity: 1337,
        }
      }
    });
  }

  setInterval(async () => {
    try {
      const res = await DHTSensor.read(SensorType.DHT22, 4);

      const reading = await TemperatureHumidityReading.query().insert({
        temperature: res.temperature,
        humidity: res.humidity,
        readAt: Date.now(),
      })

      logger.debug('adding temperature/humidity reading', {
        data: JSON.stringify(reading)
      });
    } catch (err) {
      logger.error("Failed to read DHT22 sensor data:", {
        error: err
      });
    }
  }, intervalMs)
}