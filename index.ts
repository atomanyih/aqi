import startServer from "./src/startServer";
import startParticleSensor from "./src/startParticleSensor";
import Knex from 'knex';
import knexConfig from './knexfile';
import {Model} from "objection";
import startTemperatureHumiditySensor from "./src/startTemperatureHumiditySensor";

const sds011PortPath = process.env.SDS011_PORT_PATH;

if(sds011PortPath) {
  console.log('starting!')

  const knex = Knex(knexConfig.development)
  Model.knex(knex);


  startParticleSensor(sds011PortPath);
  startTemperatureHumiditySensor();
  startServer(3000);
} else {
  throw 'Port path not provided, app is not starting'
}

