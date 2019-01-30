import express from 'express';
import PartyController from '../controllers/partyController';
import PartyMiddleware from '../middlewares/partyMiddleware';

const router = express.Router();

router.post('/parties', PartyMiddleware.create, PartyController.createParty);
router.get('/parties', PartyController.listParty);

export default router;
