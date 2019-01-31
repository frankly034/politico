import chai from 'chai';
import request from 'supertest';

import app from '../server';

import parties from '../models/partyData';

const { expect } = chai;
const apiUrl = '/api/v1/parties';

describe('POST /parties', () => {
  it('create() should create a new party', (done) => {
    const party = { name: 'APGA', hqAddress: 'Anambra', logoUrl: 'apga.png' };

    request(app)
      .post(apiUrl)
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
      .post(apiUrl)
      .send({})
      .expect(400)
      .end((err, res) => { if (err) done(err); else done(); });
  });
});

describe('GET /parties/:id', () => {
  it('should return a specific party', (done) => {
    request(app)
      .get(`${apiUrl}/1`)
      .expect(200)
      .expect((res) => {
        const queryParty = parties.filter(item => item.id === 1).shift();
        const party = res.body.data;
        console.log(queryParty, party);
        expect(party).to.deep.equal(queryParty);
      })
      .end(done);
  });
  
  it('should return 400: bad request, non-number id', (done) => {
    request(app)
      .get(`${apiUrl}/aa`)
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .get(`${apiUrl}/10`)
      .expect(404)
      .end(done);
  });
});
