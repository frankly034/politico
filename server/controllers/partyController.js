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

  static getAParty(req, res) {
    const { id } = req.params;
    const party = PartyModel.getAParty(id);
    if (party.length === 0) {
      return res.status(404).send({ status: 404, msg: 'Resource not found' });
    }
    return res.status(200).send({ status: 200, data: party.shift() });

  static listParty(req, res) {
    const parties = PartyModel.findAll();
    return res.status(200).send({ status: 200, data: parties });
  }
}

export default PartyController;
