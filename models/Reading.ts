import {Model} from "objection";

export default class Reading extends Model {
  id!: number
  pm2_5!: number
  pm10!: number
  readAt!: number

  static get tableName() {
    return 'readings'
  }
}