import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './main.css';




const Main = props => {

  const theUl = (<ul class="active">
    <li><Link to='/game' role="button"><button className="navButton">New Game</button></Link></li>
    <li><Link to='/userHistory' role="button"><button className="navButton">View History</button></Link></li>
    <li><Link to='/training' role="button"><button className="navButton">New Training</button></Link></li>
    <li><Link to='/logout' role="button"><button className="navButton">Log Out</button></Link></li>
  </ul>);
  if(!props.loggedIn){
    return(
      <nav aria-label="log-in"></nav>
    )
  }
  else{
  return (
    <nav className="menu">
    
      {theUl}
    </nav>)
  }
}



  const mapStateToProps = state => {
    return ({ loggedIn: state.auth.authToken != null });
  }
  export default connect(mapStateToProps)(Main);