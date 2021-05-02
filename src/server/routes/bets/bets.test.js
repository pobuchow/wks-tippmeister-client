import supertest from 'supertest';
import app from '../../server';
import connectDB from '../../db/connectDB';

const request = supertest(app);

jest.mock('../../db/connectDB');

const betToInsert = {
  match: '095887fc-c260-4c20-a901-45f23f641e85',
  owner: '1',
  game: '538e2071-f614-46f6-b49e-42e038ed90c8',
  id: '0e500e0f-829a-432d-8e49-b8480c65d5c5',
  goalsHomeTeam: 1,
  goalsAwayTeam: 2,
};
const mockInsertedBet = {
  ...betToInsert,
  _id: '608eda3db95ae921bc989d9f',
};
const existingBet = {
  ...mockInsertedBet,
};
const betToUpdate = {
  ...existingBet,
  goalsHomeTeam: 0,
  goalsAwayTeam: 0,
};
const mockUpdatedBet = {
  ...betToUpdate,
};
describe('bets route', () => {
  it('should insert a bet into collection', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(null),
        insertOne: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockReturnValueOnce(mockInsertedBet),
        })),
      })),
    }));

    const response = await request
      .post('/bets')
      .send({
        bet: betToInsert,
      }).expect(200);

    expect(response.body).toHaveProperty('bet');
    const insertedBet = response.body.bet;
    expect(insertedBet).toHaveProperty('_id');
    expect(insertedBet).toEqual(mockInsertedBet);
    done();
  });

  it('should update a bet in collection', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(existingBet),
        updateOne: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockReturnValueOnce(mockUpdatedBet),
        })),
      })),
    }));

    const response = await request
      .post('/bets')
      .send({
        bet: betToUpdate,
      }).expect(200);

    expect(response.body).toHaveProperty('bet');
    const updatedBet = response.body.bet;
    expect(updatedBet).toEqual(mockUpdatedBet);
    expect(updatedBet.id).toEqual(betToUpdate.id);
    expect(updatedBet.goalsHomeTeam).toEqual(betToUpdate.goalsHomeTeam);
    expect(updatedBet.goalsAwayTeam).toEqual(betToUpdate.goalsAwayTeam);
    expect(updatedBet.goalsHomeTeam).not.toEqual(existingBet.goalsHomeTeam);
    expect(updatedBet.goalsAwayTeam).not.toEqual(existingBet.goalsAwayTeam);
    done();
  });
});
