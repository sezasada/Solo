import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
function Nav() {
  const user = useSelector((store) => store.user);


  return (
    <div className="nav">
      <div className="nav-container">
        <Link to="/home">
          <h2 className="nav-title">Market Watcher</h2>
        </Link>
      </div>
      <div className="nav-links">
        {!user.id && (
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;