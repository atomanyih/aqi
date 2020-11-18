import startServer from "./src/startServer";
import startParticleSensor from "./src/startParticleSensor";
import Knex from 'knex';
import knexConfig from './knexfile';
import {Model} from "objection";
import startTemperatureHumiditySensor from "./src/startTemperatureHumiditySensor";

console.log('starting!')

const knex = Knex(knexConfig.development)
Model.knex(knex);

startParticleSensor("/dev/cu.usbserial-1410");
startServer();
startTemperatureHumiditySensor();