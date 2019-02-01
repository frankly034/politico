import offices from './officeData';

class OfficeModel {
  constructor(office) {
    this.id = office.id;
    this.name = office.name;
    this.type = office.type;
  }

  static create(office) {
    const id = offices.length + 1;
    const newOffice = new OfficeModel({ id, ...office });
    offices.push(newOffice);
    return newOffice;
  }

  static getAllOffices() {
    return offices;
  }

  static getAnOffice(id) {
    const foundOffice = offices.filter(office => office.id === parseInt(id, 10));
    return foundOffice;
  }
}

export default OfficeModel;
