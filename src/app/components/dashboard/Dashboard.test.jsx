import TestRenderer from 'react-test-renderer';
import React from 'react';
import { mapStateToProps, ConnectedDashboard } from './Dashboard';
import ProviderWrapper from '../ProviderWrapper';

describe('Dashboard Component', () => {
  describe('mapStateToProps', () => {
    it('should map state with specific game and user', () => {
      const appState = {
        session: {
          id: '2',
        },
        games: [{
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
        }],
        matches: [{
          id: '1',
          event_datetime: new Date(2020, 12 - 1, 17, 18, 0, 0, 0),
          homeTeam: 'Śląsk Wrocław',
          awayTeam: 'Warta Poznań',
          goalsHomeTeam: 2,
          goalsAwayTeam: 1,
        }],
      };
      const ownProps = {
        route: {
          params: {
            id: '1',
          },
        },
      };
      const componentState = mapStateToProps(appState, ownProps);
      expect(componentState).toHaveProperty('userId');
      expect(componentState).toHaveProperty('game');
      expect(componentState.game).toEqual({
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
      });
      expect(componentState.userId).toEqual('2');
    });
  });
  describe('display element', () => {
    let dateSpy;
    beforeAll(() => {
      dateSpy = jest
        .spyOn(global.Date, 'now')
        .mockImplementation(() => Date.parse('2021-02-23T18:00:00'));
    });

    afterAll(() => {
      dateSpy.mockRestore();
    });
    it('should render dashboard', () => {
      const tree = TestRenderer.create(
        ProviderWrapper(
          <ConnectedDashboard route={{
            params: {
              id: '1',
            },
          }}
          />,
        ),
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
