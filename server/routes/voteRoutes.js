import express from 'express';
import VoteController from '../controllers/VoteController';
import VoteMiddleware from '../middlewares/VoteMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

router.post('/votes', UserMiddleware.isUser, VoteMiddleware.vote, VoteController.vote);
router.post('/office/:id/result', UserMiddleware.checkId, UserMiddleware.isUser, VoteController.genResult);

export default router;
