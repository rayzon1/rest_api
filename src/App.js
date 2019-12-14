import React, { useState, useEffect } from "react";
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
import Cookies from 'js-cookie';



// Main container for routes to all components.
function App() {
  const [signedInUser, setSignedInUser] = useState(null);
  const [failedSignIn, setFailedSignIn] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);

  // const signedInUser = Cookies.getJSON('authenticatedUser') || null;

  useEffect(() => {
    if (signedInUser) {
      Cookies.set('authenticatedUser', JSON.stringify(signedInUser), { expires: 5 });
    }
  }, [signedInUser])

  const dispatch = useDispatch();

  const signin = useSelector(state => state.SignInState);

  const coursesUrl = "http://localhost:5000/api/users";
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
        const authUser = data.config.auth.username;
        data.data.users.map(data => {
          if (data.emailAddress === authUser) {
            setSignedInUser(data);
            // Cookies.set('authenticatedUser', JSON.stringify(data), { expires: 5 });
            // setSignedInUserCookie(Cookies.getJSON('authenticatedUser') || null);
          }
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            setFailedSignIn(true);
          }
        }
      });
  };

  const signOut = () => {
    // setSignedInUser(null);
    
    dispatch(setUserName(""));
    dispatch(setUserPassword(""));
    Cookies.remove('authenticatedUser');
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
                signedInUser={signedInUser}
              />
            )}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourse}
            signedInUser={signedInUser}
            signOut={signOut}
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
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
