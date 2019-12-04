import React, { useState, useEffect } from "react";
import CourseButtons from "./CourseButtons";
import axios from 'axios';

export default function Courses({ setClickedIndex }) {
  // API Url for for courses.
  const coursesUrl = 'http://localhost:5000/api/courses'

  // Local component state for course data.
  const [courseData, setCourseData] = useState(null);

  // Function to fetch courses from API.
  const fetchCourses = async url => {
    const courses = await axios.get(url);
    setCourseData(courses.data);
  }

  // Fetch all courses in side-effect.
  useEffect(() => {
    fetchCourses(coursesUrl);
  }, [])


  return (
    <div id="root">
      <hr />
      <div className="bounds">
        <CourseButtons data={courseData} setClickedIndex={setClickedIndex} />
        <div className="grid-33">
          <a
            className="course--module course--add--module"
            href="create-course.html"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
}
