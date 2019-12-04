import React from "react";
import "./App.css";
import "./global.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

// Main container for routes to all components.
function App() {

  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" render={() => <Courses />} />
          <Route path={`/courses/:id`} render={() => <CourseDetail />} />
        {/* <Route path="/settings" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
