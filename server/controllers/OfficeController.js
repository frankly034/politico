import OfficeModel from '../models/OfficeModel';

class OfficeController {
  static createOffice(req, res) {
    const { name, type } = req.body;
    OfficeModel.create({ name, type })
      .then(createdOffice => res.status(201).send({ status: 201, data: createdOffice }))
      .catch(() => res.status(500).send({ status: 500, error: 'Server error, please try again.' }));
  }

  static getAllOffices(req, res) {
    OfficeModel.getAllOffices()
      .then(offices => res.status(200).send({ status: 200, data: offices }))
      .catch(() => res.status(404).send({ status: 404, error: 'No offices found.' }));
  }

  static getAnOffice(req, res) {
    const { id } = req.params;
    OfficeModel.getAnOffice(id)
      .then(returnedOffice => res.status(200).send({ status: 200, data: returnedOffice }))
      .catch(() => res.status(404).send({ status: 404, error: 'Office not found.' }));
  }
}

export default OfficeController;
