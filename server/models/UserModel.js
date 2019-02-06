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
    this.phoneNumber = user.phoneNumber;
    this.passportUrl = user.passportUrl;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
  }

  setHashPassword() {
    const user = this;
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt)
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
          id, firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin,
        } = user;
        return Promise.resolve({
          token: savedToken.token,
          user: {
            id, firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin,
          },
        });
      })
      .catch((e) => {
        Promise.reject(new Error(e));
      });
  }

  save() {
    const user = this;

    if (user.isAdmin === 'TRUE' || user.isAdmin === 'true') {
      user.isAdmin = true;
    } else {
      user.isAdmin = false;
    }

    const attributes = ['firstname', 'lastname', 'othername', 'email', 'phoneNumber', 'passportUrl', 'password', 'isAdmin'];

    const userArray = attributes.map(attr => user[attr]);

    const sql = 'INSERT INTO users (firstname, lastname, othername, email, "phoneNumber", "passportUrl", password, "isAdmin") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    return query(sql, userArray)
      .then((result) => {
        const savedUser = new UserModel(result.rows[0]);
        return Promise.resolve(savedUser);
      })
      .catch(e => Promise.reject(e));
  }

  static findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return query(sql, [email])
      .then((result) => {
        const foundUser = new UserModel(result.rows[0]);
        return Promise.resolve(foundUser);
      })
      .catch(e => Promise.reject(e));
  }

  static loginUser(email, password) {
    return UserModel.findByEmail(email)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        }
        return bcrypt.compare(password, user.password)
          .then((res) => {
            if (res) {
              return Promise.resolve(user);
            }
            return Promise.reject();
          });
      });
  }
}

export default UserModel;
