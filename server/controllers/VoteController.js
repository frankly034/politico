import VoteModel from '../models/VoteModel';

class VoteController {
  static vote(req, res) {
    const { office, candidate, createdBy } = req.body;
    VoteModel.create(office, candidate, createdBy)
      .then(createdVote => res.status(201).send({ status: 201, data: createdVote }))
      .catch(e => res.status(400).send({ status: 400, message: `Bad request, you have already voted for this office. ${e.detail}` }));
  }

  static genResult(req, res) {
    const { id } = req.params;
    VoteModel.getGenResult(id)
      .then((data) => {
        res.status(200).send({ status: 200, data });
      })
      .catch((e) => {
        if (e.code > 23500) {
          return res.status(400).send({ status: 400, message: e.detail });
        }
        return res.status(500).send({ status: 500, message: 'Server error, please try again.' });
      });
  }
}

export default VoteController;
