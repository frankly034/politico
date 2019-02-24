import OfficeModel from '../models/OfficeModel';

class OfficeController {
  static createOffice(req, res) {
    const { name, type } = req.body;
    OfficeModel.create({ name, type })
      .then(createdOffice => res.status(201).send({ status: 201, data: createdOffice }))
      .catch((e) => {
        if (e.code === '23505') {
          return res.status(400).send({ status: 400, error: 'Bad request. Office already exists.' });
        }
        return res.status(400).send({ status: 406, error: 'Bad Request: Server could not understand the request.' });
      });
  }

  static getAllOffices(req, res) {
    OfficeModel.getAllOffices()
      .then(offices => res.status(200).send({ status: 200, data: offices }))
      .catch(() => res.status(400).send({ status: 400, error: 'Bad Request: Server could not understand the request.' }));
  }

  static getAnOffice(req, res) {
    const { id } = req.params;
    OfficeModel.getAnOffice(id)
      .then(returnedOffice => res.status(200).send({ status: 200, data: returnedOffice }))
      .catch(() => res.status(404).send({ status: 404, error: 'Office not found.' }));
  }
}

export default OfficeController;
