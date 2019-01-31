class OfficeMiddleware {
  static create(req, res, next) {
    const { name, type } = req.body;
    if (!name || !type) {
      req.error = { msg: 'name and type attributes are required', status: 400 };
    }
    next();
  }
}

export default OfficeMiddleware;
