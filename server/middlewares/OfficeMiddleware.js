class OfficeMiddleware {
  static create(req, res, next) {
    const { name, type } = req.body;
    if (!name || !type) {
      const error = { msg: 'name and type attributes are required', status: 400 };
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

export default OfficeMiddleware;
