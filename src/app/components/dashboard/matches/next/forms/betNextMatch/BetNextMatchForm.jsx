import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  goalMinValue,
  goalMaxValue,
  handleGoalInput,
  isMatchStarted,
} from '../../../../../../services/match/MatchService';
import { requestBetMatch } from '../../../../../../store/mutations/betMutations';

const uuid = require('uuid').v4;

const buttonLabel = 'bet this match!';

export const BetNextMatchForm = ({ match, bet, betMatch }) => {
  const [goalsHomeTeam, setGoalsHomeTeam] = useState(0);
  const [goalsAwayTeam, setGoalsAwayTeam] = useState(0);

  return (
    <div>
      <form>
        <label htmlFor="goalsHomeTeam">
          {match.homeTeam}
          <input
            id="goalsHomeTeam"
            type="number"
            min={goalMinValue}
            max={goalMaxValue}
            value={goalsHomeTeam}
            onChange={(e) => handleGoalInput(e.target.value, setGoalsHomeTeam)}
          />
        </label>
        <label htmlFor="goalsAwayTeam">
          {match.awayTeam}
          <input
            id="goalsAwayTeam"
            type="number"
            min={goalMinValue}
            max={goalMaxValue}
            value={goalsAwayTeam}
            onChange={(e) => handleGoalInput(e.target.value, setGoalsAwayTeam)}
          />
        </label>
        <button
          type="button"
          disabled={isMatchStarted(match)}
          onClick={() => betMatch(bet, goalsHomeTeam, goalsAwayTeam)}
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

export function mapStateToProps(state, ownProps) {
  const userId = state.session.id;
  const { match } = ownProps;
  const betTemplate = { match: match.id, owner: userId, game: ownProps.gameId };
  const bet = _.find(state.bets, betTemplate) || { ...betTemplate, id: uuid() };
  return {
    bet,
    match,
  };
}

const mapDispatchToProps = (dispatch) => ({
  betMatch(bet, goalsHomeTeam, goalsAwayTeam) {
    const requestBet = bet;
    requestBet.goalsHomeTeam = goalsHomeTeam;
    requestBet.goalsAwayTeam = goalsAwayTeam;
    dispatch(requestBetMatch(requestBet));
  },
});

BetNextMatchForm.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    event_datetime: PropTypes.instanceOf(Date).isRequired,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    goalsHomeTeam: null,
    goalsAwayTeam: null,
  }),
  bet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    goalsHomeTeam: PropTypes.number,
    goalsAwayTeam: PropTypes.number,
    game: PropTypes.string.isRequired,
  }),
  betMatch: PropTypes.func,
};

BetNextMatchForm.defaultProps = {
  match: null,
  bet: null,
  betMatch: null,
};

export const ConnectedBetNextMatchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BetNextMatchForm);
