import chai from 'chai';
import request from 'supertest';

import app from '../server';

import offices from '../models/officeData';

const { expect } = chai;
const apiUrl = '/api/v1/offices';

describe('POST /offices', () => {
  it('create() should create a new office', (done) => {
    const office = { name: 'senator', type: 'federal' };

    request(app)
      .post(apiUrl)
      .send(office)
      .expect(200)
      .expect(res => {
        const { name, type, id } = res.body.data;
        const returnedOffice = { id, name, type };
        expect(returnedOffice.id).to.eq(offices.length);
      })
      .end((err, res) => { if (err) done(err); else done(); });
  });

  it('should not create a office with incomplete data', (done) => {
    request(app)
      .post(apiUrl)
      .send({})
      .expect(400)
      .end((err, res) => { if (err) done(err); else done(); });
  });
});

describe('GET /offices', () => {
  it('should get all offices', (done) => {
    request(app)
      .get(apiUrl)
      .expect(200)
      .expect((res) => {
        const body = res.body.data;
        expect(body.length).to.equal(offices.length);
      })
      .end(done);
  });
});
