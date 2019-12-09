import React from "react";
import { Link } from "react-router-dom";

export default function Header({ signedInUser, signOut }) {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>

        {signedInUser ? (
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
            <Link className="signin" to="/signin">
              Sign In
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
