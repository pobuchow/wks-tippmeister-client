import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  goalMinValue,
  goalMaxValue,
  handleGoalInput,
  isMatchOver,
} from '../../../../../../services/match/MatchService';
import { requestSetMatchResult } from '../../../../../../store/mutations/matchMutations';

const buttonLabel = 'update match!';

export const SetMatchResultForm = ({ match, setMatchResult }) => {
  const [goalsHomeTeam, setGoalsHomeTeam] = useState(0);
  const [goalsAwayTeam, setGoalsAwayTeam] = useState(0);

  return (
    <div>
      <form>
        <label htmlFor="goalsHomeTeam">
          home team goals:
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
          away team goals:
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
          disabled={!isMatchOver(match)}
          onClick={() => setMatchResult(goalsHomeTeam, goalsAwayTeam)}
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setMatchResult(goalsHomeTeam, goalsAwayTeam) {
    dispatch(requestSetMatchResult(ownProps.match, goalsHomeTeam, goalsAwayTeam));
  },
});

export function mapStateToProps(state, ownProps) {
  return {
    match: ownProps.match,
  };
}

SetMatchResultForm.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    event_datetime: PropTypes.instanceOf(Date).isRequired,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    goalsHomeTeam: null,
    goalsAwayTeam: null,
  }),
  setMatchResult: PropTypes.func,
};

SetMatchResultForm.defaultProps = {
  match: null,
  setMatchResult: null,
};

export const ConnectedSetMatchResultForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetMatchResultForm);
