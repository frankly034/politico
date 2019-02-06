import query from './db/connector';

class CandidateModel {
  constructor(candidate) {
    this.id = candidate.id;
    this.candidate = candidate.candidate;
    this.office = candidate.office;
    this.party = candidate.party;
  }

  static create(body) {
    const { candidate, office, party } = body;

    const sql = 'INSERT INTO candidates (candidate, office, party) VALUES ($1, $2, $3) RETURNING *';
    return query(sql, [candidate, office, party])
      .then((result) => {
        const savedCandidate = new CandidateModel(result.rows[0]);
        return Promise.resolve(savedCandidate);
      })
      .catch(e => Promise.reject(e));
  }

  static getAllCandidates() {
    const sql = 'SELECT * FROM candidates';
    return query(sql)
      .then((result) => {
        const candidates = result.rows;
        return Promise.resolve(candidates);
      })
      .catch(e => Promise.reject(e));
  }

  static getACandidate(id) {
    const sql = 'SELECT * FROM candidates WHERE id = $1';
    return query(sql, [id])
      .then((result) => {
        const foundCandidate = new CandidateModel(result.rows[0]);
        return Promise.resolve(foundCandidate);
      })
      .catch(e => Promise.reject(e));
  }

  static getAllCandidatesByOffice(id) {
    const sql = 'SELECT * FROM candidates WHERE office = $1';
    return query(sql, [id])
      .then((result) => {
        const candidates = result.rows;
        return Promise.resolve(candidates);
      })
      .catch(e => Promise.reject(e));
  }
}

export default CandidateModel;
