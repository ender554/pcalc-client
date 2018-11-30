import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from 'jquery';
import './main.css';




const Main = props => {

  $(document).ready(function() {
    $('.toggle-nav').click(function(e) {
      $(this).toggleClass('active');
      $('.menu ul').toggleClass('active');
  
      e.preventDefault();
    });
  });
  $(document).ready(function() {
    $('.navButton').click(function(e) {
      $(this).toggleClass('active');
      $('.menu ul').toggleClass('active');
    });
  });
  const theUl = (<ul class="active">
    <li><Link to='/game' role="button"><button className="navButton">New Game</button></Link></li>
    <li><Link to='/userHistory' role="button"><button className="navButton">View History</button></Link></li>
    <li><Link to='/training' role="button"><button className="navButton">New Training</button></Link></li>
    <li><Link to='/logout' role="button"><button className="navButton">Log Out</button></Link></li>
  </ul>);
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  const toggle = (<a className="toggle-nav" href="#" >&#9776;</a>);
  return (
    <nav className="menu">
      {theUl}
      {toggle}
    </nav>)
}



  const mapStateToProps = state => {
    return ({ loggedIn: state.auth.authToken != null });
  }
  export default connect(mapStateToProps)(Main);