import connectDB from "../db/connectDB";

const upsertMatch = async (match) => {
  let db = await connectDB();
  let collection = db.collection(`matches`);
  let matchToUpdate = await collection.findOne({ id: match.id });
  if (matchToUpdate) {
    await collection.updateOne(
      { id: match.id },
      {
        $set: {
          event_datetime: match.event_datetime,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          goalsHomeTeam: match.goalsHomeTeam,
          goalsAwayTeam: match.goalsAwayTeam,
        },
      }
    );
  } else {
    await collection.insertOne(match);
  }
};

export const matchesRoute = (app) => {
  app.post("/matches", async (request, response) => {
    let match = request.body.match;
    await upsertMatch(match);
    response.status(200).send();
  });
};
