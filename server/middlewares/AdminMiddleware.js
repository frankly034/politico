import TokenModel from '../models/TokenModel';

class AdminMiddleware {
  static isAdmin(req, res, next) {
    const error = { error: 'You do not have permission to carry out this action', status: 401 };
    const token = req.header('x-auth');
    TokenModel.decodeToken(token)
      .then((user) => {
        if (!user || user.isAdmin !== true) {
          return res.status(401).send(error);
        }
        return next();
      })
      .catch(() => res.status(401).send(error));
  }
}

export default AdminMiddleware;
