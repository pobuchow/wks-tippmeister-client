import connectDB from '../../db/connectDB';

const upsertMatch = async (match) => {
  const db = await connectDB();
  const collection = db.collection('matches');
  const matchToUpdate = await collection.findOne({ id: match.id });
  if (matchToUpdate) {
    return collection.updateOne(
      { id: match.id },
      {
        $set: {
          event_datetime: match.event_datetime,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          goalsHomeTeam: match.goalsHomeTeam,
          goalsAwayTeam: match.goalsAwayTeam,
        },
      },
    ).then(({ ops }) => ops[0]);
  }
  return collection.insertOne(match).then(({ ops }) => ops[0]);
};

const matchesRoute = (app) => {
  app.post('/matches', async (request, response) => {
    const { match } = request.body;
    const result = await upsertMatch(match);
    response.status(200).send({ match: result });
  });
};

export default matchesRoute;
