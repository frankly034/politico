class PartyMiddleware {
  static create(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (!name || !hqAddress || !logoUrl) {
      const error = { msg: 'name, hqAddress and logoUrl are required', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }

  static getAParty(req, res, next) {
    const { id } = req.params;
    if (Number.isNaN(parseInt(id, 10))) {
      const error = { msg: 'Bad request', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }

  static deleteAParty(req, res, next) {
    const { id } = req.params;
    if (Number.isNaN(parseInt(id, 10))) {
      const error = { msg: 'Bad request', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }
}

export default PartyMiddleware;
