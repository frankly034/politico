import express from 'express';
import OfficeController from '../controllers/OfficeController';
import OfficeMiddleware from '../middlewares/OfficeMiddleware';
import AdminMiddleware from '../middlewares/AdminMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

router.post('/offices', AdminMiddleware.isAdmin, OfficeMiddleware.create, OfficeController.createOffice);
router.get('/offices', UserMiddleware.isUser, OfficeController.getAllOffices);
router.get('/offices/:id', UserMiddleware.isUser, OfficeMiddleware.checkId, OfficeController.getAnOffice);

export default router;
