import connectDB from '../../db/connectDB';

const upsertBet = async (bet) => {
  const db = await connectDB();
  const collection = db.collection('bets');
  const betToUpdate = await collection.findOne({ id: bet.id });
  if (betToUpdate) {
    await collection.updateOne(
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
    );
  } else {
    await collection.insertOne(bet);
  }
};

const betsRoute = (app) => {
  app.post('/bets', async (request, response) => {
    const { bet } = request.body;
    await upsertBet(bet);
    response.status(200).send();
  });
};

export default betsRoute;
