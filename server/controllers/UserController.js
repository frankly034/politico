import { uploader } from 'cloudinary';
import UserModel from '../models/UserModel';
import cloudinaryConfig from '../config/cloudinaryConfig';
import fetchFormattedImage from '../config/datauriConfig';

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
      .then(result => res.status(201).send({ status: 201, token: result.token, data: result.user }))
      .catch(() => res.status(500).send({ status: 500, message: 'Internal server error.' }));
  }
}

export default UserController;
