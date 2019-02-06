import PartyModel from '../models/PartyModel';

class PartyController {
  static createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const body = { name, hqAddress, logoUrl };
    PartyModel.create(body)
      .then(createdParty => res.status(201).send({ status: 201, data: createdParty }))
      .catch(() => res.status(500).send({ status: 500, error: 'Server error, please try again.' }));
  }

  static getAParty(req, res) {
    const { id } = req.params;
    PartyModel.getAParty(id)
      .then(returnedParty => res.status(200).send({ status: 200, data: returnedParty }))
      .catch(() => res.status(404).send({ status: 404, error: 'Party not found.' }));
  }

  static listParty(req, res) {
    PartyModel.findAll()
      .then(parties => res.status(200).send({ status: 200, data: parties }))
      .catch(() => res.status(404).send({ status: 404, error: 'No parties found.' }));
  }

  static deleteAParty(req, res) {
    const { id } = req.params;
    PartyModel.deleteAParty(id)
      .then(party => res.status(200).send({ status: 200, error: `Successfully delete party with id ${party.id}` }))
      .catch(() => res.status(404).send({ status: 404, error: 'No party found.' }));
  }

  static editAParty(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    PartyModel.editAParty(id, name)
      .then(updatedParty => res.status(200).send({ status: 200, data: updatedParty }))
      .catch(() => res.status(404).send({ status: 404, message: 'No party match found.' }));
  }
}

export default PartyController;
