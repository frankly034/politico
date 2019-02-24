import query from './db/connector';

class OfficeModel {
  constructor(office) {
    this.id = office.id;
    this.name = office.name;
    this.type = office.type;
  }

  static create(body) {
    const attributes = ['name', 'type'];

    const officeArray = attributes.map((attr) => {
      if (attr === 'name') {
        return body[attr].toLowerCase().split(' ').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
      }
      return body[attr];
    });

    const sql = 'INSERT INTO offices (name, type) VALUES ($1, $2) RETURNING *';
    return query(sql, officeArray)
      .then((result) => {
        const savedOffice = new OfficeModel(result.rows[0]);
        return Promise.resolve(savedOffice);
      })
      .catch(e => Promise.reject(e));
  }

  static getAllOffices() {
    const sql = 'SELECT * FROM offices';
    return query(sql)
      .then((result) => {
        const offices = result.rows;
        return Promise.resolve(offices);
      })
      .catch(e => Promise.reject(e));
  }

  static getAnOffice(id) {
    const sql = 'SELECT * FROM offices WHERE id = $1';
    return query(sql, [id])
      .then((result) => {
        const foundOffice = new OfficeModel(result.rows[0]);
        return Promise.resolve(foundOffice);
      })
      .catch(e => Promise.reject(e));
  }
}

export default OfficeModel;
