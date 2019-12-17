import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams, withRouter } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CourseDetail({ coursesPropsObj, history }) {
  const [courseDescription, setCourseDescription] = useState(null);
  const [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState(null);

  const { courseDetails, setCourseDetails, signedInUser, courseData, setCourseData } = coursesPropsObj;

  const str = window.location.href;
  let { id } = useParams();

  // console.log(id);
  // console.log(courseData);
  const courseDetailUrl = `http://localhost:5000/api/courses/${str.charAt(
    str.length - 1
  )}`;

  const courseDetailId = `/courses/${str.charAt(str.length-1)}/update`;


  const fetchCourseDetail = useCallback(
    async url => {
      try {
        const course = await axios.get(url);
        setCourseDetails(course.data);
      } catch (error) {
        return history.push('/notfound');
      }
    }, 
    [setCourseDetails]
  )

  // Creates course details such as description and materials needed.
  const createCourseDetails = (data, func, cat) => {
    data && func(data[cat] && data[cat].split("\n" || "\n\n"));
  };

  useEffect(() => {
    fetchCourseDetail(courseDetailUrl);
    return () => {
      console.log('course detail unmounted.')
    }
  }, [courseDetailUrl, fetchCourseDetail]);

  useEffect(() => {
    createCourseDetails(courseDetails, setCourseDescription, "description");
    createCourseDetails(
      courseDetails,
      setCourseMaterialsNeeded,
      "materialsNeeded"
    );
  }, [courseDetails]);


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
                  <a className="button" href="#">
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