import TestRenderer from 'react-test-renderer';
import React from 'react';
import MatchTable from './MatchTable';

const match = {
  id: '1',
  event_datetime: new Date(2020, 12 - 1, 17, 18, 0, 0, 0),
  homeTeam: 'Śląsk Wrocław',
  awayTeam: 'Warta Poznań',
  goalsHomeTeam: 2,
  goalsAwayTeam: 1,
};

const matchWithoutGoals = {
  id: '1',
  event_datetime: new Date(2020, 12 - 1, 17, 18, 0, 0, 0),
  homeTeam: 'Śląsk Wrocław',
  awayTeam: 'Warta Poznań',
  goalsHomeTeam: null,
  goalsAwayTeam: null,
};

const label = 'test_label';

describe('Match Table', () => {
  it('renders snapshot element with goal results', () => {
    const tree = TestRenderer
      .create(<MatchTable label={label} match={match} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not render when match is null', () => {
    const tree = TestRenderer
      .create(<MatchTable label={label} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render snapshot element without goal results', () => {
    const tree = TestRenderer
      .create(<MatchTable label={label} match={matchWithoutGoals} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
