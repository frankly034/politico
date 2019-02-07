import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyMiddleware from '../middlewares/PartyMiddleware';
import AdminMiddleware from '../middlewares/AdminMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

router.post('/parties', AdminMiddleware.isAdmin, PartyMiddleware.create, PartyController.createParty);
router.get('/parties/:id', UserMiddleware.isUser, PartyMiddleware.checkId, PartyController.getAParty);
router.get('/parties', UserMiddleware.isUser, PartyController.listParty);
router.delete('/parties/:id', AdminMiddleware.isAdmin, PartyMiddleware.checkId, PartyController.deleteAParty);
router.patch('/parties/:id/name', AdminMiddleware.isAdmin, PartyMiddleware.checkId, PartyMiddleware.checkBody, PartyController.editAParty);

export default router;
