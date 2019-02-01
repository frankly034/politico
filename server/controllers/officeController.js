import OfficeModel from '../models/officeModel';

class OfficeController {
  static createOffice(req, res) {
    const { error } = req;
    if (error) {
      return res.status(error.status).send(error);
    }

    const { name, type } = req.body;
    const body = { name, type };
    const office = OfficeModel.create(body);

    return res.status(200).send({ status: 200, data: office });
  }

  static getAllOffices(req, res) {
    const offices = OfficeModel.getAllOffices();
    return res.status(200).send({ status: 200, data: offices });
  }

  static getAnOffice(req, res) {
    const { id } = req.params;
    const office = OfficeModel.getAnOffice(id);
    if (office.length === 0) {
      return res.status(404).send({ status: 404, msg: 'Resource not found' });
    }
    return res.status(200).send({ status: 200, data: office.shift() });
  }
}

export default OfficeController;
