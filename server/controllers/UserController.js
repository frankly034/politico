import { uploader } from 'cloudinary';
import UserModel from '../models/UserModel';
import cloudinaryConfig from '../config/cloudinaryConfig';
import fetchFormattedImage from '../config/datauriConfig';
import TokenModel from '../models/TokenModel';

class UserController {
  static createUser(req, res) {
    cloudinaryConfig();
    const { body } = req;

    const passport = fetchFormattedImage(req).content;

    uploader.upload(passport)
      .then(result => Promise.resolve(result.url))
      .then((url) => {
        body.passportUrl = url;
        return Promise.resolve(body);
      })
      .then(() => UserModel.createUser(body))
      .then(result => res.status(201)
        .send({
          status: 201,
          data: { token: result.token, user: result.user },
        }))
      .catch(() => res.status(500).send({ status: 500, error: 'Internal server error' }));
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    UserModel.loginUser(email, password)
      .then((user) => {
        TokenModel.saveToken(user, 'auth')
          .then(token => res.status(200)
            .header('x-auth', token.token)
            .send({
              status: 200,
              data: {
                token: token.token,
                user,
              },
            }));
      })
      .catch(() => res.status(404).send({
        status: 404,
        error: 'User not found',
      }));
  }
}

export default UserController;
