class PartyMiddleware {
  static validateString(str) {
    return !parseInt(str, 10);
  }

  static create(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    let error;
    if (!name || !hqAddress || !logoUrl) {
      error = { error: 'Bad request: Missing field (name, headquarters address and logo url are required)', status: 400 };
      return res.status(400).send(error);
    }

    if (!name.trim() || !hqAddress.trim() || !logoUrl.trim()) {
      error = { error: 'Bad request: Missing field (name, headquarters address and logo url are required)', status: 400 };
      return res.status(400).send(error);
    }

    if (!PartyMiddleware.validateString(name) || !PartyMiddleware.validateString(hqAddress)
    || !PartyMiddleware.validateString(logoUrl)) {
      error = { error: 'Bad request: name, headquarters address and logo url must be strings', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }

  static checkBody(req, res, next) {
    const { name } = req.body;
    let error;
    if (!name || !name.trim()) {
      error = { error: 'Bad request: Missing field name is required)', status: 400 };
      return res.status(400).send(error);
    }

    if (!PartyMiddleware.validateString(name)) {
      error = { error: 'Bad request: name must be strings', status: 400 };
      return res.status(400).send(error);
    }
    return next();
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
