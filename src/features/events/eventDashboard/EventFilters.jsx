import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

function EventFilters({ predicate, setPredicate, loading }) {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          active={predicate.get('filter') === 'all'}
          onClick={() => setPredicate('filter', 'all')}
          disabled={loading}
          content="All Events"
        />
        <Menu.Item
          active={predicate.get('filter') === 'isGoing'}
          onClick={() => setPredicate('filter', 'isGoing')}
          disabled={loading}
          content="I'm going"
        />
        <Menu.Item
          active={predicate.get('filter') === 'isHost'}
          onClick={() => setPredicate('filter', 'isHost')}
          disabled={loading}
          content="I'm hosting"
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date) => setPredicate('startDate', date)}
        value={predicate.get('startDate') || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}

export default EventFilters;
