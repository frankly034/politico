import TokenModel from '../models/TokenModel';

class UserMiddleware {
  static create(req, res, next) {
    let error;
    const {
      email, phoneNumber, firstname, lastname, passportUrl, password,
    } = req.body;

    if (!email.trim() || !phoneNumber.trim() || !firstname.trim() || !lastname.trim() || !passportUrl.trim() || !password.trim()) {
      error = { error: 'Bad request: Missing field (email, phone, firstname, lastname, passport url and password are required)', status: 400 };
      return res.status(400).send(error);
    }
    
    if (!UserMiddleware.validateString(passportUrl)) {
      error = { error: 'Bad request: passport url must be a string', status: 400 };
      return res.status(400).send(error);
    }

    if (!UserMiddleware.validateString(firstname) || !UserMiddleware.validateString(lastname)) {
      error = { error: 'Bad request: Invalid name field types', status: 400 };
      return res.status(400).send(error);
    }

    if (!UserMiddleware.validateEmail(email) || !UserMiddleware.validatePhone(phoneNumber)) {
      error = { error: 'Bad request: Invalid field types (email or phone)', status: 400 };
      return res.status(400).send(error);
    }

    if ((password.trim()).length < 6) {
      error = { error: 'Bad request: Password must be longer than 6 characters', status: 400 };
      return res.status(400).send(error);
    }

    return next();
  }

  static login(req, res, next) {
    let error;

    if (!UserMiddleware.validateEmail(req.body.email)) {
      error = { error: 'Bad request: Invalid email field', status: 400 };
      return res.status(400).send(error);
    }
    
    if (!req.body.email.trim() || !req.body.password.trim()) {
      error = { error: 'Bad request: Missing field (email and password are required)', status: 400 };
      return res.status(400).send(error);
    }

    return next();
  }

  static validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  static validatePhone(phone) {
    return /0[7-9][0|1][0-9]{8}/.test(phone);
  }

  static validateString(str) {
    return !parseInt(str, 10);
  }

  static checkId(req, res, next) {
    const { id } = req.params;
    if (Number.isNaN(parseInt(id, 10))) {
      const error = { error: 'Parameter must be an integer.', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }

  static isAdmin(req, res, next) {
    const token = req.header('x-auth');
    TokenModel.decodeToken(token)
      .then((user) => {
        if (user.isAdmin) {
          return next();
        }
        return res.status(401).send({ status: 401, error: 'You do not have permission to access this.' });
      })
      .catch(() => res.status(401).send({ status: 401, error: 'You do not have permission to access this.' }));
  }

  static isUser(req, res, next) {
    const token = req.header('x-auth');
    TokenModel.decodeToken(token)
      .then((user) => {
        if (user.id) {
          return next();
        }
        return res.status(401).send({ status: 401, error: 'You do not have permission to access this.' });
      })
      .catch(() => res.status(401).send({ status: 401, error: 'You do not have permission to access this.' }));
  }
}

export default UserMiddleware;
