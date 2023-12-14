const request = require('supertest');
const index = require('../index');

const app = index.app;
const closeServer = index.closeServer;

describe('Test wrong login password', () => {
  it('performs wrong pwd login and expects 400', async () => {
    const response = await request(app)
      .post('/user/signin')
      .send({
        email: 'rithvikramasani@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });
});

describe('Test Already Existing User', () => {
  it('returns an error if the user already exists', async () => {
    const response = await request(app)
      .post('/user/signup')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'Jane',
        lastName: 'Doe'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });
});

describe('Test Password Mismatch', () => {
  it('returns an error if passwords do not match', async () => {
    const response = await request(app)
      .post('/user/signup')
      .send({
        email: 'mismatch@example.com',
        password: 'password123',
        confirmPassword: 'mismatchedpassword',
        firstName: 'Mismatched',
        lastName: 'User'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Passwords don't match");
  });
});

afterAll(async () => {
  await closeServer();
});

