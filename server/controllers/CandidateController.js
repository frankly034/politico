import CandidateModel from '../models/CandidateModel';

class CandidateController {
  static createCandidate(req, res) {
    const { office, party } = req.body;
    const candidate = req.params.id;
    CandidateModel.create(candidate, office, party)
      .then(createdCandidate => res.status(201).send({ status: 201, data: createdCandidate }))
      .catch((e) => {
        if (e.code > 23500) {
          return res.status(400).send({ status: 400, error: e.detail });
        }
        return res.status(417).send({ status: 417, error: `Excpectation failed. ${e}` });
      });
  }

  static getAllCandidates(req, res) {
    CandidateModel.getAllCandidates()
      .then(candidates => res.status(200).send({ status: 200, data: candidates }))
      .catch(() => res.status(417).send({ status: 417, error: 'No candidates found.' }));
  }

  static getACandidate(req, res) {
    const { id } = req.params;
    CandidateModel.getACandidate(id)
      .then(returnedCandidate => res.status(200).send({ status: 200, data: returnedCandidate }))
      .catch(() => res.status(404).send({ status: 404, error: 'Candidate not found.' }));
  }

  static getAllCandidatesByOffice(req, res) {
    const { id } = req.params;
    CandidateModel.getAllCandidatesByOffice(id)
      .then(candidates => res.status(200).send({ status: 200, data: candidates }))
      .catch(() => res.status(404).send({ status: 404, error: 'No candidates found for this office.' }));
  }
}

export default CandidateController;
