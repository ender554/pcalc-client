import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";

import './main.css';
const Main = props => {
  if(props.loggedIn){
    return (
      <div className="button-navs">
        {/* <button onClick={props.loggedIn = !props.loggedIn}>Log Out</button> */}
        <Link to='/game'><button>New Game</button></Link>
        <Link to='/userHistory'><button>View History</button></Link>
        <Link to='/userNotes'><button>View Notes</button></Link>
        <Link to='/training'><button>New Training</button></Link>
      </div>
    )
  }
  else return(
    <div className="button-navs"></div>
  )
}

const mapStateToProps = state => {
  return ({loggedIn: state.auth.currentUser != null});
} 
export default connect(mapStateToProps)(Main);