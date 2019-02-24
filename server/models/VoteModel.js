import query from './db/connector';

class VoteModel {
  constructor(vote) {
    this.id = vote.id;
    this.office = vote.office;
    this.voter = vote.user;
    this.candidate = vote.candidate;
  }

  static create(office, candidate, createdBy) {
    const sql = 'INSERT INTO votes (office, candidate, "createdBy") VALUES ($1, $2, $3) RETURNING *';
    return query(sql, [office, candidate, createdBy])
      .then((result) => {
        const savedVote = new VoteModel(result.rows[0]);
        return Promise.resolve(savedVote);
      })
      .catch(e => Promise.reject(e));
  }

  static getGenResult(office) {
    const sql = 'SELECT office, candidate, COUNT(candidate) FROM votes WHERE office = $1 GROUP BY candidate, office'; 
    return query(sql, [office])
      .then((result) => {
        return Promise.resolve(result.rows);
      })
      .catch(e => Promise.reject(e));
  }
}

export default VoteModel;
