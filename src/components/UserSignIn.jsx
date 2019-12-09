import React, { useEffect, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setUserPassword } from "../actions/SignInActions";


function UserSignIn({
  signIn,
  signedInUser,
  history,
  failedSignIn,
  setFailedSignIn
}) {

  // temp state to dispatch in signIn function.

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const signInState = useSelector(state => state);

  useEffect(() => {
    if (signedInUser) {
      history.push('/');
    }
  }, [signedInUser]);

  const validationErrors = () => {
    return (
      <>
        <h2 class="validation--errors--label">Validation errors</h2>
        <div class="validation-errors">
          <ul>
            <li style={{ color: 'red' }}>Email address and/or password is incorrect.</li>
            {/* <li>Please provide a value for "Description"</li> */}
          </ul>
        </div>
      </>
    );
  };

  // Try to avoid expensive re-renders.
  const handleChange = useCallback(
    (func, event) => {
      func(event);
    }
  )

  return (
    <>
      <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
          {failedSignIn && validationErrors()}

          <h1>Sign In</h1>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                // dispatch({ type: "setUserName", payload: username });
                // dispatch({ type: "setUserPassword", payload: password });
                signIn();
              }}
            >
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  style={failedSignIn ? { border: '1px solid red' } : null}
                  onChange={e => {
                    setFailedSignIn(false);
                    // setUsername(e.target.value);
                    dispatch(setUserName(e.target.value));
                  }}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  style={failedSignIn ? { border: '1px solid red' } : null}
                  onChange={e => {
                    setFailedSignIn(false);
                    dispatch(setUserPassword(e.target.value));
                    // setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign In
                </button>

                <Link
                  className="button button-secondary"
                  to="/"
                  onClick={() => setFailedSignIn(false)}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account?{" "}
            <Link to="/signup" onClick={() => setFailedSignIn(false)}>
              Click here
            </Link>{" "}
            to sign up!
          </p>
        </div>
      </div>
    </>
  );
}

export default withRouter(UserSignIn);
