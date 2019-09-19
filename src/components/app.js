import React from 'react';
import Search from './search';
import Table from './table';

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <Search />
        <Table />
      </div>
    );
  }
}

export default App;
