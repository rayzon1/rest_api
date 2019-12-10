import React from "react";
import { Link } from "react-router-dom";

export default function UpdateCourse({ courseDetails }) {


  const str = window.location.href;
  console.log(courseDetails);

  return (
    <>
    <hr/>
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form>
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
                  value={courseDetails.title}
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
                  placeholder="Course description..."
                  value={courseDetails.description}
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
                      value={courseDetails.estimatedTime && courseDetails.estimatedTime}
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
                      value={courseDetails.materialsNeeded && courseDetails.materialsNeeded}
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
              to='/' // Change to previous page not root.
            //   onclick="event.preventDefault(); location.href='course-detail.html';"
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
