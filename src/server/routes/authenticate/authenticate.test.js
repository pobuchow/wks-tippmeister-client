import supertest from 'supertest';
import md5 from 'md5';
import app from '../../server';
import connectDB from '../../db/connectDB';
import initialState from '../../db/initialState';

const request = supertest(app);

jest.mock('../../db/connectDB');

describe('authenticate route', () => {
  it('should not authenticate when user not found', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(null),
      })),
    }));

    const response = await request
      .post('/authenticate')
      .send({ username: 'User ASD', password: 'blabla' }).expect(401);
    expect(response.text).toEqual('User not found');
    done();
  });
  it('should not authenticate when password not correct', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce({ username: 'User ASD', password: 'blabla123' }),
      })),
    }));

    const response = await request
      .post('/authenticate')
      .send({ username: 'User ASD', password: 'blabla' }).expect(401);
    expect(response.text).toEqual('Password not correct');
    done();
  });

  it('should authenticate user', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce({ id: '1', username: 'User ASD', password: md5('blabla123') }),
        find: jest.fn().mockImplementation(() => ({
          toArray: jest.fn()
            .mockReturnValueOnce(initialState.games)
            .mockReturnValueOnce(initialState.matches)
            .mockReturnValueOnce(initialState.users)
            .mockReturnValueOnce(initialState.bets),
        })),
      })),
    }));

    const response = await request
      .post('/authenticate')
      .send({ username: 'User ASD', password: 'blabla123' }).expect(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('state');
    const { state } = response.body;
    expect(state).toHaveProperty('games');
    expect(state).toHaveProperty('matches');
    expect(state).toHaveProperty('users');
    expect(state).toHaveProperty('bets');
    expect(state).toHaveProperty('session');
    expect(state.session.authenticated).toEqual('AUTHENTICATED');
    done();
  });
});
