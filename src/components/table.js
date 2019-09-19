import React from 'react';
import { connect } from 'react-redux';
import  addMovie from '../globals';
import Pagination from './pagination';
import {FAV_MOVIE_LIST, TO_WATCH_MOVIE_LIST, movieExists} from '../globals';
import {changePage, refreshMovies} from '../actions';

class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        finalQuery: this.props.query,
        currentPage: 1,
    }
  }

  getMovies() {
    if(this.props.query === "") return;
    this.props.refreshMovies();
  }

  componentDidMount() {
      this.getMovies();
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.finalQuery !== this.state.finalQuery) {
      //to get back to page number one when searching for a new movie, we have to set both store state and this component state
      this.props.changePage(1)
      this.setState({currentPage: 1}, ()=> {
        this.getMovies();
      });
    }
    else if(previousState.currentPage !== this.state.currentPage){
      this.getMovies();
    }
  }

  static getDerivedStateFromProps(props, state) {
    return{
      finalQuery: props.query,
      currentPage: props.currentPage
    };
  }

  //add selected movie to favorites or to-watch list
  addToList(id, title, relDate, list){
    addMovie(id, title, relDate, list);
    this.forceUpdate();
  }

  render(){
    if(this.props.isAnyData)
      return (
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
            {this.props.movies.map((row) => (
              <tr key={row.id}>
                <td>{row.title}</td>
                <td>{row.release_date}</td>
                <td className="icon"><i className={(movieExists(row.id, FAV_MOVIE_LIST) ? "fas" : "far") + " fa-star"} onClick={()=>{this.addToList(row.id, row.title, row.release_date, FAV_MOVIE_LIST)}}></i></td>
                <td className="icon"><i className={movieExists(row.id, TO_WATCH_MOVIE_LIST) ? "fas fa-eye" : "far fa-eye-slash"} onClick={()=>{this.addToList(row.id, row.title, row.release_date, TO_WATCH_MOVIE_LIST)}}></i></td>
              </tr>
            ))}
            </tbody>
          </table>
          <Pagination />
        </div>

      );
    else {
      return (
        <div className="table-container">
          <h2 className="no-results no-selection">Nothing To Watch!</h2>
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    isAnyData: state.isAnyData,
    currentPage: state.currentPage,
    query: state.query
  };
}

const mapDispatchToProps = {
  refreshMovies,
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
