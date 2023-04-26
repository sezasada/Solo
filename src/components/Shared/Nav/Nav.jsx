import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <p></p>
      <div className="nav-links" style={{ marginRight: "10px" }}>
        <Link className="navLink" to="/home">
          Home
        </Link>
        {user.id && (
          <Link className="navLink" to="/chatbot">
            ChatGPT
          </Link>
        )}
        {!user.id && (
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
