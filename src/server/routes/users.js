import connectDB from '../db/connectDB';

async function getUsers() {
  const db = await connectDB();
  const collection = db.collection('users');
  return collection.find({}).toArray();
}

const usersRoute = (app) => {
  app.get('/users', async (request, response) => {
    const users = await getUsers();
    response.status(200).send({
      users,
    });
  });
};

export default usersRoute;
