import express from 'express';
import VoteController from '../controllers/VoteController';
// import OfficeMiddleware from '../middlewares/OfficeMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

router.post('/votes', UserMiddleware.isUser, VoteController.vote);
router.post('/office/:id/result', UserMiddleware.checkId, UserMiddleware.isUser, VoteController.genResult);

export default router;
