import express from 'express';
import PartyController from '../controllers/partyController';
import PartyMiddleware from '../middlewares/partyMiddleware';

const router = express.Router();

const apiUrl = '/api/v1/parties';

router.post(apiUrl, PartyMiddleware.create, PartyController.createParty);

export default router;
