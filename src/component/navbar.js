import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export function NavBar() {

  return (
    <header>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Logo </Link></li>
        </ul>
      </nav >
    </header>);
}