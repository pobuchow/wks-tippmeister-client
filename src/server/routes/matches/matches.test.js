import supertest from 'supertest';
import app from '../../server';
import connectDB from '../../db/connectDB';

const request = supertest(app);

jest.mock('../../db/connectDB');

const matchToInsert = {
  id: 'bec989d0-d7ed-4544-85a0-73f3a76d79ef',
  event_datetime: '2021-05-02T15:38:20.089Z',
  homeTeam: 'qqq',
  awayTeam: 'aaa',
  goalsHomeTeam: null,
  goalsAwayTeam: null,
};
const mockInsertedMatch = {
  _id: 'bec989d073f3a76d79ef',
  ...matchToInsert,
};
const existingMatch = {
  ...mockInsertedMatch,
};
const matchToUpdate = {
  ...existingMatch,
  goalsHomeTeam: 2,
  goalsAwayTeam: 0,
};
const mockUpdatedMatch = {
  _id: 'bec989d073f3a76d79ef',
  ...matchToUpdate,
};

describe('matches route', () => {
  it('should insert a match into collection', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(null),
        insertOne: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockReturnValueOnce(mockInsertedMatch),
        })),
      })),
    }));

    const response = await request
      .post('/matches')
      .send({
        match: matchToInsert,
      }).expect(200);

    expect(response.body).toHaveProperty('match');
    const insertedMatch = response.body.match;
    expect(insertedMatch).toEqual(mockInsertedMatch);
    expect(insertedMatch.id).toEqual(matchToInsert.id);
    expect(insertedMatch.event_datetime).toEqual(matchToInsert.event_datetime);
    expect(insertedMatch.homeTeam).toEqual(matchToInsert.homeTeam);
    expect(insertedMatch.awayTeam).toEqual(matchToInsert.awayTeam);
    expect(insertedMatch.goalsHomeTeam).toEqual(matchToInsert.goalsHomeTeam);
    expect(insertedMatch.goalsAwayTeam).toEqual(matchToInsert.goalsAwayTeam);
    done();
  });

  it('should update a match in collection', async (done) => {
    connectDB.mockImplementation(() => ({
      collection: jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValueOnce(existingMatch),
        updateOne: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockReturnValueOnce(mockUpdatedMatch),
        })),
      })),
    }));

    const response = await request
      .post('/matches')
      .send({
        match: matchToUpdate,
      }).expect(200);

    expect(response.body).toHaveProperty('match');
    const updatedMatch = response.body.match;
    expect(updatedMatch).toEqual(mockUpdatedMatch);
    expect(updatedMatch.id).toEqual(matchToUpdate.id);
    expect(updatedMatch.event_datetime).toEqual(matchToUpdate.event_datetime);
    expect(updatedMatch.homeTeam).toEqual(matchToUpdate.homeTeam);
    expect(updatedMatch.awayTeam).toEqual(matchToUpdate.awayTeam);
    expect(updatedMatch.goalsHomeTeam).not.toEqual(existingMatch.goalsHomeTeam);
    expect(updatedMatch.goalsAwayTeam).not.toEqual(existingMatch.goalsAwayTeam);
    expect(updatedMatch.goalsHomeTeam).toEqual(matchToUpdate.goalsHomeTeam);
    expect(updatedMatch.goalsAwayTeam).toEqual(matchToUpdate.goalsAwayTeam);
    done();
  });
});
