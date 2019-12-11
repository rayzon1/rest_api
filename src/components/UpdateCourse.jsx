import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import Alert from "./Alert";


function UpdateCourse({ courseDetails, history }) {
  const [updateTitle, setUpdateTitle] = useState(courseDetails.title);
  const [updateDescription, setUpdateDescription] = useState(courseDetails.description);
  const [updateEstimatedTime, setUpdateEstimatedTime] = useState(courseDetails.estimatedTime);
  const [updateMaterialsNeeded, setUpdateMaterialsNeeded] = useState(courseDetails.materialsNeeded);

  const signin = useSelector(state => state.SignInState);

  const courseDetailUrl = num => {
    return `http://localhost:5000/api/courses/${num}`;
  };

  const str = window.location.href;

  const submitForm = () => {
    const updateConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        title: updateTitle,
        description: updateDescription,
        estimatedTime: updateEstimatedTime,
        materialsNeeded: updateMaterialsNeeded
      },
      auth: {
        username: signin.username,
        password: signin.password
      },
      
    }

    return Axios
      .put(courseDetailUrl(courseDetails.id), {}, updateConfig)
      .catch(error =>  console.log(error.response))
  };

  //TODO: PROVIDE ALERT FOR UPDATE SUCCESS.
  return (
    <>
      <hr />
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={e => {
            e.preventDefault();
            submitForm();
            setTimeout(() => history.goBack(), 300)
          }}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    value={updateTitle}
                    onChange={e => setUpdateTitle(e.target.value)}
                  />
                </div>
                <p>{`By ${courseDetails.user.firstName} ${courseDetails.user.lastName}`}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    value={updateDescription}
                    onChange={e => setUpdateDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={updateEstimatedTime}
                        onChange={e => setUpdateEstimatedTime(e.target.value)}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        placeholder="List materials..."
                        value={updateMaterialsNeeded}
                        onChange={e => setUpdateMaterialsNeeded(e.target.value)}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Update Course
              </button>
              <Link
                className="button button-secondary"
                to="/" // Change to previous page not root.
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default withRouter(UpdateCourse);
