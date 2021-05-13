import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import initialState from '../../server/db/initialState';

function ProviderWrapper(component, customState = {}) {
  const store = createStore(
    combineReducers({
      session(userSession = {
        authenticated: true,
        id: '1',
      }) {
        return customState.userSession ? customState.userSession : userSession;
      },
      matches(matches = initialState.matches) {
        return customState.matches ? customState.matches : matches;
      },
      games(games = initialState.games) {
        return customState.games ? customState.games : games;
      },
      bets(bets = initialState.bets) {
        return customState.bets ? customState.bets : bets;
      },
      users(users = initialState.users) {
        return customState.users ? customState.users : users;
      },
    }),
  );
  if (customState.dispatch) {
    store.dispatch = customState.dispatch;
  }
  return (
    <Provider store={store}>
      {component}
    </Provider>
  );
}

export default ProviderWrapper;
