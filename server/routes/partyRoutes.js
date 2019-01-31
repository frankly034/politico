import express from 'express';
import PartyController from '../controllers/PartyController';
import PartyMiddleware from '../middlewares/PartyMiddleware';

const router = express.Router();

router.post('/parties', PartyMiddleware.create, PartyController.createParty);

export default router;
