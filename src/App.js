import React, { useState, useReducer } from "react";
import "./App.css";
import "./global.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UpdateCourse from "./components/UpdateCourse";
import Axios from "axios";

const coursesUrl = 'http://localhost:5000/api/users'

const credentialsState = {
  username: null,
  password: null
}

function credentialsReducer(state, action) {
  switch (action.type) {
    case 'setUserName':
      return { ...state, username: action.payload};
    case 'setUserPassword':
      return {...state, password: action.payload}
    default:
      throw new Error('Error in credentialsReducer.');
  }
}

// Main container for routes to all components.
function App() {
  const [state, dispatch] = useReducer(credentialsReducer, credentialsState);
  const [authenticatedUser, getAuthenticatedUser] = useState(null);

  // TODO: Create signIn function to grab sign in credentials to state 
  const signIn = () => {
    const headerObject = {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      auth: {
        username: state.username,
        password: state.password,
      },
    }

    Axios(coursesUrl, headerObject)
      .then(data => {
        if(data){
          getAuthenticatedUser(state);
          console.log(data);
        }
        
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

  }
 
  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/signin" render={() => <UserSignIn dispatch={dispatch} signIn={signIn}/>} />
          <Route path="/signup" component={UserSignUp} />
          {/* <Route path="/signout" component={} /> */}
        {/* <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
