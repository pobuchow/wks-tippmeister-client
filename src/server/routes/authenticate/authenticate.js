import md5 from 'md5';
import connectDB from '../../db/connectDB';

const uuid = require('uuid').v4;

const authenticationTokens = [];

async function assembleUserState(user) {
  const db = await connectDB();
  const games = await db.collection('games').find({ users: { $in: [user.id] } }).toArray();
  const matches = await db.collection('matches').find({ id: { $in: games.flatMap((game) => game.matches) } }).toArray();
  const users = await db.collection('users').find({ id: { $in: games.flatMap((game) => game.users) } }).toArray();
  const bets = await db.collection('bets').find({ game: { $in: games.flatMap((game) => game.id) } }).toArray();
  return {
    games,
    matches,
    users,
    bets,
    session: {
      authenticated: 'AUTHENTICATED', id: user.id,
    },
  };
}

const authenticationRoute = (app) => {
  app.post('/authenticate', async (request, response) => {
    const { username, password } = request.body;
    const db = await connectDB();
    const collection = db.collection('users');
    const user = await collection.findOne({ name: username });

    if (!user) {
      return response.status(401).send('User not found');
    }

    const hash = md5(password);
    if (hash !== user.password) {
      return response.status(401).send('Password not correct');
    }

    const token = uuid();
    authenticationTokens.push({
      token,
      userId: user.id,
    });

    const state = await assembleUserState(user);

    return response.send({ token, state });
  });
};

export default authenticationRoute;
