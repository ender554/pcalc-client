import React from "react";
import { Link } from "react-router-dom";
import './main.css';




const Main = props => {

  const theUl = (<ul className="active">
    <li><Link to='/game' role="button"><button className="navButton">New Game</button></Link></li>
    <li><Link to='/training' role="button"><button className="navButton">New Training</button></Link></li>
  </ul>);
  
  return (
    <nav className="menu">
    
      {theUl}
    </nav>)
  }


  export default (Main);