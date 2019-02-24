import query from '../connector';

const table = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;
DROP TABLE IF EXISTS parties CASCADE;
DROP TABLE IF EXISTS offices CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, firstname VARCHAR (50) NOT null, lastname VARCHAR (50) NOT null, othername VARCHAR (50), email VARCHAR (60) UNIQUE NOT NULL, "phoneNumber" VARCHAR (14) NOT null, "passportUrl" VARCHAR (255) NOT null, password VARCHAR (255) NOT NULL, "isAdmin" BOOLEAN DEFAULT FALSE);

CREATE TABLE IF NOT EXISTS tokens ( id SERIAL PRIMARY KEY, token TEXT NOT null, access VARCHAR (10) NOT null, user_id INTEGER REFERENCES users (id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS parties ( id SERIAL PRIMARY KEY, name VARCHAR (50) UNIQUE NOT null, "hqAddress" TEXT NOT null, "logoUrl" VARCHAR (255) NOT null);

CREATE TABLE IF NOT EXISTS offices ( id SERIAL PRIMARY KEY, name VARCHAR (100) UNIQUE NOT null, type VARCHAR (50) NOT null);

CREATE TABLE IF NOT EXISTS candidates ( id SERIAL, candidate int UNIQUE REFERENCES users (id), office int REFERENCES offices (id), party INTEGER NOT NULL REFERENCES parties (id), confirmed BOOLEAN DEFAULT FALSE, PRIMARY KEY (candidate, office));

CREATE TABLE IF NOT EXISTS votes (id SERIAL, office int NOT NULL REFERENCES offices (id), candidate int NOT NULL REFERENCES candidates (candidate), "createdBy" int NOT NULL REFERENCES users (id), "createdOn" Timestamp DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (office, "createdBy"));`;

query(table)
  .then(() => console.log('tables created'))
  .catch(e => console.log(e));
