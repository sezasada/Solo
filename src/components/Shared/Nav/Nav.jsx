import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import TickerBar from '../TickerBar/TickerBar';
function Nav() {
  const user = useSelector((store) => store.user);


  return (
    <div className="nav">
      <div className="nav-container">
        <Link to="/home">
          <h2 className="nav-title">Prime Solo Project</h2>
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
            <Link className="navLink" to="/info">
              Info Page
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