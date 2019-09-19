import React from 'react';
import { connect } from 'react-redux';
import {QUERY} from '../globals';
import {changeQuery} from '../actions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieQuery: sessionStorage.getItem(QUERY) ? sessionStorage.getItem(QUERY) : "",
    }
  }

  componentDidMount() {
    //Get back the saved searched expression if any
    const movieQuery = sessionStorage.getItem(QUERY);
    if(movieQuery !== "" && movieQuery !== null)
      this.props.changeQuery(movieQuery);
  }

  changeHandler = (event) => {
    this.setState ({
      movieQuery: event.target.value
    });
  }
  sendQuery = (e) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      this.props.changeQuery(this.state.movieQuery);
      //Save the latest searched movie in local so that it can be displayed while switching back from favorites or to watch sections
      sessionStorage.setItem(QUERY, this.state.movieQuery);
    }
  }

  render() {
    return (
      <div className="search-container">
        <input type="text" name="search" placeholder="Which movie you are looking for?" onChange={(e) => {this.changeHandler(e)}} onKeyDown={(e)=>{this.sendQuery(e)}} value={this.state.movieQuery}/>
        <button onClick={this.sendQuery} >Find My Movie!</button>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  };
}

const mapDispatchToProps = {
  changeQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
