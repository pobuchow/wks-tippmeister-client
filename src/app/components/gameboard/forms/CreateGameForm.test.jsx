import { mapStateToProps } from './CreateGameForm';

describe('Create Game Form', () => {
  describe('mapStateToProps', () => {
    it('should map state with userId props', () => {
      const expectedId = '1';
      const appState = {
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
          id: '3',
          event_datetime: new Date(2021, 2 - 1, 1, 18, 0, 0, 0),
          homeTeam: 'Stal Mielec',
          awayTeam: 'Śląsk Wrocław',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
        }],
        session: {
          id: expectedId,
        },
      };
      const componentState = mapStateToProps(appState);
      expect(componentState).toEqual({ userId: expectedId });
    });
  });
});
