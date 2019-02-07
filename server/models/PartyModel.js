import query from './db/connector';

class PartyModel {
  constructor(party) {
    this.id = party.id;
    this.name = party.name;
    this.hqAddress = party.hqAddress;
    this.logoUrl = party.logoUrl;
  }

  static create(body) {
    const attributes = ['name', 'hqAddress', 'logoUrl'];

    const partyArray = attributes.map(attr => body[attr]);

    const sql = 'INSERT INTO parties (name, "hqAddress", "logoUrl") VALUES ($1, $2, $3) RETURNING *';
    return query(sql, partyArray)
      .then((result) => {
        const savedParty = new PartyModel(result.rows[0]);
        return Promise.resolve(savedParty);
      })
      .catch(e => Promise.reject(e));
  }

  static getAParty(id) {
    const sql = 'SELECT * FROM parties WHERE id = $1';
    return query(sql, [id])
      .then((result) => {
        const foundParty = new PartyModel(result.rows[0]);
        return Promise.resolve(foundParty);
      })
      .catch(e => Promise.reject(e));
  }

  static findAll() {
    const sql = 'SELECT * FROM parties';
    return query(sql)
      .then((result) => {
        const parties = result.rows;
        return Promise.resolve(parties);
      })
      .catch(e => Promise.reject(e));
  }

  static deleteAParty(id) {
    const sql = 'DELETE FROM parties where id = $1 CASCADE RETURNING *';
    return query(sql, [parseInt(id, 10)])
      .then((result) => {
        const party = result.rows[0];
        return Promise.resolve(party);
      })
      .catch(e => Promise.reject(e));
  }

  static editAParty(id, name) {
    const sql = 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *';
    return query(sql, [name, id])
      .then((result) => {
        const updatedParty = new PartyModel(result.rows[0]);
        return Promise.resolve(updatedParty);
      })
      .catch(e => Promise.reject(e));
  }
}

export default PartyModel;
