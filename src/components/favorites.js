import React from 'react';
import OtherTable from './other_table';
import {FAV_MOVIE_LIST} from '../globals';

class Favorites extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: localStorage.getItem(FAV_MOVIE_LIST) ? JSON.parse(localStorage.getItem(FAV_MOVIE_LIST)) : [],
    }
  }

  render() {
    return(
      <div className="container">
        <OtherTable movies={this.state.movies} hasPagination={false}/>
      </div>
    )
  }
}

export default Favorites;
