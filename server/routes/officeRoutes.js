import express from 'express';
import OfficeController from '../controllers/officeController';
import OfficeMiddleware from '../middlewares/officeMiddleware';

const router = express.Router();

router.post('/offices', OfficeMiddleware.create, OfficeController.createOffice);

export default router;
