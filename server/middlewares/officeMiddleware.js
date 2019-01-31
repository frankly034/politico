class OfficeMiddleware {
  static create(req, res, next) {
    const { name, type } = req.body;
    if (!name || !type) {
      const error = { msg: 'name and type attributes are required', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }

  static getAnOffice(req, res, next) {
    const { id } = req.params;
    if (typeof Number(id) !== 'number') {
      const error = { msg: 'Bad request', status: 400 };
      return res.status(400).send(error);
    }
    return next();
  }
}

export default OfficeMiddleware;
