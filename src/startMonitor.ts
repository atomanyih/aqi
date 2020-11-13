// https://github.com/triforcely/sds011-wrapper
import SDS011Client, {SensorReading} from "sds011-client";
import Reading from "../models/Reading";

export default () => {
  const sensor = new SDS011Client("/dev/cu.usbserial-1410");

  Promise
    .all([sensor.setReportingMode(SDS011Client.ReportingMode.ACTIVE), sensor.setWorkingPeriod(1)])
    .then(() => {
      sensor.on('reading', async (r: SensorReading) => {
        console.log(JSON.stringify(r));
        const reading = await Reading.query().insert({
          pm2_5: r.pm2p5,
          pm10: r.pm10,
          readAt: Date.now(),
        })

        console.log(JSON.stringify(reading));
      });
    });
}