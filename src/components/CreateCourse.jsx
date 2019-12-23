import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import SuccessAlert from "./SuccessAlert";
import ValidationErrors from './ValidationErrors';

function CreateCourse({ coursesPropsObj, history }) {
  const { signedInUser, signin } = coursesPropsObj;
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseEstimatedTime, setCourseEstimatedTime] = useState("");
  const [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState("");

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [failedCreate, setFailedCreate] = useState(false);

  const courseUrl = "http://localhost:5000/api/courses";

  const submitForm = async() => {
    const headerConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        title: courseTitle,
        description: courseDescription,
        estimatedTime: courseEstimatedTime,
        materialsNeeded: courseMaterialsNeeded,
        userId: signedInUser.id
      },
      auth: {
        username: (signin && signin.username) || signedInUser.emailAddress,
        password: (signin && signin.password) || signedInUser.password
      }
    };

    try {
      await Axios.post(courseUrl, {}, headerConfig);
      setSuccessAlert(true);
      setTimeout(() => history.goBack(), 1500);
    } catch (error) {
      console.log(error.response);
      setErrorData(error.response.data.error);
      setFailedCreate(true);
    }
  };

  // Commented section will be to display error messages.
  return (
    <>
      {successAlert && <SuccessAlert title={'Course Updated'} />}
      <div className="bounds course--detail">
        <div>
          {failedCreate && errorData && <ValidationErrors data={errorData}/>}
          <form
            onSubmit={e => {
              e.preventDefault();
              setErrorData(null);
              setFailedCreate(false);
              submitForm();
            }}
          >
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    onChange={e => setCourseTitle(e.target.value)}
                  />
                  <p>{`By ${signedInUser.firstName} ${signedInUser.lastName}`}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      onChange={e => setCourseDescription(e.target.value)}
                    ></textarea>
                  </div>
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
                        onChange={e => setCourseEstimatedTime(e.target.value)}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        onChange={e => setCourseMaterialsNeeded(e.target.value)}
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <Link className="button button-secondary" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default withRouter(CreateCourse);
