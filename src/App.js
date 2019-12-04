import React, {useState} from "react";
import "./App.css";
import "./global.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

// Main container for routes to all components.
function App() {
  const [clickedIndex, setClickedIndex] = useState(null);

  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" render={() => <Courses setClickedIndex={setClickedIndex} />} />
          <Route path={`/courses/${clickedIndex}`} render={() => <CourseDetail clickedIndex={clickedIndex} />} />
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
