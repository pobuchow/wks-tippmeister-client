export const REQUEST_CREATE_GAME = 'REQUEST_CREATE_GAME';
export const CREATE_GAME = 'CREATE_GAME';

export const REQUEST_UPDATE_GAME = 'REQUEST_UPDATE_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';

export const requestUpdateGame = (game) => ({
  type: REQUEST_UPDATE_GAME,
  game,
});

export const updateGame = (game) => ({
  type: UPDATE_GAME,
  game,
});

export const requestCreateGame = (userId, name) => ({
  type: REQUEST_CREATE_GAME,
  userId,
  name,
});

export const createGame = (game) => ({
  type: CREATE_GAME,
  game,
});
