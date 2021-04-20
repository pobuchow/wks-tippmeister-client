import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authenticationRoute from './routes/authenticate';
import betsRoute from './routes/bets';
import gamesRoute from './routes/games';
import matchesRoute from './routes/matches';
import usersRoute from './routes/users';

const port = 8080;
const app = express();

app.listen(port);

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

authenticationRoute(app);

betsRoute(app);

gamesRoute(app);

matchesRoute(app);

usersRoute(app);
