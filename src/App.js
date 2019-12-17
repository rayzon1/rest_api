import React, { useState } from "react";
import "./App.css";
import "./global.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
import Cookies from "js-cookie";

// Main container for routes to all components.
function App() {
  const [signedInUser, setSignedInUser] = useState(
    Cookies.getJSON("authenticatedUser") || null
  );
  const [failedSignIn, setFailedSignIn] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);
  // const [courseData, setCourseData] = useState(null);

  // const signedInUser = Cookies.getJSON('authenticatedUser') || null;

  const dispatch = useDispatch();

  const signin = useSelector(state => state.SignInState);

  const coursesUrl = "http://localhost:5000/api/users";

  // SignIn function will authorize user with api and save auth credentials to state.
  // @param { history } for redirection.
  const signIn = async (a) => {

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

    try {
      const data = await Axios(coursesUrl, headerObject);
      const authUser = data.config.auth.username;
      data.data.users.map(data_1 => {
        if (data_1.emailAddress === authUser) {
          Cookies.set(
            "authenticatedUser",
            JSON.stringify(
              Object.assign(data_1, { password: signin.password })
            ),
            { expires: 5 }
          );
          setSignedInUser(data_1);
            if (a.go(-1)) {
              a.goBack();
            } else {
              a.push("/");
            }
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        if (error.response.status === 401) {
          setFailedSignIn(true);
        }
      }
    }
  };

  const signOut = () => {
    Cookies.remove("authenticatedUser");
    setSignedInUser(null);
    dispatch(setUserName(""));
    dispatch(setUserPassword(""));
  };

  // Props for course paths.
  const coursesPropsObj = {
    signedInUser,
    signIn,
    courseDetails,
    setCourseDetails,
    failedSignIn,
    setFailedSignIn,
    signOut,
  }

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
            coursesPropsObj={coursesPropsObj}
          />
          <Route
            exact
            path="/courses/:id"
            render={() => (
              <CourseDetail
                coursesPropsObj={coursesPropsObj}
              />
            )}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourse}
            coursesPropsObj={coursesPropsObj}
          />
          <Route
            path="/signin"
            render={() => (
              <UserSignIn
                dispatch={dispatch}
                coursesPropsObj={coursesPropsObj}
              />
            )}
          />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to='/notfound' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
