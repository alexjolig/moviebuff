import React from 'react';
import Pagination from './pagination';
import addMovie from '../globals';
import {FAV_MOVIE_LIST, TO_WATCH_MOVIE_LIST, movieExists} from '../globals';

class OtherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.movies
    }
  }



  addToList(id, title, relDate, list){
    addMovie(id, title, relDate, list);
    this.setState({
      movies: localStorage.getItem(list) ? JSON.parse(localStorage.getItem(list)) : []
    });
  }

  render() {
    const Paginate = () => {
      return this.props.hasPagination ? <Pagination /> : null;
    }
    return(
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Favorite</th>
              <th>To Watch</th>
            </tr>
          </thead>
          <tbody>
          {this.state.movies.map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.release_date}</td>
              <td className="icon"><i className={(movieExists(row.id, FAV_MOVIE_LIST) ? "fas" : "far") + " fa-star"} onClick={()=>{this.addToList(row.id, row.title, row.release_date, FAV_MOVIE_LIST)}}></i></td>
              <td className="icon"><i className={movieExists(row.id, TO_WATCH_MOVIE_LIST) ? "fas fa-eye" : "far fa-eye-slash"} onClick={()=>{this.addToList(row.id, row.title, row.release_date, TO_WATCH_MOVIE_LIST)}}></i></td>
            </tr>
          ))}
          </tbody>
        </table>
        <Paginate />
      </div>
    )
  }

}

export default OtherTable;
