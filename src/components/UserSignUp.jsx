import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import Fade from "react-reveal/Fade";
import ValidationErrors from "./ValidationErrors";

const url = "http://localhost:5000/api/users";

function UserSignUp({ history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failedSignUp, setFailedSignUp] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const submitForm = () => {
    const bodyObj = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: password,
      confirmPassword: confirmPassword
    };

    Axios.post(url, bodyObj)
      .then(() => {
        setSuccessAlert(true);
        setTimeout(() => {
          if (history.go(-1)) {
            history.goBack();
          } else {
            history.push("/");
          }
        }, 1500);
      })
      .catch(error => {
        console.log(error.response);
        setFailedSignUp(true);
        setErrorData(error.response.data.error);
      });
  };

  // Tests the error data brought back from api to see if it will match the input.
  // e.g. If error string contains value param it will show that error on page.
  const testErrorData = str => {
    return errorData && errorData.map(data => data.includes(str)).includes(true)
      ? { border: "1px solid red" }
      : null;
  };

  return (
    <>
      {successAlert && failedSignUp === false && (
        <Fade>
          <h2
            style={{
              textAlign: "center",
              color: "green",
              left: "43%",
              position: "absolute"
            }}
          >
            Course Updated.
          </h2>
        </Fade>
      )}
      
      <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
        {failedSignUp && errorData && <ValidationErrors data={errorData} />}
          <h1>Sign Up</h1>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  style={testErrorData('first')}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  style={testErrorData('last')}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  style={testErrorData('email') || testErrorData('E-mail')}
                  onChange={e => setEmailAddress(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  style={testErrorData('password')}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  style={testErrorData('password')}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <Link className="button button-secondary" to="/">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    </>
  );
}

export default withRouter(UserSignUp);
