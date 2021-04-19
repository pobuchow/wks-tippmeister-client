import connectDB from "../db/connectDB";

const upsertGame = async (game) => {
  let db = await connectDB();
  let collection = db.collection(`games`);
  let gameToUpdate = await collection.findOne({ id: game.id });
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
      }
    );
  } else {
    await collection.insertOne(game);
  }
};
export const gamesRoute = (app) => {
  app.post("/games", async (request, response) => {
    let game = request.body.game;
    await upsertGame(game);
    response.status(200).send();
  });
};
