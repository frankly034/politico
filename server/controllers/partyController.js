import PartyModel from '../models/partyModel';

class PartyController {
  static createParty(req, res) {
    if (req.error) {
      return res.status(req.error.status).send({ status: req.error.status, error: req.error.msg });
    }

    const { name, hqAddress, logoUrl } = req.body;
    const body = { name, hqAddress, logoUrl };
    const party = PartyModel.create(body);

    return res.status(200).send({ status: 200, data: party });
  }
}

export default PartyController;
