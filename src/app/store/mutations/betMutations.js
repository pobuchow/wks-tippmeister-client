export const REQUEST_BET_MATCH = 'REQUEST_BET_MATCH';
export const BET_MATCH = 'BET_MATCH';

export const requestBetMatch = (bet) => ({
  type: REQUEST_BET_MATCH,
  bet,
});

export const betMatch = (bet) => ({
  type: BET_MATCH,
  bet,
});
