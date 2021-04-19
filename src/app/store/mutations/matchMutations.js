export const REQUEST_ADD_NEW_MATCH_TO_GAME = 'REQUEST_ADD_NEW_MATCH_TO_GAME';
export const ADD_MATCH = 'ADD_MATCH';

export const REQUEST_SET_MATCH_RESULT = 'REQUEST_SET_MATCH_RESULT';
export const UPDATE_MATCH = 'UPDATE_MATCH';

export const requestAddNewMatchToGame = (game, homeTeam, awayTeam, eventDate, eventTime) => ({
  type: REQUEST_ADD_NEW_MATCH_TO_GAME,
  game,
  homeTeam,
  awayTeam,
  eventDate,
  eventTime,
});

export const addMatch = (match) => ({
  type: ADD_MATCH,
  match,
});

export const requestSetMatchResult = (match, goalsHomeTeam, goalsAwayTeam) => ({
  type: REQUEST_SET_MATCH_RESULT,
  match,
  goalsHomeTeam,
  goalsAwayTeam,
});

export const updateMatch = (match) => ({
  type: UPDATE_MATCH,
  match,
});
