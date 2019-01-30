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
}

export default OfficeController;
