import connectDB from "../db/connectDB";

const upsertBet = async (bet) => {
  let db = await connectDB();
  let collection = db.collection(`bets`);
  let betToUpdate = await collection.findOne({ id: bet.id });
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
      }
    );
  } else {
    await collection.insertOne(bet);
  }
};

export const betsRoute = (app) => {
  app.post("/bets", async (request, response) => {
    let bet = request.body.bet;
    await upsertBet(bet);
    response.status(200).send();
  });
};
