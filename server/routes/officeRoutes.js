import express from 'express';
import OfficeController from '../controllers/OfficeController';
import OfficeMiddleware from '../middlewares/OfficeMiddleware';

const router = express.Router();

router.post('/offices', OfficeMiddleware.create, OfficeController.createOffice);
router.get('/offices', OfficeController.getAllOffices);

export default router;
