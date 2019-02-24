import VoteModel from '../models/VoteModel';

class VoteController {
  static vote(req, res) {
    const { office, candidate, createdBy } = req.body;
    VoteModel.create(office, candidate, createdBy)
      .then(createdVote => res.status(201).send({ status: 201, data: createdVote }))
      .catch((e) => {
        switch (e.code) {
          case '23503':
            return res.status(400).send({ status: 400, message: 'Bad Request: Invalid candidate' });
          case '23505':
            return res.status(400).send({ status: 400, message: 'Bad Request: duplicate vote' });
          default: break;
        }
        return res.status(422).send({ status: 422, message: 'Unprocessable Entity: Invalid request body' });
      });
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
