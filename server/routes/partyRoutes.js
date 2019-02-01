import express from 'express';
import PartyController from '../controllers/partyController';
import PartyMiddleware from '../middlewares/partyMiddleware';

const router = express.Router();

router.post('/parties', PartyMiddleware.create, PartyController.createParty);
router.get('/parties/:id', PartyMiddleware.checkId, PartyController.getAParty);
router.get('/parties', PartyController.listParty);
router.delete('/parties/:id', PartyMiddleware.checkId, PartyController.deleteAParty);
router.patch('/parties/:id/name', PartyMiddleware.checkId, PartyController.editAParty);

export default router;
