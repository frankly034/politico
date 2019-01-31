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
}

export default OfficeModel;