import PartyModel from '../models/PartyModel';

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
    const parties = PartyModel.findAll();
    return res.status(200).send({ status: 200, data: parties });
  }
}

export default PartyController;
