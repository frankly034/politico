import express from 'express';
import UserController from '../controllers/UserController';
import multerUploadMiddleware from '../middlewares/multer';

const router = express.Router();

router.post('/auth/signup', multerUploadMiddleware('passportUrl'), UserController.createUser);

export default router;
