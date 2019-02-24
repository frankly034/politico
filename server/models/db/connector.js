import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => {
  console.log('connected to the database');
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  })
};

export default query;
