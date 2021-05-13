import TestRenderer, { act } from 'react-test-renderer';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { ConnectedBetNextMatchForm, mapStateToProps } from './BetNextMatchForm';
import ProviderWrapper from '../../../../../ProviderWrapper';

jest.mock('uuid');

const expectedUserId = '1';
const expectedGameId = '2';
const expectedMatch = {
  id: '3',
  event_datetime: new Date(2021, 2 - 1, 1, 18, 0, 0, 0),
  homeTeam: 'Stal Mielec',
  awayTeam: 'Śląsk Wrocław',
  goalsHomeTeam: null,
  goalsAwayTeam: null,
};
const expectedBetId = 'testId';
uuid.mockImplementation(() => expectedBetId);

describe('Bet Next Match Form', () => {
  describe('mapStateToProps', () => {
    it('should map state with userId props', () => {
      const appState = {
        matches: [expectedMatch],
        session: {
          id: expectedUserId,
        },
      };
      const componentState = mapStateToProps(appState, {
        match: expectedMatch,
        gameId: expectedGameId,
      });
      expect(componentState).toHaveProperty('bet');
      expect(componentState).toHaveProperty('match');
      expect(componentState).toEqual({
        bet: {
          game: expectedGameId,
          id: expectedBetId,
          match: expectedMatch.id,
          owner: expectedUserId,
        },
        match: expectedMatch,
      });
    });
  });
  describe('mapDispatchToProps', () => {
    it('should dispatch prop after button click', () => {
      const dispatch = jest.fn();
      const renderer = TestRenderer.create(
        ProviderWrapper(
          <ConnectedBetNextMatchForm match={expectedMatch} gameId={expectedGameId} />, {
            dispatch,
          },
        ),
      );
      const expectedGoalsHomeTeam = 1;
      const expectedGoalsAwayTeam = 2;
      const goalsHomeTeamField = renderer.root.findByProps({
        id: 'goalsHomeTeam',
      });
      expect(goalsHomeTeamField.props.value).toEqual(0);
      act(() => {
        goalsHomeTeamField.props.onChange({ target: { value: expectedGoalsHomeTeam } });
      });
      expect(goalsHomeTeamField.props.value).toEqual(expectedGoalsHomeTeam);
      const goalsAwayTeamField = renderer.root.findByProps({
        id: 'goalsAwayTeam',
      });
      expect(goalsAwayTeamField.props.value).toEqual(0);
      act(() => {
        goalsAwayTeamField.props.onChange({ target: { value: expectedGoalsAwayTeam } });
      });
      expect(goalsAwayTeamField.props.value).toEqual(expectedGoalsAwayTeam);
      const betButton = renderer.root.findByType('button');
      betButton.props.onClick();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        bet: {
          game: expectedGameId,
          goalsAwayTeam: expectedGoalsAwayTeam,
          goalsHomeTeam: expectedGoalsHomeTeam,
          id: expectedBetId,
          match: expectedMatch.id,
          owner: expectedUserId,
        },
        type: 'REQUEST_BET_MATCH',
      });
    });
  });
});
