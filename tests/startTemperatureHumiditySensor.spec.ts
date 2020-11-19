import {promises as DHTSensor} from "node-dht-sensor";
import TemperatureHumidityReading from "../models/TemperatureHumidityReading";
import {readSensor} from "../src/startTemperatureHumiditySensor";

describe('readSensor', () => {
  const now = Date.now();
  beforeEach(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(now)
    DHTSensor.initialize({
      test: {
        fake: {
          temperature: 1337,
          humidity: 1337,
        }
      }
    });

    const query = TemperatureHumidityReading.query().resolve({});

    jest.spyOn(TemperatureHumidityReading, 'query').mockReturnValue(
      query,
    )
  });

  it('reads from the sensor', async () => {
    const res = await readSensor()
    expect(res).toEqual({
      temperature: 1337,
      humidity: 1337,
      readAt: now,
    });
  });
});