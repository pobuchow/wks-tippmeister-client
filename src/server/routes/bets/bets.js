import connectDB from '../../db/connectDB';

const upsertBet = async (bet) => {
  const db = await connectDB();
  const collection = db.collection('bets');
  const betToUpdate = await collection.findOne({ id: bet.id });
  if (betToUpdate) {
    return collection.updateOne(
      { id: bet.id },
      {
        $set: {
          match: bet.match,
          owner: bet.owner,
          goalsHomeTeam: bet.goalsHomeTeam,
          goalsAwayTeam: bet.goalsAwayTeam,
          game: bet.game,
        },
      },
    ).then(({ ops }) => ops[0]);
  }
  return collection.insertOne(bet).then(({ ops }) => ops[0]);
};

const betsRoute = (app) => {
  app.post('/bets', async (request, response) => {
    const { bet } = request.body;
    const result = await upsertBet(bet);
    response.status(200).send({ bet: result });
  });
};

export default betsRoute;
