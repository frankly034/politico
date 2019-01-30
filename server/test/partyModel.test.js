import chai from 'chai';
import request from 'supertest';

import app from '../server';

import parties from '../models/partyData';

const { expect } = chai;
const apiStr = '/api/v1/parties';

describe('POST /parties', () => {
  it('create() should create a new party', (done) => {
    const party = { name: 'APGA', hqAddress: 'Anambra', logoUrl: 'apga.png' };

    request(app)
      .post(apiStr)
      .send(party)
      .expect(200)
      .expect(res => {
        const { name, logoUrl, hqAddress, id } = res.body.data;
        const returnedParty = { id, name, logoUrl, hqAddress };
        expect(returnedParty.id).to.eq(parties.length);
      })
      .end((err, res) => { if (err) done(err); else done(); });
  });

  it('should not create a party with incomplete data', (done) => {
    request(app)
      .post(apiStr)
      .send({})
      .expect(400)
      .end((err, res) => { if (err) done(err); else done(); });
  });
});
