import jwt from 'jsonwebtoken';
import query from './db/connector';

class TokenModel {
  constructor(token, access = '', user = '') {
    this.user = user;
    this.access = access;
    this.token = token;
    this.setSalt();
  }

  setSalt() {
    this.salt = 'p0l1t1c0';
  }

  getSalt() {
    return this.salt;
  }

  static generateToken(access, user) {
    const token = new TokenModel();
    const {
      id, email, isAdmin,
    } = user;
    return Promise.resolve(jwt.sign({
      id, email, isAdmin, access,
    }, token.getSalt()).toString());
  }

  static decodeToken(token) {
    const tokenObj = new TokenModel();
    let user;
    try {
      user = jwt.verify(token, tokenObj.getSalt());
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static saveToken(user, access) {
    return TokenModel.generateToken(access, user)
      .then((token) => {
        const saveToken = new TokenModel(token, access, user);
        return Promise.resolve(saveToken.save());
      })
      .catch(e => Promise.reject(e));
  }

  save() {
    const token = this;
    const tokenArray = [token.token, token.access, token.user.id];
    const sql = 'INSERT INTO tokens (token, access, user_id) VALUES ($1, $2, $3) RETURNING *';

    return query(sql, tokenArray)
      .then(result => Promise.resolve(result.rows[0]))
      .catch(e => Promise.reject(e));
  }
}

export default TokenModel;
