import TokenModel from '../models/TokenModel';

class UserMiddleware {
  static create(req, res, next) {
    let error;
    const {
      email, phoneNumber, firstname, lastname, othername,
    } = req.body;
    if (!UserMiddleware.validateEmail(email) || !UserMiddleware.validatePhone(phoneNumber)) {
      error = { msg: 'Invalid field types', status: 400 };
      return res.status(400).send(error);
    }
    if (!firstname || !lastname || !othername) {
      error = { msg: 'Invalid field types', status: 400 };
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

  static isAdmin(req, res, next) {
    const token = req.header('x-auth');
    TokenModel.decodeToken(token)
      .then((user) => {
        if (user.isAdmin) {
          return next();
        }
        return res.status(401).send({ status: 401, error: 'Unauthorised user' });
      })
      .catch(() => res.status(401).send({ status: 401, error: 'Unauthorised user' }));
  }
}

export default UserMiddleware;
