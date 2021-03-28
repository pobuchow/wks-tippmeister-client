import { createStore, applyMiddleware, combineReducers } from "redux";
import initialState from "../../server/db/initialState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import * as sagas from "./sagas";
import * as mutations from "./mutations/mutations";
import * as matchMutations from "./mutations/matchMutations";
import * as gameMutations from "./mutations/gameMutations";
import * as betMutations from "./mutations/betMutations";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = initialState.session || {}, action) {
      let { type, authenticated } = action;
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
        case betMutations.BET_MATCH:
          const updatedBet = action.bet;
          let betToUpdateIndex = bets.findIndex(
            (bet) => bet.id == updatedBet.id
          );
          if(betToUpdateIndex === -1){
            return [...bets, updatedBet]
          }else{
            bets[betToUpdateIndex] = updatedBet;
            return [...bets];
          }
        case mutations.LOAD_STATE:
          return action.state.bets;
      }
      return bets;
    },
    matches(matches = [], action) {
      switch (action.type) {
        case matchMutations.ADD_MATCH:
          return [...matches, action.match];
        case matchMutations.UPDATE_MATCH:
          const updatedMatch = action.match;
          let matchToUpdateIndex = matches.findIndex(
            (match) => match.id == updatedMatch.id
          );
          matches[matchToUpdateIndex] = updatedMatch;
          return [...matches];
        case mutations.LOAD_STATE:
          let load = action.state.matches;
          load.forEach((match) => {
            match.event_datetime = new Date(match.event_datetime);
          });
          return load;
      }
      return matches;
    },
    games(games = [], action) {
      switch (action.type) {
        case gameMutations.CREATE_GAME:
          return [...games, action.game];
        case gameMutations.UPDATE_GAME:
          const updatedGame = action.game;
          let gameToUpdateIndex = games.findIndex(
            (game) => game.id == updatedGame.id
          );
          games[gameToUpdateIndex] = updatedGame;
          return [...games];
        case mutations.LOAD_STATE:
          return action.state.games;
      }
      return games;
    },
    users(users = [], action) {
      switch (action.type) {
        case mutations.LOAD_STATE:
          return action.state.users;
      }
      return users;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
