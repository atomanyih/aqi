declare module 'sds011-client' {
  import EventEmitter from "events";

  export const enum ReportingMode {
    ACTIVE = 'active',
    QUERY = 'query',
  }

  class SDS011Client extends EventEmitter.EventEmitter {
    constructor(portPath: string);

    setReportingMode(mode: ReportingMode) : Promise;
    setWorkingPeriod(time: number) : Promise;
  }

  export = SDS011Client
}