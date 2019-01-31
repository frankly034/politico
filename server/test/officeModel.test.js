import chai from 'chai';
import request from 'supertest';

import app from '../server';

import parties from '../models/officeData';

const { expect } = chai;
const apiStr = '/api/v1/offices';

describe('POST /offices', () => {
  it('create() should create a new office', (done) => {
    const office = { name: 'senator', type: 'federal' };

    request(app)
      .post(apiStr)
      .send(office)
      .expect(200)
      .expect(res => {
        const { name, type, id } = res.body.data;
        const returnedOffice = { id, name, type };
        expect(returnedOffice.id).to.eq(parties.length);
      })
      .end((err, res) => { if (err) done(err); else done(); });
  });

  it('should not create a office with incomplete data', (done) => {
    request(app)
      .post(apiStr)
      .send({})
      .expect(400)
      .end((err, res) => { if (err) done(err); else done(); });
  });
});
