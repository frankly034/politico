class PartyMiddleware {
  static create(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (!name || !hqAddress || !logoUrl) {
      req.error = { msg: 'name, hqAddress and logoUrl are required', status: 400 };
    }
    next();
  }
}

export default PartyMiddleware;
