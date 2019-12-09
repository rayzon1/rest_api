import React, { useState } from "react";
import "./App.css";
import "./global.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UpdateCourse from "./components/UpdateCourse";
import NotFound from "./components/NotFound";
import Axios from "axios";
import { setUserName, setUserPassword } from "./actions/SignInActions";
// import { credentialsState, credentialsReducer } from "./reducers";

const coursesUrl = "http://localhost:5000/api/users";

// Main container for routes to all components.
function App() {
  // const [state, dispatchCred] = useReducer(credentialsReducer, credentialsState);
  const [signedInUser, setSignedInUser] = useState(null);
  const [failedSignIn, setFailedSignIn] = useState(false);

  const dispatch = useDispatch();

  const signin = useSelector(state => state.SignInState);

  // SignIn function will authorize user with api and save auth credentials to state.
  const signIn = () => {
    console.log(signin)
    // Headers and auth headers for the request.
    const headerObject = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      auth: {
        username: signin.username,
        password: signin.password
      }
    };

    return Axios(coursesUrl, headerObject)
      .then(data => {
        console.log(data.data.users);
        const authUser = data.config.auth.username;
        data.data.users.map(data => {
          if (data.emailAddress === authUser) {
            setSignedInUser(data);
          }
        });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            setFailedSignIn(true);
          }
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const signOut = () => {
    setSignedInUser(null);
    // dispatchCred({ type: "setUserName", payload: "" });
    // dispatchCred({ type: "setUserPassword", payload: "" });
  };

  return (
    <Router>
      <div>
        <Header
          signedInUser={signedInUser}
          signOut={signOut}
        />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route
            path="/signin"
            render={() => (
              <UserSignIn
                dispatch={dispatch}
                signIn={signIn}
                signedInUser={signedInUser}
                failedSignIn={failedSignIn}
                setFailedSignIn={setFailedSignIn}
              />
            )}
          />
          <Route path="/signup" component={UserSignUp} />
          {/* <Route path="/signout" component={} /> */}
          {/* <Route path="/signout" component={UserSignOutWithContext} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
