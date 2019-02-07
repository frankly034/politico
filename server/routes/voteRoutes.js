import express from 'express';
import VoteController from '../controllers/VoteController';
// import OfficeMiddleware from '../middlewares/OfficeMiddleware';

const router = express.Router();

router.post('/votes', VoteController.vote);
router.post('/office/:id/result', VoteController.genResult);

export default router;
