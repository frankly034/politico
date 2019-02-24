class PartyMiddleware {
  static validateString(str) {
    return !parseInt(str, 10);
  }

  static create(req, res, next) {
    let validationState = false;
    let field;
    const requiredFields = [
      { name: 'name', type: 'string' },
      { name: 'hqAddress', type: 'string' },
      { name: 'logoUrl', type: 'string' },
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

      if (!PartyMiddleware.validateString(req.body[field.name])) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: ${field.name} is invalid, requires a valid string.`,
          status: 422,
        });
      }
    }
    if (!validationState) {
      return next();
    }
  }

  static checkBody(req, res, next) {
    let validationState = true;
    const { name } = req.body;
    if (!name) {
      validationState = false;
      return res.status(422).send({
        error: 'Unprocessable Entity: Missing name, name is required',
        status: 422,
      });
    }
    if (!name.trim()) {
      validationState = false;
      return res.status(422).send({
        error: 'Unprocessable Entity: Empty name, name cannot be empty',
        status: 422,
      });
    }
    if (validationState) {
      return next();
    }
  }

  static checkId(req, res, next) {
    const { id } = req.params;
    if (Number.isNaN(parseInt(id, 10))) {
      const error = { error: 'Parameter must be an integer.', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }
}

export default PartyMiddleware;
