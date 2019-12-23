import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams, withRouter } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useFetch } from "../hooks/useFetch";
import SuccessAlert from "./SuccessAlert";

function CourseDetail({ coursesPropsObj, history }) {
  const [courseDescription, setCourseDescription] = useState(null);
  const [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState(null);
  const [courseDeleted, setCourseDeleted] = useState(false);

  const { setCourseDetails, signedInUser, signin } = coursesPropsObj;

  const { id } = useParams();

  const courseDetailUrl = `http://localhost:5000/api/courses/${id}`;

  const courseDetailId = `/courses/${id}/update`;

  const {response, error, isLoading} = useFetch(courseDetailUrl, {method: "get"});
  
  const courseDetails = response;

  // Creates course details such as description and materials needed.
  const createCourseDetails = (data, func, cat) => {
    data && func(data[cat] && data[cat].split("\n" || "\n\n"));
  };

  useEffect(() => {
    createCourseDetails(courseDetails, setCourseDescription, "description");
    createCourseDetails(
      courseDetails,
      setCourseMaterialsNeeded,
      "materialsNeeded"
    );
  }, [courseDetails]);

  const deleteCourse = async event => {
    event.preventDefault();

    const optionsObj = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      auth: {
        username: (signin && signin.username) || signedInUser.emailAddress,
        password: (signin && signin.password) || signedInUser.password
      }
    }

    try {
      await axios.delete(courseDetailUrl, optionsObj);
      setCourseDeleted(true);
      console.log('Course Deleted.');
      setTimeout(() => history.goBack(), 1500);
    } catch (error) {
      console.log(error.response);
    }
  } 


  return (
    courseDetails && (
      <>
        
        <hr />
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
              {
                signedInUser &&
                signedInUser.emailAddress === courseDetails.user.emailAddress
                ? (<span>
                  <Link className="button" to={courseDetailId}>
                    Update Course
                  </Link>
                  <a className="button" onClick={e => {
                    window.confirm("Are you sure you want to delete this course?");
                    deleteCourse(e);
                  }}>
                    Delete Course
                  </a>
                </span>)
                : null
              }
              
                <Link className="button button-secondary" to="/" onClick={() => setCourseDetails(null)}>
                  Return to List
                </Link>
              </div>
            </div>
          </div>
          {courseDeleted && <SuccessAlert title={"Course Deleted"} /> }
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{courseDetails.title}</h3>
                <p>{`By ${courseDetails.user.firstName} ${courseDetails.user.lastName}`}</p>
              </div>
              <div className="course--description">
                {courseDescription &&
                  courseDescription.map((data, index) => {
                    return <p key={index}>{data}</p>;
                  })}
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <ReactMarkdown source={courseDetails.estimatedTime} />
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      {courseMaterialsNeeded &&
                        courseMaterialsNeeded.map((data, index) => {
                          return <ReactMarkdown key={index} source={data} />;
                        })}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default withRouter(CourseDetail);