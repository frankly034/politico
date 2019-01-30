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
}

export default PartyModel;
