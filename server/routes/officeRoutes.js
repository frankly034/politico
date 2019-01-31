import express from 'express';
import OfficeController from '../controllers/officeController';
import OfficeMiddleware from '../middlewares/OfficeMiddleware';

const router = express.Router();

router.post('/offices', OfficeMiddleware.create, OfficeController.createOffice);
router.get('/offices', OfficeController.getAllOffices);
router.get('/offices/:id', OfficeMiddleware.getAnOffice, OfficeController.getAnOffice);

export default router;
