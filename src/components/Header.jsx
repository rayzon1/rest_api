import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Header({ signedInUser, signOut, alias }) {

  // const signedInUserCookie = Cookies.getJSON('authenticatedUser') || null;
  
  return (
    <div className={ alias === "update" ? "headerUpdate" : "header"}>
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {signedInUser && signedInUser ? (
          <nav>
            <span>{`Welcome ${signedInUser.firstName} ${signedInUser.lastName}!`}</span>
            <Link
              className="signout"
              to="/"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </Link>
          </nav>
        ) : (
          <nav>
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
            <Link className="signin" to="/signin" >
              Sign In
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
