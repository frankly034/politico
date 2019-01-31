class PartyMiddleware {
  static create(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (!name || !hqAddress || !logoUrl) {
      const error = { msg: 'name, hqAddress and logoUrl are required', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }
}

export default PartyMiddleware;
