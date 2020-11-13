declare module 'sds011-client' {
  import EventEmitter from "events";

  export interface SensorReading {
    pm2p5: number,
    pm10: number
  }

  export const enum ReportingMode {
    ACTIVE = 'active',
    QUERY = 'query',
  }

  class SDS011Client extends EventEmitter.EventEmitter {
    constructor(portPath: string);

    setReportingMode(mode: ReportingMode) : Promise;
    setWorkingPeriod(time: number) : Promise;

    // TODO: figure out how to better type "on"
  }

  export = SDS011Client
}