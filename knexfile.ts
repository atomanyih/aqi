import {Config} from 'knex'
import {Database} from "sqlite3";

const development : Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './example.db'
    },
    pool: {
      afterCreate: (conn : Database, cb: () => {}) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
}

export default {
  development
}