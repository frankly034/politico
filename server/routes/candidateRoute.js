import express from 'express';
import CandidateController from '../controllers/CandidateController';

const router = express.Router();

router.post('/office/:id/register', CandidateController.createCandidate);
// router.post('/candidates', CandidateController.createCandidate);
router.get('/candidates', CandidateController.getAllCandidates);
router.get('/candidates/:id', CandidateController.getACandidate);
router.get('/candidates/:id/office', CandidateController.getAllCandidatesByOffice);

export default router;
