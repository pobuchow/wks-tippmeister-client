import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import initialState from '../../server/db/initialState';
import * as sagas from './sagas';
import * as mutations from './mutations/mutations';
import * as matchMutations from './mutations/matchMutations';
import * as gameMutations from './mutations/gameMutations';
import * as betMutations from './mutations/betMutations';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    session(userSession = initialState.session || {}, action) {
      const { type, authenticated } = action;
      switch (type) {
        case mutations.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, authenticated: mutations.AUTHENTICATING };
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, authenticated };
        case mutations.LOAD_STATE:
          return { ...userSession, id: action.state.session.id };
        default:
          return userSession;
      }
    },
    bets(bets = [], action) {
      switch (action.type) {
        case betMutations.BET_MATCH: {
          const resultBets = bets;
          const updatedBet = action.bet;
          const betToUpdateIndex = resultBets.findIndex(
            (bet) => bet.id === updatedBet.id,
          );
          if (betToUpdateIndex === -1) {
            return [...resultBets, updatedBet];
          }
          resultBets[betToUpdateIndex] = updatedBet;
          return [...resultBets];
        }
        case mutations.LOAD_STATE:
          return action.state.bets;
        default:
          return bets;
      }
    },
    matches(matches = [], action) {
      switch (action.type) {
        case matchMutations.ADD_MATCH:
          return [...matches, action.match];
        case matchMutations.UPDATE_MATCH: {
          const resultMatches = matches;
          const updatedMatch = action.match;
          const matchToUpdateIndex = resultMatches.findIndex(
            (match) => match.id === updatedMatch.id,
          );
          resultMatches[matchToUpdateIndex] = updatedMatch;
          return [...resultMatches];
        }
        case mutations.LOAD_STATE: {
          const load = action.state.matches;
          load.map((match) => {
            const resultMatch = match;
            resultMatch.event_datetime = new Date(match.event_datetime);
            return resultMatch;
          });
          return load;
        }
        default:
          return matches;
      }
    },
    games(games = [], action) {
      switch (action.type) {
        case gameMutations.CREATE_GAME:
          return [...games, action.game];
        case gameMutations.UPDATE_GAME: {
          const resultGames = games;
          const updatedGame = action.game;
          const gameToUpdateIndex = resultGames.findIndex(
            (game) => game.id === updatedGame.id,
          );
          resultGames[gameToUpdateIndex] = updatedGame;
          return [...resultGames];
        }
        case mutations.LOAD_STATE:
          return action.state.games;
        default:
          return games;
      }
    },
    users(users = [], action) {
      switch (action.type) {
        case mutations.LOAD_STATE:
          return action.state.users;
        default:
          return users;
      }
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware),
);

Object.keys(sagas).forEach((saga) => {
  sagaMiddleware.run(sagas[saga]);
});

export default store;
