import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  getNextMatch,
} from "../../../../services/match/MatchService";

export const NextBet = ({ betId, goalsHomeTeam, goalsAwayTeam}) => betId ? (
  <div style={{display: 'inline-block'}}>
    {betId ? 
        <div key={betId}>
            {goalsHomeTeam} : {goalsAwayTeam}
        </div> 
    : ""}
  </div>
) : null;

function mapState2Props(state, ownProps) {
  const game = _.find(state.games, { 'id': ownProps.gameId });
  let matches =_.filter(state.matches, function (match) {
    return _.includes(game.matches, match.id);
  });
  let nextMatch = getNextMatch(matches);
  if(!nextMatch){
    return {};
  }
  let nextBets =_.filter(state.bets, function (bet) {
    return bet.game === game.id && bet.match === nextMatch.id;
  });
  let bet = _.find(nextBets, ["owner", ownProps.userId]);
  return bet ? {
    betId: bet.id,
    goalsHomeTeam: bet.goalsHomeTeam,
    goalsAwayTeam: bet.goalsAwayTeam
  } : {};
}

export const ConnectedNextBet = connect(mapState2Props)(NextBet);
