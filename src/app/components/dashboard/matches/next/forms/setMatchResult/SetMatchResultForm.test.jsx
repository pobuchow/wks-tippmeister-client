import TestRenderer, { act } from 'react-test-renderer';
import React from 'react';
import { ConnectedSetMatchResultForm, mapStateToProps } from './SetMatchResultForm';
import ProviderWrapper from '../../../../../ProviderWrapper';

const expectedMatch = {
  id: '3',
  event_datetime: new Date(2021, 2 - 1, 1, 18, 0, 0, 0),
  homeTeam: 'Stal Mielec',
  awayTeam: 'Śląsk Wrocław',
  goalsHomeTeam: null,
  goalsAwayTeam: null,
};

describe('Set Match Result Form', () => {
  describe('mapStateToProps', () => {
    it('should map state to props', () => {
      const componentState = mapStateToProps({}, {
        match: expectedMatch,
      });
      expect(componentState).toHaveProperty('match');
      expect(componentState).toEqual({
        match: expectedMatch,
      });
    });
  });
  describe('mapDispatchToProps', () => {
    it('should dispatch prop after button click', () => {
      const dispatch = jest.fn();
      const renderer = TestRenderer.create(
        ProviderWrapper(
          <ConnectedSetMatchResultForm match={expectedMatch} />, {
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
      const setMatchResultButton = renderer.root.findByType('button');
      setMatchResultButton.props.onClick();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        goalsHomeTeam: 1,
        goalsAwayTeam: 2,
        match: expectedMatch,
        type: 'REQUEST_SET_MATCH_RESULT',
      });
    });
  });
});
