import React from 'react';
import OtherTable from './other_table';
import {TO_WATCH_MOVIE_LIST} from '../globals';

class ToWatch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: localStorage.getItem(TO_WATCH_MOVIE_LIST) ? JSON.parse(localStorage.getItem(TO_WATCH_MOVIE_LIST)) : [],
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

export default ToWatch;
