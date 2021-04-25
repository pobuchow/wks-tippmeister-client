import supertest from 'supertest';
import app from '../../server';
import connectDB from '../../db/connectDB';
import initialState from '../../db/initialState';

jest.mock('../../db/connectDB');

connectDB.mockImplementation(() => ({
  collection: jest.fn().mockImplementation(() => ({
    find: jest.fn().mockImplementation(() => ({
      toArray: jest.fn().mockReturnValueOnce(initialState.users),
    })),
  })),
}));

const request = supertest(app);

describe('users route', () => {
  it('should get all users', async (done) => {
    const response = await request
      .get('/users')
      .expect(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body.users).toHaveLength(initialState.users.length);
    expect(response.body.users).toEqual(initialState.users);
    done();
  });
});
