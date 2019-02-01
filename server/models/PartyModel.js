import parties from './partyData';

class PartyModel {
  constructor(party) {
    this.id = party.id;
    this.name = party.name;
    this.hqAddress = party.hqAddress;
    this.logoUrl = party.logoUrl;
  }

  static create(party) {
    const id = parties.length + 1;
    const newParty = new PartyModel({ id, ...party });
    parties.push(newParty);
    return newParty;
  }

  static getAParty(id) {
    const foundParty = parties.filter(party => party.id === parseInt(id, 10));
    return foundParty;
  }

  static findAll() {
    return parties;
  }

  static deleteAParty(id) {
    const returnedParties = parties.filter(party => party.id !== parseInt(id, 10));
    return returnedParties.length < parties.length ? 1 : 0;
  }

  static editAParty(id, name) {
    let party = PartyModel.getAParty(id);
    if (party.length !== 0) {
      PartyModel.findAll().forEach((item) => {
        if (item.id === parseInt(id, 10)) {
          item.name = name;
          party = item;
        }
      });
      return party;
    }
    return null;
  }
}

export default PartyModel;