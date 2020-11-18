import {promises as DHTSensor, SensorType} from 'node-dht-sensor';
import TemperatureHumidityReading from "../models/TemperatureHumidityReading";


export default () => {
  if(process.env.NODE_ENV !== 'production') {
    console.log('initializing DHT sensor in fake mode')
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

      console.log(JSON.stringify(reading));
    } catch (err) {
      console.error("Failed to read sensor data:", err);
    }
  }, 5000)
}