import TestRenderer from 'react-test-renderer';
import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../store/history';
import { mapStateToProps, ConnectedGameboard } from './Gameboard';
import ProviderWrapper from '../ProviderWrapper';

const mockGames = [{
  id: '2',
  name: 'saison 2019/20',
  users: [
    '1', '2', '3', '4',
  ],
  matches: [
    '5', '6', '7', '8',
  ],
  hosts: ['2'],
  isFinished: true,
}, {
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
}];

describe('Gameboard Component', () => {
  describe('mapStateToProps', () => {
    it('should map state with games to props', () => {
      const appState = {
        games: mockGames,
        matches: [{
          id: '1',
          event_datetime: new Date(2020, 12 - 1, 17, 18, 0, 0, 0),
          homeTeam: 'Śląsk Wrocław',
          awayTeam: 'Warta Poznań',
          goalsHomeTeam: 2,
          goalsAwayTeam: 1,
        }],
      };
      const componentState = mapStateToProps(appState);
      expect(componentState).toHaveProperty('games');
      expect(componentState.games).toEqual(mockGames);
    });
  });
  describe('display element', () => {
    it('should render element with games', () => {
      const tree = TestRenderer.create(
        ProviderWrapper(
          <Router history={history}>
            <ConnectedGameboard />
          </Router>,
        ),
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
