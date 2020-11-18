// https://github.com/triforcely/sds011-wrapper
import SDS011Client, {SensorReading} from "sds011-client";
import ParticleReading from "../models/ParticleReading";

export default (portPath: string) => {
  const sensor = new SDS011Client(portPath);

  Promise
    .all([sensor.setReportingMode(SDS011Client.ReportingMode.ACTIVE), sensor.setWorkingPeriod(1)])
    .then(() => {
      sensor.on('reading', async (r: SensorReading) => {
        console.log(JSON.stringify(r));
        const reading = await ParticleReading.query().insert({
          pm2_5: r.pm2p5,
          pm10: r.pm10,
          readAt: Date.now(),
        })

        console.log(JSON.stringify(reading));
      });
    });
}