declare module 'node-dht-sensor' {
  type TestOptions = {
    test: {
      fake: {
        temperature: number,
        humidity: number
      }
    }
  }

  type Reading = {
    temperature: number,
    humidity: number
  }

  export const enum SensorType {
    DHT22 = 22,
    DHT11= 11
  }

  declare namespace promises {
    function initialize(testOptions : TestOptions)

    function read(sensorType: SensorType, pin: number) : Promise<Reading>
  }
}
