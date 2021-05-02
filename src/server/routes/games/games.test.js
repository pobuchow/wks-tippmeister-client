import supertest from 'supertest';
import app from '../../server';
import connectDB from '../../db/connectDB';

const request = supertest(app);

jest.mock('../../db/connectDB');

const gamesToInsert = {
  id: '538e2071-f614-46f6-b49e-42e038ed90c8',
  name: 'newGame',
  users: ['1'],
  matches: [],
  hosts: ['1'],
  isFinished: false,
};
const mockInsertedGame = {
  ...gamesToInsert,
  _id: '608eda3db95ae921bc989d9f',
};
const existingGame = {
  ...mockInsertedGame,
};
const gameToUpdate = {
  ...existingGame,
  matches: ['1'],
};
const mockUpdatedGame = {
  ...gameToUpdate,
};
describe('games route', () => {
  it('should insert a games into collection', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(null),
        insertOne: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockReturnValueOnce(mockInsertedGame),
        })),
      })),
    }));

    const response = await request
      .post('/games')
      .send({
        game: gamesToInsert,
      }).expect(200);

    expect(response.body).toHaveProperty('game');
    const insertedGame = response.body.game;
    expect(insertedGame).toHaveProperty('_id');
    expect(insertedGame).toEqual(mockInsertedGame);
    done();
  });

  it('should update a game in collection', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(existingGame),
        updateOne: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockReturnValueOnce(mockUpdatedGame),
        })),
      })),
    }));

    const response = await request
      .post('/games')
      .send({
        game: gameToUpdate,
      }).expect(200);

    expect(response.body).toHaveProperty('game');
    const updatedGame = response.body.game;
    expect(updatedGame).toEqual(mockUpdatedGame);
    expect(updatedGame.id).toEqual(gameToUpdate.id);
    expect(updatedGame.matches).toEqual(gameToUpdate.matches);
    done();
  });
});
