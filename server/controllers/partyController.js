import PartyModel from '../models/partyModel';

class PartyController {
  static createParty(req, res) {
    const { error } = req;
    if (error) {
      return res.status(error.status).send(error);
    }

    const { name, hqAddress, logoUrl } = req.body;
    const body = { name, hqAddress, logoUrl };
    const party = PartyModel.create(body);

    return res.status(200).send({ status: 200, data: party });
  }

  static listParty(req, res) {
    return res.send(PartyModel.findAll());
  }
}

export default PartyController;
