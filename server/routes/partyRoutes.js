import express from 'express';
import PartyController from '../controllers/partyController';
import PartyMiddleware from '../middlewares/PartyMiddleware';

const router = express.Router();

router.post('/parties', PartyMiddleware.create, PartyController.createParty);
router.get('/parties/:id', PartyMiddleware.getAParty, PartyController.getAParty);

export default router;
