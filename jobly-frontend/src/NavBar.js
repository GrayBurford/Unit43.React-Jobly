
import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import UserContextObject from "./UserContext";


function NavBar ({ logout }) {

  const user = useContext(UserContextObject).currUser;

  return (
    <nav className="NavBar">
      { user ? (
        <div>
          <NavLink to="/" id="NavBar-Home">Job-Ly</NavLink>
          <ul>
            <li><NavLink to="/companies" className="NavBar-Link">Companies</NavLink></li>
            <li><NavLink to="/jobs" className="NavBar-Link">Jobs</NavLink></li>
            <li><NavLink to="/profile" className="NavBar-Link">Profile</NavLink></li>
            <li><Link to="/" onClick={logout}>Logout {user.username}</Link></li>
          </ul>
        </div>
      ) : (
        <div>
          <NavLink to="/" id="NavBar-Home">Job-Ly</NavLink>
          <ul>
            <li><NavLink to="/signup" className="NavBar-Link">Signup</NavLink></li>
            <li><NavLink to="/login" className="NavBar-Link">Login</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default NavBar;
