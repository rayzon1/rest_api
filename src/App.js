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
import PrivateRoute from "./PrivateRoute";

const coursesUrl = "http://localhost:5000/api/users";

// Main container for routes to all components.
function App() {
  const [signedInUser, setSignedInUser] = useState(null);
  const [failedSignIn, setFailedSignIn] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);

  // const [courseData, setCourseData] = useState(null);

  const dispatch = useDispatch();

  const signin = useSelector(state => state.SignInState);

  // SignIn function will authorize user with api and save auth credentials to state.
  const signIn = () => {
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
        // console.log(data.data.users);
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
    dispatch(setUserName(""));
    dispatch(setUserPassword(""));
  };

  return (
    <Router>
      <div>
        <Header signedInUser={signedInUser} signOut={signOut} />
        <Switch>
          <Route exact path="/" render={() => <Courses />} />
          <PrivateRoute
            exact
            path="/courses/create"
            component={CreateCourse}
            signedInUser={signedInUser}
          />
          <Route
            exact
            path="/courses/:id"
            render={() => (
              <CourseDetail
                courseDetails={courseDetails}
                setCourseDetails={setCourseDetails}
              />
            )}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourse}
            signedInUser={signedInUser}
            courseDetails={courseDetails}
          />
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
