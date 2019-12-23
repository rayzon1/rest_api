import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import SuccessAlert from "./SuccessAlert";
import ValidationErrors from "./ValidationErrors";
import { useFetch } from "../hooks/useFetch";

// TODO: Refactor component to fetch its own data from api. Populating from state causes error when reloading.
function UpdateCourse({ coursesPropsObj, history }) {
  let { id } = useParams(); // Use id to fetch details from api, i.e (coursedetails)
  const { signedInUser } = coursesPropsObj;
  const courseDetailUrl = `http://localhost:5000/api/courses/${id}`;

  const { response, error, isLoading } = useFetch(courseDetailUrl, {
    method: "get"
  });

  const courseDetails = response;

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateEstimatedTime, setUpdateEstimatedTime] = useState("");
  const [updateMaterialsNeeded, setUpdateMaterialsNeeded] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [failedUpdate, setFailedUpdate] = useState(false);

  const signin = useSelector(state => state.SignInState);

  useEffect(() => {
    if (courseDetails) {
      setUpdateTitle(courseDetails.title);
      setUpdateDescription(courseDetails.description);
      setUpdateEstimatedTime(courseDetails.estimatedTime);
      setUpdateMaterialsNeeded(courseDetails.materialsNeeded);
    }
  }, [courseDetails]);

  // Form submission sends put request for specific course and updates in the db.
  const submitForm = async () => {
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
        username: signin.username || signedInUser.emailAddress,
        password: signin.password || signedInUser.password
      }
    };

    try {
      await Axios.put(courseDetailUrl, {}, updateConfig);
      setSuccessAlert(true);
      setTimeout(() => {
        if (history.go(-1)) {
          history.goBack();
        } else {
          history.push("/");
        }
      }, 1500);
    } catch (error) {
      console.log(error.response);
      setErrorData(error.response.data.error);
      setFailedUpdate(true);
    }
  };

  // Tests the error data brought back from api to see if it will match the input.
  // e.g. If error string contains value param it will show that error on page.
  const testErrorData = str => {
    return errorData && errorData.map(data => data.includes(str)).includes(true)
      ? { border: "1px solid red" }
      : null;
  };

  return (
    courseDetails && (
      <>
        {successAlert && !failedUpdate && <SuccessAlert title={"Course Updated"}/>}

        <hr />

        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            {failedUpdate && errorData && (
              <ValidationErrors
                data={errorData}
                style={{ textAlign: "center" }}
              />
            )}
            <form
              onSubmit={e => {
                e.preventDefault();
                setErrorData(null);
                setFailedUpdate(false);
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
                      value={updateTitle}
                      style={testErrorData('title')}
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
                      style={testErrorData('description')}
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
                          onChange={e =>
                            setUpdateMaterialsNeeded(e.target.value)
                          }
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
                <button
                  type="cancel"
                  className="button button-secondary"
                  onClick={e => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}

export default withRouter(UpdateCourse);
