import query from '../connector';

const userTable = 'CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, firstname VARCHAR (50) NOT null, lastname VARCHAR (50) NOT null, othername VARCHAR (50), email VARCHAR (60) UNIQUE NOT NULL, phonenumber VARCHAR (14) NOT null, passporturl VARCHAR (255) NOT null, password VARCHAR (255) NOT NULL, isAdmin BOOLEAN DEFAULT FALSE)';

const tokenTable = 'CREATE TABLE IF NOT EXISTS tokens ( id SERIAL PRIMARY KEY, token TEXT NOT null, access VARCHAR (10) NOT null, user_id INTEGER REFERENCES users (id) ON DELETE CASCADE)';

const partyTable = 'CREATE TABLE IF NOT EXISTS parties ( id SERIAL PRIMARY KEY, name VARCHAR (50) NOT null, hqaddress TEXT NOT null, logourl VARCHAR (255) NOT null)';

const officeTable = 'CREATE TABLE IF NOT EXISTS offices ( id SERIAL PRIMARY KEY, name VARCHAR (100) NOT null, type VARCHAR (50) NOT null)';

query(userTable)
  .then(() => query(tokenTable))
  .then(() => query(partyTable))
  .then(() => query(officeTable))
  .then(() => console.log('tables created'))
  .catch(e => console.log(e));
