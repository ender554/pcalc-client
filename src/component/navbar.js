import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export function NavBar() {

  return (
    <div className="main-nav">
      <ul>
      <li><Link to="/">Logo </Link></li>
        <li className="logIn"><Link to='/login'> Log In! </Link></li>
    </ul>
  </div >);
}