// https://github.com/triforcely/sds011-wrapper
import SDS011Client, {SensorReading} from "sds011-client";
import ParticleReading from "../models/ParticleReading";
import logger from "./logger";

export default async (portPath: string) => {
  const sensor = new SDS011Client(portPath);

  await Promise.all([
    sensor.setReportingMode(SDS011Client.ReportingMode.ACTIVE),
    sensor.setWorkingPeriod(1)
  ])

  sensor.on('reading', async (r: SensorReading) => {
    const reading = await ParticleReading.query().insert({
      pm2_5: r.pm2p5,
      pm10: r.pm10,
      readAt: Date.now(),
    })

    logger.debug('adding particle reading', {
      data: JSON.stringify(reading)
    });
  });
}