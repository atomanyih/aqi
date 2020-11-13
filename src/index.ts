import startServer from "./startServer";
import startMonitor from "./startMonitor";
import Knex from 'knex';
import knexConfig from '../knexfile';
import {Model} from "objection";


console.log('starting!')

const knex = Knex(knexConfig.development)
Model.knex(knex);

startMonitor()
startServer();