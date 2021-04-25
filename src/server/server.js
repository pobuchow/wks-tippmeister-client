import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authenticationRoute from './routes/authenticate/authenticate';
import betsRoute from './routes/bets/bets';
import gamesRoute from './routes/games/games';
import matchesRoute from './routes/matches/matches';
import usersRoute from './routes/users/users';

const app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

authenticationRoute(app);

betsRoute(app);

gamesRoute(app);

matchesRoute(app);

usersRoute(app);

export default app;
