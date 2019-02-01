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

  static getAParty(req, res) {
    const { id } = req.params;
    const party = PartyModel.getAParty(id);
    if (party.length === 0) {
      return res.status(404).send({ status: 404, msg: 'Resource not found' });
    }
    return res.status(200).send({ status: 200, data: party.shift() });
  }

  static listParty(req, res) {
    const parties = PartyModel.findAll();
    return res.status(200).send({ status: 200, data: parties });
  }

  static deleteAParty(req, res) {
    const { id } = req.params;
    const deleteStatus = PartyModel.deleteAParty(id);
    if (deleteStatus === 0) {
      return res.status(404).send({ status: 404, msg: 'Resource not found' });
    }
    return res.status(200).send({ status: 200, data: [{ message: 'Party successfully deleted' }] });
  }

  static editAParty(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const editedParty = PartyModel.editAParty(id, name);
    if (editedParty === null) {
      return res.status(404).send({ status: 404, msg: 'Resource not found' });
    }
    return res.status(200).send({ status: 200, data: editedParty });
  }
}

export default PartyController;
