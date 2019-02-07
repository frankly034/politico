import express from 'express';
import UserController from '../controllers/UserController';
// import multerUploadMiddleware from '../middlewares/multer';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

// router.post('/auth/signup', multerUploadMiddleware('passportUrl'), UserMiddleware.create, UserController.createUser);
router.post('/auth/signup', UserMiddleware.create, UserController.createUser);
router.post('/auth/login', UserMiddleware.login, UserController.loginUser);

export default router;
