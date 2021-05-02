import connectDB from '../../db/connectDB';

const upsertGame = async (game) => {
  const db = await connectDB();
  const collection = db.collection('games');
  const gameToUpdate = await collection.findOne({ id: game.id });
  if (gameToUpdate) {
    return collection.updateOne(
      { id: game.id },
      {
        $set: {
          name: game.name,
          users: game.users,
          matches: game.matches,
          hosts: game.hosts,
          isFinished: game.isFinished,
        },
      },
    ).then(({ ops }) => ops[0]);
  }
  return collection.insertOne(game).then(({ ops }) => ops[0]);
};

const gamesRoute = (app) => {
  app.post('/games', async (request, response) => {
    const { game } = request.body;
    const result = await upsertGame(game);
    response.status(200).send({ game: result });
  });
};

export default gamesRoute;
