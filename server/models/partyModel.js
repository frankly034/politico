import parties from './partyData';

class PartyModel {
  constructor(party) {
    this.id = party.id;
    this.name = party.name;
    this.hqAddress = party.hqAddress;
    this.logoUrl = party.logoUrl;
  }

  static create(party) {
    const newParty = new PartyModel(party);
    parties.push(newParty);
    return newParty;
  }
}

export default PartyModel;
