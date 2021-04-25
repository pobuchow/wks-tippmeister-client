import connectDB from '../../db/connectDB';

const upsertGame = async (game) => {
  const db = await connectDB();
  const collection = db.collection('games');
  const gameToUpdate = await collection.findOne({ id: game.id });
  if (gameToUpdate) {
    await collection.updateOne(
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
    );
  } else {
    await collection.insertOne(game);
  }
};

const gamesRoute = (app) => {
  app.post('/games', async (request, response) => {
    const { game } = request.body;
    await upsertGame(game);
    response.status(200).send();
  });
};

export default gamesRoute;
