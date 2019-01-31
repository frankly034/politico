import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyMiddleware from '../middlewares/PartyMiddleware';

const router = express.Router();

router.post('/parties', PartyMiddleware.create, PartyController.createParty);
router.get('/parties/:id', PartyMiddleware.getAParty, PartyController.getAParty);
router.get('/parties', PartyController.listParty);

export default router;
