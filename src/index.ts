// https://github.com/triforcely/sds011-wrapper
import SDS011Client, {SensorReading} from "sds011-client";
import express from "express";

console.log('starting!')

const sensor = new SDS011Client("/dev/cu.usbserial-1410");

Promise
  .all([sensor.setReportingMode(SDS011Client.ReportingMode.ACTIVE), sensor.setWorkingPeriod(1)])
  .then(() => {
    sensor.on('reading', (r: SensorReading) => {
      console.log(JSON.stringify(r));
    });
  });

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})