import React from "react";
import { Link } from "react-router-dom";
import './main.css';




const Main = props => {

  const logo = (<Link to='/splash' className="logo"><img src={"images/pcalcclean.png"}  alt='4 crad logo' /></Link>);
  const theUl = (<ul className="active">
    <li><Link to='/game' role="button"><button className="navButton left">New Game</button></Link></li>
    <li><Link to='/training' role="button"><button className="navButton right">New Training</button></Link></li>
  </ul>);
  
  return (
    <nav className="menu">
      {logo}
      {theUl}
    </nav>)
  }


  export default (Main);