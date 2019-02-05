import bcrypt from 'bcryptjs';

import TokenModel from './TokenModel';
import query from './db/connector';

class UserModel {
  constructor(user) {
    this.id = user.id || null;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.othername = user.othername;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber || user.phonenumber;
    this.passportUrl = user.passportUrl || user.passporturl;
    this.phonenumber = user.phoneNumber || user.phonenumber;
    this.passporturl = user.passportUrl || user.passporturl;
    this.password = user.password;
    this.isAdmin = user.isAdmin || user.isadmin;
  }

  setHashPassword() {
    const user = this;
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt)
        .then((hash) => {
          user.password = hash;
          return resolve(user);
        })
        .catch(() => reject()));
    });
  }

  // function needs the multer middleware to work properly
  static createUser(body) {
    const user = new UserModel(body);
    return user.setHashPassword()
      .then(() => Promise.resolve(user.save()))
      .then(returnedUser => TokenModel.saveToken(returnedUser, 'auth'))
      .then((savedToken) => {
        user.id = savedToken.user_id;
        const {
          id, firstname, lastname, othername, email, phonenumber, passporturl, isadmin,
        } = user;
        return Promise.resolve({
          id, firstname, lastname, othername, email, phonenumber, passporturl, isadmin,
        });
      })
      .catch((e) => {
        Promise.reject(new Error(e));
      });
  }

  save() {
    const user = this;

    const attributes = ['firstname', 'lastname', 'othername', 'email', 'phonenumber', 'passporturl', 'password', 'isadmin'];

    const userArray = attributes.map(attr => user[attr]);

    const sql = 'INSERT INTO users (firstname, lastname, othername, email, phonenumber, passporturl, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    return query(sql, userArray)
      .then((result) => {
        const savedUser = new UserModel(result.rows[0]);
        return Promise.resolve(savedUser);
      })
      .catch(e => Promise.reject(e));
  }
}

export default UserModel;
