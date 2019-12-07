import React from "react";
import { Link } from "react-router-dom";

export default function UserSignIn( { dispatch, signIn } ) {
  return (
    <>
      <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={e => {
                e.preventDefault();
                signIn();
              }}>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  onChange={e => dispatch({ type: 'setUserName', payload: e.target.value })}
                 
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={e => dispatch({ type: 'setUserPassword', payload: e.target.value })}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign In
                </button>
                <Link
                  className="button button-secondary"
                  to="/"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    </>
  );
}
