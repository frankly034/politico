import TokenModel from '../models/TokenModel';

class UserMiddleware {
  static create(req, res, next) {
    let validationState = false;
    let field;
    const requiredFields = [
      { name: 'email', type: 'email' },
      { name: 'phoneNumber', type: 'phoneNumber' },
      { name: 'firstname', type: 'string' },
      { name: 'lastname', type: 'string' },
      { name: 'password', type: 'any' },
      { name: 'passportUrl', type: 'string' },
    ];

    for (let i = 0; i < requiredFields.length; i += 1) {
      field = requiredFields[i];
      if (!req.body[field.name]) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: Missing ${field.name}, ${field.name} is required`,
          status: 422,
        });
      }
      if (!req.body[field.name].trim()) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: Empty ${field.name}, ${field.name} cannot be empty`,
          status: 422,
        });
      }

      if (field.name === 'password' && req.body.password.trim().length < 6) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: ${field.name} must be longer than 6 characters`,
          status: 422,
        });
      }

      switch (field.type) {
        case 'phoneNumber':
          if (!UserMiddleware.validatePhone(req.body[field.name])) {
            validationState = true;
            return res.status(422).send({
              error: `Unprocessable Entity: ${field.name} is invalid, requires a valid phone number`,
              status: 422,
            });
          }
          break;
        case 'email':
          if (!UserMiddleware.validateEmail(req.body[field.name])) {
            validationState = true;
            return res.status(422).send({
              error: `Unprocessable Entity: ${field.name} is invalid requires a valid email.`,
              status: 422,
            });
          }
          break;
        case 'string':
          if (!UserMiddleware.validateString(req.body[field.name])) {
            validationState = true;
            return res.status(422).send({
              error: `Unprocessable Entity: ${field.name} is invalid, requires a valid string.`,
              status: 422,
            });
          }
          break;
        default: break;
      }
    }
    if (!validationState) {
      return next();
    }
  }

  static login(req, res, next) {
    let validationState = false;
    let field;
    const requiredFields = [
      { name: 'email', type: 'email' },
      { name: 'password', type: 'any' },
    ];

    for (let i = 0; i < requiredFields.length; i += 1) {
      field = requiredFields[i];
      if (!req.body[field.name]) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: Missing ${field.name}, ${field.name} is required`,
          status: 422,
        });
      }
      if (!req.body[field.name].trim()) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: Empty ${field.name}, ${field.name} cannot be empty`,
          status: 422,
        });
      }

      if (field.type === 'email') {
        if (!UserMiddleware.validateEmail(req.body[field.name])) {
          validationState = true;
          return res.status(422).send({
            error: `Unprocessable Entity: ${field.name} is invalid requires a valid email.`,
            status: 422,
          });
        }
      }
    }
    if (!validationState) {
      return next();
    }
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

  static isUser(req, res, next) {
    const token = req.header('x-auth');
    TokenModel.decodeToken(token)
      .then((user) => {
        if (user.id) {
          return next();
        }
        return res.status(401).send({ status: 401, error: 'You do not have permission to access this resource.' });
      })
      .catch(() => res.status(401).send({ status: 401, error: 'You do not have permission to access this resource.' }));
  }
}

export default UserMiddleware;
