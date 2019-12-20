import React, { useState, useEffect } from "react";
import CourseButtons from "./CourseButtons";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Courses() {
  // API Url for for courses.
  const coursesUrl = 'http://localhost:5000/api/courses'

  // Local component state for course data.
  const [courseData, setCourseData] = useState(null);

  const { response, error, isLoading } = useFetch(coursesUrl, { method: "get" })

  // Fetch all courses in side-effect.
  useEffect(() => {
    setCourseData(response);
    return () => {
      console.log("component unmounted.")
    }
  }, [response])


  return (
    <>
      <hr />
      <div className="bounds">
        <CourseButtons data={courseData} />
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/create"
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
          </Link>
        </div>
      </div>
    </>
  );
}
