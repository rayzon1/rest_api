import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function CourseDetail({ clickedIndex }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseDescription, setCourseDescription] = useState(null);
  const courseDetailUrl = `http://localhost:5000/api/courses/${clickedIndex}`;

  // Fetch main course details from api.
  const fetchCourseDetail = async url => {
    const course = await axios.get(url);
    setCourseDetails(course.data);
  };

  // Creates course description, split by new lines.
  const createCourseDescription = data => {
    data !== null && setCourseDescription(data.description.split("\n\n"));
  };

  useEffect(() => {
    fetchCourseDetail(courseDetailUrl);
  }, [courseDetailUrl]);

  useEffect(() => {
    createCourseDescription(courseDetails);
  }, [courseDetails]);

  return (
    <>
      <div id="root">
        <hr />
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <a className="button" href="update-course.html">
                    Update Course
                  </a>
                  <a className="button" href="#">
                    Delete Course
                  </a>
                </span>
                <Link className="button button-secondary" to="/">
                  Return to List
                </Link>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">
                  {courseDetails && courseDetails.title}
                </h3>
                <p>{`By ${courseDetails &&
                  courseDetails.user.firstName} ${courseDetails &&
                  courseDetails.user.lastName}`}</p>
              </div>
              <div className="course--description">
                {courseDescription &&
                  courseDescription.map((data, index) => {
                    return (
                      <p key={index}>{data}</p>
                    );
                  })}
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>14 hours</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      <li>1/2 x 3/4 inch parting strip</li>
                      <li>1 x 2 common pine</li>
                      <li>1 x 4 common pine</li>
                      <li>1 x 10 common pine</li>
                      <li>1/4 inch thick lauan plywood</li>
                      <li>Finishing Nails</li>
                      <li>Sandpaper</li>
                      <li>Wood Glue</li>
                      <li>Wood Filler</li>
                      <li>Minwax Oil Based Polyurethane</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
