import connectDB from "../db/connectDB";

async function getUsers() {
  let db = await connectDB();
  let collection = db.collection(`users`);
  return await collection.find({}).toArray();
}
export const usersRoute = (app) => {
  app.get("/users", async (request, response) => {
    let users = await getUsers();
    response.status(200).send({
      users: users,
    });
  });
};
