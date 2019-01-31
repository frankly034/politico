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
  
describe('GET /parties', () => {
  it('should get all parties', (done) => {
    request(app)
      .get(apiUrl)
      .expect(200)
      .expect((res) => {
        const body = res.body.data;
        expect(body.length).to.equal(parties.length);
      })
      .end(done);
  });
});

describe('DELETE /parties/:id', () => {
  it('should delete a specific party', (done) => {
    request(app)
      .delete(`${apiUrl}/1`)
      .expect(200)
      .expect((res) => {
        const deleteStatus = res.body.data[0].message;
        expect(deleteStatus).to.have.string('success');
      })
      .end(done);
  });

  it('should return 400: bad request, non-number id', (done) => {
    request(app)
      .delete(`${apiUrl}/aa`)
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .delete(`${apiUrl}/10`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /parties/:id/name', () => {
  const name = 'Party Andela';
  it('should edit a specific party name', (done) => {
    request(app)
      .patch(`${apiUrl}/1/name`)
      .send({ name })
      .expect(200)
      .expect((res) => {
        const editedParty = res.body.data;
        expect(editedParty.name).to.equal(name);
      })
      .end(done);
  });

  it('should return 400: bad request, non-number id', (done) => {
    request(app)
      .patch(`${apiUrl}/aa/name`)
      .send(name)
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .patch(`${apiUrl}/10/name`)
      .send(name)
      .expect(404)
      .end(done);
  });
});
