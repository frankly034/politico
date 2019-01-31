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

describe('GET /offices/:id', () => {
  it('should return a specific office', (done) => {
    request(app)
      .get(`${apiUrl}/1`)
      .expect(200)
      .expect((res) => {
        const queryOffice = offices.filter(item => item.id === 1).shift();
        const office = res.body.data;
        expect(office).to.deep.equal(queryOffice);
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
