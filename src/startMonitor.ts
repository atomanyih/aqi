// https://github.com/triforcely/sds011-wrapper
import SDS011Client, {SensorReading} from "sds011-client";

export default () => {
  const sensor = new SDS011Client("/dev/cu.usbserial-1410");

  Promise
    .all([sensor.setReportingMode(SDS011Client.ReportingMode.ACTIVE), sensor.setWorkingPeriod(1)])
    .then(() => {
      sensor.on('reading', (r: SensorReading) => {
        console.log(JSON.stringify(r));
      });
    });
}