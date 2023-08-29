
import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
// import { Navbar, Nav, NavItem } from "reactstrap";


function NavBar ({ logout }) {
  return (
    <nav className="NavBar">
      <NavLink to="/" id="NavBar-Home">Job-Ly</NavLink>
      <ul>
        <li><NavLink to="/signup" className="NavBar-Link">Signup</NavLink></li>
        <li><NavLink to="/login" className="NavBar-Link">Login</NavLink></li>
        <li><NavLink to="/companies" className="NavBar-Link">Companies</NavLink></li>
        <li><NavLink to="/jobs" className="NavBar-Link">Jobs</NavLink></li>
        <li><NavLink to="/profile" className="NavBar-Link">Profile</NavLink></li>
        <li><NavLink to="/" onClick={logout} className="NavBar-Link">Logout</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavBar;


