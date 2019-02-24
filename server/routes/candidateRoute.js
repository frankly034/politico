import express from 'express';
import CandidateController from '../controllers/CandidateController';
import AdminMiddleware from '../middlewares/AdminMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

router.post('/office/:id/register', AdminMiddleware.isAdmin, UserMiddleware.checkId, CandidateController.createCandidate);
// router.post('/candidates', CandidateController.createCandidate);
router.get('/candidates', UserMiddleware.isUser, CandidateController.getAllCandidates);
router.get('/candidates/:id', UserMiddleware.isUser, CandidateController.getACandidate);
router.get('/candidates/:id/office', UserMiddleware.isUser, CandidateController.getAllCandidatesByOffice);

export default router;
