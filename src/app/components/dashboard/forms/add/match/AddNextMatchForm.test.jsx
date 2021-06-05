import TestRenderer, { act } from 'react-test-renderer';
import React from 'react';
import { ConnectedAddNextMatchForm } from './AddNextMatchForm';
import ProviderWrapper from '../../../../ProviderWrapper';

describe('Add Next Match Form', () => {
  const game = {
    id: '1',
    name: 'saison 2020/21',
    users: [
      '1', '2', '3', '4',
    ],
    matches: [
      '1', '2', '3', '4',
    ],
    hosts: ['1'],
    isFinished: false,
  };
  const expectedEventDate = '2021-02-23';
  const expectedEventTime = '18:00';
  const expectedDate = new Date(Date.parse(`${expectedEventDate}T${expectedEventTime}:00`));

  let dateSpy;
  beforeAll(() => {
    dateSpy = jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => expectedDate);
  });
  afterAll(() => {
    dateSpy.mockRestore();
  });
  describe('mapDispatchToProps', () => {
    it('should dispatch prop after button click', () => {
      const dispatch = jest.fn();
      const renderer = TestRenderer.create(
        ProviderWrapper(
          <ConnectedAddNextMatchForm game={game} />, {
            dispatch,
          },
        ),
      );
      const expectedHomeTeam = 'Team A';
      const expectedAwayTeam = 'Team B';

      const homeTeamField = renderer.root.findByProps({
        id: 'homeTeam',
      });
      expect(homeTeamField.props.value).toEqual('');
      act(() => {
        homeTeamField.props.onChange({ target: { value: expectedHomeTeam } });
      });
      expect(homeTeamField.props.value).toEqual(expectedHomeTeam);

      const awayTeamField = renderer.root.findByProps({
        id: 'awayTeam',
      });
      expect(awayTeamField.props.value).toEqual('');
      act(() => {
        awayTeamField.props.onChange({ target: { value: expectedAwayTeam } });
      });
      expect(awayTeamField.props.value).toEqual(expectedAwayTeam);

      const eventTimeField = renderer.root.findByProps({
        id: 'eventTime',
      });
      expect(eventTimeField.props.value).toEqual(expectedEventTime);

      const eventDateField = renderer.root.findByProps({
        id: 'eventDate',
      });
      expect(eventDateField.props.value).toEqual(expectedEventDate);

      const addNextMatchButton = renderer.root.findByType('button');
      addNextMatchButton.props.onClick();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        homeTeam: expectedHomeTeam,
        awayTeam: expectedAwayTeam,
        eventDate: expectedDate,
        eventTime: expectedDate,
        game,
        type: 'REQUEST_ADD_NEW_MATCH_TO_GAME',
      });
    });
  });
});
