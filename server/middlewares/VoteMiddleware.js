class VoteMiddleware {
  static vote(req, res, next) {
    let validationState = false;
    let field;
    const requiredFields = [
      { name: 'office', type: 'number' },
      { name: 'candidate', type: 'number' },
      { name: 'createdBy', type: 'number' },
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

      if (!VoteMiddleware.validateNumber(req.body[field.name])) {
        validationState = true;
        return res.status(422).send({
          error: `Unprocessable Entity: ${field.name} is invalid, requires a valid number.`,
          status: 422,
        });
      }
    }
    if (!validationState) {
      return next();
    }
  }

  static validateNumber(str) {
    return parseInt(str, 10);
  }
}

export default VoteMiddleware;
