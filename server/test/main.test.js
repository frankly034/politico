import chai from 'chai';
import request from 'supertest';

import app from '../server';
import UserModel from '../models/UserModel';
import TokenModel from '../models/TokenModel';
import PartyModel from '../models/PartyModel';
import OfficeModel from '../models/OfficeModel';

const { expect } = chai;
const apiUrl = '/api/v1';
let authToken;
let authUserToken;
let partyId, officeId, candidate, candidateId;

const testAdmin = {
  email: 'admin@example.com',
  firstname: 'john',
  lastname: 'doe',
  othername: 'dan',
  phoneNumber: '08164989843',
  password: '1234567',
  passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
  isAdmin: 'True',
};

const testUser = {
  email: 'user@example.com',
  firstname: 'john',
  lastname: 'doe',
  othername: 'dan',
  phoneNumber: '08164989843',
  password: '1234567',
  passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
  isAdmin: 'false',
};

// TokenModel.generateToken('auth', testAdmin)
//   .then((token) => {
//     authToken.push(token);
//   });

// TokenModel.generateToken('auth', testUser)
//   .then((token) => {
//     authToken.push(token);
//     console.log(authToken);
//   });

describe('POST /auth/signup', () => {
  it('create() should create an admin', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send(testAdmin)
      .expect(201)
      .expect((res) => {
        const { token, user } = res.body.data;
        authToken = token;
        expect(token).to.not.be.null;
        expect(user.id).to.not.be.null;
        expect(user.email).to.not.null;
        expect(user.isAdmin).to.be.a('boolean');
        expect(user.isAdmin).to.equal(true);
        expect(user.password).to.not.eq(testAdmin.password);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        UserModel.findByEmail(testAdmin.email)
          .then((userx) => {
            expect(userx.email).to.eq(testAdmin.email);
          })
          .catch(e => done(e));
        return done();
      });
  });

  it('create() should create a user', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send(testUser)
      .expect(201)
      .expect((res) => {
        const { token, user } = res.body.data;
        authUserToken = token;
        expect(token).to.not.be.null;
        expect(user.id).to.not.be.null;
        expect(user.email).to.not.null;
        expect(user.password).to.not.eq(testUser.password);
        expect(user.isAdmin).to.equal(false);
        candidate = user.id;
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        UserModel.findByEmail(testUser.email)
          .then((userx) => {
            expect(userx.email).to.eq(testUser.email);
          })
          .catch(e => done(e));
        return done();
      });
  });

  it('should not create a user if email already exist', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send(testUser)
      .expect(400)
      .end((err, response) => {
        expect(response.body.error).to.equal('Bad request: email already exist');
        done(err);
      });
  });

  it('should not create a user if firstname is not a string', (done) => {
    const invalidUser = { ...testUser };
    invalidUser.firstname = '123';

    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send(invalidUser)
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.equal('Unprocessable Entity: firstname is invalid, requires a valid string.');
        done(err);
      });
  });

  it('should reject missing email', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send({
        firstname: 'john',
        lastname: 'doe',
        othername: 'dan',
        phoneNumber: '08164989843',
        password: '1234567',
        passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
        isAdmin: false,
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should reject missing firstname', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send({
        email: 'john@gmail.com',
        lastname: 'doe',
        othername: 'dan',
        phoneNumber: '08164989843',
        password: '1234567',
        passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
        isAdmin: false,
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should reject missing lastname', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send({
        email: 'john@gmail.com',
        firstname: 'doe',
        othername: 'dan',
        phoneNumber: '08164989843',
        password: '1234567',
        passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
        isAdmin: false,
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should reject missing phoneNumber', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send({
        email: 'john@gmail.com',
        firstname: 'doe',
        othername: 'dan',
        lastname: 'john',
        password: '1234567',
        passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
        isAdmin: false,
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should reject invalid email', (done) => {
    request(app)
      .post(`${apiUrl}/auth/signup`)
      .send({
        email: 'john@com',
        phoneNumber: '08164989843',
        firstname: 'doe',
        othername: 'dan',
        lastname: 'john',
        password: '1234567',
        passportUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
        isAdmin: false,
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });
});

describe('POST /auth/signin', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post(`${apiUrl}/auth/login`)
      .send({ email: testUser.email, password: testUser.password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.be.null;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it('should return invalid login', (done) => {
    request(app)
      .post(`${apiUrl}/auth/login`)
      .send({ email: 'fakemail@example.com', password: testUser.password })
      .expect(404)
      .expect((res) => {
        expect(res.body.error).to.equal('User not found');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it('should not login user if email is missing', (done) => {
    request(app)
      .post(`${apiUrl}/auth/login`)
      .send({ password: testUser.password })
      .expect(422)
      .end((err, res) => {
        expect(res.body.error).to.contain('Unprocessable Entity: Missing email');
        done(err);
      });
  });

  it('should not login user if email is missing', (done) => {
    request(app)
      .post(`${apiUrl}/auth/login`)
      .send({ email: '  ', password: testUser.password })
      .expect(422)
      .end((err, res) => {
        expect(res.body.error).to.contain('Unprocessable Entity: Empty email');
        done(err);
      });
  });

  it('should not login user if email is invalid', (done) => {
    request(app)
      .post(`${apiUrl}/auth/login`)
      .send({ email: 'example', password: testUser.password })
      .expect(422)
      .end((err, res) => {
        expect(res.body.error).to.contain('Unprocessable Entity: email is invalid requires a valid email.');
        done(err);
      });
  });
});

// apiUrl = '/api/v1/parties';

describe('POST /parties', () => {
  const testParty = { name: 'APGA', hqAddress: 'Anambra', logoUrl: 'apga.png' };
  it('create() should create a new party', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .send(testParty)
      .set('x-auth', authToken)
      .expect(201)
      .end((err, res) => {
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.name).to.equal(testParty.name.toLowerCase().split(' ').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' '));
        expect(res.body.data.hqAddress).to.equal(testParty.hqAddress);
        expect(res.body.data.logoUrl).to.equal(testParty.logoUrl);
        done(err);
      });
  });

  it('should create a new party with name already existing', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .send(testParty)
      .set('x-auth', authToken)
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).to.equal('Bad request. Party already exists.');
        done(err);
      });
  });

  it('should return 401, unauthorised', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .send(testParty)
      .expect(401)
      .end((err, res) => { if (err) done(err); else done(); });
  });

  it('should not create party with empty string name', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .set('x-auth', authToken)
      .send({
        name: '   ',
        hqAddress: '235 Ikorodu Road, Ilupeju, Lagos.',
        logoUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should not create party with missing name', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .set('x-auth', authToken)
      .send({
        hqAddress: '235 Ikorodu Road, Ilupeju, Lagos.',
        logoUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should not create party with missing hqAddress', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .set('x-auth', authToken)
      .send({
        name: 'Party Andela',
        logoUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should not create party with missing logoUrl', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .set('x-auth', authToken)
      .send({
        hqAddress: '235 Ikorodu Road, Ilupeju, Lagos.',
        name: 'Andela Party',
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('Unprocessable Entity');
        done(err);
      });
  });

  it('should not create a party with incomplete data', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .set('x-auth', authToken)
      .send({
        logoUrl: 'https://res.cloudinary.com/du0tnsdty/image/upload/v1549476773/uay0mqdwnmegjuqlpv9n.jpg',
        hqAddress: '235',
        name: 'Andela Party',
      })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('is invalid');
        done(err);
      });
  });
});

describe('GET /parties/:id', () => {
  it('should return a specific party', (done) => {
    request(app)
      .get(`${apiUrl}/parties/1`)
      .set('x-auth', authToken)
      .expect(200)
      .expect((res) => {
        PartyModel.getAParty(1)
          .then((queryParty) => {
            const party = res.body.data;
            expect(party).to.deep.equal(queryParty);
          });
      })
      .end(done);
  });
  
  it('should return 400: bad request, non-number id', (done) => {
    request(app)
      .get(`${apiUrl}/parties/aa`)
      .set('x-auth', authToken)
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .get(`${apiUrl}/parties/10`)
      .set('x-auth', authToken)
      .expect(404)
      .end(done);
  });
});
  
describe('GET /parties', () => {
  it('should get all parties', (done) => {
    request(app)
      .get(`${apiUrl}/parties`)
      .set('x-auth', authToken)
      .expect(200)
      .expect((res) => {
        const body = res.body.data;
        PartyModel.findAll()
          .then(parties => expect(body.length).to.equal(parties.length))
      })
      .end(done);
  });
});

describe('PATCH /parties/:id/name', () => {
  const name = 'Party Andela';
  it('should edit a specific party name', (done) => {
    request(app)
      .patch(`${apiUrl}/parties/1/name`)
      .set('x-auth', authToken)
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
      .patch(`${apiUrl}/parties/aa/name`)
      .set('x-auth', authToken)
      .send({ name })
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .patch(`${apiUrl}/parties/10/name`)
      .set('x-auth', authToken)
      .send({ name })
      .expect(404)
      .end(done);
  });

  it('should not update a party if request name is missing', (done) => {
    request(app)
      .patch(`${apiUrl}/parties/10/name`)
      .set('x-auth', authToken)
      .send({})
      .expect(422)
      .end((err, res) => {
        expect(res.body.error).to.equal('Unprocessable Entity: Missing name, name is required');
        done(err);
      });
  });

  it('should not update a party if request name is empty', (done) => {
    request(app)
      .patch(`${apiUrl}/parties/10/name`)
      .set('x-auth', authToken)
      .send({ name: '  ' })
      .expect(422)
      .end((err, res) => {
        expect(res.body.error).to.equal('Unprocessable Entity: Empty name, name cannot be empty');
        done(err);
      });
  });
});

describe('DELETE /parties/:id', () => {

  it('should not delete a specific party if not an admin', (done) => {
    request(app)
      .delete(`${apiUrl}/parties/1`)
      .set('x-auth', authUserToken)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).to.equal('You do not have permission to carry out this action');
        done(err);
      });
  });

  it('should delete a specific party', (done) => {
    request(app)
      .delete(`${apiUrl}/parties/1`)
      .set('x-auth', authToken)
      .expect(200)
      .expect((res) => {
        const deleteStatus = res.body.data.message;
        expect(deleteStatus).to.equal('Successfully delete party with id 1');
      })
      .end(done);
  });

  it('should return 400: bad request, non-number id', (done) => {
    request(app)
      .delete(`${apiUrl}/parties/aa`)
      .set('x-auth', authToken)
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .delete(`${apiUrl}/parties/10`)
      .set('x-auth', authToken)
      .expect(404)
      .end(done);
  });
});

describe('POST /offices', () => {
  const testOffice = { name: 'senator', type: 'federal' };
  it('create() should create a new office', (done) => {
    request(app)
      .post(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .send(testOffice)
      .expect(201)
      .expect((res) => {
        const { id } = res.body.data;
        expect(id).to.not.be.null;
        officeId = id;
      })
      .end((err, res) => { if (err) done(err); else done(); });
  });

  it('should not create office if alread exist', (done) => {
    request(app)
      .post(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .send(testOffice)
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).to.contain('Office already exists');
        done(err);
      });
  })

  it('should not create a office with incomplete data', (done) => {
    request(app)
      .post(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .send({})
      .expect(422)
      .end((err, res) => { if (err) done(err); else done(); });
  });

  it('should not create office with empty string data', (done) => {
    request(app)
      .post(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .send({ name: '   ', type: ' ' })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('cannot be empty');
        done(err);
      });
  });

  it('should not create office with empty string data', (done) => {
    request(app)
      .post(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .send({ name: '039', type: '123' })
      .expect(422)
      .end((err, response) => {
        expect(response.body.error).to.contain('requires a valid string');
        done(err);
      });
  });
});

describe('GET /offices', () => {
  it('should get all offices', (done) => {
    request(app)
      .get(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .expect(200)
      .expect((res) => {
        const body = res.body.data;
        expect(body.length).to.equal(1);
      })
      .end(done);
  });
});

describe('GET /offices/:id', () => {
  it('should return a specific office', (done) => {
    request(app)
      .get(`${apiUrl}/offices/1`)
      .set('x-auth', authToken)
      .expect(200)
      .expect((res) => {
        OfficeModel.getAnOffice(1)
          .then((queryOffice) => {
            const office = res.body.data;
            expect(office).to.deep.equal(queryOffice);
          })
          .catch(e => done(e));
      })
      .end(done);
  });
  
  it('should return 400: bad request, non-number id', (done) => {
    request(app)
      .get(`${apiUrl}/offices/aa`)
      .set('x-auth', authToken)
      .expect(400)
      .end(done);
  });

  it('should return 404: resource not found', (done) => {
    request(app)
      .get(`${apiUrl}/offices/10`)
      .set('x-auth', authToken)
      .expect(404)
      .end(done);
  });
});

describe('POST office/:id/register', () => {
  const testParty = { name: 'APGA', hqAddress: 'Anambra', logoUrl: 'apga.png' };
  it('create() should create a new party', (done) => {
    request(app)
      .post(`${apiUrl}/parties`)
      .send(testParty)
      .set('x-auth', authToken)
      .expect(201)
      .end((err, res) => {
        expect(res.body.data.id).to.exist;
        expect(res.body.data.name).to.equal(testParty.name.toLowerCase().split(' ').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' '));
        expect(res.body.data.hqAddress).to.equal(testParty.hqAddress);
        expect(res.body.data.logoUrl).to.equal(testParty.logoUrl);
        partyId = res.body.data.id;
        done(err);
      });
  });

  it('create() should create a new office', (done) => {
    const testOffice = { name: 'governor', type: 'state' };
    request(app)
      .post(`${apiUrl}/offices`)
      .set('x-auth', authToken)
      .send(testOffice)
      .expect(201)
      .end((err, res) => {
        const { id } = res.body.data;
        expect(id).to.not.be.null;
        officeId = id;
        done(err);
      });
  });

  it('should create a new government office candidate', (done) => {
    request(app)
      .post(`${apiUrl}/office/${candidate}/register`)
      .set('x-auth', authToken)
      .send({ office: officeId, party: partyId })
      .expect(201)
      .end((err, response) => {
        const { data } = response.body;
        expect(data.candidate).to.equal(candidate);
        expect(data.party).to.equal(partyId);
        expect(data.office).to.equal(officeId);
        candidateId = data.id;
        done(err);
      });
  });

  it('should prevent double registration of candidates', (done) => {
    request(app)
      .post(`${apiUrl}/office/${candidate}/register`)
      .set('x-auth', authToken)
      .send({ office: officeId, party: partyId })
      .expect(400)
      .end((err, response) => {
        const { error } = response.body;
        expect(error).to.equal('Bad request: Candidate already registered.');
        done(err);
      });
  });

  it('should not create a new office if not authorised user', (done) => {
    request(app)
      .post(`${apiUrl}/office/1/register`)
      .set('x-auth', authUserToken)
      .send({ office: officeId, party: partyId })
      .expect(401)
      .end((err) => {
        done(err);
      });
  });

  it('should prevent registration of candidates invalid candidate', (done) => {
    request(app)
      .post(`${apiUrl}/office/djs/register`)
      .set('x-auth', authToken)
      .send({ office: officeId, party: partyId })
      .expect(400)
      .end((err, response) => {
        const { error } = response.body;
        expect(error).to.equal('Parameter must be an integer.');
        done(err);
      });
  });
});

describe('GET /candidates', () => {
  it('should get all candidates', (done) => {
    request(app)
      .get(`${apiUrl}/candidates`)
      .set('x-auth', authUserToken)
      .expect(200)
      .end((err, response) => {
        const { data } = response.body;
        expect(data).to.be.a('array');
        expect(data.length).to.equal(1);
        done(err);
      });
  });
  it('should prevent authorised user', (done) => {
    request(app)
      .get(`${apiUrl}/candidates`)
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});

describe('GET /candidates/:id', () => {
  it('should get a particular candidate', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/${candidateId}`)
      .set('x-auth', authUserToken)
      .expect(200)
      .end((err, response) => {
        const returnedCandidate = response.body.data;
        expect(returnedCandidate.id).to.equal(candidateId);
        done(err);
      });
  });
  it('should prevent authorised user with fake valid auth token', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/${candidateId}`)
      .set('x-auth', authUserToken.replace('B', 'A'))
      .expect(401)
      .end((err, response) => {
        expect(response.body.error).to.equal('You do not have permission to access this resource.');
        done(err);
      });
  });
  it('should prevent authorised user', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/${candidateId}`)
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('should return 404 if candidate not found', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/2`)
      .set('x-auth', authUserToken)
      .expect(404)
      .end((err, response) => {
        const { error } = response.body;
        expect(error).to.equal('Candidate not found.');
        done(err);
      });
  });
});

describe('GET /candidates/:id/office', () => {
  it('should get all candidates for a particular office', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/${officeId}/office`)
      .set('x-auth', authUserToken)
      .expect(200)
      .end((err, response) => {
        const candidates = response.body.data;
        expect(candidates).to.be.a('array');
        expect(candidates.length).to.equal(1);
        done(err);
      });
  });
  it('should prevent authorised user', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/${officeId}/office`)
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('should return 400 if paramter sent was not well formed', (done) => {
    request(app)
      .get(`${apiUrl}/candidates/aa/office`)
      .set('x-auth', authUserToken)
      .expect(400)
      .end((err, response) => {
        const { error } = response.body;
        expect(error).to.equal('Bad Request: invalid paramter.');
        done(err);
      });
  });
});

describe('POST /votes', () => {
  it('should vote a particular candidate', (done) => {
    request(app)
      .post(`${apiUrl}/votes`)
      .send({ office: officeId, candidate, createdBy: '2' })
      .set('x-auth', authUserToken)
      .expect(201)
      .end((err, response) => {
        const { data } = response.body;
        expect(data).to.be.a('object');
        expect(data.id).to.be.a('number');
        expect(data.id).to.equal(1);
        done(err);
      });
  });

  it('should not allow duplicate voting', (done) => {
    request(app)
      .post(`${apiUrl}/votes`)
      .send({ office: officeId, candidate, createdBy: '2' })
      .set('x-auth', authUserToken)
      .expect(400)
      .end((err, response) => {
        const { message } = response.body;
        expect(message).to.equal('Bad Request: duplicate vote');
        done(err);
      });
  });

  it('should not allow voting for an unknown candidate', (done) => {
    request(app)
      .post(`${apiUrl}/votes`)
      .send({ office: officeId, candidate: '10', createdBy: '1' })
      .set('x-auth', authUserToken)
      .expect(400)
      .end((err, response) => {
        const { message } = response.body;
        expect(message).to.equal('Bad Request: Invalid candidate');
        done(err);
      });
  });

  it('should not allow invalid request body', (done) => {
    request(app)
      .post(`${apiUrl}/votes`)
      .send({ office: officeId, candidate: 'a10', createdBy: 'a1' })
      .set('x-auth', authUserToken)
      .expect(422)
      .end((err, response) => {
        const { error } = response.body;
        expect(error).to.contain('requires a valid number');
        done(err);
      });
  });

  it('should not allow missing request body item', (done) => {
    request(app)
      .post(`${apiUrl}/votes`)
      .send({})
      .set('x-auth', authUserToken)
      .expect(422)
      .end((err, response) => {
        const { error } = response.body;
        expect(error).to.contain('is required');
        done(err);
      });
  });

  it('should not allow invalid request body', (done) => {
    request(app)
      .post(`${apiUrl}/votes`)
      .send({ office: '10a', candidate: 10, createdBy: '1s' })
      .set('x-auth', authUserToken)
      .expect(422)
      .end((err, response) => {
        const { message } = response.body;
        expect(message).to.equal('Unprocessable Entity: Invalid request body');
        done(err);
      });
  });
});

describe('POST /office/:id/result', () => {
  it('should return a list of results for the candidates of a particular office', (done) => {
    request(app)
      .post(`${apiUrl}/office/${officeId}/result`)
      .set('x-auth', authUserToken)
      .expect(200)
      .end((err, response) => {
        expect(response.body.data).to.be.a('array');
        done(err);
      });
  });

  it('should return a list of results for the candidates of a particular office', (done) => {
    request(app)
      .post(`${apiUrl}/office/${officeId}/result`)
      .set('x-auth', authUserToken)
      .expect(200)
      .end((err, response) => {
        expect(response.body.data).to.be.a('array');
        done(err);
      });
  });
})
